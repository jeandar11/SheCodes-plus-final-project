function showDate(timestamp) {
  let today = new Date(timestamp);
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthIndex = [
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
  let day = dayIndex[today.getDay()];
  let date = today.getDate();
  let month = monthIndex[today.getMonth()];

  return `${day} ${date} ${month}`;
}

function showTime(timestamp) {
  let today = new Date(timestamp);
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function changeWeatherIcon(icon) {
  let iconElement = "";
  if (icon === "01d") {
    iconElement = "fas fa-sun";
  } else if (icon === "01n") {
    iconElement = "fas fa-moon";
  } else if (icon === "02d") {
    iconElement = "fas fa-cloud-sun";
  } else if (icon === "02n") {
    iconElement = "fas fa-cloud-moon";
  } else if (
    icon === "03d" ||
    icon === "03n" ||
    icon === "04d" ||
    icon === "04n"
  ) {
    iconElement = "fas fa-cloud";
  } else if (icon === "09d" || icon === "09n") {
    iconElement = "fas fa-cloud-showers-heavy";
  } else if (icon === "10d") {
    iconElement = "fas fa-cloud-sun-rain";
  } else if (icon === "10n") {
    iconElement = "fas fa-cloud-moon-rain";
  } else if (icon === "13d" || icon === "13n") {
    iconElement = "far fa-snowflake";
  } else if (icon === "50d" || icon === "50n") {
    iconElement = "fas fa-smog";
  }
  return iconElement;
}

function showWeather(response) {
  console.log(response);
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#local-temperature").innerHTML = Math.round(
    celsiusTemperature
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#local-date").innerHTML = showDate(
    response.data.dt * 1000
  );

  document.querySelector("#local-time").innerHTML = showTime(
    response.data.dt * 1000
  );

  document
    .querySelector("#weather-icon")
    .setAttribute("class", changeWeatherIcon(response.data.weather[0].icon));

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector("#wind-speed").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed * 3.6
  )} km/h`;
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#hourly-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-sm-3">
        <div class="card">
            <div class="card-body">
              <i class="${changeWeatherIcon(forecast.weather[0].icon)}"></i>
              <h6 class="card-title">${showTime(forecast.dt * 1000)}</h6>
              <p class="card-text"><strong> ${Math.round(
                forecast.main.temp_max
              )}°</strong> ${Math.round(forecast.main.temp_min)}°</p>
            </div>
        </div>
    </div>`;
  }
}

function search(city) {
  let apiKey = "e272d099b6abcf1dc841d6126369d7ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSearch);

// geolocation feature
function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e272d099b6abcf1dc841d6126369d7ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentPositionButton = document.querySelector("#current-position-button");
currentPositionButton.addEventListener("click", getPosition);

// unit conversion
function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#local-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#local-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search(`Montreal`);
