import { useEffect, useState } from "react";
import { useGetMapMarkers } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Layers, 
  MapPin, 
  AlertTriangle, 
  Cctv, 
  Wind,
  Navigation
} from "lucide-react";
import { cn } from "@/lib/utils";

// We'll dynamically import leaflet components to avoid SSR issues if this was Next.js,
// but for Vite/React it's safe. However, we need to ensure Leaflet CSS is loaded.
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons for Map
const createCustomIcon = (color: string, iconHtml: string) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 0 10px ${color}80; color: white;">${iconHtml}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

const icons = {
  incident: createCustomIcon('#f59e0b', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>'),
  camera: createCustomIcon('#06b6d4', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.75 10.5 21 6v12l-4.25-4.5"/><path d="M14 6h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"/></svg>'),
  aqi: createCustomIcon('#10b981', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>')
};

function MapThemeUpdater() {
  const map = useMap();
  useEffect(() => {
    // Force tile redraw when theme changes (handled via CSS filter, but good to trigger resize)
    setTimeout(() => { map.invalidateSize(); }, 200);
  }, [map]);
  return null;
}

export function MapView() {
  const { data, isLoading } = useGetMapMarkers();
  const [activeLayers, setActiveLayers] = useState({
    incidents: true,
    cameras: true,
    sensors: true
  });

  const markers = data || [
    { id: 1, type: "incident", title: "Waste Overflow", lat: 12.9763, lng: 77.5929, severity: "high", status: "open" },
    { id: 2, type: "incident", title: "Broken Streetlight", lat: 12.9757, lng: 77.6011, severity: "low", status: "open" },
    { id: 3, type: "camera", title: "Vidhana Soudha Cam", lat: 12.9793, lng: 77.5906, status: "online" },
    { id: 4, type: "camera", title: "Cubbon Park Cam", lat: 12.9718, lng: 77.5937, status: "online" },
    { id: 5, type: "aqi", title: "Central Bengaluru Sensor", lat: 12.9766, lng: 77.5993, status: "active" },
    { id: 6, type: "aqi", title: "Peenya Sensor", lat: 13.0292, lng: 77.5171, status: "active" }
  ];

  const visibleMarkers = markers.filter(m => {
    if (m.type === 'incident' && !activeLayers.incidents) return false;
    if (m.type === 'camera' && !activeLayers.cameras) return false;
    if (m.type === 'aqi' && !activeLayers.sensors) return false;
    return true;
  });

  return (
    <div className="h-[calc(100vh-64px)] w-full relative flex">
      {/* Sidebar Controls */}
      <div className="w-80 border-r border-white/5 bg-background/95 backdrop-blur-xl z-[400] flex flex-col shadow-2xl relative">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold tracking-tight">Interactive Map</h2>
          <p className="text-sm text-muted-foreground mt-1">Real-time geospatial intelligence.</p>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4" /> Map Layers
            </h3>
            <div className="space-y-3">
              <LayerToggle 
                label="Active Incidents" 
                icon={AlertTriangle} 
                color="text-amber-500" 
                count={markers.filter(m=>m.type==='incident').length} 
                active={activeLayers.incidents}
                onChange={() => setActiveLayers(prev => ({...prev, incidents: !prev.incidents}))}
              />
              <LayerToggle 
                label="CCTV Network" 
                icon={Cctv} 
                color="text-cyan-400" 
                count={markers.filter(m=>m.type==='camera').length} 
                active={activeLayers.cameras}
                onChange={() => setActiveLayers(prev => ({...prev, cameras: !prev.cameras}))}
              />
              <LayerToggle 
                label="Env. Sensors" 
                icon={Wind} 
                color="text-emerald-500" 
                count={markers.filter(m=>m.type==='aqi').length} 
                active={activeLayers.sensors}
                onChange={() => setActiveLayers(prev => ({...prev, sensors: !prev.sensors}))}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Recent Map Events</h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-xs font-semibold text-foreground">New Incident Reported</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Downtown Square, Sector 4
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-[#0a0f1e] z-0">
        <MapContainer 
          center={[12.9716, 77.5946]} 
          zoom={13} 
          zoomControl={false}
          className="w-full h-full"
        >
          {/* Dark themed tile layer using CSS filter defined in index.css */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles"
          />
          <ZoomControl position="bottomright" />
          <MapThemeUpdater />

          {visibleMarkers.map(marker => (
            <Marker 
              key={marker.id} 
              position={[marker.lat, marker.lng]}
              icon={icons[marker.type as keyof typeof icons] || icons.incident}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="text-xs font-mono uppercase text-muted-foreground mb-1 flex items-center gap-1">
                    {marker.type === 'incident' ? <AlertTriangle className="w-3 h-3 text-amber-500"/> :
                     marker.type === 'camera' ? <Cctv className="w-3 h-3 text-cyan-400"/> :
                     <Wind className="w-3 h-3 text-emerald-500"/>}
                    {marker.type}
                  </div>
                  <h3 className="font-semibold text-base text-foreground leading-tight mb-2">{marker.title}</h3>
                  <div className="flex justify-between items-center text-xs border-t border-slate-200 dark:border-slate-800 pt-2 mt-2">
                    <span className="text-muted-foreground">Status: <span className="text-foreground capitalize">{marker.status}</span></span>
                    <button className="text-primary hover:underline font-medium">Details →</button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating UI overlays on map */}
        <div className="absolute top-6 right-6 z-[400] glass-panel px-4 py-2 rounded-full flex items-center gap-3 shadow-xl">
          <Navigation className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono font-medium">Bengaluru, Karnataka</span>
        </div>
      </div>

      {/* Global override for Leaflet popups to match our dark theme */}
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: hsl(var(--card));
          color: hsl(var(--foreground));
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        }
        .custom-popup .leaflet-popup-tip {
          background: hsl(var(--card));
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        }
        .custom-popup .leaflet-popup-close-button {
          color: hsl(var(--muted-foreground)) !important;
        }
      `}</style>
    </div>
  );
}

function LayerToggle({ label, icon: Icon, color, count, active, onChange }: any) {
  return (
    <label className={cn(
      "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
      active ? "bg-white/10 border-white/20" : "bg-transparent border-white/5 hover:bg-white/5 opacity-60 hover:opacity-100"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn("w-8 h-8 rounded-md flex items-center justify-center bg-black/40", active ? color : "text-muted-foreground")}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground">{count}</span>
        <div className={cn(
          "w-8 h-4 rounded-full transition-colors relative",
          active ? "bg-primary" : "bg-slate-700"
        )}>
          <div className={cn(
            "w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform",
            active ? "translate-x-4" : "translate-x-0.5"
          )} />
        </div>
      </div>
      <input type="checkbox" className="hidden" checked={active} onChange={onChange} />
    </label>
  );
}