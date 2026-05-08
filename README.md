# PayrollDAO

**On-chain payroll infrastructure for Africa's informal workforce.**

PayrollDAO lets startups, DAOs, cooperatives, and small businesses pay freelancers, gig workers, market traders, and remote workers in USDC or XLM on the Stellar blockchain — instantly, with near-zero fees, no bank account required.

> Open-source · Community-driven · Built on Stellar

---

## Why PayrollDAO?

Over 400 million informal workers across Africa are excluded from traditional payroll systems. They don't have bank accounts, they wait weeks for payment, and they lose 8–12% of their earnings to fees.

PayrollDAO replaces slow, expensive, exclusionary payroll infrastructure with a simple on-chain alternative. A Stellar wallet address is all a worker needs to get paid.

---

## Features

- **Stellar wallet connection** via Freighter browser extension
- **Employer dashboard** with payment analytics
- **Payroll groups** — organize workers by team, location, or role
- **One-time payments** — send USDC or XLM to any Stellar address
- **Recurring payroll** — scheduled group payments
- **Simulated streaming payroll** — demo of micro-payment streaming
- **Transaction history** with Stellar Explorer links
- **Worker management** — add workers by wallet address
- **Analytics** — volume trends, currency breakdown, group performance
- **Testnet/mainnet support**
- **Mobile responsive UI**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, TailwindCSS v4 |
| Blockchain | Stellar SDK, Freighter wallet |
| State | Zustand |
| Database | PostgreSQL + Prisma ORM |
| Runtime | Node.js 20+ |

---

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm 9+
- PostgreSQL (for full backend; optional for demo mode)
- [Freighter wallet](https://freighter.app) browser extension (for wallet connection)

### 1. Clone the repository

```bash
git clone https://github.com/MooreTheAnalyst/payrolldao.git
cd payrolldao
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/payrolldao"
STELLAR_NETWORK="testnet"
NEXT_PUBLIC_STELLAR_NETWORK="testnet"
```

### 4. Set up the database (optional)

If you want to use the full database backend:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

> The app runs in demo mode with mock data if no database is configured.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Project Structure

```
src/
├── app/
│   ├── (app)/              # Dashboard route group (shared sidebar layout)
│   │   ├── dashboard/      # Main dashboard
│   │   ├── payroll/        # Payroll group management
│   │   ├── workers/        # Worker management
│   │   ├── payments/       # Payments & transaction history
│   │   ├── analytics/      # Analytics & reporting
│   │   └── settings/       # App settings
│   ├── api/                # API routes
│   │   ├── workers/
│   │   ├── payroll/
│   │   ├── payments/
│   │   └── transactions/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── layout/             # Navbar, Sidebar, Footer, DashboardHeader
│   ├── ui/                 # Button, Card, Badge, Modal, StatCard
│   ├── payroll/            # CreateGroupModal
│   ├── workers/            # AddWorkerModal
│   └── payments/           # SendPaymentModal
├── lib/
│   ├── stellar/            # Stellar SDK utilities
│   ├── prisma/             # Prisma client
│   └── utils/              # Helpers, mock data
├── stores/                 # Zustand state stores
│   ├── walletStore.ts
│   ├── payrollStore.ts
│   └── uiStore.ts
└── types/                  # TypeScript types
```

---

## Stellar Integration

PayrollDAO uses the [Stellar SDK](https://stellar.github.io/js-stellar-sdk/) for:

- **XLM payments** — native Stellar asset
- **USDC payments** — Circle's USDC on Stellar
- **Transaction signing** — client-side via Freighter (private keys never leave the browser)
- **Transaction verification** — on-chain confirmation via Horizon API

### Testnet

By default, the app runs on Stellar testnet. You can get free testnet XLM from the [Stellar Friendbot](https://friendbot.stellar.org).

### Mainnet

Set `STELLAR_NETWORK=mainnet` and `NEXT_PUBLIC_STELLAR_NETWORK=mainnet` in your `.env.local` to use mainnet.

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/workers` | List workers (supports `?search=` and `?status=`) |
| POST | `/api/workers` | Add a new worker |
| GET | `/api/payroll` | List payroll groups |
| POST | `/api/payroll` | Create a payroll group |
| GET | `/api/payments` | List payments (supports `?status=` and `?type=`) |
| POST | `/api/payments` | Initiate a payment |
| GET | `/api/transactions` | List completed on-chain transactions |

---

## Contributing

We welcome contributions of all kinds. See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

---

## License

MIT — see [LICENSE](./LICENSE) for details.

---

## Community

- GitHub Issues: [github.com/MooreTheAnalyst/payrolldao/issues](https://github.com/MooreTheAnalyst/payrolldao/issues)
- Discussions: [github.com/MooreTheAnalyst/payrolldao/discussions](https://github.com/MooreTheAnalyst/payrolldao/discussions)
