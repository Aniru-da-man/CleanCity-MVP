// Rich mock data for all CleanCity AI endpoints

export const mockIncidents = [
  {
    id: 1,
    title: "Illegal Dumping — Cubbon Park",
    description: "Large pile of construction waste found near the north entrance of Cubbon Park. Includes broken concrete, metal rods, and chemical drums.",
    type: "illegal_dumping",
    severity: "high",
    status: "in_progress",
    location: "Cubbon Park, North Entrance",
    lat: 12.9775,
    lng: 77.5966,
    reportedBy: "CCTV-07 (AI)",
    assignedTo: "Waste Removal Team B",
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 3600000).toISOString(),
    resolvedAt: null,
    imageUrl: null,
    cameraId: "CAM-07",
  },
  {
    id: 2,
    title: "Overflowing Bin — MG Road & Brigade Road",
    description: "Public waste bin at the intersection of MG Road and Brigade Road is overflowing onto the footpath. High foot traffic area.",
    type: "overflowing_bin",
    severity: "medium",
    status: "open",
    location: "MG Road & Brigade Road",
    lat: 12.9757,
    lng: 77.6011,
    reportedBy: "Citizen Report",
    assignedTo: null,
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
    resolvedAt: null,
    imageUrl: null,
    cameraId: null,
  },
  {
    id: 3,
    title: "Graffiti — Majestic Bus Stand",
    description: "Fresh graffiti tags covering the south wall of Majestic bus stand entrance. Multiple colors.",
    type: "graffiti",
    severity: "low",
    status: "open",
    location: "Majestic Bus Stand, South Wall",
    lat: 12.9776,
    lng: 77.5713,
    reportedBy: "CCTV-12 (AI)",
    assignedTo: null,
    createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    resolvedAt: null,
    imageUrl: null,
    cameraId: "CAM-12",
  },
  {
    id: 4,
    title: "Hazardous Spill — Peenya Industrial Area",
    description: "Chemical spill detected in Peenya Industrial Area near the warehouse district. Unknown substance, potential environmental hazard.",
    type: "hazardous_spill",
    severity: "critical",
    status: "in_progress",
    location: "Peenya Industrial Area, Warehouse District",
    lat: 13.0292,
    lng: 77.5171,
    reportedBy: "CCTV-03 (AI)",
    assignedTo: "HazMat Response Unit",
    createdAt: new Date(Date.now() - 8 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60000).toISOString(),
    resolvedAt: null,
    imageUrl: null,
    cameraId: "CAM-03",
  },
  {
    id: 5,
    title: "Abandoned Vehicle — Hebbal Flyover",
    description: "Abandoned vehicle with no license plates blocking the waste collection route near Hebbal Flyover.",
    type: "abandoned_vehicle",
    severity: "medium",
    status: "resolved",
    location: "Hebbal Flyover, North Side",
    lat: 13.0358,
    lng: 77.5970,
    reportedBy: "Field Inspector",
    assignedTo: "Traffic Control",
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    resolvedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    imageUrl: null,
    cameraId: null,
  },
  {
    id: 6,
    title: "Street Flooding — Koramangala",
    description: "Stormwater drainage backup causing street flooding on 80 Feet Road. Multiple blocks affected.",
    type: "flooding",
    severity: "high",
    status: "in_progress",
    location: "80 Feet Rd & Koramangala 4th Block",
    lat: 12.9352,
    lng: 77.6245,
    reportedBy: "Sensor Network",
    assignedTo: "Drainage Crew Alpha",
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 60000).toISOString(),
    resolvedAt: null,
    imageUrl: null,
    cameraId: null,
  },
  {
    id: 7,
    title: "Noise Complaint — Whitefield Construction Site",
    description: "Unauthorized overnight construction activity in Whitefield causing noise pollution above permitted levels.",
    type: "noise_pollution",
    severity: "medium",
    status: "open",
    location: "Whitefield Main Road & EPIP Zone",
    lat: 12.9698,
    lng: 77.7499,
    reportedBy: "Citizen Report",
    assignedTo: null,
    createdAt: new Date(Date.now() - 10 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
    resolvedAt: null,
    imageUrl: null,
    cameraId: null,
  },
  {
    id: 8,
    title: "Pothole Hazard — Outer Ring Road",
    description: "Large pothole on Outer Ring Road causing vehicle damage. Several reported incidents.",
    type: "road_damage",
    severity: "high",
    status: "resolved",
    location: "Outer Ring Road & Marathahalli Junction",
    lat: 12.9344,
    lng: 77.6101,
    reportedBy: "Citizen Report",
    assignedTo: "Road Repair Crew 4",
    createdAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    resolvedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    imageUrl: null,
    cameraId: null,
  },
];

