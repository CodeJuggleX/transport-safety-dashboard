import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, MapPin, FileSpreadsheet, Fuel, Menu, Bell, Mail, User } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
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
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-4 ml-4">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost" className="flex items-center gap-2">
              Главная
            </Button>
          </Link>
          <Link to="/drivers" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Водители
            </Button>
          </Link>
          <Link to="/transport" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Транспорт
            </Button>
          </Link>
          <Link to="/location" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Местоположение
            </Button>
          </Link>
          <Link to="/direction-sheet" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Путевой лист
            </Button>
          </Link>
          <Link to="/fuel-info" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost" className="flex items-center gap-2">
              <Fuel className="h-4 w-4" />
              Информация о топливе
            </Button>
          </Link>
        </nav>

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
      
      {/* Mobile Navigation */}
      {sidebarOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              <Button variant="ghost" className="w-full justify-start">
                Главная
              </Button>
            </Link>
            <Link to="/drivers" className="text-sm font-medium transition-colors hover:text-primary">
              <Button variant="ghost" className="w-full justify-start">
                <Car className="h-4 w-4 mr-2" />
                Водители
              </Button>
            </Link>
            <Link to="/transport" className="text-sm font-medium transition-colors hover:text-primary">
              <Button variant="ghost" className="w-full justify-start">
                <Car className="h-4 w-4 mr-2" />
                Транспорт
              </Button>
            </Link>
            <Link to="/location" className="text-sm font-medium transition-colors hover:text-primary">
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Местоположение
              </Button>
            </Link>
            <Link to="/direction-sheet" className="text-sm font-medium transition-colors hover:text-primary">
              <Button variant="ghost" className="w-full justify-start">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Путевой лист
              </Button>
            </Link>
            <Link to="/fuel-info" className="text-sm font-medium transition-colors hover:text-primary">
              <Button variant="ghost" className="w-full justify-start">
                <Fuel className="h-4 w-4 mr-2" />
                Информация о топливе
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;