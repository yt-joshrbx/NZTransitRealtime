// GTFS Real-time feed configurations for NZ transit systems
export const GTFS_FEEDS = {
  auckland: {
    name: 'Auckland',
    center: [-36.8485, 174.7633],
    zoom: 12,
    color: '#0EA5E9',
    vehiclePositions: 'https://api.at.govt.nz/realtime/legacy/vehiclelocations',
    tripUpdates: 'https://api.at.govt.nz/realtime/legacy/tripupdates',
    alerts: 'https://api.at.govt.nz/realtime/legacy/servicealerts',
    apiKeyHeader: 'Ocp-Apim-Subscription-Key',
    apiKey: 'b122c467e7e145b7bfcd6d854d09b01b',
    format: 'json' // Auckland provides JSON by default
  },
  wellington: {
    name: 'Wellington',
    center: [-41.2865, 174.7762],
    zoom: 13,
    color: '#10B981',
    vehiclePositions: 'https://api.opendata.metlink.org.nz/v1/gtfs-rt/vehiclepositions',
    tripUpdates: 'https://api.opendata.metlink.org.nz/v1/gtfs-rt/tripupdates',
    alerts: 'https://api.opendata.metlink.org.nz/v1/gtfs-rt/servicealerts',
    apiKeyHeader: 'x-api-key',
    apiKey: 'Qe5MJQy7QKG0wVqCR7o7SkUcVYuEzX9S18LElVe0',
    format: 'protobuf'
  },
  christchurch: {
    name: 'Christchurch',
    center: [-43.5321, 172.6362],
    zoom: 13,
    color: '#8B5CF6',
    vehiclePositions: 'https://apis.metroinfo.co.nz/rti/gtfsrt/v1/vehiclepositions',
    tripUpdates: 'https://apis.metroinfo.co.nz/rti/gtfsrt/v1/tripupdates',
    alerts: 'https://apis.metroinfo.co.nz/rti/gtfsrt/v1/servicealerts',
    apiKeyHeader: 'Ocp-Apim-Subscription-Key',
    apiKey: '70bec02cbae84bbfa29b4e906a2035d4',
    format: 'protobuf'
  },
  waikato: {
    name: 'Waikato (Hamilton)',
    center: [-37.7870, 175.2793],
    zoom: 13,
    color: '#F59E0B',
    staticFeed: 'https://wrcscheduledata.blob.core.windows.net/wrcgtfs/busit-nz-public.zip',
    format: 'static', // This is a static GTFS feed, not real-time
    note: 'Static schedule data only - no real-time positions available'
  }
};

// Route type mapping from GTFS spec
export const ROUTE_TYPES = {
  0: 'tram',
  1: 'metro',
  2: 'train',
  3: 'bus',
  4: 'ferry',
  5: 'cable_car',
  6: 'gondola',
  7: 'funicular'
};

// Map GTFS types to our app types
export const mapVehicleType = (gtfsType) => {
  const type = parseInt(gtfsType);
  if (type === 2) return 'train';
  if (type === 4) return 'ferry';
  return 'bus'; // Default to bus
};
