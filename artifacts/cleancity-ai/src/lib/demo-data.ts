/**
 * Shared CleanCity AI demo dataset.
 * Import from this file across Home, Dashboard, Analytics, Map, Incidents, Reports.
 * All values are static mock data; update here to keep the whole app consistent.
 */

// ─── Core KPI Numbers ────────────────────────────────────────────────────────
export const DEMO_KPI = {
  incidentsResolved: 45291,
  incidentsOpen: 1247,
  incidentsInProgress: 389,
  aiAccuracy: 96.4,
  avgResolutionHours: 4.2,
  activeCameras: 142,
  citizenReports: 28439,
  citiesDeployed: 6,
  wardsMonitored: 198,
  wasteReductionPct: 34,
  carbonSavedTons: 12400,
  civicPointsIssued: 2340000,
};

// ─── Incidents ────────────────────────────────────────────────────────────────
export const DEMO_INCIDENTS = [
  { id: 2041, title: "Overflowing Garbage Bin – Cluster", type: "Waste", severity: "critical", status: "open",       location: "Peenya Industrial Zone, Ward 8",        assignedTo: null,             createdAt: "2025-07-19T06:15:00Z", ward: "Ward 8",  aiConfidence: 97, lat: 13.0284, lng: 77.5199 },
  { id: 2042, title: "Pothole (Deep) – Arterial Road",   type: "Roads", severity: "high",     status: "in-progress", location: "Outer Ring Road near Marathahalli",     assignedTo: "Road Crew Alpha",createdAt: "2025-07-19T07:00:00Z", ward: "Ward 83", aiConfidence: 91, lat: 12.9591, lng: 77.6972 },
  { id: 2043, title: "Drain Blockage – Stormwater",      type: "Drainage", severity: "high",  status: "open",       location: "Rajajinagar, 4th Block",                assignedTo: "BWSSB Unit 3",   createdAt: "2025-07-19T07:45:00Z", ward: "Ward 22", aiConfidence: 89, lat: 12.9944, lng: 77.5537 },
  { id: 2044, title: "Broken Streetlight (4 Poles)",     type: "Infrastructure", severity: "medium", status: "in-progress", location: "Whitefield Main Road",          assignedTo: "BESCOM Unit 5",  createdAt: "2025-07-18T21:30:00Z", ward: "Ward 84", aiConfidence: 94, lat: 12.9698, lng: 77.7500 },
  { id: 2045, title: "Illegal Dumping – Construction",   type: "Waste", severity: "high",     status: "resolved",    location: "Hebbal, Near Flyover",                 assignedTo: "BBMP Team C",    createdAt: "2025-07-17T11:00:00Z", ward: "Ward 6",  aiConfidence: 96, lat: 13.0358, lng: 77.5970 },
  { id: 2046, title: "Encroachment on Footpath",         type: "Infrastructure", severity: "medium", status: "open", location: "Commercial Street, Shivajinagar",      assignedTo: null,             createdAt: "2025-07-19T08:10:00Z", ward: "Ward 69", aiConfidence: 82, lat: 12.9833, lng: 77.6082 },
  { id: 2047, title: "Chemical Smell – Drain Overflow",  type: "HazMat", severity: "critical", status: "in-progress", location: "Bannerghatta Road Industrial Area",    assignedTo: "HazMat Response",createdAt: "2025-07-19T05:50:00Z", ward: "Ward 151", aiConfidence: 88, lat: 12.8730, lng: 77.5971 },
  { id: 2048, title: "Stray Animal Menace Report",       type: "Civic", severity: "low",      status: "open",        location: "Jayanagar 4th Block",                  assignedTo: null,             createdAt: "2025-07-18T16:00:00Z", ward: "Ward 159", aiConfidence: 78, lat: 12.9254, lng: 77.5822 },
  { id: 2049, title: "Overflowing Manhole Cover",        type: "Drainage", severity: "high",  status: "resolved",    location: "Indiranagar 100 Feet Road",            assignedTo: "BWSSB Unit 1",   createdAt: "2025-07-17T09:30:00Z", ward: "Ward 80", aiConfidence: 93, lat: 12.9784, lng: 77.6408 },
  { id: 2050, title: "Roadside Fire – Dry Waste",        type: "Waste", severity: "critical", status: "resolved",    location: "KR Puram, Near Bus Depot",             assignedTo: "Fire Brigade",   createdAt: "2025-07-16T14:20:00Z", ward: "Ward 88", aiConfidence: 99, lat: 13.0023, lng: 77.6988 },
  // Other cities – national scalability demo
  { id: 2060, title: "Flood-Risk Drain – Blocked",       type: "Drainage", severity: "high",  status: "open",       location: "Dharavi, Mumbai (Demo)",                assignedTo: null,             createdAt: "2025-07-19T03:00:00Z", ward: "Ward-D1", aiConfidence: 90, lat: 19.0403, lng: 72.8527 },
  { id: 2061, title: "Massive Waste Pile – Waterway",    type: "Waste", severity: "high",     status: "in-progress", location: "Beliaghata Canal, Kolkata (Demo)",     assignedTo: "KMC Waste Unit", createdAt: "2025-07-18T22:00:00Z", ward: "Ward-K5", aiConfidence: 87, lat: 22.5645, lng: 88.3768 },
];

