// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IERC20.sol";
import "./interfaces/IYieldStrategy.sol";

/**
 * @title ArisanPool
 * @notice Decentralized rotating savings (arisan) pool with AI yield optimization
 * @dev Built for Mantle Network - Mantle Global Hackathon 2025
 */
contract ArisanPool {
    // ============ Structs ============

    struct Participant {
        address addr;
        uint256 collateralAmount;
        uint256 totalDeposited;
        uint256 missedPayments;
        bool hasReceivedPayout;
        bool isActive;
        uint256 joinedAt;
    }

    struct PoolConfig {
        uint256 depositAmount;      // Monthly deposit amount in USDC
        uint256 maxParticipants;    // Max number of participants
        uint256 cycleDuration;      // Duration of each cycle in seconds (e.g., 30 days)
        uint256 collateralMultiplier; // Collateral = depositAmount * (maxParticipants - 1) * multiplier / 100
    }

    // ============ State Variables ============

    IERC20 public immutable usdc;
    IYieldStrategy public yieldStrategy;

    PoolConfig public config;

    mapping(address => Participant) public participants;
    address[] public participantList;

    uint256 public currentCycle;
    uint256 public poolStartTime;
    uint256 public totalPoolFunds;
    uint256 public totalYieldEarned;

    address public lastWinner;
    mapping(uint256 => address) public cycleWinners;

    bool public isPoolActive;
    bool public isPoolFull;
    bool public isPoolStarted;

    address public owner;
    address public aiOptimizer; // Address that can update yield strategy

    // ============ Events ============

    event ParticipantJoined(address indexed participant, uint256 collateral);
    event DepositMade(address indexed participant, uint256 amount, uint256 cycle);
    event PayoutDistributed(address indexed winner, uint256 amount, uint256 cycle);
    event CollateralSlashed(address indexed participant, uint256 amount, string reason);
    event CollateralReturned(address indexed participant, uint256 amount, uint256 yieldBonus);
    event YieldStrategyUpdated(address indexed oldStrategy, address indexed newStrategy);
    event PoolStarted(uint256 startTime);
    event PoolEnded(uint256 totalYield);

    // ============ Modifiers ============

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyAIOptimizer() {
        require(msg.sender == aiOptimizer || msg.sender == owner, "Only AI optimizer");
        _;
    }

    modifier poolNotStarted() {
        require(!isPoolStarted, "Pool already started");
        _;
    }

    modifier poolActive() {
        require(isPoolActive && isPoolStarted, "Pool not active");
        _;
    }

    // ============ Constructor ============

    constructor(
        address _usdc,
        uint256 _depositAmount,
        uint256 _maxParticipants,
        uint256 _cycleDuration,
        uint256 _collateralMultiplier
    ) {
        require(_usdc != address(0), "Invalid USDC address");
        require(_depositAmount > 0, "Deposit must be > 0");
        require(_maxParticipants >= 2, "Need at least 2 participants");

        usdc = IERC20(_usdc);
        owner = msg.sender;
        aiOptimizer = msg.sender;

        config = PoolConfig({
            depositAmount: _depositAmount,
            maxParticipants: _maxParticipants,
            cycleDuration: _cycleDuration,
            collateralMultiplier: _collateralMultiplier
        });

        isPoolActive = true;
    }

    // ============ Core Functions ============

    /**
     * @notice Join the arisan pool by depositing collateral
     */
    function joinPool() external poolNotStarted {
        require(isPoolActive, "Pool not active");
        require(!isPoolFull, "Pool is full");
        require(!participants[msg.sender].isActive, "Already joined");

        uint256 collateralRequired = getRequiredCollateral();

        // Transfer collateral from participant
        require(
            usdc.transferFrom(msg.sender, address(this), collateralRequired),
            "Collateral transfer failed"
        );

        // Add participant
        participants[msg.sender] = Participant({
            addr: msg.sender,
            collateralAmount: collateralRequired,
            totalDeposited: 0,
            missedPayments: 0,
            hasReceivedPayout: false,
            isActive: true,
            joinedAt: block.timestamp
        });

        participantList.push(msg.sender);

        // Check if pool is full
        if (participantList.length >= config.maxParticipants) {
            isPoolFull = true;
        }

        emit ParticipantJoined(msg.sender, collateralRequired);
    }

    /**
     * @notice Start the pool once it's full
     */
    function startPool() external onlyOwner {
        require(isPoolFull, "Pool not full yet");
        require(!isPoolStarted, "Pool already started");

        isPoolStarted = true;
        poolStartTime = block.timestamp;
        currentCycle = 1;

        // Deposit all collateral to yield strategy if set
        if (address(yieldStrategy) != address(0)) {
            uint256 totalCollateral = getTotalCollateral();
            usdc.approve(address(yieldStrategy), totalCollateral);
            yieldStrategy.deposit(totalCollateral);
        }

        emit PoolStarted(poolStartTime);
    }

    /**
     * @notice Make monthly deposit
     */
    function makeDeposit() external poolActive {
        require(participants[msg.sender].isActive, "Not a participant");
        require(!hasDepositedThisCycle(msg.sender), "Already deposited this cycle");

        // Transfer deposit from participant
        require(
            usdc.transferFrom(msg.sender, address(this), config.depositAmount),
            "Deposit transfer failed"
        );

        participants[msg.sender].totalDeposited += config.depositAmount;
        totalPoolFunds += config.depositAmount;

        // Deposit to yield strategy if set
        if (address(yieldStrategy) != address(0)) {
            usdc.approve(address(yieldStrategy), config.depositAmount);
            yieldStrategy.deposit(config.depositAmount);
        }

        emit DepositMade(msg.sender, config.depositAmount, currentCycle);
    }

    /**
     * @notice Select winner for current cycle (simplified random - for production use Chainlink VRF)
     */
    function selectWinner() external onlyOwner poolActive {
        require(isCycleComplete(), "Cycle not complete");

        // Get eligible participants (haven't received payout yet)
        address[] memory eligible = getEligibleWinners();
        require(eligible.length > 0, "No eligible winners");

        // Simple random selection (use Chainlink VRF in production)
        uint256 randomIndex = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.prevrandao, currentCycle))
        ) % eligible.length;

        address winner = eligible[randomIndex];

        // Calculate payout (total deposits this cycle + accumulated yield)
        uint256 cycleDeposits = config.depositAmount * config.maxParticipants;
        uint256 yieldBonus = getCurrentYield() / config.maxParticipants;
        uint256 totalPayout = cycleDeposits + yieldBonus;

        // Withdraw from yield strategy if needed
        if (address(yieldStrategy) != address(0)) {
            yieldStrategy.withdraw(totalPayout);
        }

        // Transfer payout to winner
        require(usdc.transfer(winner, totalPayout), "Payout transfer failed");

        participants[winner].hasReceivedPayout = true;
        cycleWinners[currentCycle] = winner;
        lastWinner = winner;

        emit PayoutDistributed(winner, totalPayout, currentCycle);

        // Move to next cycle or end pool
        if (currentCycle >= config.maxParticipants) {
            _endPool();
        } else {
            currentCycle++;
        }
    }

    /**
     * @notice Slash collateral for missed payment
     */
    function slashCollateral(address participant) external onlyOwner poolActive {
        require(participants[participant].isActive, "Not active participant");
        require(hasMissedPayment(participant), "No missed payment");

        uint256 slashAmount = config.depositAmount;

        if (participants[participant].collateralAmount >= slashAmount) {
            participants[participant].collateralAmount -= slashAmount;
            participants[participant].missedPayments++;
            totalPoolFunds += slashAmount; // Add slashed amount to pool

            emit CollateralSlashed(participant, slashAmount, "Missed payment");
        }

        // Kick participant if collateral is depleted
        if (participants[participant].collateralAmount == 0) {
            participants[participant].isActive = false;
        }
    }

    // ============ AI Yield Optimizer Functions ============

    /**
     * @notice Update yield strategy (called by AI optimizer)
     */
    function updateYieldStrategy(address newStrategy) external onlyAIOptimizer {
        address oldStrategy = address(yieldStrategy);

        // Withdraw from old strategy
        if (oldStrategy != address(0)) {
            uint256 totalValue = yieldStrategy.getTotalValue();
            if (totalValue > 0) {
                yieldStrategy.withdraw(totalValue);
            }
        }

        yieldStrategy = IYieldStrategy(newStrategy);

        // Deposit to new strategy
        if (newStrategy != address(0)) {
            uint256 balance = usdc.balanceOf(address(this));
            if (balance > 0) {
                usdc.approve(newStrategy, balance);
                IYieldStrategy(newStrategy).deposit(balance);
            }
        }

        emit YieldStrategyUpdated(oldStrategy, newStrategy);
    }

    /**
     * @notice Set AI optimizer address
     */
    function setAIOptimizer(address _aiOptimizer) external onlyOwner {
        require(_aiOptimizer != address(0), "Invalid address");
        aiOptimizer = _aiOptimizer;
    }

    /**
     * @notice Transfer ownership
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }

    // ============ View Functions ============

    function getRequiredCollateral() public view returns (uint256) {
        // Collateral = depositAmount * (maxParticipants - 1) * multiplier / 100
        return (config.depositAmount * (config.maxParticipants - 1) * config.collateralMultiplier) / 100;
    }

    function getTotalCollateral() public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < participantList.length; i++) {
            total += participants[participantList[i]].collateralAmount;
        }
        return total;
    }

    function getCurrentYield() public view returns (uint256) {
        if (address(yieldStrategy) == address(0)) return 0;
        uint256 totalValue = yieldStrategy.getTotalValue();
        uint256 principal = getTotalCollateral() + totalPoolFunds;
        return totalValue > principal ? totalValue - principal : 0;
    }

    function getEligibleWinners() public view returns (address[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < participantList.length; i++) {
            if (participants[participantList[i]].isActive &&
                !participants[participantList[i]].hasReceivedPayout) {
                count++;
            }
        }

        address[] memory eligible = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < participantList.length; i++) {
            if (participants[participantList[i]].isActive &&
                !participants[participantList[i]].hasReceivedPayout) {
                eligible[index] = participantList[i];
                index++;
            }
        }

        return eligible;
    }

    function hasDepositedThisCycle(address participant) public view returns (bool) {
        uint256 expectedDeposits = currentCycle * config.depositAmount;
        return participants[participant].totalDeposited >= expectedDeposits;
    }

    function hasMissedPayment(address participant) public view returns (bool) {
        return !hasDepositedThisCycle(participant) &&
               block.timestamp > poolStartTime + (currentCycle * config.cycleDuration);
    }

    function isCycleComplete() public view returns (bool) {
        return block.timestamp >= poolStartTime + (currentCycle * config.cycleDuration);
    }

    function getParticipantCount() external view returns (uint256) {
        return participantList.length;
    }

    function getPoolInfo() external view returns (
        uint256 depositAmount,
        uint256 maxParticipants,
        uint256 currentParticipants,
        uint256 cycle,
        bool started,
        bool active,
        uint256 totalFunds,
        uint256 yield_
    ) {
        return (
            config.depositAmount,
            config.maxParticipants,
            participantList.length,
            currentCycle,
            isPoolStarted,
            isPoolActive,
            totalPoolFunds,
            getCurrentYield()
        );
    }

    // ============ Internal Functions ============

    function _endPool() internal {
        isPoolActive = false;
        totalYieldEarned = getCurrentYield();

        // Return collateral + yield bonus to all consistent participants
        uint256 yieldPerParticipant = totalYieldEarned / config.maxParticipants;

        for (uint256 i = 0; i < participantList.length; i++) {
            address participant = participantList[i];
            if (participants[participant].isActive &&
                participants[participant].collateralAmount > 0) {

                uint256 returnAmount = participants[participant].collateralAmount + yieldPerParticipant;

                // Withdraw from yield strategy if needed
                if (address(yieldStrategy) != address(0)) {
                    yieldStrategy.withdraw(returnAmount);
                }

                usdc.transfer(participant, returnAmount);

                emit CollateralReturned(
                    participant,
                    participants[participant].collateralAmount,
                    yieldPerParticipant
                );
            }
        }

        emit PoolEnded(totalYieldEarned);
    }
}
