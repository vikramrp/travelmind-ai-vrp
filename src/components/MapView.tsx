import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY !== 'MY_GOOGLE_MAPS_PLATFORM_KEY';

interface MapViewProps {
  destination: string;
}

export function MapView({ destination }: MapViewProps) {
  if (!hasValidKey) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-zinc-900 rounded-2xl border border-zinc-800 text-center">
        <h2 className="text-xl font-bold text-white mb-4 italic font-serif">Google Maps API Key Required</h2>
        <p className="text-zinc-400 mb-6 max-w-md">
          To visualize your destinations, please add your Google Maps API key to the secrets panel.
        </p>
        <div className="bg-zinc-950 p-4 rounded-xl text-left text-sm border border-zinc-800">
          <p className="font-mono text-xs text-orange-500 mb-2 uppercase tracking-widest">Setup Instructions</p>
          <ol className="list-decimal list-inside space-y-2 text-zinc-300">
            <li>Go to Cloud Console and get an API Key</li>
            <li>Open App Settings (Gear Icon) → Secrets</li>
            <li>Add <code className="text-blue-400">GOOGLE_MAPS_PLATFORM_KEY</code></li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative">
        <Map
          defaultCenter={{ lat: 0, lng: 0 }}
          defaultZoom={2}
          mapId="TRAVELMIND_MAP"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          gestureHandling="greedy"
          disableDefaultUI={true}
        >
          <MapController destination={destination} />
        </Map>
      </div>
    </APIProvider>
  );
}

function MapController({ destination }: { destination: string }) {
  const map = useMap();
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (!map || !destination) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const pos =results[0].geometry.location.toJSON();
        setPosition(pos);
        map.setCenter(pos);
        map.setZoom(12);
      }
    });
  }, [map, destination]);

  return position ? (
    <AdvancedMarker position={position}>
      <Pin background="rgb(249, 115, 22)" glyphColor="white" borderColor="rgb(194, 65, 12)" />
    </AdvancedMarker>
  ) : null;
}
