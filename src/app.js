let today = new Date();

function showDate(today) {
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

function showTime(today) {
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

let currentDate = document.querySelector("#local-date");
currentDate.innerHTML = showDate(today);

let currentTime = document.querySelector("#local-time");
currentTime.innerHTML = showTime(today);

//display city and temperature for searched city
function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#local-temperature").innerHTML = temperature;
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
