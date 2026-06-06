# KiteCommerce Agent Network — Project Prompt Pack

## One-line summary
Agent-to-agent commerce network for buyers, merchants, services, APIs, and digital goods.

## Product positioning
Buyer agents discover and purchase from merchant agents using verified Kite payments, receipts, fulfillment, refund, and dispute workflows.

## Why this exists
The agent economy needs more than human storefronts. Autonomous buyer agents and merchant agents need a commerce protocol and operational dashboard.

## Repository name
`kitecommerce-agent-network`

## Header subtitle
`COMMERCE`

## Core routes
- `/`
- `/catalog`
- `/catalog/:id`
- `/buyer-agent`
- `/merchant`
- `/merchant/orders`
- `/receipts`
- `/refunds`
- `/disputes`


## Core modules
1. **Buyer Agent** — Agent that compares products/services and proposes purchases within policy.
2. **Merchant Agent** — Seller-side agent that manages listings, questions, orders, and fulfillment.
3. **Product/API Catalog** — Unified catalog of digital goods, APIs, services, and access products.
4. **Payment + Receipt Verification** — Verify payment txs and generate receipts/access grants.
5. **Dispute + Refund Workflow** — Manage refund requests and disputed orders.

## API surface
- `GET /catalog`
- `POST /merchant/listings`
- `POST /buyer/proposals`
- `POST /orders`
- `POST /orders/:id/verify-payment`
- `GET /receipts/:id`
- `POST /refunds`
- `POST /disputes`


## Safety requirements
- No auto-payment without approval
- No fake fulfillment guarantees
- Payment verification mandatory
- Refunds require tx verification


## Build philosophy
This is not a small demo. Build it as a serious productivity platform for Kite AI agents. Every UI screen must move the user toward a real workflow, decision, payment, approval, or operational outcome.

---


---

# STAGE_00_CONTEXT_AND_REPO_SETUP.md

# Stage 00 — Context and Repo Setup for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Create the initial monorepo for **KiteCommerce Agent Network**: Agent-to-agent commerce network for buyers, merchants, services, APIs, and digital goods.

This stage should establish a clean foundation only. Do not build all product modules yet.

## Product constraints
- Product name: `KiteCommerce Agent Network`
- Repo name: `kitecommerce-agent-network`
- Header subtitle: `COMMERCE`
- Positioning: Buyer agents discover and purchase from merchant agents using verified Kite payments, receipts, fulfillment, refund, and dispute workflows.

## Required monorepo structure

Create this structure:

```txt
packages/web/          Vite + React 19 + TypeScript + Tailwind v4 frontend
packages/api/          Hono API server
packages/worker/       background jobs and queues
packages/core/         pure TypeScript domain logic
packages/connectors/   KiteScan, RPC, webhook, LLM, wallet/API connectors
```

Only add `packages/contracts/` if a later stage explicitly needs contracts.

## Frontend requirements
- Vite React TypeScript project under `packages/web`.
- Tailwind v4 using inline `@theme` in CSS.
- Copy the design values from `THEME.md` exactly.
- Add Geist and Geist Mono Google font links in `index.html`.
- Add shared components:
  - `SiteHeader`
  - `SiteFooter`
  - `KiteLogo`
  - `AddressDisplay`
  - `PreviewBadge`
  - `StatusBadge`
  - `MonoValue`
  - `EmptyState`
  - `ErrorState`
- Build a basic landing page with hero, product promise, module cards, and PREVIEW honesty banner.

## Backend requirements
- Hono API in `packages/api`.
- Health route: `GET /health` returns `{ ok: true, service: "kitecommerce-agent-network" }`.
- Shared environment loader with `.env.example`.
- Add CORS configured for local web dev.

## Core package requirements
- Add `packages/core/src/index.ts`.
- Add common types: `KiteAddress`, `TxHash`, `ISODate`, `RiskLevel`, `PreviewStatus`.
- Add validators for EVM address and tx hash.

## Connector package requirements
- Add Kite chain constants.
- Add KiteScan API base helper.
- Add cached fetch helper with TTL.
- Add placeholder RPC client helper using viem.

