// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BaseVault.sol";

/**
 * @title MerchantMoeVault
 * @notice Mock Merchant Moe protocol vault for Archa
 * @dev Simulates Merchant Moe DEX liquidity provision on Mantle
 */
contract MerchantMoeVault is BaseVault {
    constructor(address _asset) BaseVault(_asset, "Merchant Moe", 1200) {} // 12% APY
}
