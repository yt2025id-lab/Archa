// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BaseVault.sol";

/**
 * @title KTXVault
 * @notice Mock KTX Finance protocol vault for Archa
 * @dev Simulates KTX perpetual DEX on Mantle
 */
contract KTXVault is BaseVault {
    constructor(address _asset) BaseVault(_asset, "KTX Finance", 1500) {} // 15% APY
}
