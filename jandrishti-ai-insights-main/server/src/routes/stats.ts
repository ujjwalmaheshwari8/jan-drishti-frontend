import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const CATEGORY_FILLS: Record<string, string> = {
  Infrastructure: "hsl(25, 95%, 53%)",
  "Water Supply": "hsl(200, 70%, 50%)",
  Electricity: "hsl(45, 90%, 50%)",
  Sanitation: "hsl(142, 72%, 40%)",
  Healthcare: "hsl(280, 60%, 50%)",
  Education: "hsl(340, 70%, 50%)",
  Safety: "hsl(0, 72%, 51%)",
  General: "hsl(220, 20%, 50%)",
};

router.get("/trend", async (_req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      select: { timestamp: true },
    });
    const byDate: Record<string, number> = {};
    for (const c of complaints) {
      const d = c.timestamp.slice(0, 10);
      byDate[d] = (byDate[d] ?? 0) + 1;
    }
    const sorted = Object.entries(byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-10)
      .map(([date, issues]) => ({
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
        issues,
      }));
    res.json(sorted.length ? sorted : [
      { date: "Mar 05", issues: 0 },
    ]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch trend" });
  }
});

router.get("/categories", async (_req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      select: { issueType: true },
    });
    const counts: Record<string, number> = {};
    for (const c of complaints) {
      counts[c.issueType] = (counts[c.issueType] ?? 0) + 1;
    }
    const data = Object.entries(counts).map(([category, count]) => ({
      category,
      count,
      fill: CATEGORY_FILLS[category] ?? "hsl(220, 20%, 50%)",
    }));
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.get("/sentiment", async (_req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      select: { sentiment: true },
    });
    const counts: Record<string, number> = { Positive: 0, Neutral: 0, Negative: 0 };
    for (const c of complaints) {
      if (c.sentiment in counts) counts[c.sentiment]++;
    }
    const data = [
      { name: "Negative", value: counts.Negative, fill: "hsl(0, 72%, 51%)" },
      { name: "Neutral", value: counts.Neutral, fill: "hsl(45, 90%, 50%)" },
      { name: "Positive", value: counts.Positive, fill: "hsl(142, 72%, 40%)" },
    ];
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch sentiment" });
  }
});

export { router as statsRouter };
