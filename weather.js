let now = new Date();

let currentDate = document.querySelector(".currentDate");
let currentTime = document.querySelector(".currentTime");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
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
let month = months[now.getMonth()];

currentDate.innerHTML = `${day} ${month} ${date}`;
currentTime.innerHTML = `${hours}: ${minutes}`;

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#search-input");
  cityElement.innerHTML = cityInput.value;

  let apiKey = "94773ba6c916935cc26bdf53ae17c765";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(weatherCondition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function weatherCondition(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);

  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;

  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = Math.round(response.data.main.humidity);

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let apiKey = "94773ba6c916935cc26bdf53ae17c765";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(weatherCondition);
}

function locatePosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let apiKey = "94773ba6c916935cc26bdf53ae17c765";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(weatherCondition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Nairobi,Kenya");
