// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IYieldStrategy
 * @notice Interface for yield strategy contracts that AI Optimizer will use
 */
interface IYieldStrategy {
    /// @notice Deposit tokens into yield strategy
    function deposit(uint256 amount) external returns (uint256 shares);

    /// @notice Withdraw tokens from yield strategy
    function withdraw(uint256 shares) external returns (uint256 amount);

    /// @notice Get current APY of this strategy (in basis points, 10000 = 100%)
    function getCurrentAPY() external view returns (uint256);

    /// @notice Get total value locked in this strategy
    function getTotalValue() external view returns (uint256);

    /// @notice Get the underlying token address
    function underlyingToken() external view returns (address);
}
