import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CONSTITUENCY_DATA, MOCK_COMPLAINTS, Booth, Constituency, Complaint } from "@/data/mockData";

const statusColor = (status: string) =>
  status === "red" ? "#ef4444" : status === "yellow" ? "#eab308" : "#22c55e";

interface ConstituencyMapProps {
  constituency?: Constituency;
  complaints?: Complaint[];
}

const ConstituencyMap = ({ constituency: constituencyProp, complaints: complaintsProp }: ConstituencyMapProps) => {
  const constituency = constituencyProp ?? CONSTITUENCY_DATA;
  const complaints = complaintsProp ?? MOCK_COMPLAINTS;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current).setView(constituency.center, 14);
    mapInstance.current = map;

    L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; Stadia Maps & OpenMapTiles',
    }).addTo(map);

    constituency.blocks.forEach((block) => {
      block.booths.forEach((booth) => {
        const marker = L.circleMarker([booth.lat, booth.lng], {
          radius: 10 + booth.issueCount * 0.8,
          fillColor: statusColor(booth.status),
          color: statusColor(booth.status),
          weight: 2,
          opacity: 0.9,
          fillOpacity: 0.6,
        }).addTo(map);

        marker.bindTooltip(`${booth.name} (${block.name})<br/>Issues: ${booth.issueCount}`, {
          direction: "top",
        });

        marker.on("click", () => setSelectedBooth(booth));
      });
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [constituency.center, constituency.blocks]);

  const boothComplaints = selectedBooth
    ? complaints.filter((c) => c.boothId === selectedBooth.id)
    : [];

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex-1">
       <div className="relative">
  <div
    ref={mapRef}
    className="h-[500px] w-full rounded-xl border border-white/10 shadow-xl overflow-hidden"
  />
  <div className="pointer-events-none absolute inset-0 bg-black/20 rounded-xl" />
</div>
        <div className="mt-3 flex items-center justify-center gap-6 text-sm text-gray-300">
          {[
            { color: "#22c55e", label: "No Major Issues" },
            { color: "#eab308", label: "Moderate Issues" },
            { color: "#ef4444", label: "High Issues" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {selectedBooth && (
        <div className="w-full rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-xl lg:w-80">
          <h3 className="font-display text-lg font-bold text-foreground">{selectedBooth.name}</h3>
          <p className="text-sm text-gray-300">
            {constituency.blocks.find((b) => b.id === selectedBooth.blockId)?.name}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-secondary p-3 text-center">
              <div className="text-2xl font-bold text-foreground">{selectedBooth.issueCount}</div>
              <div className="text-xs text-gray-300">Issues</div>
            </div>
            <div className="rounded-lg bg-secondary p-3 text-center">
              <div className={`text-2xl font-bold ${selectedBooth.status === "red" ? "text-danger" :
                selectedBooth.status === "yellow" ? "text-warning" : "text-success"
                }`}>
                {selectedBooth.status === "red" ? "High" : selectedBooth.status === "yellow" ? "Med" : "Low"}
              </div>
              <div className="text-xs text-gray-300">Severity</div>
            </div>
          </div>
          <h4 className="mb-2 mt-4 font-display text-sm font-semibold text-foreground">Recent Complaints</h4>
          <div className="max-h-60 space-y-2 overflow-y-auto">
            {boothComplaints.length > 0 ? boothComplaints.map((c) => (
              <div key={c.id} className="rounded-lg border border-border bg-background p-3">
                <p className="text-xs text-foreground">{c.text}</p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-300">
                  <span className={c.sentiment === "Negative" ? "text-danger" : "text-success"}>{c.sentiment}</span>
                  <span>•</span>
                  <span>{c.issueType}</span>
                </div>
              </div>
            )) : (
              <p className="text-xs text-gray-300">No complaints on record.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstituencyMap;
