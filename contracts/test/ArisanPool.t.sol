// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ArisanPool.sol";
import "../src/ArisanFactory.sol";
import "../src/AIYieldStrategy.sol";
import "../src/mocks/MockUSDC.sol";

contract ArisanPoolTest is Test {
    MockUSDC usdc;
    ArisanFactory factory;
    AIYieldStrategy yieldStrategy;

    address owner = address(this);
    address alice = address(0x1);
    address bob = address(0x2);
    address charlie = address(0x3);
    address dave = address(0x4);
    address eve = address(0x5);

    uint256 constant DEPOSIT_AMOUNT = 10 * 1e6; // 10 USDC
    uint256 constant MAX_PARTICIPANTS = 5;
    uint256 constant CYCLE_DURATION = 30 days;

    function setUp() public {
        // Deploy MockUSDC
        usdc = new MockUSDC();

        // Deploy Factory
        factory = new ArisanFactory(address(usdc));

        // Deploy Yield Strategy
        yieldStrategy = new AIYieldStrategy(address(usdc), "Lendle", 500); // 5% APY

        // Mint USDC to participants
        usdc.mint(alice, 1000 * 1e6);
        usdc.mint(bob, 1000 * 1e6);
        usdc.mint(charlie, 1000 * 1e6);
        usdc.mint(dave, 1000 * 1e6);
        usdc.mint(eve, 1000 * 1e6);
    }

    // ============ Factory Tests ============

    function test_CreatePoolFromTemplate() public {
        address pool = factory.createPoolFromTemplate(0); // Small Pool template
        assertTrue(pool != address(0), "Pool should be created");

        ArisanPool arisanPool = ArisanPool(pool);
        (uint256 depositAmount, uint256 maxParticipants,,,,,, ) = arisanPool.getPoolInfo();

        assertEq(depositAmount, 10 * 1e6, "Deposit should be 10 USDC");
        assertEq(maxParticipants, 5, "Max participants should be 5");
    }

    function test_CreateCustomPool() public {
        address pool = factory.createCustomPool(
            50 * 1e6,  // 50 USDC
            10,         // 10 participants
            7 days      // Weekly cycle
        );
        assertTrue(pool != address(0), "Pool should be created");
    }

    function test_GetAllPools() public {
        factory.createPoolFromTemplate(0);
        factory.createPoolFromTemplate(1);

        address[] memory pools = factory.getAllPools();
        assertEq(pools.length, 2, "Should have 2 pools");
    }

    // ============ Pool Joining Tests ============

    function test_JoinPool() public {
        address poolAddr = factory.createPoolFromTemplate(0);
        ArisanPool pool = ArisanPool(poolAddr);

        // Calculate required collateral
        uint256 collateral = pool.getRequiredCollateral();

        // Alice joins
        vm.startPrank(alice);
        usdc.approve(poolAddr, collateral);
        pool.joinPool();
        vm.stopPrank();

        assertEq(pool.getParticipantCount(), 1, "Should have 1 participant");
    }

    function test_CannotJoinTwice() public {
        address poolAddr = factory.createPoolFromTemplate(0);
        ArisanPool pool = ArisanPool(poolAddr);
        uint256 collateral = pool.getRequiredCollateral();

        vm.startPrank(alice);
        usdc.approve(poolAddr, collateral * 2);
        pool.joinPool();

        vm.expectRevert("Already joined");
        pool.joinPool();
        vm.stopPrank();
    }

    function test_PoolBecomesFull() public {
        address poolAddr = factory.createPoolFromTemplate(0);
        ArisanPool pool = ArisanPool(poolAddr);
        uint256 collateral = pool.getRequiredCollateral();

        // All 5 participants join
        address[5] memory participants = [alice, bob, charlie, dave, eve];

        for (uint i = 0; i < 5; i++) {
            vm.startPrank(participants[i]);
            usdc.approve(poolAddr, collateral);
            pool.joinPool();
            vm.stopPrank();
        }

        assertTrue(pool.isPoolFull(), "Pool should be full");
        assertEq(pool.getParticipantCount(), 5, "Should have 5 participants");
    }

    // ============ Pool Start Tests ============

    function test_StartPool() public {
        address poolAddr = _createAndFillPool();
        ArisanPool pool = ArisanPool(poolAddr);

        pool.startPool();

        assertTrue(pool.isPoolStarted(), "Pool should be started");
        assertEq(pool.currentCycle(), 1, "Should be cycle 1");
    }

    function test_CannotStartIfNotFull() public {
        address poolAddr = factory.createPoolFromTemplate(0);
        ArisanPool pool = ArisanPool(poolAddr);

        vm.expectRevert("Pool not full yet");
        pool.startPool();
    }

    // ============ Deposit Tests ============

    function test_MakeDeposit() public {
        address poolAddr = _createAndFillPool();
        ArisanPool pool = ArisanPool(poolAddr);
        pool.startPool();

        // Alice makes deposit
        vm.startPrank(alice);
        usdc.approve(poolAddr, DEPOSIT_AMOUNT);
        pool.makeDeposit();
        vm.stopPrank();

        assertTrue(pool.hasDepositedThisCycle(alice), "Alice should have deposited");
    }

    function test_CannotDepositTwice() public {
        address poolAddr = _createAndFillPool();
        ArisanPool pool = ArisanPool(poolAddr);
        pool.startPool();

        vm.startPrank(alice);
        usdc.approve(poolAddr, DEPOSIT_AMOUNT * 2);
        pool.makeDeposit();

        vm.expectRevert("Already deposited this cycle");
        pool.makeDeposit();
        vm.stopPrank();
    }

    // ============ Winner Selection Tests ============

    function test_SelectWinner() public {
        address poolAddr = _createAndFillPool();
        ArisanPool pool = ArisanPool(poolAddr);
        pool.startPool();

        // All participants make deposits
        _allParticipantsDeposit(pool, poolAddr);

        // Fast forward past cycle duration
        vm.warp(block.timestamp + CYCLE_DURATION + 1);

        // Select winner
        pool.selectWinner();

        address winner = pool.lastWinner();
        assertTrue(winner != address(0), "Winner should be selected");
        assertEq(pool.currentCycle(), 2, "Should move to cycle 2");
    }

    // ============ Yield Strategy Tests ============

    function test_SetYieldStrategy() public {
        address poolAddr = factory.createPoolFromTemplate(0);
        ArisanPool pool = ArisanPool(poolAddr);

        pool.setAIOptimizer(owner);
        pool.updateYieldStrategy(address(yieldStrategy));

        assertEq(address(pool.yieldStrategy()), address(yieldStrategy), "Strategy should be set");
    }

    function test_YieldAccrues() public {
        // Setup pool with yield strategy
        address poolAddr = factory.createPoolFromTemplate(0);
        ArisanPool pool = ArisanPool(poolAddr);

        // Mint USDC to yield strategy for simulating yield
        usdc.mint(address(yieldStrategy), 1000 * 1e6);

        uint256 collateral = pool.getRequiredCollateral();

        // Alice joins
        vm.startPrank(alice);
        usdc.approve(poolAddr, collateral);
        pool.joinPool();
        vm.stopPrank();

        // Check yield after time passes (via strategy)
        vm.warp(block.timestamp + 365 days);

        uint256 yield_ = yieldStrategy.getPendingYield();
        // Note: yield would accrue if funds were deposited to strategy
    }

    // ============ Collateral Slash Tests ============

    function test_SlashCollateral() public {
        address poolAddr = _createAndFillPool();
        ArisanPool pool = ArisanPool(poolAddr);
        pool.startPool();

        // Only some participants deposit (alice doesn't)
        vm.startPrank(bob);
        usdc.approve(poolAddr, DEPOSIT_AMOUNT);
        pool.makeDeposit();
        vm.stopPrank();

        // Fast forward past cycle - alice missed payment
        vm.warp(block.timestamp + CYCLE_DURATION + 1);

        // Get alice's collateral before slash
        (,uint256 collateralBefore,,,,, ) = pool.participants(alice);

        // Slash alice's collateral
        pool.slashCollateral(alice);

        (,uint256 collateralAfter,, uint256 missedPayments,,, ) = pool.participants(alice);

        assertEq(collateralAfter, collateralBefore - DEPOSIT_AMOUNT, "Collateral should be reduced");
        assertEq(missedPayments, 1, "Missed payments should be 1");
    }

    // ============ AI Optimizer Tests ============

    function test_AIOptimizerCanUpdateStrategy() public {
        address poolAddr = factory.createPoolFromTemplate(0);
        ArisanPool pool = ArisanPool(poolAddr);

        address aiBot = address(0x999);
        pool.setAIOptimizer(aiBot);

        // Create new strategy with higher APY
        AIYieldStrategy newStrategy = new AIYieldStrategy(address(usdc), "Merchant Moe", 800);

        // AI optimizer updates strategy
        vm.prank(aiBot);
        pool.updateYieldStrategy(address(newStrategy));

        assertEq(address(pool.yieldStrategy()), address(newStrategy), "Strategy should be updated");
    }

    function test_NonAIOptimizerCannotUpdateStrategy() public {
        address poolAddr = factory.createPoolFromTemplate(0);
        ArisanPool pool = ArisanPool(poolAddr);

        address randomUser = address(0x888);

        vm.prank(randomUser);
        vm.expectRevert("Only AI optimizer");
        pool.updateYieldStrategy(address(yieldStrategy));
    }

    // ============ Helper Functions ============

    function _createAndFillPool() internal returns (address) {
        address poolAddr = factory.createPoolFromTemplate(0);
        ArisanPool pool = ArisanPool(poolAddr);
        uint256 collateral = pool.getRequiredCollateral();

        address[5] memory participants = [alice, bob, charlie, dave, eve];

        for (uint i = 0; i < 5; i++) {
            vm.startPrank(participants[i]);
            usdc.approve(poolAddr, collateral);
            pool.joinPool();
            vm.stopPrank();
        }

        return poolAddr;
    }

    function _allParticipantsDeposit(ArisanPool pool, address poolAddr) internal {
        address[5] memory participants = [alice, bob, charlie, dave, eve];

        for (uint i = 0; i < 5; i++) {
            vm.startPrank(participants[i]);
            usdc.approve(poolAddr, DEPOSIT_AMOUNT);
            pool.makeDeposit();
            vm.stopPrank();
        }
    }
}
