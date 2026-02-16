import { useEffect, useRef, useState } from "react";
import { MapView } from "./Map";
import { Card, CardContent } from "./ui/card";

interface Port {
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

interface ItineraryMapProps {
  ports: Port[];
  itineraryName: string;
}

export function ItineraryMap({ ports, itineraryName }: ItineraryMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  const handleMapReady = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  useEffect(() => {
    if (!map || ports.length === 0) return;

    // Clear existing markers and polyline
    markersRef.current.forEach(marker => {
      if (marker && marker.setMap) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    // Filter valid ports with coordinates (exclude navigation days)
    const validPorts = ports.filter(
      port => port.name !== 'Navegação' && 
              port.latitude !== null && port.longitude !== null && 
              !isNaN(port.latitude) && !isNaN(port.longitude) &&
              port.latitude !== 0 && port.longitude !== 0
    );

    if (validPorts.length === 0) return;

    // Create markers for each port
    validPorts.forEach((port, index) => {
      try {
        const marker = new google.maps.Marker({
          position: { lat: port.latitude, lng: port.longitude },
          map: map,
          title: port.name,
          label: {
            text: String(index + 1),
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 20,
            fillColor: index === 0 ? "#10b981" : index === validPorts.length - 1 ? "#ef4444" : "#6366f1",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
          },
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="color: #1f2937; padding: 8px;">
              <h3 style="font-weight: 600; margin: 0 0 4px 0;">${port.name}</h3>
              ${port.city && port.country ? `<p style="margin: 0; font-size: 14px;">${port.city}, ${port.country}</p>` : ''}
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        markersRef.current.push(marker);
      } catch (error) {
        console.error("Error creating marker:", error);
      }
    });

    // Draw polyline route
    if (validPorts.length >= 2) {
      try {
        const path = validPorts.map(port => ({
          lat: port.latitude,
          lng: port.longitude,
        }));

        polylineRef.current = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: "#6366f1",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          map: map,
        });
      } catch (error) {
        console.error("Error creating polyline:", error);
      }
    }

    // Fit bounds to show all markers with padding
    try {
      const bounds = new google.maps.LatLngBounds();
      validPorts.forEach(port => {
        bounds.extend(new google.maps.LatLng(port.latitude, port.longitude));
      });
      
      // Add padding to bounds
      map.fitBounds(bounds, {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      });
    } catch (error) {
      console.error("Error fitting bounds:", error);
    }

    // Cleanup function
    return () => {
      markersRef.current.forEach(marker => {
        if (marker && marker.setMap) {
          marker.setMap(null);
        }
      });
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map, ports]);

  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardContent className="p-0">
        <div className="h-[500px] w-full">
          <MapView onMapReady={handleMapReady} />
        </div>
      </CardContent>
    </Card>
  );
}
