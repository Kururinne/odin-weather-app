import updateCurrentWeatherInfo from "./dom-update-current-weather-info.js";

async function addSearchListener() {
  const search = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const errorDisplay = document.querySelector(".error-display");

  search.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      try {
        await updateCurrentWeatherInfo(query);
        if (errorDisplay.textContent) {
          errorDisplay.textContent = "";
        }
      } catch (error) {
        errorDisplay.textContent = error.message;
      }
    }
  });
}

export default addSearchListener;
