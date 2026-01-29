# Noteveil

The desktop-first personal productivity app

Noteveil solves the problem for personal projects of "Wait I gotta learn X tool just to log my progress?" by providing a clean slate that gets out of your way and lets you work.
Store your ideas in markdown-supported notes, log your tasks and create workflow pipelines with the tasks menu and group your work through projects.

---

## Features

### Structure

- Projects 
    - Task lists 
        - Tasks 
    - projects

---

### Workflow

Apart from regular CRUD work, noteveil supports several intuitive ways to make logging work and goals easier.

#### Automation 

Task lists support the `Goes To` option: users can move their tasks to another list on completion, supporting tiny workflow automations such as `ToDo` -> `In Progress` -> `Done`

---

#### Keyboard Shortcuts

Markdown-enabled notes allow for easy and expressive logging of notes.

Notes and task lists support several keyboard shortcuts: 
- `Ctrl+Enter` - quick submit note content
- `Escape` - cancel/discard
- `Enter` - submit title/task
- `ctrl+Tab` - edit next note 

---

Noteveil's robust state management engine allows for custom activity management, leading to a smooth UX:
- Adding a new Note immediately sets you to edit its title.
- Submitting a note's title will move you towards editing.
- When you navigate the final note with `ctrl+Tab`, the next note will be the first one.
- Context-aware editing switches: dirty checking for unsaved changes.

---

### Authentication

- Support for both manual and **Google OAuth 2** login.

- JWT authentication + and HTTPOnly cookies

---

## Architecture

### Frontend: 

The frontend follows a simple rule -> business logic is in hooks, limit event propagation with context providers, view components should be self-contained.

This allows for flexible development and less dependency management leading to quick prototyping and less moments off "can't use the app until feature X is fully added".

---

### Backend:

Clean architecture:
- Routes handle user requests
    - middleware handles authentication and custom checking for specific param and body fields before requests are handed off to controllers
- Controllers form the JSON response by interpreting service returns
- Services handle business logic, log server-side errors before calling repositories
- Repositories use a lightweight hand-rolled query-builder where possible to execute database operations via query objects

---

### Organization:
```
monorepo/
├── frontend/      # React/TypeScript app
├── backend/       # Express/TypeScript API + SQLite
└── db/            # SQLite DB file
```

*Frontend and backend are fully integrated in production (served from one port, no CORS needed)*
*Backend handles authentication, CRUD APIs, and serves frontend SPA*
*SQLite path is production-safe (uses process.cwd() or DB_PATH env variable)*

---

### Tools

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node + TypeScript + Express
- **DB:** SQLite

---

## Requirements

- Node.js v18+ (tested on Node 25)
- NPM v9+
- SQLite (bundled via better-sqlite3)

## Getting Started (Local Dev)

1. Clone the repo:
    `gh repo clone HShrigma/noteveil` 
    *or*
    `git clone https://github.com/HShrigma/noteveil.git`
2. Install dependencies:
    ```
    cd frontend
    npm install
    cd ../backend
    npm install
    ```
3. Setup .env in backend:

    ``` bash
    PORT
    CLIENT
    # OAuth
    GOOGLE_CLIENT_ID
    AUTH_ROUTE

    # Encryption
    SALT_ROUNDS

    # JWT
    JWT_SECRET
    JWT_ACCESS_EXPIRES_IN_S
    JWT_REFRESH_EXPIRES_IN_S
    ```
4. Setup .env in frontend:
    `VITE_GOOGLE_CLIENT_ID`

5. Run dev servers:

    ``` bash
    # frontend dev
    cd frontend
    npm run dev

    # backend dev
    cd ../backend
    npm run dev
    ```

    *Frontend runs on http://localhost:5173 (Vite dev server)*
    *Backend runs on http://localhost:4000*

6. Production Build & Run (Local)
    6.1 Frontend:
    ``` bash
        cd frontend
        npm run build
        # produces frontend/dist/
        npm run start
    ```
    6.2 Backend:
    ``` bash
        cd backend
        npm run build
        npm start
        # server runs at http://localhost:4000
    ```
*Frontend is served from Express (frontend/dist)*
*SPA routing works with React Router*
*API routes: /api/*

---

### Deployment Notes

- SQLite path is production-safe via process.cwd() or DB_PATH env

- Google OAuth and cookies work without CORS when frontend is served from backend (production)

- Use the same port for frontend + backend to avoid proxy headaches on production

- Compatible with Render, Railway, Fly.io, VPS, or any Node host

### Folder Structure

#### Frontend (frontend/):
```
src/
├── api/          # API fetch helpers
├── components/   # UI components
├── context/      # React context providers
├── hooks/        # Custom hooks
├── utils/        # Utilities/helpers
├── types/        # TS types
├── index.html
├── main.tsx

```
#### Backend (backend/):

```
src/
├── config/       # DB config, schema
├── controllers/  # Route controllers
├── routes/       # Express routers
├── services/     # Business logic
├── repository/   # DB access
├── utils/        # Helpers, middleware, security
└── index.ts      # Entry point
```

MIT © Hristo Stantchev
