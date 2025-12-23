import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, Bus, Train, Ship, MapPin, Clock, Navigation2, 
  Users, Gauge, ArrowRight, RefreshCw 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import moment from 'moment';

const typeIcons = {
  bus: Bus,
  train: Train,
  ferry: Ship
};

const occupancyConfig = {
  LOW: { label: 'Low Occupancy', value: 25, color: 'bg-emerald-500' },
  MEDIUM: { label: 'Medium Occupancy', value: 55, color: 'bg-amber-500' },
  HIGH: { label: 'High Occupancy', value: 85, color: 'bg-red-500' }
};

export default function VehicleDetail({ vehicle, onClose }) {
  const Icon = typeIcons[vehicle.type];
  const occupancy = occupancyConfig[vehicle.occupancy];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute top-4 right-4 bottom-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-[1000] overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div 
        className="p-4 text-white relative overflow-hidden"
        style={{ backgroundColor: vehicle.color }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
              {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}
            </Badge>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{vehicle.routeId}</h2>
              <p className="text-white/80 text-sm">{vehicle.routeName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Vehicle ID */}
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="text-xs text-slate-500 mb-1">Vehicle ID</div>
          <div className="font-mono text-sm font-medium text-slate-800">{vehicle.id}</div>
        </div>

        {/* Next Stop */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-medium">Next Stop</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800">{vehicle.nextStop}</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {vehicle.delay > 0 ? (
                  <span className="text-amber-600">Running {vehicle.delay} min late</span>
                ) : vehicle.delay < 0 ? (
                  <span className="text-emerald-600">{Math.abs(vehicle.delay)} min early</span>
                ) : (
                  <span className="text-emerald-600">On time</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-800">{vehicle.eta}</div>
              <div className="text-xs text-slate-500">min</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Gauge className="w-3.5 h-3.5" />
              <span className="text-xs">Speed</span>
            </div>
            <div className="text-lg font-bold text-slate-800">{vehicle.speed} <span className="text-xs font-normal text-slate-500">km/h</span></div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Navigation2 className="w-3.5 h-3.5" />
              <span className="text-xs">Bearing</span>
            </div>
            <div className="text-lg font-bold text-slate-800">{Math.round(vehicle.bearing)}°</div>
          </div>
        </div>

        {/* Occupancy */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Users className="w-3.5 h-3.5" />
              <span className="text-xs">Occupancy</span>
            </div>
            <span className="text-sm font-medium text-slate-700">{occupancy.label}</span>
          </div>
          <Progress value={occupancy.value} className="h-2" />
        </div>

        {/* Coordinates */}
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="text-xs text-slate-500 mb-2">Position</div>
          <div className="font-mono text-xs text-slate-600 space-y-1">
            <div>Lat: {vehicle.lat.toFixed(6)}</div>
            <div>Lng: {vehicle.lng.toFixed(6)}</div>
          </div>
        </div>

        {/* Last Update */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <RefreshCw className="w-3 h-3" />
          <span>Updated {moment(vehicle.lastUpdate).fromNow()}</span>
        </div>
      </div>
    </motion.div>
  );
}
