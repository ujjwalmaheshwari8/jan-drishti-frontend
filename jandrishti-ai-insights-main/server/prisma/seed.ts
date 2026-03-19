import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const constituency = await prisma.constituency.upsert({
    where: { id: "meerut-south" },
    create: {
      id: "meerut-south",
      name: "Meerut South Constituency",
      centerLat: 28.97,
      centerLng: 77.71,
    },
    update: {},
  });

  const blocksData = [
    { id: "block-a", name: "Block A" },
    { id: "block-b", name: "Block B" },
    { id: "block-c", name: "Block C" },
  ];

  for (const b of blocksData) {
    await prisma.block.upsert({
      where: { id: b.id },
      create: { id: b.id, name: b.name, constituencyId: constituency.id },
      update: {},
    });
  }

  const boothsData = [
    { id: "booth-101", name: "Booth 101", blockId: "block-a", lat: 28.975, lng: 77.705 },
    { id: "booth-102", name: "Booth 102", blockId: "block-a", lat: 28.978, lng: 77.712 },
    { id: "booth-103", name: "Booth 103", blockId: "block-a", lat: 28.972, lng: 77.718 },
    { id: "booth-201", name: "Booth 201", blockId: "block-b", lat: 28.965, lng: 77.7 },
    { id: "booth-202", name: "Booth 202", blockId: "block-b", lat: 28.962, lng: 77.71 },
    { id: "booth-203", name: "Booth 203", blockId: "block-b", lat: 28.96, lng: 77.72 },
    { id: "booth-301", name: "Booth 301", blockId: "block-c", lat: 28.955, lng: 77.705 },
    { id: "booth-302", name: "Booth 302", blockId: "block-c", lat: 28.952, lng: 77.715 },
    { id: "booth-303", name: "Booth 303", blockId: "block-c", lat: 28.95, lng: 77.708 },
  ];

  for (const b of boothsData) {
    await prisma.booth.upsert({
      where: { id: b.id },
      create: b,
      update: {},
    });
  }

  const complaintsData = [
    { id: "c1", text: "Roads are severely damaged near Booth 101, multiple potholes reported.", boothId: "booth-101", issueType: "Infrastructure", sentiment: "Negative", priority: "High", location: "Booth 101", timestamp: "2026-03-04T10:30:00", status: "Under Review" },
    { id: "c2", text: "Water supply has been irregular for 3 days in Block B area.", boothId: "booth-201", issueType: "Water Supply", sentiment: "Negative", priority: "High", location: "Booth 201", timestamp: "2026-03-04T11:15:00", status: "Assigned to Jal Board" },
    { id: "c3", text: "Garbage collection not happening in Booth 202 since last week.", boothId: "booth-202", issueType: "Sanitation", sentiment: "Negative", priority: "Critical", location: "Booth 202", timestamp: "2026-03-04T09:00:00", status: "Municipal Action Initiated" },
    { id: "c4", text: "Streetlights not working near Booth 103 creating safety issues.", boothId: "booth-103", issueType: "Electricity", sentiment: "Negative", priority: "Medium", location: "Booth 103", timestamp: "2026-03-03T16:45:00", status: "Assigned to Power Dept" },
    { id: "c5", text: "New health clinic opened near Booth 302, very helpful for residents.", boothId: "booth-302", issueType: "Healthcare", sentiment: "Positive", priority: "Low", location: "Booth 302", timestamp: "2026-03-03T14:20:00", status: "Noted" },
    { id: "c6", text: "Drain overflow causing waterlogging near Booth 301.", boothId: "booth-301", issueType: "Water Supply", sentiment: "Negative", priority: "High", location: "Booth 301", timestamp: "2026-03-03T08:30:00", status: "Under Review" },
    { id: "c7", text: "Road repair completed near Booth 102, good work by PWD.", boothId: "booth-102", issueType: "Infrastructure", sentiment: "Positive", priority: "Low", location: "Booth 102", timestamp: "2026-03-02T17:00:00", status: "Resolved" },
    { id: "c8", text: "Power outage in Booth 202 area for over 6 hours.", boothId: "booth-202", issueType: "Electricity", sentiment: "Negative", priority: "Critical", location: "Booth 202", timestamp: "2026-03-02T22:10:00", status: "Emergency Response" },
    { id: "c9", text: "School building in poor condition near Booth 303.", boothId: "booth-303", issueType: "Education", sentiment: "Negative", priority: "Medium", location: "Booth 303", timestamp: "2026-03-02T12:00:00", status: "Under Review" },
    { id: "c10", text: "Crime rate increasing near Booth 101, need more police patrolling.", boothId: "booth-101", issueType: "Safety", sentiment: "Negative", priority: "High", location: "Booth 101", timestamp: "2026-03-01T20:30:00", status: "Assigned to Police" },
  ];

  for (const c of complaintsData) {
    await prisma.complaint.upsert({
      where: { id: c.id },
      create: c,
      update: {},
    });
  }

  const actionsData = [
    { boothId: "booth-101", boothName: "Booth 101", issue: "Road Damage", department: "PWD", status: "Work Order Issued", eta: "5 days" },
    { boothId: "booth-202", boothName: "Booth 202", issue: "Garbage Collection Failure", department: "Municipal Corporation", status: "Action Initiated", eta: "2 days" },
    { boothId: "booth-201", boothName: "Booth 201", issue: "Water Supply Disruption", department: "Jal Board", status: "Team Dispatched", eta: "1 day" },
    { boothId: "booth-303", boothName: "Booth 303", issue: "School Building Repair", department: "Education Dept", status: "Inspection Scheduled", eta: "7 days" },
    { boothId: "booth-101", boothName: "Booth 101", issue: "Security Concern", department: "Police", status: "Patrol Increased", eta: "Ongoing" },
  ];

  await prisma.governmentAction.deleteMany({});
  for (const a of actionsData) {
    await prisma.governmentAction.create({ data: a });
  }

  console.log("Seed completed.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
