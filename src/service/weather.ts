import axios from "axios";

const API_KEY = "kolp2311";
const BASE_URL = "https://api.openweathermap.org/data/2.5";



export const getWeather = async (lat: number, lon: number, units: "metric" | "imperial") => {

  console.log(lat,lon,units)
  const res = await axios.get(`${BASE_URL}/weather`, {
    params: { lat, lon, units, appid: API_KEY },
  });
  console.log(res,"=======")
  return res.data;
};

export const getForecast = async (lat: number, lon: number, units: "metric" | "imperial") => {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: { lat, lon, units, appid: API_KEY },
  });
  return res.data;
};
