// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BaseVault.sol";

/**
 * @title MinterestVault
 * @notice Mock Minterest protocol vault for Archa
 * @dev Simulates Minterest lending protocol on Mantle
 */
contract MinterestVault is BaseVault {
    constructor(address _asset) BaseVault(_asset, "Minterest", 720) {} // 7.2% APY
}
