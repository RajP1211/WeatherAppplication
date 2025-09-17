
import axios from "axios";

const API_KEY = "kolp2311";
const BASE_URL = "https://newsapi.org/v2";

export const getNews = async (category: string = "general") => {
  try {
    const res = await axios.get(`${BASE_URL}/top-headlines`, {
      params: { country: "IN", category, apiKey: API_KEY },
    });

    if (res.data.articles.length > 0) {
      return res.data.articles;
    }

    const fallback = await axios.get(`${BASE_URL}/everything`, {
      params: { q: category, sortBy: "publishedAt", apiKey: API_KEY },
    });

    return fallback.data.articles;
  } catch (err) {
    console.error("Error fetching news:", err);
    return [];
  }
};
