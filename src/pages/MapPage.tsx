import ConstituencyMap from "@/components/ConstituencyMap";
import { MapPin } from "lucide-react";
import { useConstituencyWhenReady, useComplaintsWhenReady } from "@/hooks/useApiData";
import { CONSTITUENCY_DATA, MOCK_COMPLAINTS } from "@/data/mockData";

const MapPage = () => {
  const { data: constituencyApi } = useConstituencyWhenReady();
  const { data: complaintsApi } = useComplaintsWhenReady();
  const constituency = constituencyApi ?? CONSTITUENCY_DATA;
  const complaints = complaintsApi ?? MOCK_COMPLAINTS;

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-primary-foreground">
            <MapPin className="h-6 w-6 text-accent" /> Constituency Map
          </h1>
          <p className="text-sm text-primary-foreground/60">Interactive booth-level geospatial view</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <ConstituencyMap constituency={constituency} complaints={complaints} />
      </div>
    </div>
  );
};

export default MapPage;
