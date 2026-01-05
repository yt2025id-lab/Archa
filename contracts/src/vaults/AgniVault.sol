// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BaseVault.sol";

/**
 * @title AgniVault
 * @notice Mock Agni Finance protocol vault for Archa
 * @dev Simulates Agni Finance DEX on Mantle
 */
contract AgniVault is BaseVault {
    constructor(address _asset) BaseVault(_asset, "Agni Finance", 950) {} // 9.5% APY
}
