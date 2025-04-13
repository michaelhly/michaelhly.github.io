---
title: "Node.js packaging configurations"
date: "2025-04-13T05:35:07.322Z"
---

Some useful `package.json` manifest configurations I found out this year when packaging Node.js modules. 

1. Compatibilty for both ECMAScript and CommonJS

Working in monorepo settings, I often find the need to transpile a Typescript package to support both CommonJS and ESM style targets.

```jsonc
// tsconfig.esm.json
```

```jsonc
// tsconfig.cjs.json
```

```jsonc
// package.json
```

2. Subpath exports

Also at times, I find the need to expose certain modules through particular subpaths.

```ts
// my-package/src/replay/index.ts
export * from '@puppeteer/replay';
```


```jsonc
// package.json
```
