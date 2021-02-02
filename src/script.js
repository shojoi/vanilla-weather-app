function formatDate(timestamp){
    console.log("Timestamp is "+ timestamp);
     let date = new Date(timestamp);
     let hours = date.getHours();
     let minutes = date.getMinutes();
     let days =["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
     let day = date.getDay();

    return `${days[day]}, ${hours}:${minutes}`;
}

function displayCurrentTemperature(response) {
    console.log(response);

    celsiusTemperature = response.data.main.temp
    let currentTemperature = Math.round(celsiusTemperature);

    let cityNameElement = document.querySelector("#city-name");
    cityNameElement.innerHTML =
        response.data.name[0].toUpperCase() + response.data.name.slice(1);

    let dateElement = document.querySelector("#day-time");
    dateElement.innerHTML=formatDate(response.data.dt*1000);

    let tempElement = document.querySelector("#main-temp");
    tempElement.innerHTML = currentTemperature;

    let element = document.querySelector("#humidity");
    element.innerHTML = `${response.data.main.humidity}%`;

    element = document.querySelector("#wind");
    element.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;

    //console.log(response.data.weather[0].description);

    let description = response.data.weather[0].description;
    element = document.querySelector("#description");
    element.innerHTML = description[0].toUpperCase() + description.slice(1);
}

function getCityTemperature(city) {
    let apiKey = "606a063f1d6fa729e32e75a0af2c3ff9";
    let unit = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}q=${city}&units=${unit}&appid=${apiKey}`;

    axios.get(apiUrl).then(displayCurrentTemperature);
}

function getNewCityTemperature(event) {
    event.preventDefault();

    let cityName = document.querySelector("input");
    //console.log(`CitName is ${cityName.value}`);
    getCityTemperature(cityName.value);
}

function showCurrentLocation(position) {
    let apiKey = "606a063f1d6fa729e32e75a0af2c3ff9";
    let units = "metric";
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

    axios.get(apiUrl).then(displayCurrentTemperature);
}

function getCurrentLocationTemp() {
        navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();

        let temperatureElement = document.querySelector("#main-temp");
        celsiusLink.classList.remove("active");
        fahrenheitLink.classList.add("active");

    let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();

    let temperatureElement = document.querySelector("#main-temp");
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

//Weather update for enetred city
let searchEvent = document.querySelector("#search-button");
searchEvent.addEventListener("click", getNewCityTemperature);

//Weather update for current city
let currentLocatnEvent = document.querySelector("#current-city-button");
currentLocatnEvent.addEventListener("click", getCurrentLocationTemp);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);