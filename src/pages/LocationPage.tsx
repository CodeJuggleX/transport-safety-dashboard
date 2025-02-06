
import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const LocationPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [37.6156, 55.7522], // Moscow coordinates
      zoom: 9
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setIsMapInitialized(true);
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Местоположение</h1>
      
      {!isMapInitialized && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Для отображения карты, пожалуйста, введите ваш Mapbox токен. 
                Вы можете получить его на сайте mapbox.com
              </p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Введите ваш Mapbox токен"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                />
                <Button onClick={initializeMap}>
                  Показать карту
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <div 
            ref={mapContainer} 
            className="w-full h-[600px] rounded-lg"
            style={{ display: isMapInitialized ? 'block' : 'none' }}
          />
          {!isMapInitialized && (
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                Введите Mapbox токен для отображения карты
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationPage;
