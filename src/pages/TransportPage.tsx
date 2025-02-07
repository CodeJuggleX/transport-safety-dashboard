
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { mockVehicles } from "@/data/mockData";
import { toast } from "sonner";

const TransportPage = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      setVehicles(mockVehicles);
      setLoading(false);
    }, 500);
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
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-white border-purple-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-purple-900">{vehicle.car_make} {vehicle.car_model}</h3>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-purple-700">Год: {vehicle.year_of_issue}</p>
                  <p className="text-sm text-purple-700">Госномер: {vehicle.state_number}</p>
                  <p className="text-sm text-purple-700">Пробег: {vehicle.car_mileage} км</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportPage;

