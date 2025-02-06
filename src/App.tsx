
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DriversPage from "./pages/DriversPage";
import TransportPage from "./pages/TransportPage";
import LocationPage from "./pages/LocationPage";
import DirectionSheetPage from "./pages/DirectionSheetPage";
import FuelInfoPage from "./pages/FuelInfoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/direction-sheet" element={<DirectionSheetPage />} />
          <Route path="/fuel-info" element={<FuelInfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