export const mockCameras = [
  { id: "CAM-01", name: "Vidhana Soudha Gate", location: "Vidhana Soudha, Main Entrance", lat: 12.9793, lng: 77.5906, status: "online", lastDetection: new Date(Date.now() - 5 * 60000).toISOString(), detectionsToday: 23, streamUrl: null },
  { id: "CAM-02", name: "Cubbon Park South Gate", location: "Cubbon Park, South Entrance", lat: 12.9718, lng: 77.5937, status: "online", lastDetection: new Date(Date.now() - 12 * 60000).toISOString(), detectionsToday: 8, streamUrl: null },
  { id: "CAM-03", name: "Peenya Industrial Camera", location: "Peenya Industrial Area & KIADB Rd", lat: 13.0292, lng: 77.5171, status: "online", lastDetection: new Date(Date.now() - 2 * 60000).toISOString(), detectionsToday: 45, streamUrl: null },
  { id: "CAM-04", name: "KR Market Bridge", location: "KR Market, City Market Side", lat: 12.9657, lng: 77.5763, status: "online", lastDetection: new Date(Date.now() - 18 * 60000).toISOString(), detectionsToday: 15, streamUrl: null },
  { id: "CAM-05", name: "Kempegowda Bus Terminal", location: "Kempegowda Bus Stand, Platform 1", lat: 12.9776, lng: 77.5713, status: "online", lastDetection: new Date(Date.now() - 8 * 60000).toISOString(), detectionsToday: 31, streamUrl: null },
  { id: "CAM-06", name: "Lalbagh West Gate", location: "Lalbagh Botanical Garden, West Gate", lat: 12.9497, lng: 77.5835, status: "offline", lastDetection: new Date(Date.now() - 180 * 60000).toISOString(), detectionsToday: 2, streamUrl: null },
  { id: "CAM-07", name: "Cubbon Park North Gate", location: "Cubbon Park, North Entrance", lat: 12.9775, lng: 77.5966, status: "online", lastDetection: new Date(Date.now() - 3 * 60000).toISOString(), detectionsToday: 12, streamUrl: null },
  { id: "CAM-08", name: "Ulsoor Lake East", location: "Ulsoor Lake, East Entrance", lat: 12.9815, lng: 77.6161, status: "maintenance", lastDetection: new Date(Date.now() - 240 * 60000).toISOString(), detectionsToday: 0, streamUrl: null },
  { id: "CAM-09", name: "Russell Market", location: "Russell Market, Main Gate", lat: 12.9866, lng: 77.6013, status: "online", lastDetection: new Date(Date.now() - 6 * 60000).toISOString(), detectionsToday: 19, streamUrl: null },
  { id: "CAM-10", name: "JP Nagar Park South", location: "JP Nagar Park, South Entrance", lat: 12.9079, lng: 77.5856, status: "online", lastDetection: new Date(Date.now() - 25 * 60000).toISOString(), detectionsToday: 7, streamUrl: null },
  { id: "CAM-11", name: "Town Hall Perimeter", location: "Town Hall, MG Road", lat: 12.9716, lng: 77.5946, status: "online", lastDetection: new Date(Date.now() - 10 * 60000).toISOString(), detectionsToday: 28, streamUrl: null },
  { id: "CAM-12", name: "Majestic Metro Station", location: "Kempegowda Metro, South Exit", lat: 12.9755, lng: 77.5710, status: "online", lastDetection: new Date(Date.now() - 4 * 60000).toISOString(), detectionsToday: 16, streamUrl: null },
];

