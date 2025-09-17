
import React from "react";
import AppNavigator from "./src/AppNavigator";
import { SettingsProvider } from "./src/screens/context/settingContext";
import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SettingsProvider>
  );
}
