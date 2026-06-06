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
