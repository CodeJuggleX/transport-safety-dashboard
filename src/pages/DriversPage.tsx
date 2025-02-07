
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://10.1.16.211/api/v1/driver-info/');
        if (!response.ok) {
          throw new Error('Ошибка сети при получении данных');
        }
        const data = await response.json();
        setDrivers(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
        toast.error("Ошибка при загрузке данных о водителях");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
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
        <h1 className="text-3xl font-bold mb-6 text-center">Водители</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {drivers.map((driver: any) => (
            <Card key={driver.id} className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-white border-purple-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-purple-900">{driver.name} {driver.surname}</h3>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-purple-700">Телефон: {driver.phone_number}</p>
                  <p className="text-sm text-purple-700">Стаж: {driver.experience} лет</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriversPage;
