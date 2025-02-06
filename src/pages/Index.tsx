
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, AreaChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  AlertTriangle, 
  Calendar, 
  FileText, 
  Percent,
  Menu,
  Bell,
  Mail,
  User
} from "lucide-react";

const data = [
  { month: 'Янв', sales: 30, orders: 20 },
  { month: 'Фев', sales: 40, orders: 40 },
  { month: 'Мар', sales: 35, orders: 30 },
  { month: 'Апр', sales: 50, orders: 60 },
  { month: 'Май', sales: 49, orders: 50 },
];

const StatCard = ({ title, value, icon: Icon, className }: { 
  title: string; 
  value: string; 
  icon: any;
  className?: string;
}) => (
  <Card className={cn("relative overflow-hidden transition-all hover:scale-105", className)}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Штрафы за последний месяц"
            value="25"
            icon={AlertTriangle}
            className="bg-red-50 dark:bg-red-900/10"
          />
          <StatCard
            title="Штрафы за последний год"
            value="312"
            icon={Calendar}
            className="bg-blue-50 dark:bg-blue-900/10"
          />
          <StatCard
            title="Количество штрафов"
            value="1,203"
            icon={FileText}
            className="bg-green-50 dark:bg-green-900/10"
          />
          <StatCard
            title="Процент штрафов"
            value="8.5%"
            icon={Percent}
            className="bg-purple-50 dark:bg-purple-900/10"
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Статистика по месяцам</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Тренд штрафов</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="orders" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
