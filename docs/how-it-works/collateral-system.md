# Collateral System

Understanding how Archa's collateral system protects all participants.

## Why Collateral?

Traditional arisan relies on social trust. If someone receives their pot early and stops paying, others suffer. Archa solves this with an economic guarantee through collateral.

## How It Works

### When Joining

1. User selects a pool to join
2. User must deposit collateral (typically 2x monthly deposit)
3. Collateral is locked in the smart contract
4. User is now a participant

### During Arisan

- Collateral remains locked throughout the arisan
- The AI invests collateral to generate yield
- Yield accumulates on your collateral

### At Completion

If you complete all monthly deposits:
- Full collateral is returned
- Plus all yield generated on collateral
- Plus your share of pool yield

### If You Default

If you miss payments or leave early:
- Collateral is forfeited
- Distributed to remaining participants as compensation
- You lose all accumulated yield

## Collateral Amounts

Collateral = 125% × Monthly Deposit × (Participants - 1)

| Pool Type | Monthly Deposit | Participants | Collateral Required |
|-----------|-----------------|--------------|---------------------|
| Starter | 10 USDC | 5 | 50 USDC |
| Standard | 50 USDC | 10 | 562.5 USDC |
| Premium | 100 USDC | 20 | 2,375 USDC |

{% hint style="info" %}
The 125% multiplier ensures there's no economic incentive to "run away" after receiving your pot early. Even if you win the first round and disappear, you'll lose more in collateral than you gained.
{% endhint %}

## Economic Incentives

The collateral system creates strong incentives:

### For Participants
- **Stay committed** - Leaving means losing collateral + yield
- **Complete on time** - Get everything back plus bonus

### For the Pool
- **Protection** - Defaults are compensated automatically
- **Trust-free** - No need to know other participants

## Collateral Yield

Your collateral isn't idle - it generates yield!

Example calculation:
- Collateral: 100 USDC
- Duration: 10 months
- Average APY: 8%
- Yield: ~6.5 USDC

This yield is returned with your collateral at the end.

## Smart Contract Security

The collateral is held by an audited smart contract:
- No human can access it directly
- Only released according to programmed rules
- Fully transparent on blockchain
- Cannot be altered or manipulated

## FAQ

**Q: What if I have an emergency and need my collateral?**
A: Unfortunately, collateral cannot be withdrawn early. This is by design to protect other participants.

**Q: Is my collateral safe?**
A: Yes, it's secured by audited smart contracts. Only the programmed rules can release it.

**Q: Do I lose collateral if I'm late on a payment?**
A: There's typically a grace period, but repeated lateness may result in forfeiture. Check the specific pool rules.
