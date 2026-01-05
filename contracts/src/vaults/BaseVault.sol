// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IERC20.sol";
import "./IVault.sol";

/**
 * @title BaseVault
 * @notice Base vault contract for DeFi protocol simulation
 * @dev Mock vault for hackathon demo - simulates yield generation
 */
contract BaseVault is IVault {
    IERC20 public immutable asset;
    string public protocolName;
    uint256 public apy; // In basis points (500 = 5%)

    uint256 public totalAssetAmount;
    uint256 public totalShareAmount;

    mapping(address => uint256) public shares;

    address public owner;

    event Deposit(address indexed user, uint256 amount, uint256 shares);
    event Withdraw(address indexed user, uint256 shares, uint256 amount);
    event APYUpdated(uint256 oldAPY, uint256 newAPY);

    constructor(
        address _asset,
        string memory _protocolName,
        uint256 _apy
    ) {
        asset = IERC20(_asset);
        protocolName = _protocolName;
        apy = _apy;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    function deposit(uint256 amount) external override returns (uint256 newShares) {
        require(amount > 0, "Amount must be > 0");

        // Transfer tokens from user
        require(asset.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // Calculate shares
        if (totalShareAmount == 0) {
            newShares = amount;
        } else {
            newShares = (amount * totalShareAmount) / totalAssetAmount;
        }

        // Update state
        shares[msg.sender] += newShares;
        totalShareAmount += newShares;
        totalAssetAmount += amount;

        emit Deposit(msg.sender, amount, newShares);
    }

    function withdraw(uint256 shareAmount) external override returns (uint256 amount) {
        require(shareAmount > 0, "Shares must be > 0");
        require(shares[msg.sender] >= shareAmount, "Insufficient shares");

        // Calculate amount
        amount = (shareAmount * totalAssetAmount) / totalShareAmount;

        // Update state
        shares[msg.sender] -= shareAmount;
        totalShareAmount -= shareAmount;
        totalAssetAmount -= amount;

        // Transfer tokens to user
        require(asset.transfer(msg.sender, amount), "Transfer failed");

        emit Withdraw(msg.sender, shareAmount, amount);
    }

    function totalAssets() external view override returns (uint256) {
        return totalAssetAmount;
    }

    function totalShares() external view override returns (uint256) {
        return totalShareAmount;
    }

    function getAPY() external view override returns (uint256) {
        return apy;
    }

    function getProtocolName() external view override returns (string memory) {
        return protocolName;
    }

    // Admin functions
    function setAPY(uint256 newAPY) external onlyOwner {
        uint256 oldAPY = apy;
        apy = newAPY;
        emit APYUpdated(oldAPY, newAPY);
    }

    function simulateYield() external onlyOwner {
        // Simulate yield by increasing total assets
        // This is just for demo purposes
        uint256 yieldAmount = (totalAssetAmount * apy) / 10000 / 12; // Monthly yield
        totalAssetAmount += yieldAmount;
    }
}