## Deliverables
- Full monorepo initialized.
- Root `package.json` with pnpm workspaces.
- Root `README.md` with what the product does.
- `.env.example` for all packages.
- Basic dev scripts:
  - `pnpm dev`
  - `pnpm -r typecheck`
  - `pnpm -r test`
  - `pnpm -r lint`

## Acceptance criteria
- Web app renders the landing page.
- API health route works.
- TypeScript builds.
- No forbidden fonts/colors.
- README clearly says what is real and what is PREVIEW.

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



---

# STAGE_01_DATABASE_AND_TYPES.md

# Stage 01 — Database and Domain Types for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Design and implement the domain model, database schema, migrations, seed data, and TypeScript types for **KiteCommerce Agent Network**.

Do not build final UI screens yet. Build the data foundation that later stages will use.

## Required entities from PRD
Implement types and database tables for these domain objects:

- `BuyerAgent{id, owner_address, name, policy_json, status}`
- `PurchaseProposal{id, buyer_agent_id, listing_id, reason, amount_raw, status, created_at}`
- `MerchantAgent{id, owner_address, name, payout_address, settings_json, status}`
- `Listing{id, merchant_id, title, description, category, price_raw, token_address, delivery_type, metadata_json, active}`
- `Order{id, listing_id, buyer_address, merchant_address, amount_raw, status, payment_tx, receipt_id, created_at}`
- `Receipt{id, order_id, receipt_json, created_at}`
- `RefundRequest{id, order_id, requester_address, reason, status, refund_tx, created_at}`
- `CommerceDispute{id, order_id, status, evidence_json, resolution}`


## Database choice
Use SQLite for local MVP with Drizzle ORM or a clean query layer. Keep the schema portable so it can move to Postgres later.

## Required files

```txt
packages/core/src/types.ts
packages/core/src/validation.ts
packages/core/src/errors.ts
packages/api/src/db/schema.ts
packages/api/src/db/client.ts
packages/api/src/db/migrate.ts
packages/api/src/db/seed.ts
packages/api/src/repositories/
```

## Schema requirements
- Every table must have `id`, `created_at`, and where useful `updated_at`.
- Store addresses lowercase, but preserve display formatting in UI.
- Use JSON columns for flexible config payloads, but validate shape at API boundaries.
- Add indexes for address, status, created_at, foreign keys, and tx_hash where relevant.
- Add uniqueness constraints where duplicates would be dangerous.
- Add status enums in TypeScript and database-safe string values.

## TypeScript requirements
- Define strict types for every core entity.
- Define create/update input types separately from persisted entity types.
- Add Zod schemas for API request validation.
- Add helper functions for validating Kite addresses, tx hashes, amounts, and URLs.

## Seed data
Add realistic local seed data for demo mode:
- At least 3 users/owners.
- At least 5 main entities for the product.
- At least 10 events/logs/history rows where relevant.
- Seeded Kite-like addresses must be valid `0x` addresses.
- Mark all fake/demo records with `demo: true` or a clear `[MOCK]` label field.

## Acceptance criteria
- Migrations run from a clean database.
- Seed script populates useful demo data.
- API can import repositories without circular dependencies.
- Domain types are exported from `packages/core`.
- No UI claims seeded mock data is real.

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



---

# STAGE_02_BACKEND_API.md

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



---

# STAGE_03_WORKER_AND_AGENT_RUNTIME.md

# Stage 03 — Worker and Agent Runtime for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Build the background worker/runtime layer for **KiteCommerce Agent Network**. This product should feel productive and agentic, not just CRUD screens.

## Worker package structure

```txt
packages/worker/src/index.ts
packages/worker/src/queue.ts
packages/worker/src/jobs/
packages/worker/src/scheduler.ts
packages/worker/src/logger.ts
packages/worker/src/config.ts
```

## Core runtime requirements
- Implement a simple durable job queue abstraction.
- Local MVP can use SQLite polling or an in-memory queue with persistent job table.
- Every job has `id`, `type`, `status`, `attempts`, `max_attempts`, `payload_json`, `last_error`, `created_at`, `run_at`, `finished_at`.
- Add exponential backoff helper.
- Add idempotency key support where a job can cause external effects.
- Add structured logs.

## Agentic requirements
Where this product needs AI/agent behavior, implement a provider abstraction:

