import { motion } from "framer-motion";
import { MessageSquare, Brain, TrendingDown, Tag, MapPin, BarChart3 } from "lucide-react";

const pipelineSteps = [
  { icon: MessageSquare, label: "Citizen Text / Social Media", color: "bg-accent/10 text-accent" },
  { icon: Brain, label: "NLP Processing", color: "bg-primary/10 text-primary" },
  { icon: TrendingDown, label: "Sentiment Analysis", color: "bg-danger/10 text-danger" },
  { icon: Tag, label: "Issue Classification", color: "bg-warning/10 text-warning" },
  { icon: MapPin, label: "Location Detection", color: "bg-success/10 text-success" },
  { icon: MapPin, label: "Booth Mapping", color: "bg-accent/10 text-accent" },
  { icon: BarChart3, label: "Analytics Dashboard", color: "bg-primary/10 text-primary" },
];

const AIPipelineVisual = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">AI Processing Pipeline</h2>
          <p className="mt-3 text-muted-foreground">How citizen feedback is transformed into governance intelligence</p>
        </div>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2">
          {pipelineSteps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-full max-w-md"
            >
              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
                <div className={`rounded-lg p-2.5 ${step.color}`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Step {i + 1}</div>
                  <div className="font-display font-semibold text-foreground">{step.label}</div>
                </div>
              </div>
              {i < pipelineSteps.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="h-4 w-0.5 bg-accent/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIPipelineVisual;
