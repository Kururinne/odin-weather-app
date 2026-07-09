import "./stylesheet.css";

const API_KEY = "DG5P8PF7896Y9FCKRAQCUWSSC";

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Query failed", {
      cause: error,
    });
  }
}

export default getWeatherData;