// ─── AI Detection Cards ───────────────────────────────────────────────────────
export const DEMO_DETECTIONS = [
  { id: "det-001", cameraId: "CAM-03", cameraLabel: "Peenya Industrial Zone – Gate 2", type: "Overflowing Bin", confidence: 97, status: "alert",    lat: 13.0284, lng: 77.5199, ward: "Ward 8",   timestamp: "2025-07-19T06:15:00Z", thumbnailBg: "from-orange-900 to-orange-700", icon: "🗑️" },
  { id: "det-002", cameraId: "CAM-01", cameraLabel: "Vidhana Soudha – North Entrance", type: "Pothole Detected", confidence: 91, status: "review",   lat: 12.9791, lng: 77.5913, ward: "Ward 76",  timestamp: "2025-07-19T07:02:00Z", thumbnailBg: "from-amber-900 to-amber-700",  icon: "🚧" },
  { id: "det-003", cameraId: "CAM-07", cameraLabel: "Hebbal Lake – North Bund",        type: "Drain Blockage",  confidence: 89, status: "alert",    lat: 13.0358, lng: 77.5970, ward: "Ward 6",   timestamp: "2025-07-19T07:45:00Z", thumbnailBg: "from-blue-900 to-blue-700",    icon: "🌊" },
  { id: "det-004", cameraId: "CAM-12", cameraLabel: "Marathahalli Bridge – East",      type: "Road Damage",     confidence: 94, status: "dispatched",lat: 12.9591, lng: 77.6972, ward: "Ward 83",  timestamp: "2025-07-18T22:10:00Z", thumbnailBg: "from-red-900 to-red-700",      icon: "🛣️" },
  { id: "det-005", cameraId: "CAM-09", cameraLabel: "Cubbon Park – Main Gate",         type: "Illegal Dumping", confidence: 96, status: "resolved",  lat: 12.9763, lng: 77.5929, ward: "Ward 76",  timestamp: "2025-07-18T11:00:00Z", thumbnailBg: "from-green-900 to-green-700",  icon: "♻️" },
  { id: "det-006", cameraId: "CAM-15", cameraLabel: "Bannerghatta Road – KM 7",        type: "HazMat Spill",    confidence: 88, status: "alert",    lat: 12.8730, lng: 77.5971, ward: "Ward 151", timestamp: "2025-07-19T05:50:00Z", thumbnailBg: "from-purple-900 to-purple-700",icon: "⚠️" },
  { id: "det-007", cameraId: "CAM-05", cameraLabel: "Whitefield Tech Park – Gate A",   type: "Pothole Detected", confidence: 85, status: "review",  lat: 12.9698, lng: 77.7500, ward: "Ward 84",  timestamp: "2025-07-19T08:30:00Z", thumbnailBg: "from-amber-900 to-yellow-700", icon: "🚧" },
  { id: "det-008", cameraId: "CAM-11", cameraLabel: "Indiranagar 100 Ft Road",         type: "Overflowing Bin", confidence: 92, status: "resolved",  lat: 12.9784, lng: 77.6408, ward: "Ward 80",  timestamp: "2025-07-17T09:30:00Z", thumbnailBg: "from-orange-900 to-red-800",   icon: "🗑️" },
];

