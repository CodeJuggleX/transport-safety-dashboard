
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

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
    console.log('Downloading file:', fileId);
  };

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
        <h1 className="text-3xl font-bold mb-6 text-center">Путевые листы</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sheets.map((sheet: any) => (
            <Card key={sheet.id} className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-white border-purple-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-purple-900">
                  {sheet.driver?.name} {sheet.driver?.surname}
                </h3>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-purple-700">
                    {sheet.car?.car_make} {sheet.car?.car_model}
                  </p>
                  <p className="text-sm text-purple-700">
                    Дата: {sheet.start_data} - {sheet.end_data}
                  </p>
                </div>
                <Button 
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => handleDownload(sheet.id)}
                >
                  Загрузить
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DirectionSheetPage;
