---
title: "Dual CommonJS/ES module packages"
date: "2025-08-23T20:48:14.368Z"
---

[Some](https://github.com/macalinao/style-guide#ian-macalinaos-style-guide) would caution against stepping into this minefield, but at my company, we work in a monorepo that houses both frontend apps and backend microservices. Ideally, we would have configured our TypeScript packages to target only ES Modules, but that was not the case. As a result, we need to transpile certain shared packages to support both CommonJS and ES module runtimes.

## Configuration
To support multiple build targets in one package, we first need to make that explicit in the TypeScript toolchain. Here, we create `tsconfig.json` files specifying the compiler options necessary for each of our build targets:

```jsonc
// tsconfig.esm.json
{
  "compilerOptions": {
    "outDir": "dist/esm",
    "module": "ESNext",
    "moduleResolution": "bundler"
    // ... other options
  }
}
```

```jsonc
// tsconfig.cjs.json
{
  "compilerOptions": {
    "outDir": "dist/cjs",
    "module": "CommonJS",
    "moduleResolution": "node"
    // ... other options
  }
}
```

And in `package.json`, we specify the entrypoints for our package when it is imported:
```jsonc
// package.json
{
  "name": "foobar",
  "exports": {
    ".": {
        "import": "./dist/esm/index.js",
        "require": "./dist/cjs/index.js"
    }
  },
  // ...
} 
```

See the Node.js documentation for more on [conditional exports](https://nodejs.org/api/packages.html#conditional-exports).

## Build

When building, we compile our package twice, transpiling our TypeScript to ESM and CommonJS separately:

```sh
# Transpiling to ESM
tsc -P tsconfig.esm.json
# Transpiling to CommonJS
tsc -P tsconfig.cjs.json
```

and then in our final build output we should see:
```sh
dist
├── cjs
│   ├── ...
│   ├── ...
│   └── index.js
└── esm
    ├── ...
    ├── ...
    └── index.js
```

## Caution: The dual package hazard

Shipping two copies of your code is convenient for end users, but it comes with a subtle trap that the Node.js docs call the [dual package hazard](https://nodejs.org/api/packages.html#dual-commonjses-module-packages).

In our apps, `import` and `require` can pull in different copies of `foobar`:
```js
// "import" condition → ./dist/esm/index.js
import { foo, bar } from 'foobar';

// "require" condition → ./dist/cjs/index.js
const { foo, bar } = require('foobar');
```

In our monorepo, ESM frontend apps and CommonJS backend services can both depend on certain shared packages like `foobar`. If both ESM and CJS copies of `foobar` accidentally get loaded in the same process, Node.js evaluates each file independently, so `foobar` is instantiated **twice**.

For packages that only export pure functions, loading both copies can be harmless. For anything with shared state or cross-module identity, it causes two familiar failure modes:

- **Module-level state is split.** Singletons, caches, registries, startup configuration — anything you set once and read everywhere — now lives in both copies independently. If you configure through the ESM entry point, the CommonJS copy never sees it—and vice versa.
- **Object identity breaks at the boundary.** `Foo` from the ESM build and `Foo` from the CommonJS build are different constructors. `instanceof` checks fail across the two, and `===` on enums, symbols, or sentinel values won't match across the two copies.

### Avoiding it

See the Node.js documentation on [writing dual packages while avoiding or minimizing hazards](https://nodejs.org/docs/latest-v18.x/api/packages.html#writing-dual-packages-while-avoiding-or-minimizing-hazards).