```ts
interface AgentModelProvider {
  generateObject<T>(input: AgentPromptInput<T>): Promise<AgentResult<T>>;
  generateText(input: AgentTextInput): Promise<AgentTextResult>;
}
```

- Add a mock provider for local development.
- Add environment placeholders for real LLM provider later.
- Every AI output must be stored with prompt, model, input, output, and timestamp.
- Any action proposed by AI that can move funds or affect users must enter approval flow.

## Product-specific jobs
Create worker job stubs for each module:

- Buyer Agent
- Merchant Agent
- Product/API Catalog
- Payment + Receipt Verification
- Dispute + Refund Workflow


Each job should have:
- input schema,
- handler,
- success path,
- failure path,
- timeline/audit log write,
- unit test with mock data.

## Acceptance criteria
- Worker starts locally.
- Worker can process at least one seeded/demo job.
- Failed jobs retry and eventually mark failed.
- Job logs are visible through API or database.
- AI/mock provider outputs are stored, not hidden.

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



---

# STAGE_04_FRONTEND_SHELL_AND_THEME.md

# Stage 04 — Frontend Shell and Kite Theme for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Build the frontend shell for **KiteCommerce Agent Network** with the attached Kite design system. Do not improvise the visual style.

## Required routes
Create route/page shells for:

- `/`
- `/catalog`
- `/catalog/:id`
- `/buyer-agent`
- `/merchant`
- `/merchant/orders`
- `/receipts`
- `/refunds`
- `/disputes`


## Required layout
- Sticky `SiteHeader` with Kite logo and `COMMERCE` subtitle.
- Main content container with cream background.
- `SiteFooter` linking to Kite, KiteScan, docs, and Discord.
- Left sidebar only if needed for app dashboards.
- Responsive mobile layout.

## Required shared UI components

```txt
components/ui/Button.tsx
components/ui/Card.tsx
components/ui/Input.tsx
components/ui/Textarea.tsx
components/ui/Select.tsx
components/ui/Tabs.tsx
components/ui/Badge.tsx
components/ui/PreviewBadge.tsx
components/ui/MonoValue.tsx
components/ui/AddressDisplay.tsx
components/ui/StatusDot.tsx
components/ui/EmptyState.tsx
components/ui/ErrorState.tsx
components/ui/ConfirmDialog.tsx
components/layout/AppShell.tsx
components/layout/SiteHeader.tsx
components/layout/SiteFooter.tsx
```

## Page shell requirements
Every route should have:
- Page title.
- Short description.
- At least one useful card/table/form placeholder.
- PREVIEW badge for data not wired yet.
- Empty state that explains what the user should do next.

## Visual rules
- Background: cream `#FEF8F0`.
- Primary CTA: sand `#9B8564`.
- Success: olive `#485C11`.
- Destructive/warning: warm rust `#A23A1A`.
- Cards: flat white/cream with `#E3D7C2` border.
- No glassmorphism, glow, violet, cyan, indigo, blue gradients, or neon.
- All addresses/hashes/numbers use Geist Mono.

## Data integration
- Create API client in `packages/web/src/lib/api.ts`.
- Load seeded/demo data from backend where possible.
- Show loading, error, and empty states.

## Acceptance criteria
- All routes render.
- Header/footer consistent.
- No forbidden colors/fonts.
- Demo data appears in at least 2 pages.
- UI looks like a sibling of the existing Kite product family.

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



---

# STAGE_05_MODULE_01_BUYER_AGENT.md

# Stage 05 — Module 1: Buyer Agent for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Implement the **Buyer Agent** module for **KiteCommerce Agent Network**.

## Module purpose
Agent that compares products/services and proposes purchases within policy.

## Product context
Buyer agents discover and purchase from merchant agents using verified Kite payments, receipts, fulfillment, refund, and dispute workflows.

## Features to implement
- Buying goal form
- Budget policy
- Catalog search
- Comparison table
- Purchase proposal
- Approval before payment


## Required data objects
- `BuyerAgent{id, owner_address, name, policy_json, status}`
- `PurchaseProposal{id, buyer_agent_id, listing_id, reason, amount_raw, status, created_at}`


