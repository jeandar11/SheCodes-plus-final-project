function showForecastDays(timestamp) {
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
  let day = dayIndex[today.getDay()];
  return day;
}

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
  } else if (icon === "11d" || icon === "11n") {
    iconElement = "far fa-bolt";
  } else if (icon === "13d" || icon === "13n") {
    iconElement = "far fa-snowflake";
  } else if (icon === "50d" || icon === "50n") {
    iconElement = "fas fa-smog";
  }
  return iconElement;
}

function changeBackground(icon) {
  let backgroundGradient = "";
  if (icon === "01d") {
    backgroundGradient = "linear-gradient(to top, #a8edea 0%, #ffb26b 100%)";
  } else if (icon === "02d") {
    backgroundGradient = "linear-gradient(to top, #a8edea 0%, #ffeebb 100%)";
  } else if (icon === "01n" || icon === "02n") {
    backgroundGradient = "linear-gradient(to top, #a8edea 0%, #c1a1d3 100%)";
  } else if (
    icon === "03d" ||
    icon === "03n" ||
    icon === "04d" ||
    icon === "04n"
  ) {
    backgroundGradient = "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)";
  } else if (
    icon === "09d" ||
    icon === "09n" ||
    icon === "10d" ||
    icon === "10n"
  ) {
    backgroundGradient = "linear-gradient(to top, #a8edea 0%, #a6a9b6 100%)";
  } else if (icon === "11d" || icon === "11n") {
    backgroundGradient = "linear-gradient(to top, #a8edea 0%, #4d375d 100%)";
  } else if (icon === "13d" || icon === "13n") {
    backgroundGradient = "linear-gradient(to top, #a8edea 0%, #fdfbfb 100%)";
  } else if (icon === "50d" || icon === "50n") {
    backgroundGradient = "linear-gradient(to top, #a8edea 0%, #cee6b4 100%)";
  }

  return backgroundGradient;
}

function showWeather(response) {
  console.log(response);
  celsiusTemperature = response.data.current.temp;

  document.querySelector("#local-temperature").innerHTML = Math.round(
    celsiusTemperature
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.current.weather[0].description;

  document.querySelector("#local-date").innerHTML = showDate(
    response.data.current.dt * 1000
  );

  document.querySelector("#local-time").innerHTML = showTime(location);

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "class",
      changeWeatherIcon(response.data.current.weather[0].icon)
    );

  document.getElementById("main-app").style.backgroundImage = changeBackground(
    response.data.current.weather[0].icon
  );

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.current.humidity}%`;

  document.querySelector("#wind-speed").innerHTML = `Wind speed: ${Math.round(
    response.data.current.wind_speed * 3.6
  )} km/h`;
}

function showForecast(response) {
  let dailyForecastElement = document.querySelector("#daily-forecast");
  dailyForecastElement.innerHTML = null;
  let dailyForecast = null;

  for (let index = 1; index < 5; index++) {
    dailyForecast = response.data.daily[index];
    dailyForecastElement.innerHTML += `
    <div class="col-sm-3">
        <div class="card">
            <div class="card-body">
              <i class="${changeWeatherIcon(
                dailyForecast.weather[0].icon
              )}"></i>
              <h6 class="card-title">${showForecastDays(
                dailyForecast.dt * 1000
              )}</h6>
              <p class="card-text"><strong> ${Math.round(
                dailyForecast.temp.max
              )}°</strong> ${Math.round(dailyForecast.temp.min)}°</p>
            </div>
        </div>
    </div>`;
  }

  let hourlyForecastElement = document.querySelector("#hourly-forecast");
  hourlyForecastElement.innerHTML = null;
  let hourlyForecast = null;

  for (let index = 1; index < 7; index++) {
    hourlyForecast = response.data.hourly[index];
    hourlyForecastElement.innerHTML += `
    <div class="col-sm-2">
        <div class="card">
            <div class="card-body">
              <i class="${changeWeatherIcon(
                hourlyForecast.weather[0].icon
              )}"></i>
              <h6 class="card-title">${formatLocalTime(
                hourlyForecast.dt * 1000
              )}</h6>
              <p class="card-text"><strong id="hourly-temp"> ${Math.round(
                hourlyForecast.temp
              )}°</strong></p>
            </div>
        </div>
    </div>`;

    let now = new Date();
    let localTime = now.getTime();
    let localOffset = now.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    var location = utc + 1000 * response.data.timezone_offset;

    function formatLocalTime(timestamp) {
      let now = new Date(timestamp);
      let localTime = now.getTime();
      let localOffset = now.getTimezoneOffset() * 60000;
      let utc = localTime + localOffset;
      var location = utc + 1000 * response.data.timezone_offset;
      return showTime(location);
    }
  }
  document.querySelector("#local-time").innerHTML = showTime(location);
}

function search(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiKey = "e272d099b6abcf1dc841d6126369d7ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
  axios.get(apiUrl).then(showForecast);
}

function getCoordinates(city) {
  let apiKey = "e272d099b6abcf1dc841d6126369d7ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(search);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getCoordinates(city);
}

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSearch);

// geolocation feature
function displayLocationName(response) {
  document.querySelector("#city").innerHTML = response.data.name;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e272d099b6abcf1dc841d6126369d7ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
  axios.get(apiUrl).then(showForecast);

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayLocationName);
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

getCoordinates(`Montreal`);
