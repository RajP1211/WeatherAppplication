import React, { createContext, useState, ReactNode, useContext } from "react";
import { WeatherContext } from "./WeatherContext";

type NewsItem = {
  title: string;
  description: string;
  url?: string;
};

type NewsContextType = {
  news: NewsItem[];
};

export const NewsContext = createContext<NewsContextType | null>(null);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const weatherContext = useContext(WeatherContext);

  const allNews: NewsItem[] = [
    { title: "Depressing news 1", description: "Sad story..." },
    { title: "Fear news 1", description: "Something scary happened..." },
    { title: "Winning news 1", description: "Team wins championship!" },
    { title: "Happy news 1", description: "Community celebrates..." },
    { title: "Fear news 2", description: "Stock market drops..." },
    { title: "Depressing news 2", description: "Economic downturn..." },
  ];

  const temp = weatherContext?.weather.temperature || 20;
  let filteredNews = allNews;

  if (temp < 10) {
    filteredNews = allNews.filter((n) => n.title.toLowerCase().includes("depress"));
  } else if (temp > 30) {
    filteredNews = allNews.filter((n) => n.title.toLowerCase().includes("fear"));
  } else {
    filteredNews = allNews.filter((n) =>
      n.title.toLowerCase().includes("win") || n.title.toLowerCase().includes("happy")
    );
  }

  return <NewsContext.Provider value={{ news: filteredNews }}>{children}</NewsContext.Provider>;
};