## Backend requirements
- Add/complete service functions for this module in `packages/api/src/services/`.
- Add/complete repository functions in `packages/api/src/repositories/`.
- Add route handlers for create/list/detail/update/action flows related to this module.
- Validate all inputs with Zod.
- Write at least 3 API tests or service tests for the core happy path and failure path.

## Worker/runtime requirements
- If this module has background behavior, create a job type and handler.
- Add audit/timeline log writes for important state transitions.
- Add idempotency guard if the module can create external effects.
- Any AI-generated output must store prompt, input, output, model, and timestamp.

## Frontend requirements
Create serious production-style UI, not placeholders:
- Main module page or section.
- List/table view.
- Detail drawer or detail page.
- Create/edit form where relevant.
- Status badges.
- Empty state.
- Error state.
- Loading skeleton or loading card.
- Use `AddressDisplay` and `MonoValue` for chain data.
- Use `PreviewBadge` for mock, heuristic, or incomplete data.

## UX requirements
- The user should understand what action to take next.
- Dangerous/risky actions require confirmation dialog.
- Show clear helper text for policies, limits, payment state, or agent decisions.
- Do not hide complexity behind fake-complete UI.

## Acceptance criteria
- Buyer agent cannot pay without approval
- Comparisons show reasoning and constraints
- Policy violations block proposals


## Additional checks
- All module screens work with seeded data.
- No fake mainnet execution claims.
- No unsupported token/contract assumptions.
- Unit tests cover core logic.

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



---

# STAGE_06_MODULE_02_MERCHANT_AGENT.md

# Stage 06 — Module 2: Merchant Agent for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Implement the **Merchant Agent** module for **KiteCommerce Agent Network**.

## Module purpose
Seller-side agent that manages listings, questions, orders, and fulfillment.

## Product context
Buyer agents discover and purchase from merchant agents using verified Kite payments, receipts, fulfillment, refund, and dispute workflows.

## Features to implement
- Merchant profile
- Auto-response settings
- Inventory/status
- Order handling
- Fulfillment webhooks
- Policy for refunds


## Required data objects
- `MerchantAgent{id, owner_address, name, payout_address, settings_json, status}`


## Backend requirements
- Add/complete service functions for this module in `packages/api/src/services/`.
- Add/complete repository functions in `packages/api/src/repositories/`.
- Add route handlers for create/list/detail/update/action flows related to this module.
- Validate all inputs with Zod.
- Write at least 3 API tests or service tests for the core happy path and failure path.

## Worker/runtime requirements
- If this module has background behavior, create a job type and handler.
- Add audit/timeline log writes for important state transitions.
- Add idempotency guard if the module can create external effects.
- Any AI-generated output must store prompt, input, output, model, and timestamp.

## Frontend requirements
Create serious production-style UI, not placeholders:
- Main module page or section.
- List/table view.
- Detail drawer or detail page.
- Create/edit form where relevant.
- Status badges.
- Empty state.
- Error state.
- Loading skeleton or loading card.
- Use `AddressDisplay` and `MonoValue` for chain data.
- Use `PreviewBadge` for mock, heuristic, or incomplete data.

## UX requirements
- The user should understand what action to take next.
- Dangerous/risky actions require confirmation dialog.
- Show clear helper text for policies, limits, payment state, or agent decisions.
- Do not hide complexity behind fake-complete UI.

## Acceptance criteria
- Merchant can create/manage listings
- Payout address is verified
- Auto-replies are logged


## Additional checks
- All module screens work with seeded data.
- No fake mainnet execution claims.
- No unsupported token/contract assumptions.
- Unit tests cover core logic.

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



---

# STAGE_07_MODULE_03_PRODUCT_API_CATALOG.md

# Stage 07 — Module 3: Product/API Catalog for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Implement the **Product/API Catalog** module for **KiteCommerce Agent Network**.

## Module purpose
Unified catalog of digital goods, APIs, services, and access products.

## Product context
Buyer agents discover and purchase from merchant agents using verified Kite payments, receipts, fulfillment, refund, and dispute workflows.

## Features to implement
- Listing creation
- Categories
- Pricing
- Access method
- Delivery type
- Search/filter
- Agent-readable metadata


## Required data objects
- `Listing{id, merchant_id, title, description, category, price_raw, token_address, delivery_type, metadata_json, active}`