export const mockDetections = [
  { id: 1, cameraId: "CAM-01", cameraName: "Vidhana Soudha Gate", type: "illegal_dumping", confidence: 0.94, severity: "high", location: "Vidhana Soudha, Main Entrance", lat: 12.9793, lng: 77.5906, detectedAt: new Date(Date.now() - 5 * 60000).toISOString(), thumbnailUrl: null, incidentId: null },
  { id: 2, cameraId: "CAM-03", cameraName: "Peenya Industrial Camera", type: "hazardous_spill", confidence: 0.88, severity: "critical", location: "Peenya Industrial Area & KIADB Rd", lat: 13.0292, lng: 77.5171, detectedAt: new Date(Date.now() - 8 * 60000).toISOString(), thumbnailUrl: null, incidentId: 4 },
  { id: 3, cameraId: "CAM-07", cameraName: "Cubbon Park North Gate", type: "illegal_dumping", confidence: 0.92, severity: "high", location: "Cubbon Park, North Entrance", lat: 12.9775, lng: 77.5966, detectedAt: new Date(Date.now() - 12 * 60000).toISOString(), thumbnailUrl: null, incidentId: 1 },
  { id: 4, cameraId: "CAM-12", cameraName: "Majestic Metro Station", type: "graffiti", confidence: 0.97, severity: "low", location: "Majestic Bus Stand, South Wall", lat: 12.9755, lng: 77.5710, detectedAt: new Date(Date.now() - 18 * 60000).toISOString(), thumbnailUrl: null, incidentId: 3 },
  { id: 5, cameraId: "CAM-05", cameraName: "Kempegowda Bus Terminal", type: "overflowing_bin", confidence: 0.85, severity: "medium", location: "Kempegowda Bus Stand, Platform 1", lat: 12.9776, lng: 77.5713, detectedAt: new Date(Date.now() - 22 * 60000).toISOString(), thumbnailUrl: null, incidentId: null },
  { id: 6, cameraId: "CAM-11", cameraName: "Town Hall Perimeter", type: "loitering", confidence: 0.73, severity: "low", location: "Town Hall, MG Road", lat: 12.9716, lng: 77.5946, detectedAt: new Date(Date.now() - 30 * 60000).toISOString(), thumbnailUrl: null, incidentId: null },
  { id: 7, cameraId: "CAM-09", cameraName: "Russell Market", type: "illegal_dumping", confidence: 0.91, severity: "medium", location: "Russell Market, Main Gate", lat: 12.9866, lng: 77.6013, detectedAt: new Date(Date.now() - 45 * 60000).toISOString(), thumbnailUrl: null, incidentId: null },
  { id: 8, cameraId: "CAM-02", cameraName: "Cubbon Park South Gate", type: "vandalism", confidence: 0.78, severity: "medium", location: "Cubbon Park, South Entrance", lat: 12.9718, lng: 77.5937, detectedAt: new Date(Date.now() - 60 * 60000).toISOString(), thumbnailUrl: null, incidentId: null },
  { id: 9, cameraId: "CAM-04", cameraName: "KR Market Bridge", type: "overflowing_bin", confidence: 0.89, severity: "medium", location: "KR Market, City Market Side", lat: 12.9657, lng: 77.5763, detectedAt: new Date(Date.now() - 75 * 60000).toISOString(), thumbnailUrl: null, incidentId: null },
  { id: 10, cameraId: "CAM-10", cameraName: "JP Nagar Park South", type: "graffiti", confidence: 0.83, severity: "low", location: "JP Nagar Park, South Entrance", lat: 12.9079, lng: 77.5856, detectedAt: new Date(Date.now() - 90 * 60000).toISOString(), thumbnailUrl: null, incidentId: null },
];

