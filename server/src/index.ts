import express from "express";
import cors from "cors";
import { constituencyRouter } from "./routes/constituency.js";
import { complaintsRouter } from "./routes/complaints.js";
import { actionsRouter } from "./routes/actions.js";
import { statsRouter } from "./routes/stats.js";
import { analyzeRouter } from "./routes/analyze.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/constituency", constituencyRouter);
app.use("/api/complaints", complaintsRouter);
app.use("/api/actions", actionsRouter);
app.use("/api/stats", statsRouter);
app.use("/api/analyze", analyzeRouter);

app.get("/api/categories", (req, res) => {
  res.json([
    { category: "Water", count: 8, fill: "#3b82f6" },
    { category: "Road", count: 5, fill: "#ef4444" },
    { category: "Electricity", count: 6, fill: "#f59e0b" },
    { category: "Sanitation", count: 4, fill: "#10b981" }
  ]);
});

app.post("/api/complaints", (req, res) => {
  const newComplaint = req.body;

  newComplaint.push({
    id: newComplaint.length + 1,
    ...newComplaint,
    createdAt: new Date()
  });

  res.json({
    success: true,
    message: "Complaint added successfully"
  });
});

app.get("/api/trend", (req, res) => {
  res.json([
    { date: "Day 1", issues: 5 },
    { date: "Day 2", issues: 8 },
    { date: "Day 3", issues: 6 },
    { date: "Day 4", issues: 9 },
    { date: "Day 5", issues: 4 }
  ]);
});

app.get("/api/sentiment", (req, res) => {
  res.json([
    { name: "Positive", value: 40, fill: "#22c55e" },
    { name: "Neutral", value: 35, fill: "#eab308" },
    { name: "Negative", value: 25, fill: "#ef4444" }
  ]);
});

app.get("/api/actions", (req, res) => {
  res.json([
    {
      boothName: "Booth 12",
      issue: "Water leakage",
      department: "Water Dept",
      status: "In Progress",
      eta: "2 days"
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
