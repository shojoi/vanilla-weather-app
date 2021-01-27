function displayCurrentTemperature(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    console.log(response);

    console.log(
        `Current Temperature in ${response.data.name} is ${currentTemperature}°C`
    );

    let cityNameElement = document.querySelector("#city_name");
    cityNameElement.innerHTML =
        response.data.name[0].toUpperCase() + response.data.name.slice(1);

    let tempElement = document.querySelector("#temperature_details");
    tempElement.innerHTML = `${currentTemperature}°C`;

    let element = document.querySelector("#humidity");
    element.innerHTML = `${response.data.main.humidity}%`;

    element = document.querySelector("#wind");
    element.innerHTML = `${response.data.wind.speed}km/h`;

    console.log(response.data.weather[0].description);

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
    console.log(`CitName is ${cityName.value}`);

    getCityTemperature(cityName.value);
}

function showCurrentLocation(position) {
    let apiKey = "606a063f1d6fa729e32e75a0af2c3ff9";
    let units = "metric";
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

    console.log(
        `Current Location is ${latitude} Latitude and ${longitude} Longitute `
    );

    //latitude = 40.590049;
    //longitude = -74.113332;

    axios.get(apiUrl).then(displayCurrentTemperature);
}

function getCurrentLocationTemp() {
    //event.preventDefault();

    navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

// Updating current time
//let dateTimeHandle = document.querySelector("day_time");
//dateTimeHandle.innerHTML = calculateDateTime();

//Updating city on click
let searchEvent = document.querySelector("#new_city");
searchEvent.addEventListener("click", getNewCityTemperature);

//get temperature and name of current city
let currentLocatnEvent = document.querySelector("#current_city");
currentLocatnEvent.addEventListener("click", getCurrentLocationTemp);