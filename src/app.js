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

function changeIcon(response) {
  if (response.data.weather[0].icon === `01d`) {
    document.querySelector("#weather-icon").setAttribute("class", "fas fa-sun");
  } else if (response.data.weather[0].icon === `01n`) {
    document
      .querySelector("#weather-icon")
      .setAttribute("class", "fas fa-moon");
  } else if (response.data.weather[0].icon === `02d`) {
    document
      .querySelector("#weather-icon")
      .setAttribute("class", "fas fa-cloud-sun");
  } else if (response.data.weather[0].icon === `02n`) {
    document
      .querySelector("#weather-icon")
      .setAttribute("class", "fas fa-cloud-moon");
  } else if (
    response.data.weather[0].icon === `03d` ||
    `03n` ||
    `04d` ||
    `04n`
  ) {
    document
      .querySelector("#weather-icon")
      .setAttribute("class", "fas fa-cloud");
  } else if (response.data.weather[0].icon === `09d` || `09n`) {
    document
      .querySelector("#weather-icon")
      .setAttribute("class", "fas fa-cloud-showers-heavy");
  } else if (response.data.weather[0].icon === `10d`) {
    document
      .querySelector("#weather-icon")
      .setAttribute("class", "fas fa-cloud-sun-rain");
  } else if (response.data.weather[0].icon === `10n`) {
    document
      .querySelector("#weather-icon")
      .setAttribute("class", "fas fa-cloud-moon-rain");
  } else if (response.data.weather[0].icon === `11d` || `11n`) {
    document
      .querySelector("#weather-icon")
      .setAttribute("class", "fas fa-bolt");
  } else if (response.data.weather[0].icon === `13d` || `13n`) {
    document
      .querySelector("#weather-icon")
      .setAttribute("class", "fas fa-snowflake");
  } else if (response.data.weather[0].icon === `50d` || `50n`) {
    document
      .querySelector("#weather-icon")
      .setAttribute("class", "fas fa-smog");
  }
}

function showWeather(response) {
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
}

function search(city) {
  let apiKey = "e272d099b6abcf1dc841d6126369d7ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
  axios.get(apiUrl).then(changeIcon);
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
