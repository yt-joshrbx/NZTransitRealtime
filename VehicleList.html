import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Train, Ship, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const typeIcons = {
  bus: Bus,
  train: Train,
  ferry: Ship
};

const occupancyColors = {
  LOW: 'bg-emerald-100 text-emerald-700',
  MEDIUM: 'bg-amber-100 text-amber-700',
  HIGH: 'bg-red-100 text-red-700'
};

export default function VehicleList({ vehicles, selectedVehicle, onSelect }) {
  // Group vehicles by route
  const groupedVehicles = vehicles.reduce((acc, vehicle) => {
    if (!acc[vehicle.routeId]) {
      acc[vehicle.routeId] = {
        routeName: vehicle.routeName,
        routeId: vehicle.routeId,
        type: vehicle.type,
        color: vehicle.color,
        vehicles: []
      };
    }
    acc[vehicle.routeId].vehicles.push(vehicle);
    return acc;
  }, {});

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-2">
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider px-2 mb-3">
          {vehicles.length} Active Vehicles
        </div>
        
        {Object.values(groupedVehicles).map((group) => {
          const Icon = typeIcons[group.type];
          
          return (
            <div key={group.routeId} className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1">
                <div 
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: `${group.color}20` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: group.color }} />
                </div>
                <span className="text-sm font-medium text-slate-700">{group.routeId}</span>
                <span className="text-xs text-slate-400 truncate">{group.routeName}</span>
              </div>
              
              {group.vehicles.map((vehicle) => (
                <motion.button
                  key={vehicle.id}
                  onClick={() => onSelect(vehicle)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedVehicle?.id === vehicle.id
                      ? 'bg-slate-100 ring-2 ring-slate-300'
                      : 'hover:bg-slate-50'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: vehicle.color }}
                      >
                        {vehicle.id.split('-')[1]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">
                          Vehicle {vehicle.id}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-slate-500">
                            → {vehicle.nextStop}
                          </span>
                          {vehicle.delay > 2 && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-red-50 text-red-600 border-red-200">
                              +{vehicle.delay}m
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className={`text-[10px] ${occupancyColors[vehicle.occupancy]}`}>
                        {vehicle.occupancy}
                      </Badge>
                      <span className="text-xs text-slate-400">{vehicle.speed} km/h</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
