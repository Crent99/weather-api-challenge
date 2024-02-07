const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "b85ba95ce4b9c8578a16802cfecb6689"; // API key for OpenWeatherMap API

const createWeatherCard = (cityName, weatherItem, index) =>
    `<div class="weather-card">
        <h2 class="city-name">${cityName}</h2>
        <p class="date">${new Date(weatherItem.dt * 1000).toDateString()}</p>
        <p class="temp">${weatherItem.temp.day}°C</p>
        <p class="description">${weatherItem.weather[0].description}</p>
    </div>`; // Create a weather card for the given city and weather data

const fetchWeatherData = async (cityName) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
}

const fetchWeatherForecast = async (lat, lon) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
}

const fetchWeatherDataByCoords = async (lat, lon) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
}

const fetchWeatherDataByCity = async (cityName) => {
    const weatherData = await fetchWeatherData(cityName);
    const weatherForecast = await fetchWeatherForecast(weatherData.coord.lat, weatherData.coord.lon);
    return { weatherData, weatherForecast };
}

const fetchWeatherDataByLocation = async (lat, lon) => {
    const weatherData = await fetchWeatherDataByCoords(lat, lon);
    const weatherForecast = await fetchWeatherForecastByCoords(lat, lon);
    return { weatherData, weatherForecast };
}

const renderWeatherData = (cityName, weatherData, weatherForecast) => {
    currentWeatherDiv.innerHTML = `
        <h1 class="city-name">${cityName}</h1>
        <p class="date">${new Date(weatherData.dt * 1000).toDateString()}</p>
        <p class="temp">${weatherData.main.temp}°C</p>
        <p class="description">${weatherData.weather[0].description}</p>
    `; // Render the current weather data

    weatherCardsDiv.innerHTML = weatherForecast.daily.map((weatherItem, index) => createWeatherCard(cityName, weatherItem, index)).join(""); // Render the weather forecast
}

searchButton.addEventListener("click", async () => {
    const cityName = cityInput.value;
    const { weatherData, weatherForecast } = await fetchWeatherDataByCity(cityName);
    renderWeatherData(cityName, weatherData, weatherForecast);
});

locationButton.addEventListener("click", async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { weatherData, weatherForecast } = await fetchWeatherDataByLocation(position.coords.latitude, position.coords.longitude);
            renderWeatherData(weatherData.name, weatherData, weatherForecast);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});