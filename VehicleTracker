import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Train, Ship, Filter, MapPin, Clock, Navigation, ChevronRight, X, RefreshCw, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import VehicleMarker from "@/components/tracker/VehicleMarker";
import VehicleList from "@/components/tracker/VehicleList";
import VehicleDetail from "@/components/tracker/VehicleDetail";
import StatsBar from "@/components/tracker/StatsBar";
import { GTFS_FEEDS } from "@/components/tracker/GTFSConfig";
import { getVehiclesWithTripUpdates, mapOccupancyStatus } from "@/components/tracker/GTFSFetcher";
import 'leaflet/dist/leaflet.css';

// Region configurations from GTFS feeds
const REGIONS = GTFS_FEEDS;

// Fallback: Generate simulated vehicles for demo mode
const generateSimulatedVehicles = (region) => {
  const center = REGIONS[region].center;
  const vehicles = [];
  const config = REGIONS[region];
  
  // Create some demo vehicles
  const vehicleCount = 12;
  for (let i = 0; i < vehicleCount; i++) {
    const angle = (i * 30) * (Math.PI / 180);
    const distance = 0.01 + Math.random() * 0.03;
    const types = ['bus', 'bus', 'bus', 'train', 'ferry'];
    const type = types[i % types.length];
    
    vehicles.push({
      id: `DEMO-${i + 1}`,
      routeId: `R${i + 1}`,
      routeName: `Route ${i + 1}`,
      type: type,
      color: config.color,
      lat: center[0] + Math.sin(angle) * distance,
      lng: center[1] + Math.cos(angle) * distance,
      bearing: Math.random() * 360,
      speed: Math.floor(20 + Math.random() * 40),
      delay: Math.floor(Math.random() * 10) - 3,
      occupancy: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)],
      nextStop: `Stop ${Math.floor(Math.random() * 20) + 1}`,
      eta: Math.floor(Math.random() * 15) + 1,
      lastUpdate: new Date(),
      isDemo: true
    });
  }
  
  return vehicles;
};

// Map controller component
function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 0.5 });
  }, [center, zoom, map]);
  
  return null;
}