export const mockAqiData = {
  aqi: 87,
  category: "Moderate",
  pm25: 24.3,
  pm10: 48.7,
  o3: 62.1,
  no2: 38.4,
  so2: 12.8,
  co: 0.7,
  updatedAt: new Date().toISOString(),
  stations: [
    { id: "ST-01", name: "Central Bengaluru", aqi: 92, lat: 12.9766, lng: 77.5993 },
    { id: "ST-02", name: "South Bengaluru", aqi: 78, lat: 12.9344, lng: 77.5896 },
    { id: "ST-03", name: "Yelahanka", aqi: 85, lat: 13.1007, lng: 77.5963 },
    { id: "ST-04", name: "Whitefield", aqi: 94, lat: 12.9698, lng: 77.7499 },
    { id: "ST-05", name: "Peenya", aqi: 105, lat: 13.0292, lng: 77.5171 },
    { id: "ST-06", name: "Bannerghatta", aqi: 62, lat: 12.8002, lng: 77.5766 },
  ],
};

export const mockWeatherData = {
  temperature: 26,
  feelsLike: 28,
  humidity: 65,
  windSpeed: 14.2,
  windDirection: "SE",
  condition: "Partly Cloudy",
  visibility: 8.5,
  uvIndex: 6,
  updatedAt: new Date().toISOString(),
};

export function generateEnvironmentalTrends(days: number = 30) {
  const points = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    points.push({
      date: date.toISOString().split("T")[0],
      aqi: Math.round(60 + Math.random() * 60),
      pm25: parseFloat((15 + Math.random() * 25).toFixed(1)),
      pm10: parseFloat((30 + Math.random() * 40).toFixed(1)),
      temperature: parseFloat((22 + Math.random() * 10).toFixed(1)),
    });
  }
  return points;
}

export const mockPredictions = [
  { id: 1, type: "waste_surge", title: "High Waste Generation Predicted", description: "Model predicts 34% increase in waste volume in Central Bengaluru during the upcoming weekend based on event schedules and historical patterns.", probability: 0.87, timeframe: "Next 48 hours", location: "Central Bengaluru", severity: "high", createdAt: new Date().toISOString() },
  { id: 2, type: "pollution_spike", title: "PM2.5 Spike Alert", description: "Air quality is predicted to deteriorate significantly in the Peenya Industrial Zone due to forecasted wind patterns and industrial activity.", probability: 0.73, timeframe: "Next 24 hours", location: "Peenya Industrial Zone", severity: "critical", createdAt: new Date().toISOString() },
  { id: 3, type: "flooding_risk", title: "Storm Drain Overload Risk", description: "Heavy rainfall forecasted. Drainage capacity analysis indicates risk of street flooding in 6 Koramangala locations.", probability: 0.65, timeframe: "Next 72 hours", location: "Koramangala", severity: "high", createdAt: new Date().toISOString() },
  { id: 4, type: "graffiti_hotspot", title: "Graffiti Surge Predicted", description: "Pattern analysis identifies elevated graffiti risk at 12 locations following local youth events this week.", probability: 0.58, timeframe: "Next 5 days", location: "Indiranagar", severity: "medium", createdAt: new Date().toISOString() },
  { id: 5, type: "illegal_dumping", title: "Illegal Dumping Window", description: "Historical patterns suggest increased illegal dumping in industrial zones during upcoming holiday weekend.", probability: 0.79, timeframe: "Next 3 days", location: "Peenya Industrial Corridor", severity: "high", createdAt: new Date().toISOString() },
  { id: 6, type: "recycling_opportunity", title: "Recycling Rate Opportunity", description: "Analysis indicates targeted education campaign in Electronic City could increase recycling rates by 18% within 30 days.", probability: 0.82, timeframe: "Next 30 days", location: "Electronic City", severity: "low", createdAt: new Date().toISOString() },
];

