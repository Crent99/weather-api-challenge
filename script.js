const apiKey = 'b85ba95ce4b9c8578a16802cfecb6689';
const apiUrl = (`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`)

fetch(apiUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('error', error));

var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);

fetch(apiUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('error', error));

function getWeather(cityName) {
    var apiKey
    var apiUrl = (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log('error', error));
}

function getForecast(cityName) {
    var apiKey
    var apiUrl = (`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log('error', error));
}

function searchCity(event) {
    event.preventDefault();
    var cityName = searchCityInput.val().trim();
    if (cityName) {
        getWeather(cityName);
        getForecast(cityName);
        searchHistory.unshift({ cityName });
        searchCityInput.val("");
    }
}

function clearHistory(event) {
    event.preventDefault();
    searchHistory = [];
    renderHistory();
}

function renderHistory() {
    searchHistoryList.empty();
    for (var i = 0; i < searchHistory.length; i++) {
        var historyItem = $("<input>")
            .attr("type", "text")
            .attr("readonly", true)
            .attr("class", "form-control d-block bg-white")
            .attr("value", searchHistory[i].cityName);
        searchHistoryList.append(historyItem);
    }
}

function init() {
    var storedHistory = JSON.parse(localStorage.getItem("search"));
    if (storedHistory !== null) {
        searchHistory = storedHistory;
    }
    renderHistory();
}

function storeHistory() {

    localStorage.setItem("search", JSON.stringify(searchHistory));
}

function historyClick(event) {
    var target = $(event.target);
    if (target.is("input")) {
        getWeather(target.val());
        getForecast(target.val());
    }
}
