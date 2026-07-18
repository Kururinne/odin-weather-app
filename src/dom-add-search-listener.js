import updateCurrentWeatherInfo from "./dom-update-current-weather-info.js";

async function addSearchListener() {
  const search = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  search.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      await updateCurrentWeatherInfo(query);
    }
  });
}

export default addSearchListener;
