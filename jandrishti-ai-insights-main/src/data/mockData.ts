export interface Booth {
  id: string;
  name: string;
  blockId: string;
  lat: number;
  lng: number;
  issueCount: number;
  sentimentScore: number; // -1 to 1
  status: 'green' | 'yellow' | 'red';
}

export interface Block {
  id: string;
  name: string;
  booths: Booth[];
}

export interface Constituency {
  name: string;
  blocks: Block[];
  center: [number, number];
}

export interface Complaint {
  id: string;
  text: string;
  boothId: string;
  issueType: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  timestamp: string;
  status: string;
}

export interface AIAnalysisResult {
  issueType: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  location: string;
  boothId: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  keywords: string[];
  confidence: number;
}

export const ISSUE_KEYWORDS: Record<string, string[]> = {
  Infrastructure: ['road', 'roads', 'pothole', 'bridge', 'damaged', 'broken', 'construction', 'building'],
  'Water Supply': ['water', 'supply', 'pipeline', 'tap', 'drinking', 'waterlogging', 'flood'],
  Electricity: ['electricity', 'power', 'light', 'outage', 'blackout', 'transformer', 'wire'],
  Healthcare: ['hospital', 'health', 'doctor', 'medicine', 'clinic', 'medical', 'disease'],
  Sanitation: ['garbage', 'waste', 'sanitation', 'clean', 'sewage', 'drain', 'smell', 'dumping'],
  Education: ['school', 'education', 'teacher', 'student', 'college'],
  Safety: ['crime', 'safety', 'police', 'theft', 'security', 'fight'],
};

export const NEGATIVE_WORDS = ['damaged', 'broken', 'problem', 'issue', 'complaint', 'bad', 'worst', 'terrible', 'not', 'no', 'lack', 'poor', 'dirty', 'unsafe', 'dangerous', 'failing', 'failed'];
export const POSITIVE_WORDS = ['good', 'great', 'excellent', 'improved', 'better', 'fixed', 'resolved', 'clean', 'working', 'thanks', 'appreciate'];

// Bareilly Constituency mock data
export const CONSTITUENCY_DATA: Constituency = {
  name: "Bareilly Constituency",
  center: [28.3670, 79.4304],
  blocks: [
    {
      id: "block-a",
      name: "Block A",
      booths: [
        { id: "booth-101", name: "Civil Lines Booth", blockId: "block-a", lat: 28.3670, lng: 79.4150, issueCount: 12, sentimentScore: -0.6, status: 'red' },
        { id: "booth-102", name: "Izzatnagar Booth", blockId: "block-a", lat: 28.3750, lng: 79.4350, issueCount: 5, sentimentScore: -0.2, status: 'yellow' },
        { id: "booth-103", name: "Subhash Nagar Booth", blockId: "block-a", lat: 28.3600, lng: 79.4300, issueCount: 2, sentimentScore: 0.3, status: 'green' },
      ],
    },
    {
      id: "block-b",
      name: "Block B",
      booths: [
        { id: "booth-201", name: "Prem Nagar Booth", blockId: "block-b", lat: 28.3720, lng: 79.4250, issueCount: 8, sentimentScore: -0.4, status: 'yellow' },
        { id: "booth-202", name: "Delapeer Booth", blockId: "block-b", lat: 28.3800, lng: 79.4400, issueCount: 15, sentimentScore: -0.8, status: 'red' },
        { id: "booth-203", name: "Bhojipura Booth", blockId: "block-b", lat: 28.3300, lng: 79.4100, issueCount: 3, sentimentScore: 0.1, status: 'green' },
      ],
    },
    {
      id: "block-c",
      name: "Block C",
      booths: [
        { id: "booth-301", name: "Nawabganj Booth", blockId: "block-c", lat: 28.3500, lng: 79.4450, issueCount: 6, sentimentScore: -0.3, status: 'yellow' },
        { id: "booth-302", name: "CB Ganj Booth", blockId: "block-c", lat: 28.3900, lng: 79.4000, issueCount: 1, sentimentScore: 0.5, status: 'green' },
        { id: "booth-303", name: "Fatehganj Booth", blockId: "block-c", lat: 28.4020, lng: 79.4450, issueCount: 10, sentimentScore: -0.5, status: 'red' },
      ],
    },
  ],
};

