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

function showWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.name;
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
}
function enterCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-element");
  let cityInput = document.querySelector("#input-city");
  cityElement.innerHTML = cityInput.value;
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
let currentLocation = document.querySelector("#find-location");
currentLocation.addEventListener("click", getCurrentPosition);

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", enterCity);

let apiKey = "0923e12b896425d5960c3ad97497e0ee";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);
