# KiteCommerce Agent Network Proof of Work

This repository is a public Kite AI project build with source prompts, runnable code, verification commands, a Vercel deployment, and a rendered screenshot.

## Public Links

- GitHub repo: https://github.com/gnanam1990/kitecommerce-agent-network
- Live Vercel URL: https://kitecommerce-agent-network.vercel.app
- Deployment URL: https://kitecommerce-agent-network-i91855qj9-gnanam1990s-projects.vercel.app
- Vercel inspect URL: https://vercel.com/gnanam1990s-projects/kitecommerce-agent-network/5RSYPDQiBSXrxCKShx1Ci4VJesr8
- Vercel deployment ID: `dpl_5RSYPDQiBSXrxCKShx1Ci4VJesr8`

## Commit Trail

The visible public history is intentionally split into meaningful work units:

1. `feat: build KiteCommerce Agent Network MVP`
2. `chore: add Vercel deployment config`
3. `docs: add deployment proof of work`

## Verification Evidence

Local verification completed before deployment:

```bash
pnpm install --frozen-lockfile=false
pnpm -r typecheck
pnpm -r lint
pnpm -r test
pnpm --filter @kitecommerce-agent-network/web build
```

Vercel verification completed during deployment:

- Install command: `pnpm install --frozen-lockfile=false`
- Build command: `pnpm --filter @kitecommerce-agent-network/web build`
- Output directory: `packages/web/dist`
- Ready state: `READY`

## Rendered Screenshot

![KiteCommerce Agent Network rendered app](./screenshot.jpg)

## Safety Notes

- This is a preview-safe Kite AI application.
- Risky, fund-moving, or wallet actions are clearly approval-first in the product copy and code.
- No official mainnet contract address is invented by this project.
