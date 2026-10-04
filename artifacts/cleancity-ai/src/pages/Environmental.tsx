import { useGetAqiData, useGetWeatherData, useGetEnvironmentalTrends } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Wind, Thermometer, Droplets, Sun, MapPin, TrendingDown } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { cn } from "@/lib/utils";

export function Environmental() {
  const { data: aqiData, isLoading: loadingAqi } = useGetAqiData();
  const { data: weatherData, isLoading: loadingWeather } = useGetWeatherData();
  const { data: trendData, isLoading: loadingTrends } = useGetEnvironmentalTrends();

  const mockAqi = aqiData || {
    aqi: 42,
    category: "Good",
    pm25: 12.5,
    pm10: 24.2,
    o3: 38.1,
    no2: 15.4,
    so2: 4.2,
    co: 0.8,
    updatedAt: "2025-05-14T12:00:00Z",
    stations: [
      { id: "S1", name: "MG Road", aqi: 48, lat: 12.9757, lng: 77.6011 },
      { id: "S2", name: "Peenya Zone", aqi: 86, lat: 13.0292, lng: 77.5171 },
      { id: "S3", name: "Cubbon Park", aqi: 28, lat: 12.9763, lng: 77.5929 },
    ]
  };

  const mockWeather = weatherData || {
    temperature: 22.5,
    feelsLike: 24.1,
    humidity: 45,
    windSpeed: 12.5,
    windDirection: "NW",
    condition: "Partly Cloudy",
    visibility: 10,
    uvIndex: 6,
    updatedAt: "2025-05-14T12:00:00Z"
  };

  const mockTrends = trendData || Array(30).fill(0).map((_, i) => ({
    date: `May ${i + 1}`,
    aqi: 35 + Math.random() * 30 + (i === 15 ? 40 : 0),
    pm25: 10 + Math.random() * 15,
    pm10: 20 + Math.random() * 20,
    temperature: 15 + Math.random() * 10
  }));

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (aqi <= 100) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    if (aqi <= 150) return "text-orange-500 bg-orange-500/10 border-orange-500/20";
    if (aqi <= 200) return "text-red-500 bg-red-500/10 border-red-500/20";
    return "text-purple-500 bg-purple-500/10 border-purple-500/20";
  };

  const getAqiHex = (aqi: number) => {
    if (aqi <= 50) return "#10b981";
    if (aqi <= 100) return "#f59e0b";
    if (aqi <= 150) return "#f97316";
    if (aqi <= 200) return "#ef4444";
    return "#a855f7";
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Environmental Intelligence</h1>
        <p className="text-muted-foreground mt-1">Hyper-local air quality, micro-climates, and pollution trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main AQI Gauge Card */}
        <div className="lg:col-span-2 glass-panel rounded-xl border border-white/5 p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">Citywide Air Quality Index</h3>
            
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Fake Gauge SVG */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" 
                  stroke={getAqiHex(mockAqi.aqi)} 
                  strokeWidth="8" 
                  strokeDasharray="283" 
                  strokeDashoffset={283 - (283 * mockAqi.aqi) / 300} 
                  strokeLinecap="round" 
                  className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold font-mono">{mockAqi.aqi}</span>
                <span className={cn("text-sm font-bold uppercase tracking-wider mt-1", getAqiColor(mockAqi.aqi).split(' ')[0])}>
                  {mockAqi.category}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 w-full relative z-10">
            <PollutantCard label="PM2.5" value={mockAqi.pm25} unit="µg/m³" status="Good" />
            <PollutantCard label="PM10" value={mockAqi.pm10} unit="µg/m³" status="Good" />
            <PollutantCard label="O₃" value={mockAqi.o3} unit="ppb" status="Moderate" color="text-amber-500" />
            <PollutantCard label="NO₂" value={mockAqi.no2} unit="ppb" status="Good" />
            <PollutantCard label="SO₂" value={mockAqi.so2} unit="ppb" status="Good" />
            <PollutantCard label="CO" value={mockAqi.co} unit="ppm" status="Good" />
          </div>
        </div>

        {/* Weather Widget */}
        <div className="glass-panel rounded-xl border border-white/5 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Current Conditions</h3>
            <Wind className="w-5 h-5 text-primary" />
          </div>
          
          <div className="my-6 flex items-end gap-4">
            <span className="text-6xl font-light tracking-tighter">{mockWeather.temperature}°</span>
            <span className="text-xl text-muted-foreground pb-2">{mockWeather.condition}</span>
          </div>

          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-rose-400" />
              <div>
                <div className="text-muted-foreground text-xs">Feels Like</div>
                <div className="font-semibold">{mockWeather.feelsLike}°</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-muted-foreground text-xs">Humidity</div>
                <div className="font-semibold">{mockWeather.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-slate-300" />
              <div>
                <div className="text-muted-foreground text-xs">Wind</div>
                <div className="font-semibold">{mockWeather.windSpeed} km/h {mockWeather.windDirection}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-muted-foreground text-xs">UV Index</div>
                <div className="font-semibold">{mockWeather.uvIndex} (Mod)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 glass-panel rounded-xl border border-white/5 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">30-Day Air Quality Trend</h3>
              <p className="text-sm text-muted-foreground">Historical AQI and particulate matter</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
              <TrendingDown className="w-3 h-3" />
              -12% vs last month
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="aqi" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAqi)" />
                <Line type="monotone" dataKey="pm25" stroke="rgba(255,255,255,0.2)" strokeWidth={1} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stations List */}
        <div className="glass-panel rounded-xl border border-white/5 p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-1">Local Stations</h3>
          <p className="text-sm text-muted-foreground mb-4">Live sensor readings by district</p>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {mockAqi.stations.map(station => (
              <div key={station.id} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-foreground">{station.name}</div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> Sensor {station.id}
                  </div>
                </div>
                <div className={cn("px-3 py-1.5 rounded border text-sm font-bold font-mono", getAqiColor(station.aqi))}>
                  {station.aqi}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PollutantCard({ label, value, unit, status, color = "text-emerald-500" }: any) {
  return (
    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
      <div className="text-xs text-muted-foreground font-mono">{label}</div>
      <div className="flex items-end gap-1 mt-1">
        <span className="text-xl font-bold leading-none">{value}</span>
        <span className="text-[10px] text-slate-500 leading-relaxed">{unit}</span>
      </div>
      <div className={cn("text-[10px] font-medium uppercase tracking-wider mt-2", color)}>{status}</div>
    </div>
  );
}