import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const ISSUE_KEYWORDS: Record<string, string[]> = {
  Infrastructure: ["road", "roads", "pothole", "bridge", "damaged", "broken", "construction", "building"],
  "Water Supply": ["water", "supply", "pipeline", "tap", "drinking", "waterlogging", "flood"],
  Electricity: ["electricity", "power", "light", "outage", "blackout", "transformer", "wire"],
  Healthcare: ["hospital", "health", "doctor", "medicine", "clinic", "medical", "disease"],
  Sanitation: ["garbage", "waste", "sanitation", "clean", "sewage", "drain", "smell", "dumping"],
  Education: ["school", "education", "teacher", "student", "college"],
  Safety: ["crime", "safety", "police", "theft", "security", "fight"],
};

const NEGATIVE_WORDS = ["damaged", "broken", "problem", "issue", "complaint", "bad", "worst", "terrible", "not", "no", "lack", "poor", "dirty", "unsafe", "dangerous", "failing", "failed"];
const POSITIVE_WORDS = ["good", "great", "excellent", "improved", "better", "fixed", "resolved", "clean", "working", "thanks", "appreciate"];

router.post("/", async (req, res) => {
  try {
    const { text } = req.body as { text?: string };
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'text' in body" });
    }

    const lower = text.toLowerCase();
    let issueType = "General";
    let maxMatches = 0;
    const foundKeywords: string[] = [];
    for (const [category, keywords] of Object.entries(ISSUE_KEYWORDS)) {
      const matches = keywords.filter((k) => lower.includes(k));
      if (matches.length > maxMatches) {
        maxMatches = matches.length;
        issueType = category;
      }
      foundKeywords.push(...matches);
    }

    const negCount = NEGATIVE_WORDS.filter((w) => lower.includes(w)).length;
    const posCount = POSITIVE_WORDS.filter((w) => lower.includes(w)).length;
    const sentiment: "Positive" | "Neutral" | "Negative" =
      negCount > posCount ? "Negative" : posCount > negCount ? "Positive" : "Neutral";

    const boothMatch = lower.match(/booth\s*(\d+)/);
    const blockMatch = lower.match(/block\s*([a-c])/i);
    let boothId = "";
    let location = "Unknown";

    if (boothMatch) {
      boothId = `booth-${boothMatch[1]}`;
      location = `Booth ${boothMatch[1]}`;
    } else if (blockMatch) {
      const blockLetter = blockMatch[1].toUpperCase();
      const blockMap: Record<string, string> = { A: "block-a", B: "block-b", C: "block-c" };
      const block = await prisma.block.findFirst({
        where: { id: blockMap[blockLetter] },
        include: { booths: { take: 1 } },
      });
      if (block?.booths[0]) {
        boothId = block.booths[0].id;
        location = `Block ${blockLetter}`;
      }
    }

    const priority: "Low" | "Medium" | "High" | "Critical" =
      sentiment === "Negative" && maxMatches >= 2 ? "Critical"
        : sentiment === "Negative" ? "High"
        : sentiment === "Neutral" ? "Medium"
        : "Low";

    const confidence = Math.min(0.95, 0.6 + maxMatches * 0.1 + (boothMatch ? 0.15 : 0));

    res.json({
      issueType,
      sentiment,
      location,
      boothId,
      priority,
      keywords: [...new Set(foundKeywords)],
      confidence,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Analysis failed" });
  }
});

export { router as analyzeRouter };
