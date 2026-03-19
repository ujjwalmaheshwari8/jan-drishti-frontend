import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (_req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      orderBy: { timestamp: "desc" },
    });
    res.json(complaints);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body as {
      text: string;
      boothId: string;
      issueType: string;
      sentiment: string;
      priority: string;
      location: string;
      status?: string;
    };
    if (!body.text || !body.boothId || !body.issueType || !body.sentiment || !body.priority || !body.location) {
      return res.status(400).json({ error: "Missing required fields: text, boothId, issueType, sentiment, priority, location" });
    }
    const timestamp = new Date().toISOString();
    const complaint = await prisma.complaint.create({
      data: {
        id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        text: body.text,
        issueType: body.issueType,
        sentiment: body.sentiment,
        priority: body.priority,
        location: body.location,
        timestamp,
        status: body.status ?? "Under Review",

        booth: {
          connect: { id: body.boothId }
        }
      },
    });
    res.status(201).json(complaint);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create complaint" });
  }
});

export { router as complaintsRouter };
