import getWeatherData from "./js-api-handler.js";

async function filterWeatherData(city) {
  const data = await getWeatherData(city);

  const {
    resolvedAddress: address,
    description,
    currentConditions,
    tzOffset,
  } = data;

  const conditions = {
    description: currentConditions.conditions,
    timeEpoch: currentConditions.datetimeEpoch,
    sunriseEpoch: currentConditions.sunriseEpoch,
    sunsetEpoch: currentConditions.sunsetEpoch,
    temp: currentConditions.temp,
    feelslike: currentConditions.feelslike,
    uvindex: currentConditions.uvindex,
    precipprob: currentConditions.precipprob,
  };

  return {
    address,
    description,
    tzOffset,
    conditions,
  };
}

export default filterWeatherData;
