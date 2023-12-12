function fetchWeather(response) {
  let jolkaTemperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let citySearch = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  citySearch.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  jolkaTemperatureElement.innerHTML = Math.round(temperature);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = `ta8d0cd5f43b6fe4f1cd0019401obcd1`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(fetchWeather);
}
function jolkaFormFunction(event) {
  event.preventDefault();
  let jolkaSearchInput = document.querySelector("#jolka-search-input");

  searchCity(jolkaSearchInput.value);
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

let jolkaSerachForm = document.querySelector("#search-form");
jolkaSerachForm.addEventListener(`submit`, jolkaFormFunction);

searchCity("Fredrikstad");
