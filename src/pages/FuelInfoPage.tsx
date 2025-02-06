
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FuelInfoPage = () => {
  const [fuelInfo, setFuelInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchFuelInfo = async () => {
      try {
        const response = await fetch(`http://10.1.16.211/api/v1/fuel-information/?page=${page}`);
        if (!response.ok) {
          throw new Error('Ошибка сети при получении данных');
        }
        const data = await response.json();
        setFuelInfo(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchFuelInfo();
  }, [page]);

  if (loading) return <div className="p-8 text-center">Загрузка...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Ошибка: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Информация о топливе</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fuelInfo.map((info: any) => (
          <Card key={info.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <h3 className="font-semibold">{info.fuel_type}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Цена: {info.price} сом
              </p>
              <p className="text-sm text-muted-foreground">
                Локация: {info.location}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Назад
        </Button>
        <Button
          onClick={() => setPage(p => p + 1)}
        >
          Вперед
        </Button>
      </div>
    </div>
  );
};

export default FuelInfoPage;
