import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://10.1.16.211/api/v1/driver-info/');
        if (!response.ok) {
          throw new Error('Ошибка сети при получении данных');
        }
        const data = await response.json();
        setDrivers(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) return <div className="p-8 text-center">Загрузка...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Ошибка: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Водители</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {drivers.map((driver: any) => (
          <Card key={driver.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <h3 className="font-semibold">{driver.name} {driver.surname}</h3>
              <p className="text-sm text-muted-foreground mt-2">Телефон: {driver.phone_number}</p>
              <p className="text-sm text-muted-foreground">Стаж: {driver.experience} лет</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DriversPage;