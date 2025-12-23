import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Bus, Train, Ship } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

const typeIcons = {
  bus: Bus,
  train: Train,
  ferry: Ship
};

export default function VehicleMarker({ vehicle, isSelected, onClick }) {
  const icon = useMemo(() => {
    const IconComponent = typeIcons[vehicle.type] || Bus;
    const size = isSelected ? 40 : 32;
    const innerSize = isSelected ? 20 : 16;
    
    const html = `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${vehicle.color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px ${vehicle.color}40;
        border: 3px solid white;
        transform: rotate(${vehicle.bearing}deg);
        transition: all 0.3s ease;
        ${isSelected ? 'transform: scale(1.2);' : ''}
      ">
        <svg 
          width="${innerSize}" 
          height="${innerSize}" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          stroke-width="2.5" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          style="transform: rotate(-${vehicle.bearing}deg);"
        >
          ${vehicle.type === 'bus' ? '<path d="M8 6v6"/><path d="M16 6v6"/><path d="M2 12h20"/><path d="M17 18h1a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1"/><circle cx="8.5" cy="18" r="1.5"/><circle cx="15.5" cy="18" r="1.5"/>' : ''}
          ${vehicle.type === 'train' ? '<path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5"/><path d="M4 11v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M4 11h16"/><path d="M8 18v4"/><path d="M16 18v4"/><path d="M8 3v3"/><path d="M16 3v3"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/>' : ''}
          ${vehicle.type === 'ferry' ? '<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/>' : ''}
        </svg>
      </div>
      ${isSelected ? `
        <div style="
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          background: ${vehicle.color};
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        ">${vehicle.routeId}</div>
      ` : ''}
    `;

    return L.divIcon({
      html,
      className: 'custom-vehicle-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }, [vehicle.type, vehicle.color, vehicle.bearing, vehicle.routeId, isSelected]);

  return (
    <Marker
      position={[vehicle.lat, vehicle.lng]}
      icon={icon}
      eventHandlers={{
        click: onClick
      }}
    />
  );
}
