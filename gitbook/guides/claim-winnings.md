# 🏆 Claim Winnings

Complete guide to receiving the arisan pot in Archa.

## How is the Winner Determined?

Each cycle, one winner is randomly selected using VRF (Verifiable Random Function).

```
Selection Process:
├─ Cycle ends
├─ Smart contract identifies eligible participants
├─ VRF generates random number
├─ Random number → winner index
├─ Winner receives pot
└─ Winner marked as "hasReceivedPot"
```

### Who is Eligible?

```
Eligible Requirements:
├─ ✅ Active participant
├─ ✅ Hasn't received pot yet
├─ ✅ Not defaulted (deposit fulfilled)
└─ ✅ This cycle's deposit is in
```

## Receiving Winnings

### Automatic Distribution

Good news! In Archa, winnings are **automatically transferred** to your wallet.

```
Winner Notification:
├─ Cycle 5 Winner Selection
├─ 🎉 Congratulations! You WON!
├─ Pot Amount: 542 USDC
├─ Transaction: 0x...
└─ Funds sent to: 0xYourWallet...
```

### What Do You Receive?

```
Pot Breakdown:
├─ Base Deposits: 500 USDC (10 × 50)
├─ Cycle Yield: +42 USDC (from AI optimizer)
└─ TOTAL POT: 542 USDC

✅ Directly sent to your wallet!
```

## Lifecycle After Winning

### Status Changes

```
Before Winning:
├─ hasReceivedPot: false
├─ Eligible for selection: YES
└─ Must deposit: YES

After Winning:
├─ hasReceivedPot: true
├─ Eligible for selection: NO (excluded)
└─ Must deposit: YES (until pool completes)
```

### Obligations After Winning

⚠️ **Important:** Winning does NOT mean you're done!

```
Post-Win Obligations:
├─ Continue depositing every cycle
├─ Collateral still locked
├─ Until pool COMPLETED
└─ Failure = slashing from collateral
```

### Example Timeline

```
Pool 10 Participants (10 Cycles):

You win Cycle 3:
├─ Cycle 1: Deposit ✅
├─ Cycle 2: Deposit ✅
├─ Cycle 3: Deposit ✅ → WON! 🎉 (+542 USDC)
├─ Cycle 4: Deposit ✅ (required)
├─ Cycle 5: Deposit ✅ (required)
├─ ...
├─ Cycle 10: Deposit ✅ (required)
└─ Pool Completed → Collateral returned!
```

## Collateral Return

### When is Collateral Returned?

```
Collateral Return Conditions:
├─ Pool status = COMPLETED
├─ All cycles finished
├─ All your deposits fulfilled
└─ Automatic return to wallet
```

### Final Settlement

At pool end:

```
Final Settlement:
├─ Original Collateral: 562.5 USDC
├─ Collateral Yield: +38 USDC
├─ Slashing (if any): -0 USDC
└─ YOU RECEIVE: 600.5 USDC

Total Earnings Summary:
├─ Pot Won (Cycle 3): 542 USDC
├─ Collateral Returned: 600.5 USDC
├─ Total Deposits Made: -500 USDC
└─ NET PROFIT: +642.5 USDC
```

## Verifying Winnings

### On-Chain Proof

All results can be verified:

1. **VRF Transaction**
   - VRF request hash
   - Random number generated
   - Verifiable on block explorer

2. **Winner Selection**
   - Eligible participants list
   - Random number applied
   - Winner address

3. **Distribution**
   - Transfer transaction
   - Amount
   - Recipient

### How to Verify

```
Steps to Verify:
1. Go to: explorer.mantle.xyz
2. Enter pool contract address
3. Find VRF fulfillment transaction
4. Check random number in event logs
5. Apply: randomNumber % eligibleCount = winnerIndex
6. Confirm winner matches
```

## Edge Cases

### Winning in Last Cycle

```
Last Cycle Scenario:
├─ Only 1 eligible participant left
├─ Random selection still runs
├─ That person wins with 100% probability
├─ Pool marked COMPLETED
└─ All collateral returned
```

### Winning but Collateral Depleted

```
Scenario: Won Cycle 3, defaulted Cycle 6

├─ Cycle 6 deposit: Missed
├─ Collateral check: Insufficient
├─ Consequence: Remaining collateral slashed
├─ Status: Still won Cycle 3 (cannot be revoked)
└─ Reputation: Marked as defaulter
```

### VRF Delay

```
If VRF takes longer than expected:
├─ Winner selection delayed
├─ All participants wait
├─ No action required from you
└─ Distribution happens when VRF completes
```

## Winning Probability

### Everyone Wins Exactly Once

```
Guarantee:
├─ 10 participants = 10 cycles
├─ 1 winner per cycle
├─ Winners excluded from future selection
└─ Result: Everyone wins exactly once
```

### Probability Each Cycle

```
Cycle Probabilities:
├─ Cycle 1 (10 eligible): 10% chance
├─ Cycle 2 (9 eligible): 11.1% chance
├─ Cycle 3 (8 eligible): 12.5% chance
├─ ...
├─ Cycle 9 (2 eligible): 50% chance
└─ Cycle 10 (1 eligible): 100% chance
```

### Early vs Late Win

| Timing | Pros | Cons |
|--------|------|------|
| **Win Early** | Get pot sooner, can reinvest | Must keep depositing until end |
| **Win Late** | Pot may be larger (more yield) | Wait longer |

**Expected value is the same** - no one is better off.

## Notifications

### Winner Announcement

```
Notification Types:
├─ 🎉 Push notification (if enabled)
├─ 📧 Email (if registered)
├─ 🔔 In-app notification
└─ 📱 Telegram bot (coming soon)
```

### Check Your Status

On dashboard:
```
My Pool Status:
├─ Pool #42
├─ Your Status: WON CYCLE 3 🏆
├─ Pot Received: 542 USDC
├─ Cycles Remaining: 7
└─ Next Deposit Due: Feb 1
```

## FAQ

### "Can winnings be revoked?"

No. Once the pot is transferred, it cannot be taken back. Even if you default afterwards.

### "Why haven't I won yet even though it's been a while?"

Selection is 100% random. If you're eligible, you WILL win in some cycle before the pool completes.

### "Can I choose when to win?"

No. Randomness guarantees fairness - no one can choose or predict.

### "What if there's a tie?"

Ties are impossible. The random number always produces 1 winner.

### "Is the pot pre-tax?"

The pot is a gross amount. Tax compliance is each participant's responsibility according to their jurisdiction.

### "What if my wallet is hacked after winning?"

Funds that have been received are your responsibility. Archa cannot recover funds that have been transferred. Always keep your wallet secure.
