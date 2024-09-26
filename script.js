const city = document.querySelector(".city");
const tempertaure = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const img = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

const apiKey = "your api key here!";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";

async function checkWeather(cityName) {
  const response = await fetch(apiURL + cityName + `&appid=${apiKey}`);
  if (response.status === 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    let data = await response.json();

    // Convert temperature from Kelvin to Celsius
    const tempInCelsius = data.main.temp - 273.15;

    city.innerHTML = data.name;
    tempertaure.innerHTML = Math.round(tempInCelsius) + "°C"; // Display in Celsius
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";

    // Set weather icon based on the weather condition
    if (data.weather[0].main === "Clouds") {
      img.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      img.src = "images/clear.png";
    } else if (data.weather[0].main === "Drizzle") {
      img.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      img.src = "images/mist.png";
    } else if (data.weather[0].main === "Rain") {
      img.src = "images/rain.png";
    }

    weather.style.display = "block";
    error.style.display = "none";
  }
}

function performSearch() {
  checkWeather(searchBox.value);
}

// Search input when "Enter key" is pressed
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    performSearch();
    searchBox.value = "";
  }
});

// Search input when "clicked"
searchBtn.addEventListener("click", () => {
  performSearch();
  searchBox.value = "";
});
