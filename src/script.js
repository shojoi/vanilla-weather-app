function formatDate(timestamp){
    let date = new Date(timestamp);
     let days =["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
     let day = date.getDay();

    return `${days[day]}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
    
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function displayCurrentTemperature(response) {
   
    celsiusTemperature = Math.round(response.data.main.temp);
    celsiusMaxTemperature = Math.round(response.data.main.temp_max);
    celsiusMinTemperature =  Math.round(response.data.main.temp_min);

    let element = document.querySelector("#city-name");
    element.innerHTML =
        response.data.name[0].toUpperCase() + response.data.name.slice(1);

    element = document.querySelector("#day-time");
    element.innerHTML=formatDate(response.data.dt*1000);

    element = document.querySelector("#weather-img");
    element.src =`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

    element = document.querySelector("#main-temp");
    element.innerHTML = celsiusTemperature;

    element = document.querySelector("#max-temp");
    element.innerHTML =`${celsiusMaxTemperature}°`;

    element = document.querySelector("#min-temp");
    element.innerHTML =`${celsiusMinTemperature}°`;

    element = document.querySelector("#humidity");
    element.innerHTML = `${response.data.main.humidity}%`;

    element = document.querySelector("#wind");
    element.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;

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

    apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast?";
    apiUrl =  `${apiEndpoint}q=${city}&units=${unit}&appid=${apiKey}`;
    
    axios.get(apiUrl).then(displayWeatherForecast);

}

function getNewCityTemperature(event) {
    event.preventDefault();

    let cityName = document.querySelector("input");
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

    apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast?";
    apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    
    axios.get(apiUrl).then(displayWeatherForecast);

}

function getCurrentLocationTemp() {
        navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function displayFahrenheitTemperature(event){
  
    let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
    let fahrenheitMaxTemperature = (celsiusMaxTemperature*9)/5+32;
    let fahrenheitMinTemperature = (celsiusMinTemperature*9)/5+32;

    let temperatureElement = document.querySelector("#main-temp");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
  
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
   
    temperatureElement = document.querySelector("#max-temp");
    temperatureElement.innerHTML = Math.round(fahrenheitMaxTemperature);

    temperatureElement = document.querySelector("#min-temp");
    temperatureElement.innerHTML = Math.round(fahrenheitMinTemperature);
    
}

function displayCelsiusTemperature(event){
    
    let temperatureElement = document.querySelector("#main-temp");
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

    temperatureElement = document.querySelector("#max-temp");
    temperatureElement.innerHTML = Math.round(celsiusMaxTemperature);

    temperatureElement = document.querySelector("#min-temp");
    temperatureElement.innerHTML = Math.round(celsiusMinTemperature);
    
}

function displayWeatherForecast(response){
   
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast=  response.data.list[index];

         forecastElement.innerHTML += `
         <div class="col">
         <h5>${formatHours(forecast.dt*1000)}</h5>
         <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Overcast clouds" >
         <h5>${Math.round(forecast.main.temp)}°</h5>
          </div>
        `;
    }   
}


let celsiusTemperature = null;
let celsiusMaxTemperature = null;
let celsiusMinTemperature = null;

//Weather update for enetred city
let searchEvent = document.querySelector("#search-button");
searchEvent.addEventListener("click", getNewCityTemperature);

//Weather update for current city
let currentLocatnEvent = document.querySelector("#current-city-button");
currentLocatnEvent.addEventListener("click", getCurrentLocationTemp);

//Displays Temperature in Fahrenheit
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//Displays Temperature in Celsius
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);