# Mini User Dashboard

A small, scalable dashboard that lists users, supports role filtering & search, and shows a user detail view. Built with React + TypeScript (Vite), CSS Modules. Includes tests with Vitest + React Testing Library.

## Features

- Fetch and render users from an API endpoint (`/users.json` served from `public/`)
- Filter by role (Admin, Editor, Viewer) and free-text search by name
- User detail view in an accessible modal (or optional side panel)
- Clean, responsive UI with loading & error states
- Component-driven, typed, reusable pieces
- Unit tests for key functionality
- client-side pagination; light/dark theme toggle

## Getting Started

```bash
# Create the app from this source or copy files into a new folder
npm install
npm run dev
```
