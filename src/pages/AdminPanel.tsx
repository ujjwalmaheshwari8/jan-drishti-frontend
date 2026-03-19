import { MOCK_COMPLAINTS, CONSTITUENCY_DATA, GOVERNMENT_ACTIONS } from "@/data/mockData";
import { Settings, Eye, MapPin, Tag, Clock } from "lucide-react";
import { useConstituencyWhenReady, useComplaintsWhenReady } from "@/hooks/useApiData";

const AdminPanel = () => {
  const { data: constituencyApi } = useConstituencyWhenReady();
  const { data: complaintsApi } = useComplaintsWhenReady();
  const constituencyData = constituencyApi ?? CONSTITUENCY_DATA;
  const complaintsData = complaintsApi ?? MOCK_COMPLAINTS;
  const allBooths = constituencyData.blocks.flatMap((b) => b.booths);

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-primary-foreground">
            <Settings className="h-6 w-6 text-accent" /> Admin Panel
          </h1>
          <p className="text-sm text-primary-foreground/60">Prototype administrative view</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* All Complaints */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <Eye className="h-5 w-5 text-accent" /> All Complaints ({complaintsData.length})
          </h2>
          <div className="space-y-3">
            {complaintsData.map((c) => (
              <div key={c.id} className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <p className="text-sm text-foreground">{c.text}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{c.location}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1"><Tag className="h-3 w-3" />{c.issueType}</span>
                    <span>•</span>
                    <span className={c.sentiment === "Negative" ? "text-danger" : "text-success"}>{c.sentiment}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    c.priority === "Critical" ? "bg-danger/10 text-danger" :
                    c.priority === "High" ? "bg-warning/10 text-warning" :
                    c.priority === "Medium" ? "bg-accent/10 text-accent" :
                    "bg-success/10 text-success"
                  }`}>{c.priority}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />{c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booth Insights */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Booth-Level Insights</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allBooths.map((booth) => {
              const block = constituencyData.blocks.find((b) => b.id === booth.blockId);
              const complaints = complaintsData.filter((c) => c.boothId === booth.id);
              return (
                <div key={booth.id} className="rounded-lg border border-border bg-background p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-semibold text-foreground">{booth.name}</div>
                      <div className="text-xs text-muted-foreground">{block?.name}</div>
                    </div>
                    <div className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      booth.status === "red" ? "bg-danger/10 text-danger" :
                      booth.status === "yellow" ? "bg-warning/10 text-warning" :
                      "bg-success/10 text-success"
                    }`}>{booth.status.toUpperCase()}</div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {booth.issueCount} issues • {complaints.length} complaints on record
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
