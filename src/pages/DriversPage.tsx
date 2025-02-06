
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Driver {
  id: number;
  name: string;
  surname: string;
  experience: number;
  category: string;
}

const DriversPage = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://10.1.16.211/api/v1/drivers/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDrivers(data.results || []);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных';
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: errorMessage
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [toast]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Водители</h1>
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-muted-foreground">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Водители</h1>
        <Card className="border-destructive">
          <CardContent className="p-4">
            <p className="text-destructive">Ошибка: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Пожалуйста, проверьте подключение к сети или попробуйте позже
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Водители</h1>
      {drivers.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Нет доступных водителей</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {drivers.map((driver) => (
            <Card key={driver.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-semibold">{driver.name} {driver.surname}</h3>
                <p className="text-sm text-muted-foreground mt-2">Опыт: {driver.experience} лет</p>
                <p className="text-sm text-muted-foreground">Категория: {driver.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriversPage;
