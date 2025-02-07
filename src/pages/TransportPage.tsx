import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const TransportPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://10.1.16.211/api/v1/car-info/');
        if (!response.ok) {
          throw new Error('Ошибка сети при получении данных');
        }
        const data = await response.json();
        setVehicles(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return (
    <div>
      <Navigation />
      <div className="p-8 text-center">Загрузка...</div>
    </div>
  );
  
  if (error) return (
    <div>
      <Navigation />
      <div className="p-8 text-center text-red-500">Ошибка: {error}</div>
    </div>
  );

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Транспорт</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle: any) => (
            <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-semibold">{vehicle.car_make} {vehicle.car_model}</h3>
                <p className="text-sm text-muted-foreground mt-2">Год: {vehicle.year_of_issue}</p>
                <p className="text-sm text-muted-foreground">Госномер: {vehicle.state_number}</p>
                <p className="text-sm text-muted-foreground">Пробег: {vehicle.car_mileage} км</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportPage;