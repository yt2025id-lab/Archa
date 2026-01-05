// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BaseVault.sol";

/**
 * @title LendleVault
 * @notice Mock Lendle protocol vault for Archa
 * @dev Simulates Lendle lending protocol on Mantle
 */
contract LendleVault is BaseVault {
    constructor(address _asset) BaseVault(_asset, "Lendle", 850) {} // 8.5% APY
}