export default function VehicleTracker() {
  const [region, setRegion] = useState('auckland');
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useDemoMode, setUseDemoMode] = useState(false);
  const [filters, setFilters] = useState({
    bus: true,
    train: true,
    ferry: true
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch real GTFS data
  const fetchVehicles = async () => {
    const regionConfig = REGIONS[region];
    
    // Skip if this region only has static data
    if (regionConfig.format === 'static') {
      setError(`${regionConfig.name} only has static schedule data. Real-time tracking not available.`);
      setUseDemoMode(true);
      setVehicles(generateSimulatedVehicles(region));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const realVehicles = await getVehiclesWithTripUpdates(region);
      
      if (realVehicles && realVehicles.length > 0) {
        // Map occupancy to our format
        const mappedVehicles = realVehicles.map(v => ({
          ...v,
          occupancy: mapOccupancyStatus(v.occupancy)
        }));
        
        setVehicles(mappedVehicles);
        setIsConnected(true);
        setUseDemoMode(false);
      } else {
        // No vehicles or API issue - use demo mode
        console.warn(`No vehicles returned for ${region}, using demo mode`);
        setUseDemoMode(true);
        setVehicles(generateSimulatedVehicles(region));
      }
      
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError(err.message);
      setIsConnected(false);
      
      // Fallback to demo mode
      setUseDemoMode(true);
      setVehicles(generateSimulatedVehicles(region));
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load and region change
  useEffect(() => {
    setSelectedVehicle(null);
    fetchVehicles();
  }, [region]);

  // Auto-refresh real-time data every 30 seconds
  useEffect(() => {
    if (!useDemoMode) {
      const interval = setInterval(() => {
        fetchVehicles();
      }, 30000); // 30 seconds - typical GTFS-RT update frequency

      return () => clearInterval(interval);
    }
  }, [region, useDemoMode]);

  // Demo mode: simulate movement
  useEffect(() => {
    if (useDemoMode) {
      const interval = setInterval(() => {
        setVehicles(prev => prev.map(vehicle => {
          if (!vehicle.isDemo) return vehicle;
          
          const movement = 0.0002 + Math.random() * 0.0003;
          const bearingChange = (Math.random() - 0.5) * 30;
          const radBearing = (vehicle.bearing + bearingChange) * (Math.PI / 180);
          
          return {
            ...vehicle,
            lat: vehicle.lat + Math.cos(radBearing) * movement,
            lng: vehicle.lng + Math.sin(radBearing) * movement,
            bearing: (vehicle.bearing + bearingChange + 360) % 360,
            speed: Math.max(0, Math.min(80, vehicle.speed + (Math.random() - 0.5) * 10)),
            delay: vehicle.delay + (Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0),
            eta: Math.max(1, vehicle.eta - (Math.random() > 0.7 ? 1 : 0)),
            lastUpdate: new Date()
          };
        }));
        setLastUpdate(new Date());
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [useDemoMode]);

  const filteredVehicles = vehicles.filter(v => filters[v.type]);

  const stats = {
    total: filteredVehicles.length,
    onTime: filteredVehicles.filter(v => v.delay <= 2).length,
    delayed: filteredVehicles.filter(v => v.delay > 2).length,
    buses: filteredVehicles.filter(v => v.type === 'bus').length,
    trains: filteredVehicles.filter(v => v.type === 'train').length,
    ferries: filteredVehicles.filter(v => v.type === 'ferry').length,
  };

  return (
    <div className="h-screen w-full flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Navigation className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 tracking-tight">NZ Transit Tracker</h1>
            <p className="text-xs text-slate-500">Real-time vehicle positions</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            {isConnected ? (
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5">
                <Wifi className="w-3 h-3" />
                Live
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1.5">
                <WifiOff className="w-3 h-3" />
                Reconnecting...
              </Badge>
            )}
          </div>
          
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(REGIONS).map(([key, { name }]) => (
                <SelectItem key={key} value={key}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Filter className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters & Vehicles</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <FilterSection filters={filters} setFilters={setFilters} />
                <VehicleList 
                  vehicles={filteredVehicles} 
                  selectedVehicle={selectedVehicle}
                  onSelect={(v) => {
                    setSelectedVehicle(v);
                    setIsMobileFilterOpen(false);
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Stats Bar */}
      <StatsBar 
        stats={stats} 
        region={REGIONS[region]} 
        lastUpdate={lastUpdate} 
        isDemo={useDemoMode}
        isLoading={isLoading}
      />

      {/* Error/Demo Alert */}
      {(error || useDemoMode) && (
        <div className="px-4 py-2 border-b border-amber-200 bg-amber-50">
          <Alert className="border-0 bg-transparent p-0">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-xs text-amber-800 ml-2">
              {useDemoMode && !error ? (
                <>Demo mode: Showing simulated data. {REGIONS[region].note || 'Live data temporarily unavailable.'}</>
              ) : (
                <>{error}</>
              )}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-80 flex-col bg-white border-r border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <FilterSection filters={filters} setFilters={setFilters} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <VehicleList 
              vehicles={filteredVehicles} 
              selectedVehicle={selectedVehicle}
              onSelect={setSelectedVehicle}
            />
          </div>
        </aside>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={REGIONS[region].center}
            zoom={REGIONS[region].zoom}
            className="h-full w-full"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MapController center={REGIONS[region].center} zoom={REGIONS[region].zoom} />
            
            {filteredVehicles.map(vehicle => (
              <VehicleMarker
                key={vehicle.id}
                vehicle={vehicle}
                isSelected={selectedVehicle?.id === vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
              />
            ))}
          </MapContainer>

          {/* Vehicle Detail Panel */}
          <AnimatePresence>
            {selectedVehicle && (
              <VehicleDetail 
                vehicle={selectedVehicle} 
                onClose={() => setSelectedVehicle(null)} 
              />
            )}
          </AnimatePresence>

          {/* Floating refresh button */}
          <div className="absolute bottom-4 left-4 z-[1000]">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg bg-white hover:bg-slate-50"
              onClick={fetchVehicles}
              disabled={isLoading}
            >
              <motion.div
                animate={{ rotate: isLoading ? 360 : 0 }}
                transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'text-blue-600' : 'text-slate-600'}`} />
              </motion.div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Filter Section Component
function FilterSection({ filters, setFilters }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-slate-700">Vehicle Types</h3>
      <div className="space-y-2">
        {[
          { key: 'bus', icon: Bus, label: 'Buses', color: 'text-orange-500' },
          { key: 'train', icon: Train, label: 'Trains', color: 'text-blue-500' },
          { key: 'ferry', icon: Ship, label: 'Ferries', color: 'text-cyan-500' },
        ].map(({ key, icon: Icon, label, color }) => (
          <label
            key={key}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <Checkbox
              checked={filters[key]}
              onCheckedChange={(checked) => setFilters(prev => ({ ...prev, [key]: checked }))}
            />
            <Icon className={`w-4 h-4 ${color}`} />
            <span className="text-sm text-slate-700">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
