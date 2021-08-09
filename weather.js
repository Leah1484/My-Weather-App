let now = new Date();

let currentDate = document.querySelector(".currentDate");
let currentTime = document.querySelector(".currentTime");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
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
  if (cityInput.value) {
    cityElement.innerHTML = `${cityInput.value}`;
  } else {
    alert("Enter a city");
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function formatHour(timestamp) {
  let time = new Date(timestamp * 1000);
  let forecastHour = time.getHours();
  let forecastHours = [
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];
  return forecastHours[forecastHour];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let hourlyForecast = response.data.hourly;
  let forecastElement = document.querySelector("#forecast");
  let hourlyForecastElement = document.querySelector("#hourly-forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = `<div class= "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"" class="icons" />
         <div class = "weather-forecast-temperatures">
           <span class = "weather-forecast-temperature-max">${Math.round(
             forecastDay.temp.max
           )}°</span>/<span class = "weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
        </div>
      </div>`;
    }
  });

  let hourlyForecastHTML = `<div class="row"> `;
  hourlyForecast.forEach(function (forecastHour, index) {
    if (index < 6) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `
    <div class="col-2">
      ${formatHour(forecastHour.dt)}
      <br/>
      <strong>${Math.round(forecastHour.temp)}°</strong>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  hourlyForecastHTML = hourlyForecastHTML + ` </div>`;
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "94773ba6c916935cc26bdf53ae17c765";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function weatherCondition(response) {
  console.log(response);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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

  getForecast(response.data.coord);
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function searchCity(cityName) {
  let apiKey = "94773ba6c916935cc26bdf53ae17c765";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(weatherCondition);
}

let formSearcher = document.querySelector("form");
formSearcher.addEventListener("submit", showCity);

searchCity("Nairobi");

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
