//DOM elements
var searchBarInputEl = document.querySelector(".search-bar");
var searchButton = document.querySelector(".search-button");
var cityWeatherContainer = document.querySelector(".current-weather");
var previousInput = document.querySelector(".navigation");
var previousCity = document.querySelector("former-search-btn");
var historyEl = document.querySelector(".history");
var forecastDay = document.querySelector(".five-day-forecast");

// here I am creating a div element that will be parent to my list and h2 elements
var cityWeatherContent = document.createElement("div");
cityWeatherContent.classList.add("content-box");

// responsible for appending the dynamically created div element to the HTML's "current-weather" div
cityWeatherContainer.append(cityWeatherContent);

var pastCities = JSON.parse(localStorage.getItem("city")) || [];
function displayWeather(city) {
  var currentWeatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=cae59c75b3635451b806c4a0ef5fff6f";

  fetch(currentWeatherAPI)
    .then(function (response) {
      // request was succesful
      if (response.ok) {
        response.json().then(function (data) {
          weatherEl(data);
          secondAPI(data);
        });
      } else {
        alert("Error; Please input a valid city name");
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()`
      alert("Unable to connect to OneWeather");
    });
}
// First API
//fetching my weather API's using an add event listener of the search button
searchButton.addEventListener("click", function () {
  // this API will fetch current weather for a city that you input into the search bar (input element)
  displayWeather(searchBarInputEl.value);
});

// Second API
// fetching my weather UV Index and 5 Day Forecast data  using an add event listener in the first API
// is being called in first API
var secondAPI = function (data) {
  var UVIndex =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    data.coord.lat +
    "&lon=" +
    data.coord.lon +
    "&units=imperial&appid=cae59c75b3635451b806c4a0ef5fff6f";
  fetch(UVIndex)
    .then(function (response) {
      // request was succesful
      if (response.ok) {
        response.json().then(function (data) {
          forecastEl(data);
        });
      } else {
        alert("Error; Please input a valid city name");
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()`
      alert("Unable to connect to OneWeather");
    });
};

// this function is responsible for creating my current Weather Elements( temp, wind speed, humidity)
// is being called in first API
var weatherEl = function (data) {
  cityWeatherContent.innerHTML = "";
  var text = pastCities;
  var cityName = document.createElement("h2");
  cityName.classList.add("city-name");
  cityName.innerHTML =
    data.name + " " + moment(data.dt, "X").format("DD/MM/YYYY");
  //responsible for appending the city name h2 Element to the above div Element
  cityWeatherContent.append(cityName);

  var weatherImg = document.createElement("img");
  weatherImg.classList.add("weather-icon");
  weatherImg.src =
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
  cityName.append(weatherImg);

  if (
    pastCities.indexOf(searchBarInputEl.value) === -1 &&
    searchBarInputEl.value.length > 0
  ) {
    pastCities.push(searchBarInputEl.value);
    // this sets data to the local storage with a key of "city" and a value of the inputed city name
    localStorage.setItem("city", JSON.stringify(pastCities));
  }

  var cityWeatherInfo = document.createElement("p");
  cityWeatherInfo.innerHTML = "Temp: " + data.main.temp + " ??F";
  cityWeatherContent.append(cityWeatherInfo);

  var cityWeatherInfo = document.createElement("p");
  cityWeatherInfo.innerHTML = "Wind: " + data.wind.speed + " MPH";
  cityWeatherContent.append(cityWeatherInfo);

  var cityWeatherInfo = document.createElement("p");
  cityWeatherInfo.innerHTML = "Humidity: " + data.main.humidity + "%";
  cityWeatherContent.append(cityWeatherInfo);

  historyEl.innerHTML = "";

  //local Storage element created
  for (var i = 0; i < text.length; i++) {
    var formerSearches = document.createElement("button");
    formerSearches.classList.add("former-search-btn");
    formerSearches.innerHTML = text[i];
    formerSearches.addEventListener("click", function () {
      displayWeather(this.textContent);
    });
    historyEl.append(formerSearches);
    console.log(historyEl);
    console.log(text);
  }
  //when the previous searches are clicked their value is inputted into the search bar and

  // clears the inputted city name from the search bar
  searchBarInputEl.value = "";
};

// this function is responsible for the UV Index and the 5 Day Forecast Elements
// is being called in the second API
var forecastEl = function (data) {
  forecastDay.innerHTML = "";
  // DON'T FORGET TO INPUT AN IF/ELSE STATEMENT FOR THE STATE OF THE COLOURED UV-INDEX BOX!!!
  var cityWeatherInfo = document.createElement("p");
  cityWeatherInfo.innerHTML = "UV Index: ";
  cityWeatherContent.append(cityWeatherInfo);

  var cityUvi = document.createElement("span");
  cityUvi.innerHTML = data.current.uvi;
  cityWeatherInfo.append(cityUvi);

  if (data.current.uvi < 2) {
    cityUvi.classList.add("uv-safe");
  } else if (data.current.uvi <= 7) {
    cityUvi.classList.add("uv-warning");
  } else {
    cityUvi.classList.add("uv-danger");
  }

  // 5 day forecast using a for loop to loop over 5 different days
  var headingName = document.createElement("h2");
  headingName.classList.add("heading-name");
  headingName.textContent = "5-Day Forecast";
  forecastDay.append(headingName);

  for (var i = 0; i < 5; i++) {
    var forecast = data.daily[i];
    // here I am creating a div element that will be parent to my list and h2 elements
    var cityWeatherForecast = document.createElement("div");
    cityWeatherForecast.classList.add("weather-forecast");

    // responsible for appending the dynamically created div element to the HTML's "current-weather" div
    forecastDay.append(cityWeatherForecast);

    var date = document.createElement("h3");
    date.classList.add("forecast-date");
    date.innerHTML = moment(forecast.dt, "X").format("DD/MM/YYYY");
    //responsible for appending the city name h2 Element to the above div Element
    cityWeatherForecast.append(date);

    var weatherForecastImg = document.createElement("img");
    weatherForecastImg.classList.add("weather-icon");
    weatherForecastImg.src =
      "http://openweathermap.org/img/wn/" + forecast.weather[0].icon + ".png";
    date.append(weatherForecastImg);

    var forecastWeatherInfo = document.createElement("p");
    forecastWeatherInfo.classList.add("info");
    forecastWeatherInfo.innerHTML = "Temp: " + forecast.temp.day + " ??F";
    date.append(forecastWeatherInfo);

    var forecastWeatherInfo = document.createElement("p");
    forecastWeatherInfo.classList.add("info");
    forecastWeatherInfo.innerHTML = "Wind: " + forecast.wind_speed + " MPH";
    date.append(forecastWeatherInfo);

    var forecastWeatherInfo = document.createElement("p");
    forecastWeatherInfo.classList.add("info");
    forecastWeatherInfo.innerHTML = "Humidity: " + forecast.humidity + "%";
    date.append(forecastWeatherInfo);
    forecast++;
  }
};
