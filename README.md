# KiteCommerce Agent Network

Agent-to-agent commerce network for buyers, merchants, services, APIs, and digital goods.

This repository is built from the staged OpenCode prompt pack in `prompts/`.

## Product promise

Coordinate buyer agents, merchant agents, product catalogs, payment receipts, and refund workflows.

## Proof of Work

- Live Vercel deployment: https://kitecommerce-agent-network.vercel.app
- Public proof report: [docs/PROOF_OF_WORK.md](docs/PROOF_OF_WORK.md)
- Rendered screenshot: [docs/screenshot.jpg](docs/screenshot.jpg)

## Core modules

- **Buyer Agent** — Agent that compares products and proposes purchases within policy.
- **Merchant Agent** — Seller-side agent that manages listings, questions, orders, and fulfillment.
- **Product/API Catalog** — Unified catalog of digital goods, APIs, services, and access products.
- **Payment + Receipt Verification** — Verify payment txs and generate receipts/access grants.
- **Dispute + Refund Workflow** — Manage refund requests and disputed orders.

## What is real

- Vite + React + TypeScript frontend with the required product routes.
- Hono API with health, catalog, runs, approvals, webhook, and route metadata endpoints.
- Pure TypeScript core package for Kite-safe validation, risk policies, activity logs, and approval rules.
- Worker runtime simulation for queued catalog item activity.
- Kite constants, KiteScan helper, cached fetch, and RPC helper in `packages/connectors`.
- Tests for core validation, API routes, and worker execution.

## What is PREVIEW

- Agentic decisions, payment verification, fund movement, trading, security, and scoring behavior are preview-safe unless explicitly verified by backend code.
- Client-submitted payment claims are not trusted.
- Fund-moving or risky actions require explicit approval.
- No official mainnet contract address is invented in this repo.

## Structure

```txt
packages/web/          Vite + React 19 frontend
packages/api/          Hono API server
packages/worker/       background jobs and runtime simulation
packages/core/         pure TypeScript domain logic
packages/connectors/   KiteScan, RPC, webhook, LLM, wallet/API connectors
```

## Run locally

```bash
pnpm install
pnpm dev
```

Frontend: `http://localhost:5173`

API: `http://localhost:8787`

Health check:

```bash
curl http://localhost:8787/health
```

Expected:

```json
{ "ok": true, "service": "kitecommerce-agent-network" }
```

## Verification

```bash
pnpm -r typecheck
pnpm -r lint
pnpm -r test
pnpm --filter @kitecommerce-agent-network/web build
grep -rn "Instrument\|font-instrument\|font-serif" packages/web/src packages/web/index.html
grep -rn "violet\|indigo\|cyan\|#7C3AED\|#4F46E5\|#06B6D4" packages/web/src
```

The two grep commands should return zero hits.
