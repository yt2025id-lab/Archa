// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IERC20.sol";
import "./interfaces/IYieldStrategy.sol";

/**
 * @title AIYieldStrategy
 * @notice Mock yield strategy for AI Yield Optimizer demonstration
 * @dev In production, this would integrate with real DeFi protocols on Mantle
 *      such as Lendle, Merchant Moe, Agni Finance, etc.
 */
contract AIYieldStrategy is IYieldStrategy {
    // ============ State Variables ============

    IERC20 public immutable token;
    address public aiOptimizer;
    address public owner;

    uint256 public totalDeposits;
    uint256 public simulatedAPY; // In basis points (e.g., 500 = 5%)
    uint256 public lastUpdateTime;

    mapping(address => uint256) public shares;
    uint256 public totalShares;

    string public protocolName;

    // ============ Events ============

    event Deposited(address indexed from, uint256 amount, uint256 shares);
    event Withdrawn(address indexed to, uint256 shares, uint256 amount);
    event APYUpdated(uint256 oldAPY, uint256 newAPY);
    event ProtocolSwitched(string oldProtocol, string newProtocol);

    // ============ Modifiers ============

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyAIOptimizer() {
        require(msg.sender == aiOptimizer || msg.sender == owner, "Only AI optimizer");
        _;
    }

    // ============ Constructor ============

    constructor(address _token, string memory _protocolName, uint256 _initialAPY) {
        require(_token != address(0), "Invalid token");
        token = IERC20(_token);
        protocolName = _protocolName;
        simulatedAPY = _initialAPY;
        owner = msg.sender;
        aiOptimizer = msg.sender;
        lastUpdateTime = block.timestamp;
    }

    // ============ Core Functions ============

    /**
     * @notice Deposit tokens into yield strategy
     */
    function deposit(uint256 amount) external override returns (uint256) {
        require(amount > 0, "Amount must be > 0");

        // Transfer tokens from caller
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // Calculate shares (1:1 for simplicity in mock)
        uint256 sharesToMint = amount;
        if (totalShares > 0 && totalDeposits > 0) {
            sharesToMint = (amount * totalShares) / totalDeposits;
        }

        shares[msg.sender] += sharesToMint;
        totalShares += sharesToMint;
        totalDeposits += amount;

        emit Deposited(msg.sender, amount, sharesToMint);

        return sharesToMint;
    }

    /**
     * @notice Withdraw tokens from yield strategy
     */
    function withdraw(uint256 shareAmount) external override returns (uint256) {
        require(shareAmount > 0, "Shares must be > 0");
        require(shares[msg.sender] >= shareAmount || msg.sender == owner, "Insufficient shares");

        // Calculate amount to return (including simulated yield)
        uint256 amount = (shareAmount * getTotalValue()) / totalShares;

        if (shares[msg.sender] >= shareAmount) {
            shares[msg.sender] -= shareAmount;
        }
        totalShares -= shareAmount;

        // Ensure we don't withdraw more than balance
        uint256 balance = token.balanceOf(address(this));
        if (amount > balance) {
            amount = balance;
        }

        totalDeposits = totalDeposits > amount ? totalDeposits - amount : 0;

        // Transfer tokens to caller
        require(token.transfer(msg.sender, amount), "Transfer failed");

        emit Withdrawn(msg.sender, shareAmount, amount);

        return amount;
    }

    // ============ AI Optimizer Functions ============

    /**
     * @notice Update APY (simulates AI switching to better protocol)
     */
    function setAPY(uint256 newAPY) external onlyAIOptimizer {
        uint256 oldAPY = simulatedAPY;
        simulatedAPY = newAPY;
        lastUpdateTime = block.timestamp;
        emit APYUpdated(oldAPY, newAPY);
    }

    /**
     * @notice Simulate switching to different protocol
     */
    function switchProtocol(string memory newProtocol, uint256 newAPY) external onlyAIOptimizer {
        string memory oldProtocol = protocolName;
        protocolName = newProtocol;
        simulatedAPY = newAPY;
        lastUpdateTime = block.timestamp;
        emit ProtocolSwitched(oldProtocol, newProtocol);
    }

    /**
     * @notice Set AI optimizer address
     */
    function setAIOptimizer(address _aiOptimizer) external onlyOwner {
        require(_aiOptimizer != address(0), "Invalid address");
        aiOptimizer = _aiOptimizer;
    }

    // ============ View Functions ============

    function getCurrentAPY() external view override returns (uint256) {
        return simulatedAPY;
    }

    function getTotalValue() public view override returns (uint256) {
        // Simulate yield accrual based on time and APY
        uint256 timeElapsed = block.timestamp - lastUpdateTime;
        uint256 yearInSeconds = 365 days;

        // yield = principal * APY * time / year / 10000 (APY in basis points)
        uint256 yield_ = (totalDeposits * simulatedAPY * timeElapsed) / (yearInSeconds * 10000);

        return totalDeposits + yield_;
    }

    function underlyingToken() external view override returns (address) {
        return address(token);
    }

    function getProtocolName() external view returns (string memory) {
        return protocolName;
    }

    function getShareBalance(address account) external view returns (uint256) {
        return shares[account];
    }

    function getPendingYield() external view returns (uint256) {
        uint256 totalValue = getTotalValue();
        return totalValue > totalDeposits ? totalValue - totalDeposits : 0;
    }
}