export const mockHotspots = [
  { id: 1, lat: 12.9793, lng: 77.5906, location: "Vidhana Soudha", riskScore: 8.9, type: "illegal_dumping", predictedIncidents: 14 },
  { id: 2, lat: 13.0292, lng: 77.5171, location: "Peenya Industrial Area", riskScore: 9.4, type: "hazardous_spill", predictedIncidents: 6 },
  { id: 3, lat: 13.1007, lng: 77.5963, location: "Yelahanka", riskScore: 7.2, type: "graffiti", predictedIncidents: 21 },
  { id: 4, lat: 12.9775, lng: 77.5966, location: "Cubbon Park", riskScore: 6.8, type: "illegal_dumping", predictedIncidents: 9 },
  { id: 5, lat: 12.9497, lng: 77.5835, location: "Lalbagh", riskScore: 5.5, type: "vandalism", predictedIncidents: 7 },
];

export function generateWasteForecast() {
  const points = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (11 - i) * 7);
    const weekStr = `W${Math.floor(i + 1).toString().padStart(2, "0")}`;
    points.push({
      week: weekStr,
      predicted: parseFloat((120 + Math.random() * 40).toFixed(1)),
      actual: i < 10 ? parseFloat((115 + Math.random() * 45).toFixed(1)) : null,
      baseline: 125.0,
    });
  }
  return points;
}

export const mockLeaderboard = [
  { rank: 1, userId: "u001", name: "Sarah Chen", avatar: null, points: 4850, level: "Civic Champion", badges: 18, reports: 142, change: 2 },
  { rank: 2, userId: "u002", name: "Marcus Johnson", avatar: null, points: 4320, level: "Civic Champion", badges: 15, reports: 128, change: -1 },
  { rank: 3, userId: "u003", name: "Aisha Patel", avatar: null, points: 3980, level: "City Guardian", badges: 12, reports: 115, change: 1 },
  { rank: 4, userId: "u004", name: "Carlos Rivera", avatar: null, points: 3650, level: "City Guardian", badges: 10, reports: 98, change: 0 },
  { rank: 5, userId: "u005", name: "Emily Watson", avatar: null, points: 3210, level: "Eco Warrior", badges: 9, reports: 87, change: 3 },
  { rank: 6, userId: "u006", name: "Daniel Kim", avatar: null, points: 2980, level: "Eco Warrior", badges: 8, reports: 76, change: -2 },
  { rank: 7, userId: "u007", name: "Fatima Al-Hassan", avatar: null, points: 2740, level: "Green Citizen", badges: 7, reports: 68, change: 1 },
  { rank: 8, userId: "u008", name: "Tom Bradley", avatar: null, points: 2490, level: "Green Citizen", badges: 6, reports: 54, change: -1 },
  { rank: 9, userId: "u009", name: "Priya Sharma", avatar: null, points: 2210, level: "Green Citizen", badges: 5, reports: 48, change: 4 },
  { rank: 10, userId: "u010", name: "Jake Morrison", avatar: null, points: 1980, level: "Volunteer", badges: 4, reports: 39, change: -2 },
];

