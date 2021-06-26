/* eslint-disable max-len */
/**
 * Sets up everything
 */
function setUpAll() {
  setUpDomElements();
  getWeatherData('san francisco');
}

/**
 * Sets up the DOM elements
 */
function setUpDomElements() {
  const temp = document.querySelector('.temperature');
  temp.addEventListener('click', convertUnit);

  const button = document.querySelector('#submit');
  button.addEventListener('click', handleSubmit);

  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

/**
 * Handles the search input
 * @param {e} e The error
 */
function handleSubmit(e) {
  e.preventDefault();

  const error = document.querySelector('#error');
  error.classList.remove('show');

  const input = document.querySelector('#search');
  const city = input.value;
  input.value = '';
  getWeatherData(city);
}

/**
 * Fetches the Weather Data
 * @param {string} city The requested location.
 */
async function getWeatherData(city) {
  const key = '1986480656ec490d950204923202611';
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}`;
  try {
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);
    const processed = processData(weatherData);
    displayData(processed);
  } catch (e) {
    showErrorMessage();
  }
}

/**
 * Displays the Error Message
 */
function showErrorMessage() {
  const error = document.querySelector('#error');
  error.classList.add('show');
}

/**
 * Displays the Weather Data onto the DOM
 * @param {object} weatherData The raw weather data.
 * @return {object} The processed data.
 */
function processData(weatherData) {
  const country = weatherData.location.country;
  const region = weatherData.location.region;

  return {
    city: weatherData.location.name,
    location: country === 'United States of America' ? region : country,
    condition: weatherData.current.condition.text,
    temp: parseInt(weatherData.current.temp_f),
    wind: `Wind: ${weatherData.current.wind_mph} mph`,
    humidity: `Humidity: ${weatherData.current.humidity}%`,
    rain: `Chance of Rain: ${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`,
  };
}

/**
 * Displays the Weather Data onto the DOM
 * @param {object} processed The processed weather data.
 */
function displayData(processed) {
  const condition = document.querySelector('.condition');
  condition.innerText = processed.condition;

  const location = document.querySelector('.location');
  location.innerText = `${processed.city}, ${processed.location}`;

  const temp = document.querySelector('.temperature');
  temp.innerText = processed.temp;

  const wind = document.querySelector('#wind');
  wind.innerText = processed.wind;

  const humidity = document.querySelector('#humidity');
  humidity.innerText = processed.humidity;

  const rain = document.querySelector('#rain');
  rain.innerText = processed.rain;
}

/**
 * Converts from C to F and vice versa;
 */
function convertUnit() {
  const temp = document.querySelector('.temperature');
  if (temp.classList.contains('f')) {
    temp.innerText = Math.round((parseInt(temp.innerText) - 32) * 5 / 9);
    temp.setAttribute('data-text', '°C');
    temp.classList.add('c');
    temp.classList.remove('f');
  } else {
    temp.innerText = Math.round((parseInt(temp.innerText) * 9 / 5) + 32);
    temp.setAttribute('data-text', '°F');
    temp.classList.add('f');
    temp.classList.remove('c');
  }
}

export default setUpAll;
