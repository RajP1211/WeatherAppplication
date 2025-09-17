import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { SettingsContext } from "./context/settingContext";
import { ThemeContext } from "../context/ThemeContext";

export default function SettingsScreen() {
  const { units, setUnits } = useContext(SettingsContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#000" : "#F3F4F6" }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#111827" : "#F3F4F6"}
      />

      <View style={{ flex: 0.15,justifyContent:'center' }}>
        <Text style={[styles.header, { color: isDark ? "#fff" : "#111827" }]}>
          Settings
        </Text>
      </View>

      <View style={[styles.cardContainer, { flex:0.15,borderColor: isDark ? "#fff" : "#111827" ,borderWidth: isDark ? 2:0  }]}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#111827" }]}>
          Temperature Display
        </Text>
        <Text style={[styles.desc, { color: isDark ? "#D1D5DB" : "#6B7280" }]}>
          Choose your preferred temperature unit
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? "#1E90FF" : "#2563EB" }]}
          onPress={() => setUnits(units === "metric" ? "imperial" : "metric")}
        >
          <Text style={styles.buttonText}>
            {units === "metric" ? "Show Fahrenheit" : "Show Celsius"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.cardContainer, { flex:0.15,borderColor: isDark ? "#fff" : "#111827" ,borderWidth: isDark ? 2:0  }]}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#111827" }]}>
          App Theme
        </Text>
        <Text style={[styles.desc, { color: isDark ? "#D1D5DB" : "#6B7280" }]}>
          Switch between light and dark mode
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? "#1E90FF" : "#2563EB" }]}
          onPress={toggleTheme}
        >
          <Text style={styles.buttonText}>
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.cardContainer, { flex:0.15,borderColor: isDark ? "#fff" : "#111827" ,borderWidth: isDark ? 2:0  }]}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#111827" }]}>
          More Options
        </Text>
        <Text style={[styles.desc, { color: isDark ? "#D1D5DB" : "#6B7280" }]}>
          Coming soon...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
 marginTop:"10%",
 marginHorizontal:24
    
  },
  cardContainer: {
    marginHorizontal: 20,
    // borderRadius: 16,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
