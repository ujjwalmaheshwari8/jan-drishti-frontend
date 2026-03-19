# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Backend & Database

The app can run with **mock data only** (no backend), or connect to a **Node.js + Express + SQLite** backend.

### Running the backend

```sh
cd server
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

The API runs at `http://localhost:3001`. Endpoints:

- `GET /api/health` – health check
- `GET /api/constituency` – constituency with blocks and booths (issue counts from complaints)
- `GET /api/complaints` – all complaints
- `POST /api/complaints` – create complaint
- `GET /api/actions` – government actions
- `GET /api/stats/trend` – issue trend
- `GET /api/stats/categories` – issues by category
- `GET /api/stats/sentiment` – sentiment distribution
- `POST /api/analyze` – AI analysis of complaint text (body: `{ "text": "..." }`)

### Connecting the frontend to the backend

Create a `.env` in the **project root** (next to `package.json`):

```
VITE_API_URL=http://localhost:3001
```

Restart the Vite dev server. The dashboard, map, admin panel, and AI demo will then use the API and SQLite data. Without `VITE_API_URL`, the app uses built-in mock data.

### Database

- **SQLite** via Prisma (`server/prisma/schema.prisma`). Data is stored in `server/prisma/dev.db`.
- Run `npm run db:studio` in `server` to open Prisma Studio and edit data.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
