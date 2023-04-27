import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MCP } from '../../api/types';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface MapProps {
  mcps: MCP[];
}

const Map = (mapProps: MapProps) => {
  const { mcps } = mapProps;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const center: [number, number] = [10.7731603, 106.6595802];
  const zoom = 17.5;

  const [coordinates, setCoordinates] = useState<[number, number][]>([]);

  const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 35],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
    popupAnchor: [1, -34],
  });

  const addMarker = (map: L.Map, position: [number, number]) => {
    L.marker(position, { icon: defaultIcon }).addTo(map);
  };

  const showRoute = (map: L.Map, mcps: MCP[]) => {
    const coordinates = mcps.map(mcp => [mcp.lat, mcp.long] as [number, number]);
    L.polyline(coordinates, { color: 'blue' }).addTo(map);
  };

  // Update coordinates state when mcps prop changes
  useEffect(() => {
    const newCoordinates = mcps.map(mcp => [mcp.lat, mcp.long] as [number, number]);
    setCoordinates(newCoordinates);
  }, [mcps]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    addMarker(map, center);
    coordinates.forEach((coordinate) => {addMarker(map, coordinate)});

    if (coordinates) {
      showRoute(map, mcps);
    }
    return () => {
      map.remove();
    };
  }, [center, zoom, coordinates]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default Map;