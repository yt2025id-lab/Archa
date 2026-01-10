# USDC Faucet Guide - Archa Testnet

## Overview
Archa provides a built-in USDC faucet on Mantle Sepolia Testnet for testing purposes. Users and reviewers can claim free USDC tokens directly from the app to test arisan pools.

## Contract Addresses (Mantle Sepolia Testnet)

```
MockUSDC Token:       0x3e647B4E693B73bBa709cCF26E557698BE603a32
Arisan Factory:       0x41AB8122110588682358F9B23A01761C2064F1d0
AI Yield Strategy:    0x9A951AAbE94134Cc4df4eAACD6117d94c8e4A2ea
```

## How to Get Test USDC

### Step 1: Get Mantle Sepolia MNT (for gas fees)
1. Visit: https://faucet.sepolia.mantle.xyz
2. Connect your wallet
3. Request MNT testnet tokens
4. Wait for confirmation (~30 seconds)

### Step 2: Connect Wallet to Archa
1. Open the Archa app
2. Click "Connect Wallet"
3. Select MetaMask or WalletConnect
4. Approve connection

### Step 3: Claim USDC from Faucet
The faucet banner will automatically appear on the pools page when you're connected to Mantle Sepolia Testnet.

1. Navigate to `/pools` page
2. You'll see a banner: "Need Test USDC? Claim 1000 free USDC for testing"
3. Click **"Claim USDC"** button
4. Approve the transaction in your wallet
5. Wait for confirmation (~5-10 seconds)
6. ✅ Success! 1000 USDC added to your wallet

## Faucet Features

### Claim Amount
- **1000 USDC** per claim
- Sufficient to join multiple test pools

### Cooldown Period
- **24 hours** between claims
- Prevents spam and ensures fair distribution
- Real-time countdown displayed on banner

### User Interface States

#### 1. **Can Claim** (Bright Banner)
```
Need Test USDC?
Claim 1000 free USDC for testing Archa pools
[Claim USDC Button]
```

#### 2. **Claiming** (Loading State)
```
[Spinner Icon] Claiming...
```

#### 3. **Success** (Green Banner)
```
✅ USDC Claimed Successfully!
1000 USDC has been added to your wallet
```

#### 4. **Cooldown** (Gray Banner)
```
⏱ Faucet on Cooldown
Next claim available in 23h 45m
```

## Smart Contract Functions

### claimFaucet()
```solidity
function claimFaucet() external
```
- Mints 1000 USDC (6 decimals) to caller
- Requires 24-hour cooldown between claims
- Emits `Claimed(address indexed claimer, uint256 amount)` event

### canClaim(address)
```solidity
function canClaim(address account) external view returns (bool)
```
- Check if address can claim
- Returns `true` if cooldown period has passed

### timeUntilNextClaim(address)
```solidity
function timeUntilNextClaim(address account) external view returns (uint256)
```
- Returns seconds until next claim is available
- Returns `0` if can claim now

## Direct Contract Interaction

If you prefer to interact directly with the contract:

### Using Etherscan/Explorer
1. Visit: https://explorer.sepolia.mantle.xyz/address/0x3e647B4E693B73bBa709cCF26E557698BE603a32
2. Go to "Write Contract" tab
3. Connect wallet
4. Call `claimFaucet()` function
5. Confirm transaction

### Using Web3/Ethers.js
```typescript
const mockUSDC = new ethers.Contract(
  "0x3e647B4E693B73bBa709cCF26E557698BE603a32",
  ["function claimFaucet()"],
  signer
);

await mockUSDC.claimFaucet();
```

## Troubleshooting

### Banner Not Showing?
- ✅ Make sure you're connected to **Mantle Sepolia Testnet** (Chain ID: 5003)
- ✅ Wallet must be connected
- ✅ Check if you're on `/pools` or `/pools/[address]` page

### "Faucet: cooldown period not passed" Error
- ⏱ You must wait 24 hours between claims
- Check the countdown timer on the banner
- Time remaining is displayed in real-time

### Transaction Failed?
- Ensure you have enough MNT for gas fees
- Try increasing gas limit manually
- Check Mantle Sepolia RPC is not congested

### Can't See USDC in Wallet?
Add the USDC token manually:
- **Contract Address**: `0x3e647B4E693B73bBa709cCF26E557698BE603a32`
- **Symbol**: USDC
- **Decimals**: 6

## For Reviewers & Judges

This faucet system allows instant testing without:
- ❌ Requesting tokens from team
- ❌ Bridging from mainnet
- ❌ Finding external faucets
- ❌ Waiting for approvals

Simply:
1. Get MNT from Mantle faucet
2. Connect wallet to Archa
3. Click "Claim USDC"
4. Start testing pools immediately!

## Security Notes

⚠️ **Testnet Only**: This faucet is ONLY available on Mantle Sepolia Testnet. On mainnet, users must supply their own USDC.

🔒 **No Privileged Access**: Anyone can claim - no admin approval needed

🚫 **Anti-Spam**: 24-hour cooldown prevents abuse

---

**Need Help?**
- GitHub Issues: https://github.com/yt2025id-lab/Archa/issues
- Contract Explorer: https://explorer.sepolia.mantle.xyz/address/0x3e647B4E693B73bBa709cCF26E557698BE603a32
