
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DirectionSheetPage = () => {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await fetch('http://10.1.16.211/api/v1/direction-sheet/objects/');
        if (!response.ok) {
          throw new Error('Ошибка сети при получении данных');
        }
        const data = await response.json();
        setSheets(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchSheets();
  }, []);

  const handleDownload = async (fileId: string) => {
    // Download logic here
    console.log('Downloading file:', fileId);
  };

  if (loading) return <div className="p-8 text-center">Загрузка...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Ошибка: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Путевые листы</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sheets.map((sheet: any) => (
          <Card key={sheet.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <h3 className="font-semibold">
                {sheet.driver?.name} {sheet.driver?.surname}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {sheet.car?.car_make} {sheet.car?.car_model}
              </p>
              <p className="text-sm text-muted-foreground">
                Дата: {sheet.start_data} - {sheet.end_data}
              </p>
              <Button 
                className="mt-4 w-full"
                onClick={() => handleDownload(sheet.id)}
              >
                Загрузить
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DirectionSheetPage;
