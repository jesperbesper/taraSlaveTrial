# React starter kit

Issue #7 bootstraps this repository with a modern React 19 + TypeScript stack powered by Vite. The goal is to provide a batteries-included foundation so you can focus entirely on product work.

## Requirements

- Node.js 18.17+ (Dev Containers and Volta both work great)
- npm 10+

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start the Vite dev server on http://localhost:5173
```

The dev server comes with fast refresh enabled. Stop it with `Ctrl+C`.

## Available scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Launches the Vite development server with hot module reloading. |
| `npm run build` | Type-checks and produces a production-ready bundle in `dist/`. |
| `npm run lint` | Runs ESLint (flat config) against all TypeScript/TSX files. |
| `npm run preview` | Serves the production bundle locally for smoke testing. |

## Project structure

```
.
├── public/                 # Static assets copied as-is to the final build
├── src/
│   ├── App.tsx             # App shell with onboarding content and links
│   ├── components/
│   │   └── FeatureCard.tsx # Example component + prop typing
│   ├── main.tsx            # React entry point
│   └── index.css           # Global design tokens + base styles
├── eslint.config.js        # Flat-config ESLint setup for TS + React Hooks
├── tsconfig*.json          # Shared and app-specific TypeScript settings
├── vite.config.ts          # Vite configuration (aliases, plugins, etc.)
└── package.json
```

## Environment variables

Vite exposes only variables prefixed with `VITE_`. Create a `.env.local` file when you need runtime configuration:

```
VITE_API_BASE_URL=https://api.example.com
VITE_FEATURE_FLAG=my-new-feature
```

Restart the dev server after changing env files.

## Next steps

- Update the placeholder content in `src/App.tsx` with the first real feature surface.
- Add a UI library or component system of choice if you need one.
- Wire CI to run `npm run lint` and `npm run build` to keep the main branch healthy.
