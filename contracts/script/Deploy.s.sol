// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ArisanFactory.sol";
import "../src/AIYieldStrategy.sol";
import "../src/mocks/MockUSDC.sol";

/**
 * @title Deploy Script for Archa
 * @notice Deploys all Archa contracts to Mantle Sepolia testnet
 */
contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy MockUSDC for testnet (use real USDC address on mainnet)
        MockUSDC usdc = new MockUSDC();
        console.log("MockUSDC deployed at:", address(usdc));

        // Deploy AI Yield Strategy
        AIYieldStrategy yieldStrategy = new AIYieldStrategy(
            address(usdc),
            "Lendle",  // Initial protocol
            500        // 5% APY
        );
        console.log("AIYieldStrategy deployed at:", address(yieldStrategy));

        // Deploy ArisanFactory
        ArisanFactory factory = new ArisanFactory(address(usdc));
        console.log("ArisanFactory deployed at:", address(factory));

        // Set AI Optimizer in factory
        factory.setAIOptimizer(msg.sender);

        vm.stopBroadcast();

        // Log summary
        console.log("\n=== Deployment Summary ===");
        console.log("Network: Mantle Sepolia Testnet");
        console.log("MockUSDC:", address(usdc));
        console.log("AIYieldStrategy:", address(yieldStrategy));
        console.log("ArisanFactory:", address(factory));
        console.log("===========================\n");
    }
}

/**
 * @title Deploy Script for Mainnet
 * @notice Deploys contracts using real USDC on Mantle mainnet
 */
contract DeployMainnetScript is Script {
    // Mantle Mainnet USDC address
    address constant USDC_MAINNET = 0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy AI Yield Strategy with real USDC
        AIYieldStrategy yieldStrategy = new AIYieldStrategy(
            USDC_MAINNET,
            "Lendle",
            500
        );
        console.log("AIYieldStrategy deployed at:", address(yieldStrategy));

        // Deploy ArisanFactory with real USDC
        ArisanFactory factory = new ArisanFactory(USDC_MAINNET);
        console.log("ArisanFactory deployed at:", address(factory));

        // Set AI Optimizer
        factory.setAIOptimizer(msg.sender);

        vm.stopBroadcast();

        console.log("\n=== Mainnet Deployment Summary ===");
        console.log("Network: Mantle Mainnet");
        console.log("USDC (existing):", USDC_MAINNET);
        console.log("AIYieldStrategy:", address(yieldStrategy));
        console.log("ArisanFactory:", address(factory));
        console.log("==================================\n");
    }
}
