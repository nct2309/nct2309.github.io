import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const center: [number, number] = [10.7731603, 106.6595802];
  const zoom = 17.5;
  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [center, zoom]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default Map;