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
  return `${day}, ${month} ${date} | ${hours}:${minutes}`;
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
          <span class="forecast-max">${Math.round(forecastDay.temp.max)}º</span
          ><br /><span class="forecast-min">${Math.round(
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
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.name;
  celciusTemperature = response.data.main.temp;
  celciusTemperatureFeel = response.data.main.feels_like;
  celciusTemperatureMax = response.data.main.temp_max;
  celciusTemperatureMin = response.data.main.temp_min;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    celciusTemperature
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
    celciusTemperatureMax
  )}°`;
  document.querySelector("#min").innerHTML = `${Math.round(
    celciusTemperatureMin
  )}°`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    celciusTemperatureFeel
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
  let apiKey = "0923e12b896425d5960c3ad97497e0ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function retrievePosition(position) {
  let apiKey = "0923e12b896425d5960c3ad97497e0ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperture = (celciusTemperature * 9) / 5 + 32;
  let fahrenheitFeelsLike = (celciusTemperatureFeel * 9) / 5 + 32;
  let fahrenheitMax = (celciusTemperatureMax * 9) / 5 + 32;
  let fahrenheitMin = (celciusTemperatureMin * 9) / 5 + 32;
  document.querySelector("#celcius").classList.add("active");
  document.querySelector("#fahrenheit").classList.remove("active");
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    fahrenheitTemperture
  )}°`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    fahrenheitFeelsLike
  )}°`;
  document.querySelector("#max").innerHTML = `${Math.round(fahrenheitMax)}°`;
  document.querySelector("#min").innerHTML = `${Math.round(fahrenheitMin)}°`;
}
function displayCelciusTemperature(event) {
  event.preventDefault();
  document.querySelector("#celcius").classList.remove("active");
  document.querySelector("#fahrenheit").classList.add("active");
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    celciusTemperature
  )}°`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    celciusTemperatureFeel
  )}°`;
  document.querySelector("#max").innerHTML = `${Math.round(
    celciusTemperatureMax
  )}°`;
  document.querySelector("#min").innerHTML = `${Math.round(
    celciusTemperatureMin
  )}°`;
}

let currentLocation = document.querySelector("#find-location");
currentLocation.addEventListener("click", getCurrentPosition);

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", enterCity);

let apiKey = "0923e12b896425d5960c3ad97497e0ee";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);

document
  .querySelector("#fahrenheit")
  .addEventListener("click", convertToFahrenheit);
document
  .querySelector("#celcius")
  .addEventListener("click", displayCelciusTemperature);

let celciusTemperature = null;
let celciusTemperatureFeel = null;
let celciusTemperatureMax = null;
let celciusTemperatureMin = null;
