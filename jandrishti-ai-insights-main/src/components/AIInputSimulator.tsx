import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Loader2, AlertTriangle, CheckCircle, MapPin, Tag, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyzeText, AIAnalysisResult } from "@/data/mockData";
import { useBackendAvailable, useAnalyzeMutation, useCreateComplaint } from "@/hooks/useApiData";

const EXAMPLE_COMPLAINTS = [
  "Roads are damaged near Booth 101.",
  "Water supply problem in Block B.",
  "Garbage collection not happening in Booth 202.",
  "Electricity outage in Booth 303 for 2 days.",
  "New health clinic opened near Booth 302, very helpful.",
];

const AIInputSimulator = () => {
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const { data: backendAvailable } = useBackendAvailable();
  const analyzeMutation = useAnalyzeMutation();
  const createComplaint = useCreateComplaint();

  const steps = [
    "Text Processing...",
    "Sentiment Analysis...",
    "Issue Classification...",
    "Location Extraction...",
    "Booth Mapping...",
  ];

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setResult(null);
    setProcessing(true);

    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    let analysis: AIAnalysisResult;
    if (backendAvailable) {
      try {
        const apiResult = await analyzeMutation.mutateAsync(text);
        analysis = { ...apiResult, keywords: apiResult.keywords ?? [] };
      } catch {
        analysis = analyzeText(text);
      }
    } else {
      analysis = analyzeText(text);
    }
    setResult(analysis);
    setProcessing(false);
    setStep(0);
  };

  const sentimentColor = (s: string) =>
    s === "Negative" ? "text-danger" : s === "Positive" ? "text-success" : "text-warning";
  
  const priorityColor = (p: string) =>
    p === "Critical" ? "bg-danger/10 text-danger" :
    p === "High" ? "bg-warning/10 text-warning" :
    p === "Medium" ? "bg-accent/10 text-accent" :
    "bg-success/10 text-success";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-border bg-background p-6 shadow-card">
        <div className="mb-4 flex flex-wrap gap-2">
          {EXAMPLE_COMPLAINTS.map((example, i) => (
            <button
              key={i}
              onClick={() => setText(example)}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-colors hover:bg-accent/10 hover:text-accent"
            >
              {example.slice(0, 35)}...
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a citizen complaint... e.g., 'Roads are damaged near Booth 101'"
            className="flex-1 resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            rows={3}
          />
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={processing || !text.trim()}
          className="mt-3 w-full gradient-accent border-0 text-accent-foreground"
        >
          {processing ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {steps[step]}</>
          ) : (
            <><Brain className="mr-2 h-4 w-4" /> Analyze with AI</>
          )}
        </Button>
      </div>

      {/* Processing Steps */}
      <AnimatePresence>
        {processing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden rounded-xl border border-border bg-card p-4"
          >
            {steps.map((s, i) => (
              <div key={s} className={`flex items-center gap-3 py-1.5 text-sm ${
                i < step ? "text-success" : i === step ? "text-accent font-medium" : "text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle className="h-4 w-4" /> :
                 i === step ? <Loader2 className="h-4 w-4 animate-spin" /> :
                 <div className="h-4 w-4 rounded-full border border-border" />}
                {s}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-accent/30 bg-card p-6 shadow-elevated"
          >
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Brain className="h-5 w-5 text-accent" /> AI Analysis Result
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                <Tag className="h-4 w-4 text-accent" />
                <div>
                  <div className="text-xs text-muted-foreground">Issue Type</div>
                  <div className="font-semibold text-foreground">{result.issueType}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                <AlertTriangle className={`h-4 w-4 ${sentimentColor(result.sentiment)}`} />
                <div>
                  <div className="text-xs text-muted-foreground">Sentiment</div>
                  <div className={`font-semibold ${sentimentColor(result.sentiment)}`}>{result.sentiment}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                <MapPin className="h-4 w-4 text-accent" />
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="font-semibold text-foreground">{result.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                <Gauge className="h-4 w-4 text-accent" />
                <div>
                  <div className="text-xs text-muted-foreground">Priority</div>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${priorityColor(result.priority)}`}>
                    {result.priority}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Confidence: {(result.confidence * 100).toFixed(0)}%</span>
              <span>•</span>
              <span>Keywords: {result.keywords.join(", ") || "none detected"}</span>
            </div>
            {backendAvailable && (
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                disabled={createComplaint.isPending}
                onClick={() => {
                  createComplaint.mutate(
                    {
                      text,
                      boothId: result.boothId,
                      issueType: result.issueType,
                      sentiment: result.sentiment,
                      priority: result.priority,
                      location: result.location,
                      status: "Under Review",
                    },
                    { onSuccess: () => setResult(null), onError: () => {} }
                  );
                }}
              >
                {createComplaint.isPending ? "Saving…" : "Save as complaint"}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIInputSimulator;
