import { useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useGetMapMarkers } from "@workspace/api-client-react";

const citizenMarkerIcon = L.divIcon({
  className: "citizen-map-marker",
  html: '<div style="width:24px;height:24px;border-radius:999px;background:#06b6d4;border:2px solid white;box-shadow:0 0 14px rgba(6,182,212,.6)"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapThemeUpdater() {
  const map = useMap();
  useEffect(() => {
    const timer = window.setTimeout(() => map.invalidateSize(), 200);
    return () => window.clearTimeout(timer);
  }, [map]);
  return null;
}

export function CitizenMap() {
  const { data } = useGetMapMarkers();
  const markers = data || [
    { id: 1, type: "incident", title: "Waste overflow", lat: 12.9763, lng: 77.5929, severity: "high", status: "open" },
    { id: 2, type: "incident", title: "Illegal dumping", lat: 12.9791, lng: 77.5913, severity: "medium", status: "in_progress" },
    { id: 3, type: "incident", title: "Overflowing bin", lat: 12.9698, lng: 77.64, severity: "low", status: "open" },
  ];
  return (
    <div className="relative h-[calc(100vh-64px)] min-h-[560px] w-full bg-[#0a0f1e]">
      <div className="absolute left-4 top-4 z-[400] w-[min(22rem,calc(100%-2rem))] rounded-2xl border border-white/10 bg-[#0e1628]/95 p-5 shadow-2xl backdrop-blur-xl sm:left-6 sm:top-6"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><MapPin className="h-4 w-4" /> The map</div><h1 className="mt-3 text-xl font-bold">Choose a place to report</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the map to orient yourself in Bengaluru before opening your citizen report.</p><div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-400"><Navigation className="h-3.5 w-3.5 text-primary" /> Bengaluru, Karnataka</div></div>
      <MapContainer center={[12.9716, 77.5946]} zoom={12} zoomControl className="h-full w-full"><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="map-tiles" /><MapThemeUpdater />{markers.map((marker) => <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={citizenMarkerIcon}><Popup><div className="min-w-[150px]"><p className="text-xs font-semibold">{marker.title}</p><p className="mt-1 text-[11px] text-slate-500">{marker.status.replace("_", " ")} · {marker.severity} priority</p></div></Popup></Marker>)}</MapContainer>
    </div>
  );
}
