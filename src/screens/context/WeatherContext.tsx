import React, { createContext, useState, ReactNode } from "react";

type WeatherData = {
  temperature: number;
  condition: string;
};

type WeatherContextType = {
  weather: WeatherData;
  unit: "metric" | "imperial";
  setUnit: (unit: "metric" | "imperial") => void;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const weather: WeatherData = {
    temperature: 22,
    condition: "Cool",
  };
  return (
    <WeatherContext.Provider value={{ weather, unit, setUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};