export const MOCK_COMPLAINTS: Complaint[] = [
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

export const GOVERNMENT_ACTIONS = [
  { boothId: "booth-101", boothName: "Booth 101", issue: "Road Damage", department: "PWD", status: "Work Order Issued", eta: "5 days" },
  { boothId: "booth-202", boothName: "Booth 202", issue: "Garbage Collection Failure", department: "Municipal Corporation", status: "Action Initiated", eta: "2 days" },
  { boothId: "booth-201", boothName: "Booth 201", issue: "Water Supply Disruption", department: "Jal Board", status: "Team Dispatched", eta: "1 day" },
  { boothId: "booth-303", boothName: "Booth 303", issue: "School Building Repair", department: "Education Dept", status: "Inspection Scheduled", eta: "7 days" },
  { boothId: "booth-101", boothName: "Booth 101", issue: "Security Concern", department: "Police", status: "Patrol Increased", eta: "Ongoing" },
];

export const ISSUE_TREND_DATA = [
  { date: "Feb 24", issues: 8 },
  { date: "Feb 25", issues: 12 },
  { date: "Feb 26", issues: 10 },
  { date: "Feb 27", issues: 15 },
  { date: "Feb 28", issues: 18 },
  { date: "Mar 01", issues: 14 },
  { date: "Mar 02", issues: 22 },
  { date: "Mar 03", issues: 19 },
  { date: "Mar 04", issues: 25 },
  { date: "Mar 05", issues: 20 },
];

export const ISSUE_CATEGORY_DATA = [
  { category: "Infrastructure", count: 18, fill: "hsl(25, 95%, 53%)" },
  { category: "Water Supply", count: 14, fill: "hsl(200, 70%, 50%)" },
  { category: "Electricity", count: 10, fill: "hsl(45, 90%, 50%)" },
  { category: "Sanitation", count: 12, fill: "hsl(142, 72%, 40%)" },
  { category: "Healthcare", count: 5, fill: "hsl(280, 60%, 50%)" },
  { category: "Education", count: 4, fill: "hsl(340, 70%, 50%)" },
  { category: "Safety", count: 7, fill: "hsl(0, 72%, 51%)" },
];

export const SENTIMENT_DATA = [
  { name: "Negative", value: 62, fill: "hsl(0, 72%, 51%)" },
  { name: "Neutral", value: 18, fill: "hsl(45, 90%, 50%)" },
  { name: "Positive", value: 20, fill: "hsl(142, 72%, 40%)" },
];

// Simulated AI Analysis
export function analyzeText(text: string): AIAnalysisResult {
  const lower = text.toLowerCase();

  // Issue classification
  let issueType = "General";
  let maxMatches = 0;
  const foundKeywords: string[] = [];
  for (const [category, keywords] of Object.entries(ISSUE_KEYWORDS)) {
    const matches = keywords.filter(k => lower.includes(k));
    if (matches.length > maxMatches) {
      maxMatches = matches.length;
      issueType = category;
    }
    foundKeywords.push(...matches);
  }

  // Sentiment
  const negCount = NEGATIVE_WORDS.filter(w => lower.includes(w)).length;
  const posCount = POSITIVE_WORDS.filter(w => lower.includes(w)).length;
  const sentiment: 'Positive' | 'Neutral' | 'Negative' = negCount > posCount ? 'Negative' : posCount > negCount ? 'Positive' : 'Neutral';

  // Location extraction
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
    const block = CONSTITUENCY_DATA.blocks.find(b => b.id === blockMap[blockLetter]);
    if (block) {
      boothId = block.booths[0].id;
      location = `Block ${blockLetter}`;
    }
  }

  // Priority
  const priority: 'Low' | 'Medium' | 'High' | 'Critical' =
    sentiment === 'Negative' && maxMatches >= 2 ? 'Critical' :
    sentiment === 'Negative' ? 'High' :
    sentiment === 'Neutral' ? 'Medium' : 'Low';

  return {
    issueType,
    sentiment,
    location,
    boothId,
    priority,
    keywords: [...new Set(foundKeywords)],
    confidence: Math.min(0.95, 0.6 + maxMatches * 0.1 + (boothMatch ? 0.15 : 0)),
  };
}
