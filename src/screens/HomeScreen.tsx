import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, StatusBar, Platform } from "react-native";
import { useLocation } from "../hooks/useLocation";
import { SettingsContext } from "./context/settingContext";
import { ThemeContext } from "../context/ThemeContext";
import { getWeather } from "../service/weather";
import { getNews } from "../service/news";
import { filterNews } from "../utils/filterNews";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
export default function HomeScreen() {
  const coords = useLocation();
  const { units, categories } = useContext(SettingsContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [weather, setWeather] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (coords) {
      (async () => {
        setLoading(true);
                const w = await getWeather(coords.lat, coords.lon, units);

        setWeather(w);

        const articles = await getNews(categories[0] || "general");
        const filtered = filterNews(articles, w.main.temp);
        console.log(filtered,"v")
        setNews(filtered);
        setLoading(false);
      })();
    }
  }, [coords, units, categories]);

  if (loading) {
    return (
      <View style={[styles.loader, { backgroundColor: isDark ? "#111827" : "#F9FAFB" }]}>
      <BarIndicator color='#1E90FF'     count={5}/>
        <Text style={[styles.loadingText, { color: isDark ? "#fff" : "#4B5563" }]}>
          Fetching latest updates...
        </Text>
      </View>
    );
  }

  return (
<View
  style={{
    flex: 1,
    backgroundColor: isDark ? "#000" : "#F9FAFB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }}
>
  <StatusBar
    barStyle={isDark ? "light-content" : "dark-content"}
    backgroundColor={isDark ? "#000" : "#F9FAFB"}
    translucent={false}
  />
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#111827" : "#F3F4F6"}
      />

      <View style={[styles.weatherContainer, { flex: 0.3, backgroundColor: isDark ? "#1E90FF" : "#1E90FF",borderColor: isDark ? "#fff" : "#111827" ,borderWidth: isDark ? 2:0  }]}>
        <Text style={[styles.city, { color: isDark ? "#fff" : "#FFFFFF" }]}>{weather.name}</Text>
        <Text style={[styles.temperature, { color: isDark ? "#fff" : "#FFFFFF" }]}>
          {Math.round(weather.main.temp)}° {units === "metric" ? "C" : "F"}
        </Text>
        <Text style={[styles.condition, { color: isDark ? "#E5E7EB" : "#E5E7EB" }]}>{weather.weather[0].description}</Text>
      </View>

      <View style={{ flex: 0.7, paddingHorizontal: 16, paddingTop: 16,paddingBottom:40 }}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#111827" }]}>Top News Headlines</Text>
        <FlatList
          data={news}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={[styles.newsCard, { backgroundColor: isDark ? "#000" : "#FFFFFF",borderColor: isDark ? "#fff" : "#111827" ,borderWidth: isDark ? 2:0  }]}>
              <Text style={[styles.newsTitle, { color: isDark ? "#fff" : "#111827" }]}>{item.title}</Text>
              <Text style={[styles.newsDesc, { color: isDark ? "#D1D5DB" : "#4B5563" }]}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  weatherContainer: {
    borderRadius: 16,
    // margin: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  city: {
    fontSize: 22,
    fontWeight: "600",
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 8,
  },
  condition: {
    fontSize: 18,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  newsCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  newsDesc: {
    fontSize: 14,
  },
});