// ─── Map Markers ──────────────────────────────────────────────────────────────
export const DEMO_MAP_MARKERS = DEMO_INCIDENTS.map(inc => ({
  id: inc.id,
  lat: inc.lat,
  lng: inc.lng,
  type: inc.type,
  severity: inc.severity,
  status: inc.status,
  title: inc.title,
  location: inc.location,
  ward: inc.ward,
  aiConfidence: inc.aiConfidence,
  timestamp: inc.createdAt,
}));

// ─── Monthly Trend (shared by Analytics & Dashboard) ─────────────────────────
export const DEMO_MONTHLY_TREND = [
  { month: "Jan", incidents: 2840, resolved: 2580, aiDetections: 3120, civicReports: 1820, wasteKg: 48000 },
  { month: "Feb", incidents: 3120, resolved: 2890, aiDetections: 3540, civicReports: 2010, wasteKg: 52000 },
  { month: "Mar", incidents: 2760, resolved: 2620, aiDetections: 3200, civicReports: 1930, wasteKg: 47500 },
  { month: "Apr", incidents: 3540, resolved: 3280, aiDetections: 4100, civicReports: 2340, wasteKg: 55200 },
  { month: "May", incidents: 3820, resolved: 3650, aiDetections: 4420, civicReports: 2580, wasteKg: 59100 },
  { month: "Jun", incidents: 4100, resolved: 3940, aiDetections: 4880, civicReports: 2910, wasteKg: 62400 },
  { month: "Jul", incidents: 2941, resolved: 2782, aiDetections: 3490, civicReports: 2100, wasteKg: 44800 },
];

// ─── Hotspots (Analytics) ─────────────────────────────────────────────────────
export const DEMO_HOTSPOTS = [
  { id: 1, location: "Peenya Industrial Zone",     lat: 13.0284, lng: 77.5199, type: "Waste",       severity: "critical", predictedIncidents: 12, confidence: 94, ward: "Ward 8"   },
  { id: 2, location: "Majestic Bus Stand",          lat: 12.9762, lng: 77.5713, type: "Infrastructure", severity: "high",  predictedIncidents: 8,  confidence: 88, ward: "Ward 76"  },
  { id: 3, location: "Hebbal Lake Vicinity",        lat: 13.0358, lng: 77.5970, type: "Drainage",    severity: "high",     predictedIncidents: 6,  confidence: 91, ward: "Ward 6"   },
  { id: 4, location: "Whitefield IT Corridor",      lat: 12.9698, lng: 77.7500, type: "Roads",       severity: "medium",   predictedIncidents: 5,  confidence: 85, ward: "Ward 84"  },
  { id: 5, location: "Bannerghatta Industrial Belt",lat: 12.8730, lng: 77.5971, type: "HazMat",      severity: "critical", predictedIncidents: 4,  confidence: 79, ward: "Ward 151" },
];

// ─── AQI Stations (Environmental) ────────────────────────────────────────────
export const DEMO_AQI_STATIONS = [
  { id: "s1", name: "MG Road Station",        aqi: 142, pm25: 68,  pm10: 112, status: "Unhealthy"   },
  { id: "s2", name: "Peenya Zone Station",    aqi: 178, pm25: 89,  pm10: 148, status: "Unhealthy"   },
  { id: "s3", name: "Cubbon Park Station",    aqi:  68, pm25: 28,  pm10:  52, status: "Moderate"    },
  { id: "s4", name: "Whitefield Station",     aqi: 115, pm25: 54,  pm10:  92, status: "Moderate"    },
  { id: "s5", name: "Yelahanka Station",      aqi:  72, pm25: 31,  pm10:  58, status: "Moderate"    },
];

// ─── Cities (scalability section) ────────────────────────────────────────────
export const DEMO_CITIES = [
  { name: "Bengaluru",  state: "Karnataka",      status: "live",       wards: 198, cameras: 142, incidents: 45291 },
  { name: "Mysuru",     state: "Karnataka",      status: "pilot",      wards: 65,  cameras: 38,  incidents: 6210  },
  { name: "Mangaluru",  state: "Karnataka",      status: "onboarding", wards: 60,  cameras: 18,  incidents: 2100  },
  { name: "Mumbai",     state: "Maharashtra",    status: "trial",      wards: 227, cameras: 0,   incidents: 0     },
  { name: "Hyderabad",  state: "Telangana",      status: "pipeline",   wards: 150, cameras: 0,   incidents: 0     },
  { name: "Chennai",    state: "Tamil Nadu",     status: "pipeline",   wards: 200, cameras: 0,   incidents: 0     },
];
