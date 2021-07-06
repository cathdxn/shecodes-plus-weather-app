function showWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.name;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
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

function formatDate() {
  let currentTime = new Date();
  let currentDay = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay];
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let date = currentTime.getDate();
  let currentMonth = currentTime.getMonth();
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
  let month = months[currentMonth];
  return `${day},  ${month} ${date} | ${hours}:${minutes}`;
}

let currentTime = new Date();
let currentDate = document.querySelector(".date");
currentDate.innerHTML = formatDate(currentTime);
