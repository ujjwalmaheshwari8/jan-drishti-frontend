import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (_req, res) => {
  try {
    const actions = await prisma.governmentAction.findMany({
      include: { booth: true },
    });
    res.json(
      actions.map((a) => ({
        boothId: a.boothId,
        boothName: a.boothName,
        issue: a.issue,
        department: a.department,
        status: a.status,
        eta: a.eta,
      }))
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch government actions" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body as {
      boothId: string;
      boothName: string;
      issue: string;
      department: string;
      status: string;
      eta: string;
    };
    if (!body.boothId || !body.boothName || !body.issue || !body.department || !body.status || !body.eta) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const action = await prisma.governmentAction.create({
      data: body,
    });
    res.status(201).json(action);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create action" });
  }
});

export { router as actionsRouter };
