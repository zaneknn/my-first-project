function fetchWeather(response) {
  let jolkaTemperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let citySearch = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let currentDateELement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#jolka-app-icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="jolka-app-icon">`;

  citySearch.innerHTML = response.data.city;
  currentDateELement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}m/s`;
  jolkaTemperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = `ta8d0cd5f43b6fe4f1cd0019401obcd1`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(fetchWeather);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ta8d0cd5f43b6fe4f1cd0019401obcd1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(jolkaForecast);
}
function jolkaForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
   <div class="jolka-forecast-day">
                    <div class="jolka-forecast-date">${formatDay(
                      day.time
                    )}</div>
                   <img src="${
                     day.condition.icon_url
                   }"class="jolka-forecast-icon"/>
                    <div class="jolka-forecast-temperatures">
                        <div class="jolka-forecast-temperature-max">
                            <strong>${Math.round(
                              day.temperature.maximum
                            )}°&nbsp&nbsp;
                            </strong>
                        </div>
                        <div class="jolka-forecast-temperature-min"> ${Math.round(
                          day.temperature.minimum
                        )}°</div>
                    </div>
                </div>
                `;
    }
  });
  let forecastElement = document.querySelector("#jolkaForecast");
  forecastElement.innerHTML = forecastHtml;
}

function jolkaFormFunction(event) {
  event.preventDefault();
  let jolkaSearchInput = document.querySelector("#jolka-search-input");

  searchCity(jolkaSearchInput.value);
}

let jolkaSerachForm = document.querySelector("#search-form");
jolkaSerachForm.addEventListener(`submit`, jolkaFormFunction);

searchCity("Fredrikstad");
