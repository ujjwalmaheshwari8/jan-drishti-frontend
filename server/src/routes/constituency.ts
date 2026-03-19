import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

function sentimentToScore(s: string): number {
  if (s === "Negative") return -1;
  if (s === "Positive") return 1;
  return 0;
}

function getStatus(issueCount: number, sentimentScore: number): "green" | "yellow" | "red" {
  if (issueCount >= 10 || sentimentScore <= -0.5) return "red";
  if (issueCount >= 4 || sentimentScore < 0) return "yellow";
  return "green";
}

router.get("/", async (_req, res) => {
  try {
    const [constituency] = await prisma.constituency.findMany({
      include: {
        blocks: {
          include: {
            booths: {
              include: { complaints: true },
            },
          },
        },
      },
    });
    if (!constituency) {
      return res.status(404).json({ error: "Constituency not found" });
    }
    const blocks = constituency.blocks.map((block) => ({
      id: block.id,
      name: block.name,
      booths: block.booths.map((booth) => {
        const issueCount = booth.complaints.length;
        const sentimentScore =
          booth.complaints.length === 0
            ? 0
            : booth.complaints.reduce((s, c) => s + sentimentToScore(c.sentiment), 0) /
              booth.complaints.length;
        const status = getStatus(issueCount, sentimentScore);
        return {
          id: booth.id,
          name: booth.name,
          blockId: booth.blockId,
          lat: booth.lat,
          lng: booth.lng,
          issueCount,
          sentimentScore: Math.round(sentimentScore * 100) / 100,
          status,
        };
      }),
    }));
    res.json({
      name: constituency.name,
      blocks,
      center: [constituency.centerLat, constituency.centerLng] as [number, number],
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch constituency" });
  }
});

export { router as constituencyRouter };
