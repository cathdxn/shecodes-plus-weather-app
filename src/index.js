function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];
  return `Last updated: ${hours}:${minutes}<br/>${day}, ${month} ${date}`;
}

function formatSunriseSunset(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#days");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 days" id="days">
        <div class="forecast-date">
          ${formatDay(forecastDay.dt)}</div>
          <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="" width="42"
          />
          <div class="forecast-temperatures">
          <span class="forecast-max" id="forecast-max">${Math.round(
            forecastDay.temp.max
          )}º</span
          ><br /><span class="forecast-min" id="forecast-min">${Math.round(
            forecastDay.temp.min
          )}º</span>
          </div>
        </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    response.data.wind.speed * 2.237
  )} mph`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#pressure").innerHTML = `${Math.round(
    response.data.main.pressure
  )} hPa`;
  document.querySelector("#max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#sunrise").innerHTML = formatSunriseSunset(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatSunriseSunset(
    response.data.sys.sunset * 1000
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}
function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-city");
  document.querySelector("#city-element").innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function retrievePosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocation = document.querySelector("#find-location");
currentLocation.addEventListener("click", getCurrentPosition);

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", enterCity);

let apiKey = "0923e12b896425d5960c3ad97497e0ee";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather);
