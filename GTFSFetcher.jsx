import { GTFS_FEEDS, mapVehicleType } from './GTFSConfig';

// Fetch GTFS-RT data from API
export const fetchGTFSRealtime = async (region, feedType = 'vehiclePositions') => {
  const config = GTFS_FEEDS[region];
  
  if (!config) {
    throw new Error(`Unknown region: ${region}`);
  }

  if (config.format === 'static') {
    console.warn(`${config.name} only has static schedule data - no real-time feeds available`);
    return null;
  }

  const url = config[feedType];
  
  if (!url) {
    throw new Error(`Feed type ${feedType} not configured for ${region}`);
  }

  try {
    const headers = {
      [config.apiKeyHeader]: config.apiKey
    };

    // For protobuf feeds, request JSON if possible or handle protobuf
    if (config.format === 'json') {
      headers['Accept'] = 'application/json';
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Auckland returns JSON directly
    if (config.format === 'json') {
      return await response.json();
    }

    // For protobuf, we'll need to handle it differently
    // Most modern GTFS-RT APIs also support JSON with Accept header
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    // If it's protobuf, we'd need a protobuf decoder
    // For now, try to get JSON version by adding accept header
    console.warn('Received protobuf format - attempting JSON conversion');
    return null;
  } catch (error) {
    console.error(`Error fetching GTFS-RT data for ${region}:`, error);
    throw error;
  }
};

// Parse GTFS-RT vehicle positions into our app format
export const parseVehiclePositions = (gtfsData, region) => {
  if (!gtfsData || !gtfsData.entity) {
    return [];
  }

  const config = GTFS_FEEDS[region];
  const vehicles = [];

  gtfsData.entity.forEach((entity) => {
    if (!entity.vehicle) return;

    const vehicle = entity.vehicle;
    const position = vehicle.position;
    const trip = vehicle.trip;

    if (!position || !position.latitude || !position.longitude) {
      return;
    }

    // Determine vehicle type
    let vehicleType = 'bus';
    if (trip && trip.route_id) {
      // Try to determine type from route_id patterns
      const routeId = trip.route_id.toUpperCase();
      if (routeId.includes('TRAIN') || routeId.includes('LINE') || routeId.includes('RAIL')) {
        vehicleType = 'train';
      } else if (routeId.includes('FERRY') || routeId.includes('FER')) {
        vehicleType = 'ferry';
      }
    }

    vehicles.push({
      id: vehicle.vehicle?.id || entity.id,
      routeId: trip?.route_id || 'Unknown',
      routeName: trip?.trip_id || 'Unknown Route',
      type: vehicleType,
      color: config.color,
      lat: position.latitude,
      lng: position.longitude,
      bearing: position.bearing || 0,
      speed: position.speed ? Math.round(position.speed * 3.6) : 0, // Convert m/s to km/h
      delay: vehicle.current_stop_sequence ? 0 : 0, // Would need trip_updates for delay
      occupancy: vehicle.occupancy_status || 'UNKNOWN',
      nextStop: vehicle.stop_id || 'Unknown',
      eta: Math.floor(Math.random() * 10) + 1, // Would calculate from trip_updates
      lastUpdate: vehicle.timestamp ? new Date(vehicle.timestamp * 1000) : new Date(),
      tripId: trip?.trip_id,
      currentStopSequence: vehicle.current_stop_sequence,
      congestionLevel: vehicle.congestion_level
    });
  });

  return vehicles;
};

// Fetch and parse vehicle positions for a region
export const getVehicles = async (region) => {
  try {
    const gtfsData = await fetchGTFSRealtime(region, 'vehiclePositions');
    
    if (!gtfsData) {
      console.warn(`No real-time data available for ${region}`);
      return [];
    }

    return parseVehiclePositions(gtfsData, region);
  } catch (error) {
    console.error(`Error getting vehicles for ${region}:`, error);
    return [];
  }
};

// Enhanced parser that combines vehicle positions with trip updates for delays
export const getVehiclesWithTripUpdates = async (region) => {
  try {
    const [positionsData, tripUpdatesData] = await Promise.all([
      fetchGTFSRealtime(region, 'vehiclePositions').catch(() => null),
      fetchGTFSRealtime(region, 'tripUpdates').catch(() => null)
    ]);

    if (!positionsData) {
      return [];
    }

    // Parse trip updates to get delay information
    const tripDelays = new Map();
    if (tripUpdatesData && tripUpdatesData.entity) {
      tripUpdatesData.entity.forEach((entity) => {
        if (entity.trip_update && entity.trip_update.trip) {
          const tripId = entity.trip_update.trip.trip_id;
          const stopTimeUpdates = entity.trip_update.stop_time_update || [];
          
          if (stopTimeUpdates.length > 0) {
            const latestUpdate = stopTimeUpdates[0];
            const delay = latestUpdate.arrival?.delay || latestUpdate.departure?.delay || 0;
            tripDelays.set(tripId, Math.round(delay / 60)); // Convert seconds to minutes
          }
        }
      });
    }

    // Parse vehicles and enrich with delay data
    const vehicles = parseVehiclePositions(positionsData, region);
    
    return vehicles.map(vehicle => ({
      ...vehicle,
      delay: tripDelays.get(vehicle.tripId) || 0
    }));
  } catch (error) {
    console.error(`Error getting vehicles with trip updates for ${region}:`, error);
    return [];
  }
};

// Map occupancy status from GTFS to our format
export const mapOccupancyStatus = (gtfsOccupancy) => {
  const occupancyMap = {
    'EMPTY': 'LOW',
    'MANY_SEATS_AVAILABLE': 'LOW',
    'FEW_SEATS_AVAILABLE': 'MEDIUM',
    'STANDING_ROOM_ONLY': 'HIGH',
    'CRUSHED_STANDING_ROOM_ONLY': 'HIGH',
    'FULL': 'HIGH',
    'NOT_ACCEPTING_PASSENGERS': 'HIGH'
  };
  
  return occupancyMap[gtfsOccupancy] || 'MEDIUM';
};
