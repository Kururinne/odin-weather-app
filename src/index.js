import "./stylesheet.css";
import filterWeatherData from "./js-data-filter.js";

filterWeatherData("San Francisco").then((result) => console.log(result));
