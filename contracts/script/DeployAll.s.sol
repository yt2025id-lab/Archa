// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ArisanFactory.sol";
import "../src/AIYieldStrategy.sol";
import "../src/mocks/MockUSDC.sol";
import "../src/vaults/LendleVault.sol";
import "../src/vaults/MerchantMoeVault.sol";
import "../src/vaults/AgniVault.sol";
import "../src/vaults/MinterestVault.sol";
import "../src/vaults/KTXVault.sol";

/**
 * @title DeployAll Script for Archa
 * @notice Deploys all Archa contracts including vaults and creates sample pools
 */
contract DeployAllScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // ========== EXISTING CONTRACTS (use deployed addresses) ==========
        address usdc = 0xdE8A1AA3d835cE7916eC4B3D5A925078Fd2Ed9eC;
        address factory = 0xcF278B33083A8D50aD59C024bc4428725FBBb081;
        address yieldStrategy = 0xbc07e4cf8c72524B3c54E6451148b8b7cA5577e4;

        console.log("Using existing contracts:");
        console.log("MockUSDC:", usdc);
        console.log("ArisanFactory:", factory);
        console.log("AIYieldStrategy:", yieldStrategy);

        // ========== DEPLOY VAULT CONTRACTS ==========
        console.log("\n--- Deploying Vault Contracts ---");

        LendleVault lendleVault = new LendleVault(usdc);
        console.log("LendleVault deployed at:", address(lendleVault));

        MerchantMoeVault merchantMoeVault = new MerchantMoeVault(usdc);
        console.log("MerchantMoeVault deployed at:", address(merchantMoeVault));

        AgniVault agniVault = new AgniVault(usdc);
        console.log("AgniVault deployed at:", address(agniVault));

        MinterestVault minterestVault = new MinterestVault(usdc);
        console.log("MinterestVault deployed at:", address(minterestVault));

        KTXVault ktxVault = new KTXVault(usdc);
        console.log("KTXVault deployed at:", address(ktxVault));

        // ========== CREATE SAMPLE POOLS ==========
        console.log("\n--- Creating Sample Pools ---");

        ArisanFactory factoryContract = ArisanFactory(factory);

        // Pool 1: Small Pool from template 0
        address pool1 = factoryContract.createPoolFromTemplate(0);
        console.log("Pool 1 (Small - 10 USDC, 5 people) deployed at:", pool1);

        // Pool 2: Medium Pool from template 1
        address pool2 = factoryContract.createPoolFromTemplate(1);
        console.log("Pool 2 (Medium - 50 USDC, 10 people) deployed at:", pool2);

        // Pool 3: Large Pool from template 2
        address pool3 = factoryContract.createPoolFromTemplate(2);
        console.log("Pool 3 (Large - 100 USDC, 20 people) deployed at:", pool3);

        vm.stopBroadcast();

        // ========== DEPLOYMENT SUMMARY ==========
        console.log("\n========================================");
        console.log("      ARCHA DEPLOYMENT SUMMARY");
        console.log("========================================");
        console.log("\n--- Core Contracts ---");
        console.log("MockUSDC:        ", usdc);
        console.log("ArisanFactory:   ", factory);
        console.log("AIYieldStrategy: ", yieldStrategy);

        console.log("\n--- DeFi Protocol Vaults ---");
        console.log("LendleVault:      ", address(lendleVault));
        console.log("MerchantMoeVault: ", address(merchantMoeVault));
        console.log("AgniVault:        ", address(agniVault));
        console.log("MinterestVault:   ", address(minterestVault));
        console.log("KTXVault:         ", address(ktxVault));

        console.log("\n--- Sample Pools ---");
        console.log("Pool 1 (Small):  ", pool1);
        console.log("Pool 2 (Medium): ", pool2);
        console.log("Pool 3 (Large):  ", pool3);

        console.log("\n========================================");
        console.log("  Total Contracts Deployed: 11");
        console.log("========================================\n");
    }
}
