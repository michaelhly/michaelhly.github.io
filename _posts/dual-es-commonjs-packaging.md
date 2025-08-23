---
title: "Supporting dual CommonJS/ES module packages"
date: "2025-08-23T20:48:14.368Z"
---

[Some](https://github.com/macalinao/style-guide#ian-macalinaos-style-guide) would caution against stepping into this minefield, but at my company, we work in a monorepo that houses both frontend apps and backend microservices. Ideally, we would have configured our TypeScript packages to target only ES Modules, but that was not the case. As a result, we need to transpile certain shared packages to support both CommonJS and browser runtimes.

## Configurations
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

And in `package.json`, we specify the entrypoints for our package when imported:
```jsonc
// package.json
{
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

```jsonc
// Transpiling to ESM
tsc -P tsconfig.esm.json
// Transpiling to CommonJS
tsc -P tsconfig.cjs.json
```

and then in our final build output we should see:
```sh
dist
├── cjs
│   ├── ...
│   ├── ...
│   └── index.js
└── esm
    ├── ...
    ├── ...
    └── index.js
```
