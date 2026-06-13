# KiteCommerce Agent Network

> Agent-to-agent commerce network for buyers, merchants, services, APIs, and digital goods on the Kite chain.

[![CI](https://github.com/gnanam1990/kitecommerce-agent-network/actions/workflows/ci.yml/badge.svg)](https://github.com/gnanam1990/kitecommerce-agent-network/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-485C11.svg)](LICENSE)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)

## Overview

KiteCommerce Agent Network is a TypeScript monorepo for coordinating buyer and
merchant agents, product/API catalogs, payment-receipt verification, and
refund/dispute workflows on the Kite chain. It ships a Vite + React 19 frontend
and a Hono API (deployable to Vercel as a serverless function) backed by a pure
TypeScript core for address/transaction validation, risk policy, and
approval-gating. The chain-read path is real; the higher-level commerce modules
are preview-stage scaffolding — see [Status](#status).

## Features

- **Buyer Agent** — the one module marked `live`; surfaces catalog items and
  preview runs within policy.
- **Risk + approval policy (core)** — pure TypeScript helpers classify risk and
  gate high-risk or fund-moving actions behind explicit approval
  (`requiresApproval`, `highestRisk`, `buildActivity`).
- **Live Kite Mainnet read** — `GET /api/chain/stats` fetches the current block
  height over JSON-RPC (`viem`) plus gas/network stats from the KiteScan
  explorer, degrading to a preview-safe payload if infrastructure is unreachable.
- **Worker-backed run simulation** — `POST /api/runs/simulate` exercises the
  `PreviewRuntime` queue from the worker package.
- **Catalog CRUD** — list/read catalog items and create one with a validated EVM
  owner address. The server sets `status`, `risk`, `moduleId`, and budget itself
  (see Status); clients cannot inject these.
- **Approval workflow** — list pending approvals and approve/deny them.
- **Graceful degradation** — the SPA renders from bundled preview data whenever
  the API is unreachable.

## Tech stack

- **Language:** TypeScript (ES2022, ESM), strict mode
- **Frontend:** Vite 7, React 19, Tailwind CSS v4, lucide-react
- **API:** Hono 4 (`@hono/node-server`, plus the Vercel Node adapter)
- **Chain:** viem 2 (custom `defineChain` for Kite Mainnet/Testnet)
- **Tests:** Vitest 3
- **Build/bundle:** esbuild; Vercel Build Output API
- **Tooling:** pnpm 9 workspaces, Node 22

## Architecture

This is a pnpm monorepo (`packages/*`) plus a thin serverless entry:

- `packages/core/` — pure TypeScript domain logic: types, EVM address/tx-hash
  validation, risk weighting, approval rules, activity builders. No runtime deps.
- `packages/connectors/` — Kite chain constants, a `viem` public client, a
  KiteScan URL/JSON helper with a small TTL cache, and a secret-masking helper.
- `packages/worker/` — `PreviewRuntime`, an in-memory queue that turns enqueued
  jobs into approval-aware activity events via core.
- `packages/api/` — the Hono app, route handlers, in-memory seed data, and the
  live chain-stats endpoint. Runs standalone via `tsx src/server.ts`.
- `packages/web/` — Vite + React 19 SPA. Calls same-origin `/api` in production,
  `http://localhost:8787` in dev, and falls back to bundled data on any error.
- `server/index.ts` — mounts the shared Hono app under `/api` and is
  esbuild-bundled into a single self-contained Vercel function.

## Getting started

### Prerequisites

- Node.js 22
- pnpm 9 (the repo pins `pnpm@9.15.9` via `packageManager`)

### Installation

```bash
pnpm install
```

### Configuration

Copy `.env.example` and adjust as needed. The project reads these variables
(names and purpose only — never commit secret values):

| Variable | Purpose |
| --- | --- |
| `KITE_NETWORK` | Selected Kite network (e.g. `mainnet`). |
| `KITE_MAINNET_RPC` | Kite Mainnet JSON-RPC endpoint. |
| `KITE_MAINNET_API` | KiteScan Mainnet explorer API base. |
| `KITE_TESTNET_RPC` | Kite Testnet JSON-RPC endpoint. |
| `KITE_TESTNET_API` | KiteScan Testnet explorer API base. |
| `API_PORT` | Local API server port (default `8787`). |
| `WEB_ORIGIN` | Allowed CORS origin for the API (default `http://localhost:5173`). |
| `VITE_API_URL` | Frontend API base in dev; ignored in production (SPA calls same-origin `/api`). |
| `WEBHOOK_SECRET_DEMO` | Local-only secret placeholder for the preview webhook intake. |
| `LLM_PROVIDER` | Provider selector placeholder (`preview`); no model calls are wired yet. |

### Running

```bash
pnpm dev
```

Runs the API and web app in parallel. Frontend: `http://localhost:5173` ·
API: `http://localhost:8787`.

```bash
curl http://localhost:8787/health        # { "ok": true, "service": "kitecommerce-agent-network" }
curl http://localhost:8787/chain/stats   # live Kite Mainnet block height + gas
```

## Usage

The API is mounted at `/api` in production (same-origin) and served at
`http://localhost:8787` in local dev.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service health probe. |
| GET | `/meta` | Product + module metadata. |
| GET | `/modules` | Product modules. |
| GET | `/catalog` | List catalog items. |
| POST | `/catalog` | Create an item — `name`, `description`, `owner` required; `owner` must be a valid EVM address. |
| GET | `/catalog/:id` | Fetch one item. |
| GET | `/runs` | Activity / run log. |
| POST | `/runs/simulate` | Simulate a run through the worker runtime. |
| GET | `/approvals` | Pending approvals. |
| POST | `/approvals/:id/approve`, `/approvals/:id/deny` | Resolve an approval. |
| GET | `/chain/stats` | Live Kite Mainnet block height + gas (degrades to preview if infra is down). |
| POST | `/webhooks/:triggerId` | Preview webhook intake (acknowledges only). |

## Testing

```bash
pnpm -r typecheck   # tsc --noEmit across all packages
pnpm -r test        # Vitest across all packages
pnpm --filter @kitecommerce-agent-network/web build
```

Tests cover core safety helpers (address/tx validation, approval rules, activity
events), the API routes (health, catalog, runs/approvals, `/meta`, chain stats,
worker simulation, 404 handling), and the worker `PreviewRuntime`. The
`connectors` and `web` packages currently pass with no tests.

## Project structure

```txt
server/index.ts          Hono entry mounted at /api (bundled into a Vercel function)
scripts/vercel-build.mjs  Vercel Build Output API builder (SPA + bundled function)
packages/web/            Vite + React 19 frontend
packages/api/            Hono API (app, routes, live chain read, seed data)
packages/worker/         in-memory PreviewRuntime queue
packages/core/           pure TypeScript domain logic and safety helpers
packages/connectors/     Kite constants, viem client, KiteScan helper, cache
```

## Status

Preview / early scaffold. What is real today:

- The Vite + React 19 + TypeScript frontend with its product routes.
- The Hono API, deployable as a Vercel serverless function at `/api`.
- The **live** Kite Mainnet read at `/api/chain/stats` (block height via `viem`
  + KiteScan gas stats).
- The pure-TypeScript core (address/tx validation, risk policy, approval rules)
  and the worker `PreviewRuntime`, both covered by tests.

What is preview / not yet real:

- Of the five product modules, only **Buyer Agent** is marked `live`; **Merchant
  Agent**, **Product/API Catalog**, **Payment + Receipt Verification**, and
  **Dispute + Refund Workflow** are PREVIEW.
- Catalog, activity, and approval data is **in-memory seed data** in the API; the
  serverless deployment is stateless (the UI persists created items in
  `localStorage` so they survive a reload).
- No agentic decisioning, payment/receipt verification, fund movement, trading,
  or scoring is implemented as trusted backend behavior — these surfaces are
  preview-safe.
- **Client-submitted values are not trusted.** `POST /catalog` accepts only
  `name`, `description`, and `owner`; the server fixes `status`, `risk`,
  `moduleId`, and budget itself, so a client cannot inject a price, budget, or
  risk level. Fund-moving or high-risk actions are gated behind explicit approval.
- No official mainnet contract address is included or invented in this repo.

## Deployment

Vercel builds via the Build Output API (`scripts/vercel-build.mjs`):

- **Static frontend** — the built Vite SPA under `static/`.
- **Serverless API** — `server/index.ts` is esbuild-bundled into a
  self-contained Node function, with routing sending `/api/*` to the function and
  everything else to the SPA.

## License

[MIT](LICENSE) © 2026 Gnanam (gnanam1990)
</content>
</invoke>
