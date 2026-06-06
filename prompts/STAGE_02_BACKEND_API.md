# Stage 02 — Backend API for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Build the Hono API surface for **KiteCommerce Agent Network** using the schema from Stage 01.

## Required API endpoints
Implement these endpoints or their direct REST equivalent:

- `GET /catalog`
- `POST /merchant/listings`
- `POST /buyer/proposals`
- `POST /orders`
- `POST /orders/:id/verify-payment`
- `GET /receipts/:id`
- `POST /refunds`
- `POST /disputes`


## API architecture
Create:

```txt
packages/api/src/index.ts
packages/api/src/app.ts
packages/api/src/routes/
packages/api/src/middleware/error-handler.ts
packages/api/src/middleware/request-id.ts
packages/api/src/middleware/auth-placeholder.ts
packages/api/src/services/
packages/api/src/repositories/
```

## Requirements
- Every route validates input with Zod.
- Every route returns typed JSON.
- Errors use consistent shape:

```ts
{
  ok: false,
  error: { code: string; message: string; details?: unknown },
  request_id: string
}
```

- Success responses use:

```ts
{ ok: true, data: unknown, request_id: string }
```

- Add pagination to list endpoints using `limit`, `cursor`, or `page`.
- Add filters for status/date/address where useful.
- Add basic local auth placeholder based on `x-demo-owner-address` header, but keep it clearly marked as demo-only.
- Do not implement insecure production auth in this stage.

## Product-specific behavior
The API must support the major modules:

1. **Buyer Agent** — Agent that compares products/services and proposes purchases within policy.
2. **Merchant Agent** — Seller-side agent that manages listings, questions, orders, and fulfillment.
3. **Product/API Catalog** — Unified catalog of digital goods, APIs, services, and access products.
4. **Payment + Receipt Verification** — Verify payment txs and generate receipts/access grants.
5. **Dispute + Refund Workflow** — Manage refund requests and disputed orders.

## OpenAPI/docs
- Add a generated or hand-written `packages/api/API.md`.
- Include request/response examples.
- Include curl examples for the core happy paths.

## Acceptance criteria
- API starts locally.
- Health endpoint works.
- CRUD/list/detail endpoints work for seeded data.
- Invalid payloads return 400 with useful messages.
- Demo auth is clearly marked as not production auth.

## Required verification

Run these commands and fix all issues before ending the stage:

```bash
pnpm install
pnpm -r typecheck
pnpm -r lint || true
pnpm -r test || true
grep -rn "Instrument\|font-instrument\|font-serif" packages/web/src packages/web/index.html || true
grep -rn "violet\|indigo\|cyan\|#7C3AED\|#4F46E5\|#06B6D4" packages/web/src || true
```

Expected:
- TypeScript passes.
- No forbidden fonts.
- No forbidden colors in non-comment UI code.
- UI uses Kite palette only: sand, cream, olive, deep brown, warm rust.
- All addresses, hashes, balances, block numbers, tx IDs use `font-mono`.

