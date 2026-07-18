import filterWeatherData from "./js-filter-weather-data.js";
import { tz } from "@date-fns/tz";
import { format } from "date-fns";

async function updateCurrentWeatherInfo(city) {
  try {
    const weatherInfo = document.getElementById("weather-info");

    const loadingCard = makeLoadingCard();
    weatherInfo.replaceChildren(loadingCard);

    const data = await filterWeatherData(city);
    const weatherCard = makeWeatherCard(data);

    const unitsSwitch = weatherCard.querySelector(".units-switch");
    unitsSwitch.addEventListener("click", (e) => {
      const currentUnit = weatherCard.dataset.unit;
      const targetUnit = e.target.className;
      if (currentUnit !== targetUnit) {
        changeUnits(weatherCard);
      }
    });

    weatherInfo.replaceChildren(weatherCard);
  } catch (error) {
    const errorDisplay = document.querySelector(".error-display");
    errorDisplay.textContent = error.message;
  }
}

function makeWeatherCard(data) {
  const weatherCard = document
    .getElementById("weather-card-template")
    .content.querySelector(".todays-weather-card")
    .cloneNode(true);

  const location = weatherCard.querySelector(".location");
  const time = weatherCard.querySelector(".time-tz");
  const desc = weatherCard.querySelector(".description");
  const temp = weatherCard.querySelector(".temp-number");
  const precip = weatherCard.querySelector(".precip");
  const humidity = weatherCard.querySelector(".humidity");
  const wind = weatherCard.querySelector(".wind");

  const locationString = data.address
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const timeString = format(new Date(), "h:mm a", {
    in: tz(data.timezone),
  });

  const descString = data.description;

  const tempString = Math.round(data.conditions.temp);

  const precipString = `Precipitation: ${data.conditions.precipprob}%`;
  const humidityString = `Humidity: ${data.conditions.humidity}%`;
  const windString = `Wind: ${data.conditions.windspeed} km/h`;

  location.textContent = locationString;
  time.textContent = timeString;
  desc.textContent = descString;
  temp.textContent = tempString;
  precip.textContent = precipString;
  humidity.textContent = humidityString;
  wind.textContent = windString;

  const activeUnit = weatherCard.querySelector(".us");
  activeUnit.classList.toggle("unit-active");
  weatherCard.dataset.unit = "us";

  // Make other units in advance

  const timeOther = weatherCard.querySelector(".other-units .time-tz");
  const tempOther = weatherCard.querySelector(".other-units .temp-number");
  const windOther = weatherCard.querySelector(".other-units .wind");

  const timeOtherString = format(new Date(), "H:mm", {
    in: tz(data.timezone),
  });
  const tempOtherString = Math.round((data.conditions.temp - 32) / 1.8);
  const windOtherString = `Wind: ${(data.conditions.windspeed * 1.609).toFixed(1)} km/h`;

  timeOther.textContent = timeOtherString;
  tempOther.textContent = tempOtherString;
  windOther.textContent = windOtherString;

  return weatherCard;
}

function changeUnits(weatherCard) {
  const time = weatherCard.querySelector(".time-tz");
  const temp = weatherCard.querySelector(".temp-number");
  const wind = weatherCard.querySelector(".wind");

  const toChange = [time, temp, wind];

  for (const element of toChange) {
    const replacement = weatherCard.querySelector(
      `.other-units .${element.classList[0]}`,
    );
    const elementContent = element.textContent;
    element.textContent = replacement.textContent;
    replacement.textContent = elementContent;
  }

  const us = weatherCard.querySelector(".us");
  us.classList.toggle("unit-active");
  const metric = weatherCard.querySelector(".metric");
  metric.classList.toggle("unit-active");

  if (weatherCard.dataset.unit === "us") {
    weatherCard.dataset.unit = "metric";
  } else {
    weatherCard.dataset.unit = "us";
  }
}

function makeLoadingCard() {
  const loadingCard = document
    .getElementById("loading-screen")
    .content.querySelector(".loading")
    .cloneNode(true);

  return loadingCard;
}

export default updateCurrentWeatherInfo;
