function formatDate(timeStamp) {

  let weekdays = [
    "Sunday",
    "Monay",
    "Tuesday",
    "Wednesday",
    "Thurdsday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(timeStamp);
  let day = weekdays[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }


  return `${day}, ${hours}:${minutes}`;
}


function fetchWeatherData(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-element").innerHTML = response.data.weather[0].description;
  document.querySelector("#min-temperature-element").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#max-temperature-element").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#temperature-element").innerHTML = celsiusTemperature;
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#wind-element").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#feels-like-element").innerHTML = Math.round(response.data.main.feels_like);
}

function search(city) {
  let apiKey = "e476e15a6d31a2a85d1f7fb7bf1aa090";
  let units = "metric";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(urlApi).then(fetchWeatherData);
}

function handleSubmit(event) {
  event.preventDefault();
  search(document.querySelector("#city-input").value); 
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature-element").innerHTML = Math.round(fahrenheitTemperature);
}
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#temperature-element").innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


document.querySelector("#search-form").addEventListener("submit", handleSubmit);
let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", convertToCelsius);

search ("New York")