export const mockBadges = [
  { id: "b001", name: "First Responder", description: "Reported your first incident", icon: "shield", category: "reporting", pointsRequired: 50, rarity: "common", earnedAt: new Date(Date.now() - 90 * 24 * 3600000).toISOString(), isEarned: true },
  { id: "b002", name: "Eagle Eye", description: "Spotted 10 incidents in a single week", icon: "eye", category: "reporting", pointsRequired: 500, rarity: "uncommon", earnedAt: new Date(Date.now() - 60 * 24 * 3600000).toISOString(), isEarned: true },
  { id: "b003", name: "Clean Streak", description: "30-day consecutive daily report streak", icon: "zap", category: "consistency", pointsRequired: 1000, rarity: "rare", earnedAt: new Date(Date.now() - 30 * 24 * 3600000).toISOString(), isEarned: true },
  { id: "b004", name: "Hazmat Hero", description: "Reported 5 hazardous incidents", icon: "alert-triangle", category: "safety", pointsRequired: 750, rarity: "uncommon", earnedAt: new Date(Date.now() - 45 * 24 * 3600000).toISOString(), isEarned: true },
  { id: "b005", name: "Community Leader", description: "Reached top 10 on the leaderboard", icon: "trophy", category: "community", pointsRequired: 2000, rarity: "rare", earnedAt: null, isEarned: false },
  { id: "b006", name: "Eco Warrior", description: "Contributed to 20 environmental improvements", icon: "leaf", category: "environment", pointsRequired: 3000, rarity: "epic", earnedAt: null, isEarned: false },
  { id: "b007", name: "Data Sentinel", description: "100 verified incident reports", icon: "database", category: "reporting", pointsRequired: 5000, rarity: "legendary", earnedAt: null, isEarned: false },
  { id: "b008", name: "Night Watch", description: "Reported 20 nighttime incidents", icon: "moon", category: "reporting", pointsRequired: 800, rarity: "uncommon", earnedAt: null, isEarned: false },
];

export const mockMarketplace = [
  { id: 1, name: "BMTC Monthly Pass", description: "One month unlimited BMTC bus travel pass across Bengaluru", pointsCost: 2000, category: "transport", imageUrl: null, stock: 50, isAvailable: true, discount: 10 },
  { id: 2, name: "CleanCity Eco Tote Bag", description: "Premium recycled material tote with CleanCity branding", pointsCost: 500, category: "merchandise", imageUrl: null, stock: 200, isAvailable: true, discount: null },
  { id: 3, name: "Yulu Bike 1-Month Pass", description: "Unlimited 30-min rides on Yulu city bike share network", pointsCost: 1500, category: "transport", imageUrl: null, stock: 100, isAvailable: true, discount: null },
  { id: 4, name: "Green Restaurant Voucher", description: "₹500 voucher at partner eco-friendly restaurants in Bengaluru", pointsCost: 1000, category: "dining", imageUrl: null, stock: 75, isAvailable: true, discount: null },
  { id: 5, name: "Urban Garden Kit", description: "Starter kit for balcony/window herb gardening", pointsCost: 800, category: "lifestyle", imageUrl: null, stock: 40, isAvailable: true, discount: 15 },
  { id: 6, name: "Solar Phone Charger", description: "Portable solar panel phone charger, 10,000mAh", pointsCost: 3500, category: "tech", imageUrl: null, stock: 20, isAvailable: true, discount: null },
  { id: 7, name: "Park Yoga Session", description: "Group yoga class in Cubbon Park (weekend sessions)", pointsCost: 600, category: "wellness", imageUrl: null, stock: 30, isAvailable: true, discount: null },
  { id: 8, name: "Stainless Steel Bottle", description: "32oz insulated stainless steel water bottle", pointsCost: 700, category: "lifestyle", imageUrl: null, stock: 150, isAvailable: true, discount: null },
];

export const mockCommunityProfile = {
  userId: "current-user",
  name: "Alex Martinez",
  points: 2840,
  level: "Eco Warrior",
  rank: 6,
  totalUsers: 8420,
  reportsSubmitted: 73,
  badgesEarned: 4,
  streakDays: 12,
  joinedAt: new Date(Date.now() - 120 * 24 * 3600000).toISOString(),
  monthlyPoints: [
    { label: "Aug", value: 180 },
    { label: "Sep", value: 240 },
    { label: "Oct", value: 310 },
    { label: "Nov", value: 420 },
    { label: "Dec", value: 380 },
    { label: "Jan", value: 510 },
    { label: "Feb", value: 460 },
    { label: "Mar", value: 340 },
  ],
};