## Backend requirements
- Add/complete service functions for this module in `packages/api/src/services/`.
- Add/complete repository functions in `packages/api/src/repositories/`.
- Add route handlers for create/list/detail/update/action flows related to this module.
- Validate all inputs with Zod.
- Write at least 3 API tests or service tests for the core happy path and failure path.

## Worker/runtime requirements
- If this module has background behavior, create a job type and handler.
- Add audit/timeline log writes for important state transitions.
- Add idempotency guard if the module can create external effects.
- Any AI-generated output must store prompt, input, output, model, and timestamp.

## Frontend requirements
Create serious production-style UI, not placeholders:
- Main module page or section.
- List/table view.
- Detail drawer or detail page.
- Create/edit form where relevant.
- Status badges.
- Empty state.
- Error state.
- Loading skeleton or loading card.
- Use `AddressDisplay` and `MonoValue` for chain data.
- Use `PreviewBadge` for mock, heuristic, or incomplete data.

## UX requirements
- The user should understand what action to take next.
- Dangerous/risky actions require confirmation dialog.
- Show clear helper text for policies, limits, payment state, or agent decisions.
- Do not hide complexity behind fake-complete UI.

## Acceptance criteria
- Listings have agent-readable JSON metadata
- Physical goods marked PREVIEW or excluded v0.1
- Search works by category/title/merchant


## Additional checks
- All module screens work with seeded data.
- No fake mainnet execution claims.
- No unsupported token/contract assumptions.
- Unit tests cover core logic.

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



---

# STAGE_08_MODULE_04_PAYMENT_RECEIPT_VERIFICATION.md

# Stage 08 — Module 4: Payment + Receipt Verification for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Implement the **Payment + Receipt Verification** module for **KiteCommerce Agent Network**.

## Module purpose
Verify payment txs and generate receipts/access grants.

## Product context
Buyer agents discover and purchase from merchant agents using verified Kite payments, receipts, fulfillment, refund, and dispute workflows.

## Features to implement
- Payment intent
- Tx hash verification
- Receipt page
- Access grant
- Order status
- Signed receipt export


## Required data objects
- `Order{id, listing_id, buyer_address, merchant_address, amount_raw, status, payment_tx, receipt_id, created_at}`
- `Receipt{id, order_id, receipt_json, created_at}`


## Backend requirements
- Add/complete service functions for this module in `packages/api/src/services/`.
- Add/complete repository functions in `packages/api/src/repositories/`.
- Add route handlers for create/list/detail/update/action flows related to this module.
- Validate all inputs with Zod.
- Write at least 3 API tests or service tests for the core happy path and failure path.

## Worker/runtime requirements
- If this module has background behavior, create a job type and handler.
- Add audit/timeline log writes for important state transitions.
- Add idempotency guard if the module can create external effects.
- Any AI-generated output must store prompt, input, output, model, and timestamp.

## Frontend requirements
Create serious production-style UI, not placeholders:
- Main module page or section.
- List/table view.
- Detail drawer or detail page.
- Create/edit form where relevant.
- Status badges.
- Empty state.
- Error state.
- Loading skeleton or loading card.
- Use `AddressDisplay` and `MonoValue` for chain data.
- Use `PreviewBadge` for mock, heuristic, or incomplete data.

## UX requirements
- The user should understand what action to take next.
- Dangerous/risky actions require confirmation dialog.
- Show clear helper text for policies, limits, payment state, or agent decisions.
- Do not hide complexity behind fake-complete UI.

## Acceptance criteria
- Never trust client payment claims
- Receipt links to explorer
- Access only granted after verified tx


## Additional checks
- All module screens work with seeded data.
- No fake mainnet execution claims.
- No unsupported token/contract assumptions.
- Unit tests cover core logic.

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



---

# STAGE_09_MODULE_05_DISPUTE_REFUND_WORKFLOW.md

# Stage 09 — Module 5: Dispute + Refund Workflow for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Implement the **Dispute + Refund Workflow** module for **KiteCommerce Agent Network**.

## Module purpose
Manage refund requests and disputed orders.

## Product context
Buyer agents discover and purchase from merchant agents using verified Kite payments, receipts, fulfillment, refund, and dispute workflows.

