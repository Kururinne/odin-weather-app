import "./stylesheet.css";
import filterWeatherData from "./js-filter-weather-data.js";

filterWeatherData("San Francisco").then((result) => console.log(result));
