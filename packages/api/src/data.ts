import { buildActivity, demoAddress, type ActivityEvent, type ApprovalRequest, type ProductItem, type ProductModule } from "@kitecommerce-agent-network/core";

export const modules: ProductModule[] = [
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
];

export const items: ProductItem[] = [
  {
    "id": "catalog_item_1",
    "name": "Buyer Agent",
    "description": "Agent that compares products and proposes purchases within policy.",
    "owner": demoAddress,
    "status": "active",
    "risk": "medium",
    "moduleId": "module_1",
    "budgetKite": "5",
    "createdAt": "2026-06-06T02:00:00.000Z"
  },
  {
    "id": "catalog_item_2",
    "name": "Merchant Agent",
    "description": "Seller-side agent that manages listings, questions, orders, and fulfillment.",
    "owner": demoAddress,
    "status": "active",
    "risk": "high",
    "moduleId": "module_2",
    "budgetKite": "50",
    "createdAt": "2026-06-06T02:00:00.000Z"
  },
  {
    "id": "catalog_item_3",
    "name": "Product/API Catalog",
    "description": "Unified catalog of digital goods, APIs, services, and access products.",
    "owner": demoAddress,
    "status": "draft",
    "risk": "low",
    "moduleId": "module_3",
    "budgetKite": "0",
    "createdAt": "2026-06-06T02:00:00.000Z"
  }
];

export const activity: ActivityEvent[] = [
  buildActivity(items[0], "KiteCommerce Agent Network preview event accepted", new Date("2026-06-06T02:10:00.000Z")),
  buildActivity(items[1], "Risky Kite action queued for explicit approval", new Date("2026-06-06T02:20:00.000Z")),
];

export const approvals: ApprovalRequest[] = [
  {
    id: "approval_1",
    itemId: items[1].id,
    status: "pending",
    reason: "High-risk or fund-moving Kite action requires explicit approval.",
    risk: "high",
    requestedAt: "2026-06-06T02:20:00.000Z",
  },
];

export function createItem(input: Pick<ProductItem, "name" | "description" | "owner">) {
  const item: ProductItem = {
    id: `catalog_item_${Date.now()}`,
    name: input.name,
    description: input.description,
    owner: input.owner,
    status: "draft",
    risk: "low",
    moduleId: modules[0].id,
    budgetKite: "0",
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
  return item;
}