export const mockNotifications = [
  { id: 1, type: "critical_alert", title: "Critical Incident Detected", message: "Hazardous chemical spill detected in Peenya Industrial Area by CAM-03. Immediate action required.", isRead: false, priority: "critical", createdAt: new Date(Date.now() - 8 * 60000).toISOString(), link: "/incidents/4" },
  { id: 2, type: "ai_detection", title: "New AI Detection", message: "CAM-01 detected potential illegal dumping at Vidhana Soudha. Confidence: 94%", isRead: false, priority: "high", createdAt: new Date(Date.now() - 25 * 60000).toISOString(), link: "/monitoring" },
  { id: 3, type: "aqi_alert", title: "Air Quality Warning", message: "AQI levels in Peenya have exceeded 100 (Unhealthy for Sensitive Groups). Advisory issued.", isRead: false, priority: "high", createdAt: new Date(Date.now() - 45 * 60000).toISOString(), link: "/environmental" },
  { id: 4, type: "incident_update", title: "Incident Resolved", message: "Abandoned vehicle at Hebbal Flyover has been successfully removed by Traffic Control.", isRead: true, priority: "medium", createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), link: "/incidents/5" },
  { id: 5, type: "community", title: "Badge Earned", message: "Congratulations! You have earned the 'Clean Streak' badge for 30 consecutive days of reporting.", isRead: true, priority: "low", createdAt: new Date(Date.now() - 5 * 3600000).toISOString(), link: "/community" },
  { id: 6, type: "report_ready", title: "Report Ready", message: "Your Monthly Environmental Summary for January 2025 is ready for download.", isRead: true, priority: "medium", createdAt: new Date(Date.now() - 12 * 3600000).toISOString(), link: "/reports" },
  { id: 7, type: "prediction", title: "Predictive Alert", message: "AI model predicts 87% probability of high waste surge in Central Bengaluru this weekend.", isRead: true, priority: "high", createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), link: "/analytics" },
  { id: 8, type: "system", title: "System Maintenance Complete", message: "Scheduled maintenance for CAM-06 and CAM-08 completed. Both cameras restored to service.", isRead: true, priority: "low", createdAt: new Date(Date.now() - 36 * 3600000).toISOString(), link: null },
];

export const mockReports = [
  { id: 1, title: "Monthly Environmental Summary — January 2025", type: "environmental", status: "ready", period: "January 2025", generatedAt: new Date(Date.now() - 12 * 3600000).toISOString(), createdAt: new Date(Date.now() - 13 * 3600000).toISOString(), downloadUrl: "#", size: "2.4 MB" },
  { id: 2, title: "Weekly Incident Report — Week 3, January 2025", type: "incidents", status: "ready", period: "Jan 13-19, 2025", generatedAt: new Date(Date.now() - 24 * 3600000).toISOString(), createdAt: new Date(Date.now() - 25 * 3600000).toISOString(), downloadUrl: "#", size: "1.1 MB" },
  { id: 3, title: "Predictive Analytics Report — Q1 2025", type: "predictive", status: "generating", period: "Q1 2025", generatedAt: null, createdAt: new Date(Date.now() - 30 * 60000).toISOString(), downloadUrl: null, size: null },
  { id: 4, title: "AI Detection Accuracy Report — December 2024", type: "ai_monitoring", status: "ready", period: "December 2024", generatedAt: new Date(Date.now() - 72 * 3600000).toISOString(), createdAt: new Date(Date.now() - 73 * 3600000).toISOString(), downloadUrl: "#", size: "3.8 MB" },
  { id: 5, title: "Community Engagement Report — Q4 2024", type: "community", status: "ready", period: "Q4 2024", generatedAt: new Date(Date.now() - 7 * 24 * 3600000).toISOString(), createdAt: new Date(Date.now() - 7 * 24 * 3600000).toISOString(), downloadUrl: "#", size: "1.7 MB" },
  { id: 6, title: "AQI Trends Analysis — Annual 2024", type: "environmental", status: "failed", period: "Annual 2024", generatedAt: null, createdAt: new Date(Date.now() - 14 * 24 * 3600000).toISOString(), downloadUrl: null, size: null },
];

