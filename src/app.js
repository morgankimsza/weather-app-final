function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row" style="padding-left: 20px;">`;
  let days = ["Thur", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
                <img
                  src="https://openweathermap.org/img/wn/10d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max"> 18° </span>
                  <span class="weather-forecast-temperature-min"> 12° </span>
                </div>
            </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function changeDescription(response) {
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
}
function changeHumidity(response) {
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = "Humidity: " + response.data.main.humidity + "%";
}
function changedWind(response) {
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = "Wind:" + response.data.wind.speed + "km/h";
}
function changeIcon(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.src =
    "https://openweathermap.org/img/wn/" +
    response.data.weather[0].icon +
    "@2x.png";
}
function getForecast(coordinates) {
  let apikey = "30c4c684c679265d7cee6b3521f0a4c2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function changeTemperature(response) {
  let myTemp = response.data.main.temp - 273;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(myTemp);
  changeDescription(response);
  changeHumidity(response);
  changedWind(response);
  changeIcon(response);

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let apikey = "30c4c684c679265d7cee6b3521f0a4c2";
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput.value +
    "&appid=" +
    apikey;
  axios.get(url).then(changeTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let farenheit = (temperatureElement.innerHTML * 9) / 5 + 32;
  temperatureElement.innerHTML = farenheit;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsius = ((temperatureElement.innerHTML - 32) * 5) / 9;
  temperatureElement.innerHTML = celsius;
}

// Feature #1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Feature #2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Bonus Feature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
