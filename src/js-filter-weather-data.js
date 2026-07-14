import getWeatherData from "./js-get-weather-data.js";

async function filterWeatherData(city) {
  const data = await getWeatherData(city);

  const {
    resolvedAddress: address,
    description,
    currentConditions,
    timezone,
  } = data;

  const conditions = {
    description: currentConditions.conditions,
    temp: currentConditions.temp,
    precipprob: currentConditions.precipprob,
    humidity: currentConditions.humidity,
    windspeed: currentConditions.windspeed,
  };

  return {
    address,
    description,
    timezone,
    conditions,
  };
}

export default filterWeatherData;
