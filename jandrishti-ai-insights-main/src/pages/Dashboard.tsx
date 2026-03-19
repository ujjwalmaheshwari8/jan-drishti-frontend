import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";
import { ISSUE_CATEGORY_DATA, SENTIMENT_DATA, ISSUE_TREND_DATA, CONSTITUENCY_DATA, MOCK_COMPLAINTS, GOVERNMENT_ACTIONS } from "@/data/mockData";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ConstituencyMap from "@/components/ConstituencyMap";
import { BarChart3, MapPin, TrendingUp, Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import {
  useConstituencyWhenReady,
  useComplaintsWhenReady,
  useActionsWhenReady,
  useTrendWhenReady,
  useCategoriesWhenReady,
  useSentimentWhenReady,
} from "@/hooks/useApiData";

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
    <div className="flex items-center gap-3">
     <div className={`rounded-lg p-2 ${color} shadow-lg shadow-blue-500/20`}>

        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-display text-2xl font-bold text-gray-300">{value}</div>
      </div>
    </div>
  </div>
);


const Dashboard = () => {
  const { data: constituencyApi } = useConstituencyWhenReady();
  const { data: complaintsApi } = useComplaintsWhenReady();
  const { data: actionsApi } = useActionsWhenReady();
  const { data: trendApi } = useTrendWhenReady();
  const { data: categoriesApi } = useCategoriesWhenReady();
  const { data: sentimentApi } = useSentimentWhenReady();

  const constituencyData = constituencyApi ?? CONSTITUENCY_DATA;
  const complaintsData = complaintsApi ?? MOCK_COMPLAINTS;
  const actionsData = actionsApi ?? GOVERNMENT_ACTIONS;
  const trendData = trendApi ?? ISSUE_TREND_DATA;
  const categoryData = categoriesApi ?? ISSUE_CATEGORY_DATA;
  const sentimentData = sentimentApi ?? SENTIMENT_DATA;

  const allBooths = constituencyData.blocks.flatMap((b) => b.booths);
  const totalIssues = allBooths.reduce((sum, b) => sum + b.issueCount, 0);
  const criticalBooths = allBooths.filter((b) => b.status === "red").length;

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="gradient-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-2xl font-bold text-primary-foreground">
            Governance Dashboard
          </h1>
          <p className="text-sm text-primary-foreground/80">{constituencyData.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard icon={AlertTriangle} label="Total Issues" value={String(totalIssues)} color="bg-accent/10 text-accent" />
          <StatCard icon={MapPin} label="Booths Monitored" value={String(allBooths.length)} color="bg-primary/10 text-primary" />
          <StatCard icon={Shield} label="Critical Booths" value={String(criticalBooths)} color="bg-danger/10 text-danger" />
          <StatCard icon={CheckCircle} label="Actions Taken" value={String(actionsData.length)} color="bg-success/10 text-success" />
        </div>

        {/* Map */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 rounded-xl border border-border bg-card p-5 shadow-card">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-gray-300">
            <MapPin className="h-5 w-5 text-accent" /> Constituency Map
          </h2>
          <ConstituencyMap constituency={constituencyData} complaints={complaintsData} />
        </motion.div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-gray-300">
              <BarChart3 className="h-5 w-5 text-accent" /> Issues by Category
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />

                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 12, fill: "#cbd5e1" }}
                />

                <YAxis
                  tick={{ fontSize: 12, fill: "#cbd5e1" }}
                />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h2 className="mb-4 font-display text-lg font-semibold text-gray-300">Sentiment Distribution</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {sentimentData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card mb-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-gray-300">
            <TrendingUp className="h-5 w-5 text-accent" /> Issue Trend (Last 10 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#cbd5e1" }}
              />

              <YAxis
                tick={{ fontSize: 12, fill: "#cbd5e1" }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="issues"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ fill: "#f97316" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Booth Heatmap */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card mb-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-gray-300">Booth Issue Heatmap</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {constituencyData.blocks.map((block) => (
              <div key={block.id}>
                <div className="mb-2 text-sm font-semibold text-muted-foreground">{block.name}</div>
                <div className="space-y-2">
                  {block.booths.map((booth) => (
                    <div key={booth.id} className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                      <div
                        className="h-8 w-8 rounded-lg"
                        style={{
                          backgroundColor:
                            booth.status === "red" ? "hsl(0, 72%, 51%)" :
                              booth.status === "yellow" ? "hsl(45, 90%, 50%)" :
                                "hsl(142, 72%, 40%)",
                          opacity: 0.2 + (booth.issueCount / 15) * 0.8,
                        }}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-300">{booth.name}</div>
                        <div className="text-xs text-muted-foreground">{booth.issueCount} issues</div>
                      </div>
                      <div className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${booth.status === "red" ? "bg-danger/10 text-danger" :
                        booth.status === "yellow" ? "bg-warning/10 text-warning" :
                          "bg-success/10 text-success"
                        }`}>
                        {booth.status.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Government Action Panel */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-gray-300">
            <Shield className="h-5 w-5 text-accent" /> Government Action Panel
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Booth</th>
                  <th className="pb-3 font-medium">Issue</th>
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">ETA</th>
                </tr>
              </thead>
              <tbody>
                {actionsData.map((action, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 font-medium text-gray-300">{action.boothName}</td>
                    <td className="py-3 text-gray-300">{action.issue}</td>
                    <td className="py-3 text-muted-foreground">{action.department}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                        <Clock className="h-3 w-3" /> {action.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{action.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
