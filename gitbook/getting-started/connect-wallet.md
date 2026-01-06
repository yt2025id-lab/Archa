# 👛 Connect Wallet

Complete guide to connecting your wallet to Archa.

## Supported Wallets

Archa supports the following wallets:

| Wallet | Platform | Recommended |
|--------|----------|-------------|
| MetaMask | Browser, Mobile | ✅ Yes |
| WalletConnect | Mobile | ✅ Yes |
| Coinbase Wallet | Browser, Mobile | ✅ Yes |
| Rainbow | Mobile | ✅ Yes |
| Trust Wallet | Mobile | ✅ Yes |

## MetaMask Setup

### 1. Install MetaMask

If you don't have MetaMask:
1. Visit [metamask.io](https://metamask.io)
2. Download the extension for your browser
3. Follow the setup wizard to create a new wallet
4. **IMPORTANT:** Store your seed phrase securely!

### 2. Add Mantle Network

Archa will automatically add Mantle Network to your MetaMask. If you need to add it manually:

**Mantle Mainnet:**
```
Network Name: Mantle
RPC URL: https://rpc.mantle.xyz
Chain ID: 5000
Currency Symbol: MNT
Block Explorer: https://explorer.mantle.xyz
```

**Mantle Sepolia (Testnet):**
```
Network Name: Mantle Sepolia
RPC URL: https://rpc.sepolia.mantle.xyz
Chain ID: 5003
Currency Symbol: MNT
Block Explorer: https://explorer.sepolia.mantle.xyz
```

### 3. Connect to Archa

1. Visit [arisanonchain.vercel.app](https://arisanonchain.vercel.app)
2. Click **"Connect Wallet"**
3. Select **"MetaMask"**
4. MetaMask popup will appear
5. Select the account you want to use
6. Click **"Connect"**
7. If prompted to switch network, click **"Switch Network"**

<figure><img src="../.gitbook/assets/metamask-connect.png" alt=""><figcaption><p>MetaMask Connection</p></figcaption></figure>

## WalletConnect Setup

### 1. Open Archa

1. Visit [arisanonchain.vercel.app](https://arisanonchain.vercel.app)
2. Click **"Connect Wallet"**
3. Select **"WalletConnect"**

### 2. Scan QR Code

1. QR code will appear
2. Open your wallet app on your phone
3. Find the "WalletConnect" or "Scan" feature
4. Scan the QR code
5. Approve connection in the wallet app

### 3. Confirm Connection

1. Wallet app will ask for confirmation
2. Review permissions
3. Click **"Approve"** or **"Connect"**
4. You're now connected to Archa

## Troubleshooting

### Wallet not detected
- Make sure MetaMask extension is installed
- Refresh the browser page
- Try disabling ad blocker

### Wrong network
- Make sure wallet is on Mantle Network
- Click the network icon in MetaMask
- Select "Mantle" or add manually

### Transaction failed
- Make sure you have enough MNT for gas
- Try increasing gas limit
- Wait a moment and try again

### Connection lost
- Refresh the page
- Re-connect wallet
- Clear browser cache if problem persists

## Security Tips

{% hint style="danger" %}
**NEVER:**
- Share your seed phrase / private key
- Approve unlimited spending to untrusted contracts
- Connect wallet to suspicious sites
{% endhint %}

{% hint style="success" %}
**ALWAYS:**
- Verify the site URL (arisanonchain.vercel.app)
- Review transactions before approving
- Disconnect wallet after you're done using it
{% endhint %}

## Disconnect Wallet

To disconnect your wallet:

1. Click your address in the top right corner
2. Click **"Disconnect"**
3. Your wallet is now disconnected

Or from MetaMask:
1. Click the MetaMask icon
2. Click the three dots in the top right corner
3. Select **"Connected sites"**
4. Disconnect Archa

## Next Steps

After connecting your wallet:
- [💰 Get USDC on Mantle](get-usdc.md)
- [📝 Join your first pool](../guides/join-pool.md)
