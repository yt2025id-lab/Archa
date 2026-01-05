// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IVault
 * @notice Interface for DeFi protocol vaults
 */
interface IVault {
    function deposit(uint256 amount) external returns (uint256 shares);
    function withdraw(uint256 shares) external returns (uint256 amount);
    function totalAssets() external view returns (uint256);
    function totalShares() external view returns (uint256);
    function getAPY() external view returns (uint256);
    function getProtocolName() external view returns (string memory);
}
