//DOM elements
var searchBarInputEl = document.querySelector(".search-bar");
var searchButton = document.querySelector(".search-button");

//fetching my weather API's using an add event listener of the search button
searchButton.addEventListener("click", function () {
  // this API will fetch current weather for a city that you input into the search bar (input element)
  var currentWeatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchBarInputEl.value +
    "&appid=cae59c75b3635451b806c4a0ef5fff6f";

  fetch(currentWeatherAPI)
    .then(function (response) {
      // request was succesful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error; Please input a valid city name");
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()`
      alert("Unable to connect to OneWeather");
    });
  // this API is responsible for providing the 5 day weather forecast for the input city, it works simultaneously with the above api
  // this API will fetch current weather for a city that you input into the search bar (input element)
  var fiveDayForecast =
    "https://api.openweathermap.org/data/2.5/forecast?cnt=5&q=" +
    searchBarInputEl.value +
    "&appid=cae59c75b3635451b806c4a0ef5fff6f";

  fetch(fiveDayForecast)
    .then(function (response) {
      // request was succesful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error; Please input a valid city name");
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()`
      alert("Unable to connect to OneWeather");
    });
});
