const apiKey = 'b85ba95ce4b9c8578a16802cfecb6689';
const cities = 'Cities';

// Get the data from the local storage
const getLocalStorageData = () => {
  return JSON.parse(localStorage.getItem(cities)) || [];
};

// Set the data to the local storage

const setLocalStorageData = (data) => {
    localStorage.setItem(cities, JSON.stringify(data));
};

// Add the city to the local storage
const addCity = (city) => {
    const data = getLocalStorageData();
    data.push(city);
    setLocalStorageData(data);
};

// Remove the city from the local storage
const removeCity = (city) => {
    const data = getLocalStorageData();
    const newData = data.filter((item) => item !== city);
    setLocalStorageData(newData);
};

// Get the weather data from the API
const getWeatherData = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    return data;
};

// Display the weather data
const displayWeatherData = (data) => {
    const { name, main, weather } = data;
    const city = document.querySelector('.city');
    const temperature = document.querySelector('.temperature');
    const weatherType = document.querySelector('.weather');
    city.textContent = `Weather in ${name}`;
    temperature.textContent = `${Math.round(main.temp - 273.15)}°C`;
    weatherType.textContent = weather[0].main;
};
