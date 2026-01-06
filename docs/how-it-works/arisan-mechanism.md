# Arisan Mechanism

How the traditional arisan concept works on-chain with Archa.

## Traditional Arisan

Arisan is a centuries-old Indonesian practice of communal savings. A group gathers regularly, each member contributes a fixed amount, and one member receives the entire pot. This rotates until everyone has received once.

### Cultural Significance
- Built on community trust (gotong royong)
- Common in neighborhoods, workplaces, and families
- Combines saving, socializing, and mutual aid
- Practiced by millions of Indonesians across generations

## Archa's On-Chain Arisan

We preserve the arisan spirit while adding blockchain benefits:

### Pool Creation

1. Anyone can create a pool with parameters:
   - Monthly deposit amount
   - Maximum participants
   - Collateral requirement
   - Duration (based on participants)

2. Pool enters "Pending" status
3. Waiting for participants to join

### Joining Phase

1. Participants discover pools
2. Each deposits collateral to join
3. Pool activates when full or manually started

### Active Phase

Each period (month):
1. All participants make their deposits
2. AI invests deposits into DeFi protocols
3. One participant receives the pot + yield
4. Process repeats until all have received

### Completion

When the last member receives their pot:
1. Pool enters "Completed" status
2. All collateral is unlocked
3. Collateral yield is distributed
4. Any remaining pool yield is distributed

## Turn Selection

How winners are selected:

### Random & Fair
- Smart contract generates random selection
- Cannot be predicted or manipulated
- Each participant has equal probability

### One Turn Per Member
- Once you receive, you're marked as "received"
- Cannot receive again in same pool
- Ensures everyone gets exactly one turn

## Flow Diagram

```
[Create Pool] → [Join (Deposit Collateral)] → [Pool Active]
                                                    ↓
                                            [Monthly Deposits]
                                                    ↓
                                            [AI Invests Funds]
                                                    ↓
                                            [Random Selection]
                                                    ↓
                                            [Winner Gets Pot]
                                                    ↓
                                            [Repeat Until Done]
                                                    ↓
                                            [Pool Complete]
                                                    ↓
                                            [Return Collateral + Yield]
```

## Key Differences from Traditional

| Aspect | Traditional | Archa |
|--------|-------------|-------|
| Trust | Social/family bonds | Smart contract enforcement |
| Record | Manual/verbal | Blockchain permanent |
| Yield | None (idle money) | AI-optimized DeFi returns |
| Scale | Local community | Global participants |
| Transparency | Depends on organizer | 100% verifiable |
| Default Protection | Social pressure | Collateral system |

## Pool Types

Collateral = 125% × Deposit × (Participants - 1)

### Starter Pool
- 10 USDC/month
- 5 participants
- 50 USDC collateral (125% × 10 × 4)
- 5 months duration
- Best for: Beginners

### Standard Pool
- 50 USDC/month
- 10 participants
- 563 USDC collateral (125% × 50 × 9)
- 10 months duration
- Best for: Regular savers

### Premium Pool
- 100 USDC/month
- 20 participants
- 2,375 USDC collateral (125% × 100 × 19)
- 20 months duration
- Best for: Serious savers

## Benefits

### Financial
- Forced savings discipline
- Lump sum payout (useful for big purchases)
- Yield generation on all funds
- Low fees on Mantle Network

### Social
- Community building
- Global participation
- Transparent and fair
- No intermediaries

### Technical
- Immutable records
- Automated enforcement
- No trust required
- 24/7 operation
