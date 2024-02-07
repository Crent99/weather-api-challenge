const cityInput = document.querySelector('.search-btn');
const searchButton = document.querySelector('.search-btn');

const API_KEY = "b85ba95ce4b9c8578a16802cfecb6689" // API key for OpenWeatherMap API

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim(); // Get user entered city name and remove extra spaces
    if (!cityName) return; // If city name is empty, return
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        console.log(data)
    }).catch(() => {
        alert("An error occured while fetching the coordinates!");
    });
}
    

searchButton.addEventListener('click', getCityCoordinates);