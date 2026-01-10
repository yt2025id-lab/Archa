// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MockUSDC
 * @notice Mock USDC token for testing purposes with faucet functionality
 * @dev 6 decimals like real USDC
 */
contract MockUSDC {
    string public name = "USD Coin";
    string public symbol = "USDC";
    uint8 public decimals = 6;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Faucet settings
    uint256 public constant FAUCET_AMOUNT = 1000 * 10**6; // 1000 USDC
    uint256 public constant COOLDOWN_TIME = 24 hours;
    mapping(address => uint256) public lastClaim;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Claimed(address indexed claimer, uint256 amount);

    constructor() {
        // Mint initial supply to deployer
        _mint(msg.sender, 1_000_000 * 10**decimals); // 1M USDC
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        return _transfer(msg.sender, to, amount);
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        if (allowed != type(uint256).max) {
            require(allowed >= amount, "ERC20: insufficient allowance");
            allowance[from][msg.sender] = allowed - amount;
        }
        return _transfer(from, to, amount);
    }

    function _transfer(address from, address to, uint256 amount) internal returns (bool) {
        require(from != address(0), "ERC20: transfer from zero address");
        require(to != address(0), "ERC20: transfer to zero address");
        require(balanceOf[from] >= amount, "ERC20: insufficient balance");

        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }

    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "ERC20: mint to zero address");
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    // Test helper functions
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(balanceOf[from] >= amount, "ERC20: burn amount exceeds balance");
        balanceOf[from] -= amount;
        totalSupply -= amount;
        emit Transfer(from, address(0), amount);
    }

    // Faucet function - claim free USDC for testing
    function claimFaucet() external {
        require(
            block.timestamp >= lastClaim[msg.sender] + COOLDOWN_TIME,
            "Faucet: cooldown period not passed"
        );

        lastClaim[msg.sender] = block.timestamp;
        _mint(msg.sender, FAUCET_AMOUNT);
        emit Claimed(msg.sender, FAUCET_AMOUNT);
    }

    // Check if address can claim
    function canClaim(address account) external view returns (bool) {
        return block.timestamp >= lastClaim[account] + COOLDOWN_TIME;
    }

    // Time until next claim is available
    function timeUntilNextClaim(address account) external view returns (uint256) {
        uint256 nextClaimTime = lastClaim[account] + COOLDOWN_TIME;
        if (block.timestamp >= nextClaimTime) {
            return 0;
        }
        return nextClaimTime - block.timestamp;
    }
}
