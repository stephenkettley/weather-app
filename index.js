const weatherAPIKey = "4f38f904f1d5320b0e943d450fc7e4e5";

const weatherDataElement = document.getElementById("weather-data");
const cityInputElement = document.getElementById("city-input");

const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputElement.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${weatherAPIKey}&unit=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not OK!");
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.floor(data.main.feels_like)}C°`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherDataElement.querySelector(
      ".icon"
    ).innerHTML = ` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

    weatherDataElement.querySelector(
      ".temperature"
    ).textContent = `${temperature}C°`;

    weatherDataElement.querySelector(".description").textContent = description;

    weatherDataElement.querySelector(".details") = details.map((detail) => `<div>${detail}</div>`).join("");


} catch (error) {
    console.log(error);
  }
}
