
function formatDate(time) {
  let weekdays = [
    "Sunday",
    "Monay",
    "Tuesday",
    "Wednesday",
    "Thurdsday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(time);
  let day = weekdays[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${day}, ${hours}:${minutes}`
}

function fetchWeatherData(response) {
  console.log(response.data.dt);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-element").innerHTML = response.data.weather[0].description;
  document.querySelector("#min-temperature-element").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#max-temperature-element").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#temperature-element").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}

function search(city) {
let apiKey = "e476e15a6d31a2a85d1f7fb7bf1aa090";
let units = "metric";
let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units${units}`;

axios.get(urlApi).then(fetchWeatherData);
}

function handleSubmit(event) {
  event.preventDefault();
  search(document.querySelector("#city-input").value);
  
}

document.querySelector("#search-form").addEventListener("submit", handleSubmit);

