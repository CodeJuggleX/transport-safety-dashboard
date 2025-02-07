
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Map from "@/components/Map";

const LocationPage = () => {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Местоположение</h1>
        <Map />
      </div>
    </div>
  );
};

export default LocationPage;
