
import { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const LocationPage = () => {
  useEffect(() => {
    // Initialize map here if needed
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Местоположение</h1>
      <Card>
        <CardContent className="p-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Карта будет добавлена позже</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationPage;
