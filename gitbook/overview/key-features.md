# 🔑 Key Features

## 1. Collateral System

### What is Collateral?
Collateral is a security deposit that every participant must pay before joining an arisan. Collateral serves as a "commitment guarantee" - if a participant is not consistent, collateral will be seized.

### Calculation Formula
```
Collateral = 125% × Monthly Deposit × (Number of Participants - 1)
```

**Example:**
- Pool with 10 participants
- Monthly deposit: 50 USDC
- Collateral = 1.25 × 50 × 9 = **562.5 USDC**

### Why 125%?
The 125% multiplier ensures there's no economic benefit from running away after winning first. With collateral larger than the first pot, participants who flee will LOSE - not profit.

### When is Collateral Returned?
- **Arisan completed:** Collateral + yield returned in full
- **Participant runs away:** Collateral seized to cover obligations

---

## 2. AI Yield Optimizer

### How Does It Work?
AI analyzes all DeFi protocols on Mantle Network and automatically allocates funds to protocols with the best risk-adjusted yields.

### Protocols Analyzed
- Lendle (Lending)
- Merchant Moe (DEX/AMM)
- Agni Finance (Lending)
- Minterest (Lending)
- KTX Finance (Perpetuals)

### Strategy
```
┌─────────────────────────────────────────┐
│ AI YIELD OPTIMIZER                      │
├─────────────────────────────────────────┤
│                                         │
│ Input: Pool Funds + Collateral          │
│                                         │
│ Analysis:                               │
│ ├─ APY comparison                       │
│ ├─ TVL & liquidity depth                │
│ ├─ Historical volatility                │
│ ├─ Smart contract risk                  │
│ └─ Whale activity detection             │
│                                         │
│ Output: Optimal allocation              │
│                                         │
└─────────────────────────────────────────┘
```

### Risk Profiles
| Profile | Description | Expected APY |
|---------|-------------|--------------|
| Conservative | Stablecoin lending only | 5-8% |
| Moderate | Mixed strategies | 8-12% |
| Aggressive | Higher risk protocols | 12-20% |

---

## 3. Double Yield

### Two Sources of Passive Income
Archa participants earn yield from two places:

#### 1. Pool Yield
Funds collected each month don't sit idle. AI invests into DeFi and yield is distributed to the winner each month.

#### 2. Collateral Yield
Locked collateral is also invested. Collateral yield is returned together with collateral at the end of arisan.

### Profit Simulation
```
Pool: 10 people × 50 USDC/month × 10 months

Total Pool: 5,000 USDC
Collateral per person: 562.5 USDC (125% × 50 × 9)
Total Collateral: 5,625 USDC

Assuming 10% APY:
- Pool yield (10 months): ~420 USDC
- Collateral yield (10 months): ~470 USDC
- Total extra yield: ~890 USDC
- Per person extra: ~89 USDC

Without Archa: 0 USDC yield
With Archa: +89 USDC per person
```

---

## 4. Fair Winner Selection

### Transparent Randomness
The winner each month is determined by smart contract using verifiable random function (VRF). No one can manipulate who gets their turn.

### Mechanism
1. Each participant gets a "sequence number" when joining
2. At the end of each cycle, VRF generates a random number
3. Random number determines winner from eligible participants
4. Winner receives pot + that month's yield
5. Winner marked as "already received turn"

### Fairness Guarantee
- All participants will get their turn exactly once
- Order cannot be predicted or manipulated
- Random results can be verified on-chain

---

## 5. Anti Run-away System

### Scenario: Participant Doesn't Pay
```
Participant X doesn't pay month 5 deposit?

1. 3-day grace period
2. If no payment: Collateral is slashed
3. Deposit taken from collateral
4. Arisan continues normally
5. Other participants not affected
```

### Scenario: Participant Runs After Winning
```
Participant Y wins month 2, then runs away?

1. Month 3: Doesn't pay deposit
2. Collateral slashed to cover deposit
3. Month 4 onwards: Same
4. If collateral depleted: Participant auto-removed
5. Other participants not affected
```

### Why This System is Effective
- **Economic incentive:** Running away = losing collateral + yield
- **Automatic enforcement:** Smart contract executes without compromise
- **No human intervention:** No "forgiveness" possible

---

## 6. Transparency

### On-Chain Data
All arisan data is recorded on blockchain:
- Who the participants are
- How much collateral each has
- Deposit history
- Who has already received their turn
- Yield generated
- AI allocation to protocols

### Verifiable
Anyone can verify:
- Pool balance
- Collateral status
- Yield accrual
- Winner history
- Smart contract logic

---

## Comparison Table

| Feature | Archa | Traditional Arisan | Other DeFi |
|---------|-------|-------------------|------------|
| Rotating Savings | ✅ | ✅ | ❌ |
| Anti Run-away | ✅ Collateral | ❌ Trust only | N/A |
| Yield | ✅ AI Optimized | ❌ 0% | ✅ Manual |
| Transparency | ✅ On-chain | ❌ Manual | ✅ On-chain |
| Cultural Fit | ✅ Indonesian | ✅ Indonesian | ❌ Foreign |
| Low Fees | ✅ Mantle | N/A | ❌ ETH gas |
| Easy to Use | ✅ | ✅ | ❌ Complex |