## Features to implement
- Refund request
- Merchant response
- Evidence timeline
- Refund tx verification
- Status updates
- Policy display


## Required data objects
- `RefundRequest{id, order_id, requester_address, reason, status, refund_tx, created_at}`
- `CommerceDispute{id, order_id, status, evidence_json, resolution}`


## Backend requirements
- Add/complete service functions for this module in `packages/api/src/services/`.
- Add/complete repository functions in `packages/api/src/repositories/`.
- Add route handlers for create/list/detail/update/action flows related to this module.
- Validate all inputs with Zod.
- Write at least 3 API tests or service tests for the core happy path and failure path.

## Worker/runtime requirements
- If this module has background behavior, create a job type and handler.
- Add audit/timeline log writes for important state transitions.
- Add idempotency guard if the module can create external effects.
- Any AI-generated output must store prompt, input, output, model, and timestamp.

## Frontend requirements
Create serious production-style UI, not placeholders:
- Main module page or section.
- List/table view.
- Detail drawer or detail page.
- Create/edit form where relevant.
- Status badges.
- Empty state.
- Error state.
- Loading skeleton or loading card.
- Use `AddressDisplay` and `MonoValue` for chain data.
- Use `PreviewBadge` for mock, heuristic, or incomplete data.

## UX requirements
- The user should understand what action to take next.
- Dangerous/risky actions require confirmation dialog.
- Show clear helper text for policies, limits, payment state, or agent decisions.
- Do not hide complexity behind fake-complete UI.

## Acceptance criteria
- Refund tx is verified like payment tx
- Disputes show no official guarantee language
- Refund policy is visible before purchase


## Additional checks
- All module screens work with seeded data.
- No fake mainnet execution claims.
- No unsupported token/contract assumptions.
- Unit tests cover core logic.

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



---

# STAGE_10_KITE_WALLET_AND_PAYMENT_INTEGRATION.md

# Stage 10 — Kite Wallet and Payment Integration for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Add safe Kite chain integration to **KiteCommerce Agent Network**. This stage should wire KiteScan, RPC, wallet connection, address views, tx verification, and payment-safety patterns where relevant.

## Required connector files

```txt
packages/connectors/src/kite-chain.ts
packages/connectors/src/kitescan.ts
packages/connectors/src/rpc.ts
packages/connectors/src/payment-verifier.ts
packages/connectors/src/address.ts
packages/web/src/lib/wallet.ts
packages/web/src/lib/chains.ts
```

## Kite constants
Use these defaults:

```txt
Mainnet RPC: https://rpc.gokite.ai/
Mainnet Chain ID: 2366
Mainnet Explorer: https://kitescan.ai/
Mainnet API: https://kitescan.ai/api/v2/
Testnet RPC: https://rpc-testnet.gokite.ai/
Testnet Chain ID: 2368
Native token: KITE, 18 decimals
Testnet USDT: 0x0fF5393387ad2f9f691FD6Fd28e07E3969e27e63, 18 decimals
```

## Wallet connection
- Add wagmi + RainbowKit only if this product needs wallet connection.
- Customize RainbowKit theme to sand accent, not default blue/violet.
- Add network switch UI for mainnet/testnet when appropriate.
- Never store private keys.

## Payment verification pattern
If the product accepts payment tx hashes, implement:

1. Fetch transaction receipt by hash.
2. Confirm receipt status success.
3. Confirm chain/network.
4. For ERC-20 payment, parse Transfer logs.
5. Verify token contract address.
6. Verify recipient address.
7. Verify amount is greater than or equal to expected amount.
8. Store verification result.
9. Reject invalid tx with clear reason.
10. Never grant access from client-claimed payment alone.

## UI integration
- Every address links to KiteScan.
- Every tx hash links to KiteScan.
- Use `font-mono` for address/hash/amount/block.
- Mark any unverified payment as PENDING or UNVERIFIED.
- Mark any mock/demo payment as `[MOCK]`.

## Product-specific integration points
- Buyer Agent
- Merchant Agent
- Product/API Catalog
- Payment + Receipt Verification
- Dispute + Refund Workflow


For each module, identify whether it needs:
- address lookup,
- tx hash lookup,
- token balance,
- payment verification,
- wallet approval,
- receipt display,
- explorer links.

