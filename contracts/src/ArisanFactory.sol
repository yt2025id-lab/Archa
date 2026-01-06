// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ArisanPool.sol";

/**
 * @title ArisanFactory
 * @notice Factory contract to create and manage Arisan pools
 * @dev Built for Mantle Network - Mantle Global Hackathon 2025
 */
contract ArisanFactory {
    // ============ State Variables ============

    address public immutable usdc;
    address public owner;
    address public aiOptimizer;

    address[] public allPools;
    mapping(address => address[]) public userPools;

    // Pool templates
    struct PoolTemplate {
        string name;
        uint256 depositAmount;
        uint256 maxParticipants;
        uint256 cycleDuration;
        bool isActive;
    }

    PoolTemplate[] public poolTemplates;

    // ============ Events ============

    event PoolCreated(
        address indexed pool,
        address indexed creator,
        uint256 depositAmount,
        uint256 maxParticipants
    );
    event TemplateAdded(uint256 indexed templateId, string name, uint256 depositAmount);
    event AIOptimizerUpdated(address indexed oldOptimizer, address indexed newOptimizer);

    // ============ Modifiers ============

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    // ============ Constructor ============

    constructor(address _usdc) {
        require(_usdc != address(0), "Invalid USDC address");
        usdc = _usdc;
        owner = msg.sender;
        aiOptimizer = msg.sender;

        // Initialize default pool templates
        _initializeTemplates();
    }

    // ============ Core Functions ============

    /**
     * @notice Create a new Arisan pool from template
     */
    function createPoolFromTemplate(uint256 templateId) external returns (address) {
        require(templateId < poolTemplates.length, "Invalid template");
        require(poolTemplates[templateId].isActive, "Template not active");

        PoolTemplate memory template = poolTemplates[templateId];

        return _createPool(
            template.depositAmount,
            template.maxParticipants,
            template.cycleDuration
        );
    }

    /**
     * @notice Create a custom Arisan pool
     */
    function createCustomPool(
        uint256 depositAmount,
        uint256 maxParticipants,
        uint256 cycleDuration
    ) external returns (address) {
        require(depositAmount > 0, "Invalid deposit amount");
        require(maxParticipants >= 2 && maxParticipants <= 50, "Participants must be 2-50");
        require(cycleDuration >= 1 days, "Cycle must be at least 1 day");

        return _createPool(depositAmount, maxParticipants, cycleDuration);
    }

    // ============ Admin Functions ============

    /**
     * @notice Add new pool template
     */
    function addTemplate(
        string memory name,
        uint256 depositAmount,
        uint256 maxParticipants,
        uint256 cycleDuration
    ) external onlyOwner {
        poolTemplates.push(PoolTemplate({
            name: name,
            depositAmount: depositAmount,
            maxParticipants: maxParticipants,
            cycleDuration: cycleDuration,
            isActive: true
        }));

        emit TemplateAdded(poolTemplates.length - 1, name, depositAmount);
    }

    /**
     * @notice Toggle template active status
     */
    function setTemplateActive(uint256 templateId, bool isActive) external onlyOwner {
        require(templateId < poolTemplates.length, "Invalid template");
        poolTemplates[templateId].isActive = isActive;
    }

    /**
     * @notice Update AI optimizer address
     */
    function setAIOptimizer(address _aiOptimizer) external onlyOwner {
        require(_aiOptimizer != address(0), "Invalid address");
        address oldOptimizer = aiOptimizer;
        aiOptimizer = _aiOptimizer;
        emit AIOptimizerUpdated(oldOptimizer, _aiOptimizer);
    }

    // ============ View Functions ============

    function getAllPools() external view returns (address[] memory) {
        return allPools;
    }

    function getUserPools(address user) external view returns (address[] memory) {
        return userPools[user];
    }

    function getPoolCount() external view returns (uint256) {
        return allPools.length;
    }

    function getTemplateCount() external view returns (uint256) {
        return poolTemplates.length;
    }

    function getTemplate(uint256 templateId) external view returns (
        string memory name,
        uint256 depositAmount,
        uint256 maxParticipants,
        uint256 cycleDuration,
        bool isActive
    ) {
        require(templateId < poolTemplates.length, "Invalid template");
        PoolTemplate memory t = poolTemplates[templateId];
        return (t.name, t.depositAmount, t.maxParticipants, t.cycleDuration, t.isActive);
    }

    // ============ Internal Functions ============

    function _createPool(
        uint256 depositAmount,
        uint256 maxParticipants,
        uint256 cycleDuration
    ) internal returns (address) {
        ArisanPool pool = new ArisanPool(
            usdc,
            depositAmount,
            maxParticipants,
            cycleDuration,
            125 // 125% collateral multiplier - ensures no profit from running away
        );

        // Set AI optimizer
        pool.setAIOptimizer(aiOptimizer);

        // Transfer ownership to caller
        pool.transferOwnership(msg.sender);

        address poolAddress = address(pool);
        allPools.push(poolAddress);
        userPools[msg.sender].push(poolAddress);

        emit PoolCreated(poolAddress, msg.sender, depositAmount, maxParticipants);

        return poolAddress;
    }

    function _initializeTemplates() internal {
        // Template 1: Small Pool - 10 USDC, 5 people
        poolTemplates.push(PoolTemplate({
            name: "Small Pool",
            depositAmount: 10 * 1e6, // 10 USDC (6 decimals)
            maxParticipants: 5,
            cycleDuration: 30 days,
            isActive: true
        }));

        // Template 2: Medium Pool - 50 USDC, 10 people
        poolTemplates.push(PoolTemplate({
            name: "Medium Pool",
            depositAmount: 50 * 1e6, // 50 USDC
            maxParticipants: 10,
            cycleDuration: 30 days,
            isActive: true
        }));

        // Template 3: Large Pool - 100 USDC, 20 people
        poolTemplates.push(PoolTemplate({
            name: "Large Pool",
            depositAmount: 100 * 1e6, // 100 USDC
            maxParticipants: 20,
            cycleDuration: 30 days,
            isActive: true
        }));
    }
}
