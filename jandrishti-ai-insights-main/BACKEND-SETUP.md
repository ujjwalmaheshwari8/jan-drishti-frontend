# Step-by-Step: Backend + Frontend Setup

Follow these steps in order to run the backend and connect it to the current frontend.

---

## Prerequisites

- **Node.js** (v18 or newer) and **npm** installed on your machine.
- Terminal/PowerShell (or VS Code integrated terminal).

---

## Part 1: Backend Setup

### Step 1: Open the server folder

From your project root (`jandrishti-ai-insights-main`), go into the `server` folder:

```bash
cd server
```

### Step 2: Install backend dependencies

```bash
npm install
```

This installs Express, Prisma, CORS, and other server dependencies.

### Step 3: Generate the Prisma client

```bash
npm run db:generate
```

This creates the Prisma client used to talk to the database.

### Step 4: Create the database and tables

```bash
npm run db:push
```

This creates (or updates) the SQLite database file at `server/prisma/dev.db` and all tables (Constituency, Block, Booth, Complaint, GovernmentAction).

### Step 5: Seed the database with initial data

```bash
npm run db:seed
```

This fills the database with:

- One constituency (Meerut South)
- Three blocks (A, B, C)
- Nine booths with coordinates
- Ten sample complaints
- Five government actions

You should see: `Seed completed.`

### Step 6: Start the backend server

```bash
npm run dev
```

Leave this terminal open. You should see:

```
Server running at http://localhost:3001
```

The API is now running. You can test it in a browser or with curl:

- Health: http://localhost:3001/api/health
- Constituency: http://localhost:3001/api/constituency
- Complaints: http://localhost:3001/api/complaints

---

## Part 2: Connect the Frontend to the Backend

### Step 7: Open a new terminal (keep the backend running)

In a **second** terminal, go to the **project root** (not inside `server`):

```bash
cd c:\Users\mahes\Downloads\jandrishti-ai-insights-main\jandrishti-ai-insights-main
```

(Adjust the path if your project is elsewhere.)

### Step 8: Create frontend environment file

In the project root, create a file named `.env` (same folder as the main `package.json`).

**Option A – Using a text editor**

1. Create a new file.
2. Name it exactly: `.env`
3. Put this single line in it:

```
VITE_API_URL=http://localhost:3001
```

4. Save it in the project root.

**Option B – Using PowerShell (from project root)**

```powershell
echo "VITE_API_URL=http://localhost:3001" > .env
```

### Step 9: Install frontend dependencies (if not already done)

From the project root:

```bash
npm install
```

### Step 10: Start the frontend

From the project root:

```bash
npm run dev
```

The app usually runs at http://localhost:8080 (check the terminal for the exact URL).

### Step 11: Verify the connection

1. Open the app in the browser (e.g. http://localhost:8080).
2. Go to **Dashboard** – stats, map, charts, and government actions should load from the database.
3. Go to **Map** – booths and complaints should match the seeded data.
4. Go to **Admin Panel** – you should see the same complaints as in the DB.
5. On the **Landing** page, scroll to “Try AI Issue Analysis”, enter a complaint, click **Analyze with AI**. If the backend is used, you should see a **Save as complaint** button after the result; using it will add a new complaint to the database and it will appear on Dashboard/Admin.

If you see data and the “Save as complaint” option when the backend is running, the frontend is correctly using the backend.

---

## Summary Checklist

| Step | Where        | Command / Action |
|------|--------------|------------------|
| 1    | Project root | `cd server` |
| 2    | server       | `npm install` |
| 3    | server       | `npm run db:generate` |
| 4    | server       | `npm run db:push` |
| 5    | server       | `npm run db:seed` |
| 6    | server       | `npm run dev` (leave running) |
| 7    | New terminal | `cd` to project root |
| 8    | Project root | Create `.env` with `VITE_API_URL=http://localhost:3001` |
| 9    | Project root | `npm install` (if needed) |
| 10   | Project root | `npm run dev` |
| 11   | Browser      | Open app and test Dashboard, Map, Admin, AI demo |

---

## Troubleshooting

- **“Cannot find module” in server**  
  Run `npm run db:generate` again from the `server` folder.

- **Frontend still shows old/mock data**  
  Ensure `.env` is in the **project root** (next to the main `package.json`), contains `VITE_API_URL=http://localhost:3001`, and **restart** the frontend (`npm run dev`).

- **CORS or network errors**  
  Backend must be running at http://localhost:3001 before you use the frontend. Start the server with `npm run dev` in the `server` folder.

- **Port 3001 already in use**  
  Change the port in `server/.env` (e.g. `PORT=3002`) and in the frontend `.env` use `VITE_API_URL=http://localhost:3002`.

- **Re-seed the database**  
  From `server`: `npm run db:seed` (seed is written to re-populate data).

- **Inspect or edit data**  
  From `server`: `npm run db:studio` to open Prisma Studio in the browser.
