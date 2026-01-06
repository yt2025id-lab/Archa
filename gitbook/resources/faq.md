# ❓ FAQ

Frequently asked questions about Archa.

## General

### What is Archa?

Archa is a decentralized arisan platform on the Mantle blockchain. We bring Indonesia's traditional communal finance (arisan) into the modern era with:
- Smart contracts for security and transparency
- Collateral system to prevent participants from running away
- AI Yield Optimizer to generate additional yield
- VRF for fair winner selection

### How is it different from traditional arisan?

| Aspect | Traditional Arisan | Archa |
|--------|-------------------|-------|
| Trust | Depends on organizer | Trustless (smart contract) |
| Transparency | Closed | Fully on-chain |
| Run-away risk | High | Minimal (collateral) |
| Yield | None | Yes (AI optimized) |
| Winner selection | Manual/biased | Random (VRF) |

### Is Archa safe?

Yes, Archa is designed with security as a priority:
- Open source smart contracts
- Collateral protects against run-away participants
- Non-custodial (you control your own wallet)
- VRF guarantees fairness
- Audit planned before mainnet

## Joining & Pools

### How do I start using Archa?

1. Prepare a wallet (MetaMask, Rainbow, etc.)
2. Add Mantle network to your wallet
3. Get USDC on Mantle
4. Connect wallet to Archa
5. Choose a pool and click "Join"

### What's the minimum to join?

Depends on the pool you choose. Each pool has different deposit amounts:
- Small pools: 10-50 USDC
- Medium pools: 50-200 USDC
- Large pools: 200-1000 USDC

What you need to prepare: **First deposit + Collateral**

### What is collateral?

Collateral is a security deposit locked when you join a pool. It prevents participants from running away after winning.

**Formula:**
```
Collateral = 125% × Deposit × (Total Cycles - 1)

Example: Pool 50 USDC × 10 people
Collateral = 1.25 × 50 × 9 = 562.5 USDC
```

Collateral is returned in full + yield when pool completes.

### Can I join multiple pools?

Yes! You can join as many pools as you have USDC for.

## Deposits & Payments

### When do I need to deposit?

Every cycle (usually monthly), you must deposit. There's a deposit window of ~25 days.

### What if I forget to deposit?

If you forget to deposit:
1. 3-day grace period
2. If still no deposit, collateral auto-deducts
3. If collateral depletes, you get slashed

**Tip:** Enable notifications so you don't forget!

### Can I deposit more than required?

No. Deposit must match the pool's required amount exactly, no more, no less.

## Winners & Claims

### How are winners selected?

Winners are selected using VRF (Verifiable Random Function):
1. All eligible participants are identified
2. Random number generated on-chain
3. Random number used to select winner
4. Results can be verified by anyone

### Does everyone get to win?

Yes! Every participant wins exactly once during the pool's lifetime.

```
10 participants = 10 cycles = Everyone gets a turn to win
```

### When do I receive the pot?

The pot is automatically transferred to your wallet when you win. No manual claim needed.

### How much do I receive when I win?

```
Pot = (Deposit × Participants) + Yield

Example: 50 USDC × 10 people + 40 USDC yield = 540 USDC
```

### After winning, am I done?

No! After winning, you must continue depositing until the pool completes. This ensures fairness for other participants.

## Collateral & Yield

### Does collateral generate yield?

Yes! Locked collateral is also deployed to DeFi protocols by the AI Yield Optimizer. You earn yield from this collateral.

### When is collateral returned?

Collateral is returned when the pool is COMPLETED (all cycles finished) + all your deposits are fulfilled.

### What if I can't deposit?

If you don't deposit:
1. Collateral will cover your deposit
2. If collateral depletes, remainder is slashed
3. You may be excluded from the pool

**Solution:** Always keep a USDC buffer or sufficient collateral.

## AI Yield Optimizer

### How does AI generate yield?

AI Yield Optimizer:
1. Analyzes 500+ DeFi protocols
2. Predicts APY for the next 7 days
3. Allocates funds to the best protocols
4. Auto-rebalances when conditions change

### Which protocols are used?

Currently on Mantle:
- Lendle (lending)
- Merchant Moe (DEX)
- Agni Finance (DEX)

More will be added as development continues.

### Is yield guaranteed?

Yield is not guaranteed as it depends on market conditions. However, AI optimizes by:
- Diversifying across multiple protocols
- Risk scoring for each protocol
- Auto-rebalancing when anomalies occur

## Security

### Is my money safe?

Your funds are secured by:
- Audited smart contracts (planned)
- Non-custodial (you control wallet)
- Collateral system prevents runaways
- Open source code

### What if there's a bug?

Archa has:
- Pausable mechanism for emergencies
- Bug bounty program (planned)
- Security response team

### Can I lose money?

Potential risks:
- Smart contract bugs (mitigated by audits)
- DeFi protocol risk (mitigated by diversification)
- You don't deposit → collateral slashed

Archa does NOT have risks of:
- Admin running away (non-custodial)
- Participants running away (collateral system)
- Unfair winners (VRF)

## Technical

### Which network is used?

Archa runs on **Mantle Network**, an Ethereum L2 with:
- Very low gas fees
- Fast transactions
- EVM compatible

### Which tokens are used?

- **USDC** for deposits and pot
- **MNT** for gas fees

### How do I get MNT?

1. Bridge from Ethereum
2. Buy on exchanges (Bybit, KuCoin)
3. Faucet (testnet only)

### Which wallets are supported?

- MetaMask
- Rainbow
- WalletConnect compatible wallets
- Coinbase Wallet
- And others

## Other

### Are there platform fees?

Currently (hackathon phase): **Free**

In the future, there may be a small fee for:
- Sustainability
- AI infrastructure
- Development

### What if a pool doesn't fill up?

Pool remains in WAITING status. Participants who joined can withdraw if pool hasn't started.

### Can I leave an active pool?

No. After pool is active, you cannot leave. This protects other participants.

### Is there a mobile app?

Not yet. Currently Archa can be accessed via mobile browser. Mobile app is planned for the future.

### How do I give feedback?

- Twitter: @archaonchain
- Discord: discord.gg/archa
- Telegram: t.me/archaonchain
- GitHub Issues

### Where can I learn more?

- This documentation (GitBook)
- Blog (coming soon)
- YouTube tutorials (coming soon)
- Community channels
