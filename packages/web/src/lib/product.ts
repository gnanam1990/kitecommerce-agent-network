export const product = {
  name: "KiteCommerce Agent Network",
  repo: "kitecommerce-agent-network",
  subtitle: "COMMERCE",
  hero: "Coordinate buyer agents, merchant agents, product catalogs, payment receipts, and refund workflows.",
  positioning: "Agent-to-agent commerce network for buyers, merchants, services, APIs, and digital goods.",
  entity: "catalog",
  entitySingular: "catalog item",
  entityRoute: "/catalog",
  routes: [
  "/",
  "/catalog",
  "/catalog/:id",
  "/buyer-agent",
  "/merchant",
  "/merchant/orders",
  "/receipts",
  "/refunds",
  "/disputes"
],
  modules: [
  {
    "id": "module_1",
    "name": "Buyer Agent",
    "description": "Agent that compares products and proposes purchases within policy.",
    "preview": "live"
  },
  {
    "id": "module_2",
    "name": "Merchant Agent",
    "description": "Seller-side agent that manages listings, questions, orders, and fulfillment.",
    "preview": "preview"
  },
  {
    "id": "module_3",
    "name": "Product/API Catalog",
    "description": "Unified catalog of digital goods, APIs, services, and access products.",
    "preview": "preview"
  },
  {
    "id": "module_4",
    "name": "Payment + Receipt Verification",
    "description": "Verify payment txs and generate receipts/access grants.",
    "preview": "preview"
  },
  {
    "id": "module_5",
    "name": "Dispute + Refund Workflow",
    "description": "Manage refund requests and disputed orders.",
    "preview": "preview"
  }
],
};
