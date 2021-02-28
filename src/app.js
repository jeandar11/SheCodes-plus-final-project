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

function showWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#local-temperature").innerHTML = Math.round(
    response.data.main.temp
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
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSearch);

search(`Montreal`);

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
