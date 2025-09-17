import React, { createContext, useState, ReactNode } from "react";

type SettingsContextType = {
  units: "metric" | "imperial";
  categories: string[];
  setUnits: (u: "metric" | "imperial") => void;
  setCategories: (c: string[]) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  units: "metric",
  categories: [],
  setUnits: () => {},
  setCategories: () => {},
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <SettingsContext.Provider value={{ units, categories, setUnits, setCategories }}>
      {children}
    </SettingsContext.Provider>
  );
};