export const mockAdminStats = {
  totalUsers: 8420,
  activeUsers: 3214,
  totalIncidents: 1842,
  camerasOnline: 10,
  systemHealth: "healthy",
  storageUsed: 67.4,
  apiCallsToday: 142863,
  alertsActive: 3,
};

export const mockAdminUsers = [
  { id: "u001", name: "Sarah Chen", email: "sarah.chen@urbanova.city", role: "admin", status: "active", lastActive: new Date(Date.now() - 5 * 60000).toISOString(), points: 4850, reports: 142 },
  { id: "u002", name: "Marcus Johnson", email: "m.johnson@urbanova.city", role: "operator", status: "active", lastActive: new Date(Date.now() - 20 * 60000).toISOString(), points: 4320, reports: 128 },
  { id: "u003", name: "Aisha Patel", email: "aisha.patel@urbanova.city", role: "operator", status: "active", lastActive: new Date(Date.now() - 45 * 60000).toISOString(), points: 3980, reports: 115 },
  { id: "u004", name: "Carlos Rivera", email: "c.rivera@urbanova.city", role: "analyst", status: "active", lastActive: new Date(Date.now() - 2 * 3600000).toISOString(), points: 3650, reports: 98 },
  { id: "u005", name: "Emily Watson", email: "e.watson@urbanova.city", role: "citizen", status: "active", lastActive: new Date(Date.now() - 3 * 3600000).toISOString(), points: 3210, reports: 87 },
  { id: "u006", name: "Daniel Kim", email: "d.kim@urbanova.city", role: "citizen", status: "inactive", lastActive: new Date(Date.now() - 2 * 24 * 3600000).toISOString(), points: 2980, reports: 76 },
  { id: "u007", name: "Fatima Al-Hassan", email: "f.alhassan@urbanova.city", role: "citizen", status: "active", lastActive: new Date(Date.now() - 6 * 3600000).toISOString(), points: 2740, reports: 68 },
  { id: "u008", name: "Tom Bradley", email: "t.bradley@urbanova.city", role: "analyst", status: "suspended", lastActive: new Date(Date.now() - 7 * 24 * 3600000).toISOString(), points: 2490, reports: 54 },
];

export const mockProfile = {
  id: "current-user",
  name: "Sarah Jenkins",
  email: "sarah.jenkins@bbmp.gov.in",
  role: "City Manager",
  department: "Urban Planning & Operations",
  phone: "+91 98765 43210",
  avatar: null,
  joinedAt: new Date(Date.now() - 120 * 24 * 3600000).toISOString(),
  lastActive: new Date().toISOString(),
};

const copilotResponses = [
  "Based on the current data, I'm seeing elevated incident rates in the Central Bengaluru area. I recommend deploying additional waste removal crews to MG Road and Cubbon Park during peak hours (10am-8pm) this weekend.",
  "The AQI in Peenya has been trending above 100 for the past 3 days. This correlates with wind patterns from the industrial zone. I've flagged this for the environmental team and suggest issuing a public health advisory.",
  "Your predictive models show 87% probability of a waste surge this weekend. I've already drafted a resource allocation plan — would you like me to share it with the logistics team?",
  "Reviewing the last 30 days of incident data, illegal dumping is up 23% in industrial zones. Pattern analysis suggests most incidents occur between 10pm-4am. I recommend targeting camera coverage during those hours.",
  "The community engagement data looks positive! Your city's recycling rate improved 8% this quarter, largely driven by the Civic Points incentive program in Electronic City. Continuing the rewards campaign could yield another 5-10% improvement.",
];

let copilotIndex = 0;

export function getCopilotResponse(message: string) {
  const response = copilotResponses[copilotIndex % copilotResponses.length];
  copilotIndex++;
  return {
    id: `cp-${Date.now()}`,
    message: response,
    suggestions: [
      "Show me the current hotspot map",
      "Generate a weekly incident report",
      "What's the AQI forecast for tomorrow?",
      "How can I improve community engagement?",
    ],
    createdAt: new Date().toISOString(),
  };
}