## Acceptance criteria
- KiteScan client can fetch latest transactions or address data in demo mode.
- Payment verifier has unit tests for valid, invalid, wrong-recipient, wrong-token, and insufficient-amount cases using mocked receipts.
- Wallet UI does not use forbidden RainbowKit colors.
- No mainnet payment feature is presented as production-ready unless token/contract addresses are confirmed.

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



---

# STAGE_11_TESTING_SECURITY_AND_DEPLOYMENT.md

# Stage 11 — Testing, Security, and Deployment for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Harden **KiteCommerce Agent Network** so it is not just a demo. Add tests, security checks, deployment docs, environment examples, and operational safety.

## Test requirements
Add tests for:
- Core domain logic.
- Zod validation.
- API route happy paths.
- API route failure paths.
- Worker job success/failure/retry.
- Payment verification logic if present.
- Policy/approval logic if present.
- UI smoke tests for critical pages if test stack exists.

## Security requirements
- No secrets in frontend code.
- No raw private keys in repository.
- `.env.example` contains names only, no real secrets.
- All external URLs are validated.
- HMAC verification for webhooks where relevant.
- Rate-limit write endpoints.
- Add request IDs and structured logs.
- Add clear PREVIEW/UNAUDITED warnings for risky modules.

## Production readiness checklist
Create `PRODUCTION_CHECKLIST.md` covering:
- Required environment variables.
- Database migration steps.
- Worker deployment steps.
- API deployment steps.
- Web deployment steps.
- RPC/API rate-limit considerations.
- Payment token address confirmation.
- Mainnet risk warnings.
- Backup/recovery expectations.

## Deployment docs
Create docs for:

```txt
docs/LOCAL_DEV.md
docs/DEPLOYMENT.md
docs/SECURITY.md
docs/API.md
```

## UI QA checklist
- Cream background.
- Sand primary buttons.
- Olive success states.
- Rust destructive/warning states.
- No violet/cyan/indigo/neon.
- No glassmorphism/glow/gradient text.
- All numbers/addresses/hashes in mono.
- PREVIEW badges on incomplete/heuristic/mock/unaudited parts.

## Acceptance criteria
- `pnpm -r typecheck` passes.
- Tests pass or documented skipped tests are justified.
- Security docs exist.
- Deployment docs exist.
- No forbidden visual patterns.
- Product can be demoed end-to-end locally with seeded data.

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



---

# STAGE_12_FINAL_POLISH_README_AND_DEMO.md

# Stage 12 — Final Polish, README, and Demo Script for KiteCommerce Agent Network

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Prepare **KiteCommerce Agent Network** for a public-quality GitHub repo and product demo.

## README requirements
Rewrite `README.md` with:
- Product name and one-line summary.
- What problem it solves.
- Why it matters for Kite AI agents.
- Feature list by module.
- Architecture diagram in text form.
- Local development instructions.
- Environment variable list.
- Safety/PREVIEW/UNAUDITED notes.
- Verification commands.
- Deployment notes.
- Roadmap v0.2/v0.3.

## Demo script
Create `docs/DEMO_SCRIPT.md` with a 3–5 minute demo flow:
1. Open landing page.
2. Show main dashboard.
3. Create or inspect a core object.
4. Trigger the most important workflow.
5. Show audit/log/payment/approval output.
6. Explain what is real vs PREVIEW.

## Product polish
- Replace generic placeholder copy with product-specific text.
- Add helpful empty states.
- Add tooltips for complex chain/agent concepts.
- Add skeleton/loading states.
- Add error recovery messages.
- Add cross-links to KiteScan for all addresses/txs.
- Add visible “Built on Kite” footer.

## v0.2 roadmap
Create a roadmap section with:
- Production auth.
- Postgres migration.
- Real provider integrations.
- WebSocket/event subscriptions if relevant.
- Mainnet-safe execution only after confirmation/audit.
- Team/multi-user support.
- Usage-based billing if relevant.

## Final acceptance criteria
- A new developer can run the repo from README alone.
- A demo user can understand the product in under 30 seconds.
- The app feels like a serious Kite agent product, not a toy dashboard.
- All PREVIEW limitations are honest.
- Final grep checks pass.

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

