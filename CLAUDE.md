# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application for plant lending. The project uses React 19 with TypeScript and follows a component-based architecture.

## Development Commands

- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build` (runs TypeScript compilation followed by Vite build)
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Project Structure

The codebase follows a feature-organized structure:

```
src/
├── components/
│   ├── layout/      # Layout components
│   ├── pages/       # Page-level components
│   └── sections/    # Reusable section components
├── models/          # TypeScript types and interfaces
├── services/        # Business logic and API services
└── main.tsx         # Application entry point
```

## Architecture

- **Entry Point**: `src/main.tsx` renders the root `Layout` component
- **Styling**: Component-specific CSS files co-located with their components (e.g., `Layout.tsx` has `Layout.css`)
- **TypeScript Config**: Uses project references with separate configs for app code (`tsconfig.app.json`) and build tools (`tsconfig.node.json`)
- **Build Tool**: Vite with React plugin using Babel for Fast Refresh

## TypeScript Configuration

The project uses strict TypeScript settings including:
- Strict mode enabled
- No unused locals/parameters
- Module resolution in bundler mode
- React JSX transform
