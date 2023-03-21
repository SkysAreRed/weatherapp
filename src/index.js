import _ from 'lodash';
import './style.css';
import Cloudy from './cloudy.jpg';

function component() {
   const element = document.createElement('div');

  // Lodash, now imported by this script

   const cloudyBackground = new Image();
   cloudyBackground.src = Cloudy;

   element.appendChild(cloudyBackground);

   return element;
}

document.body.appendChild(component());

const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit-btn');
const error = document.querySelector('.error-msg');
form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
   e.preventDefault();
   fetchWeather();
}

async function getWeatherData(location) {
   const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=1849d12bc77e460a9d4131124232103&q=${location}`,
      {
         mode: 'cors',
      }
   );
   if (response.status === 400) {
      console.log(response);
      throwErrorMsg();
   } else {
      console.log(response);
      error.style.display = 'none';
      const weatherData = await response.json();
      const newData = grabData(weatherData);
      displayData(newData);
      reset();
   }
}

function throwErrorMsg() {
   error.style.display = 'block';
   if (error.classList.contains('fade-in')) {
     error.style.display = 'none';
     error.classList.remove('fade-in2');
     error.offsetWidth;
     error.classList.add('fade-in');
     error.style.display = 'block';
   } else {
     error.classList.add('fade-in');
   }
 }

function grabData(weatherData) {
   const myData = {
      condition: weatherData.current.condition.text,
      feelsLike: {
         c: Math.round(weatherData.current.feelslike_c),
      },
      currentTemp: {
         c: Math.round(weatherData.current.feelslike_c),
      },
      wind: Math.round(weatherData.current.wind_mph),
      humidity: weatherData.current.humidity,
      location: weatherData.location.name.toUpperCase(),
   };

   if (weatherData.location.country === "New Zealand") {
      myData['region'] = weatherData.location.country.toUpperCase();
   }
   return myData;
}

function displayData(newData) {
   const weatherInfo = document.getElementsByClassName('info');
   Array.from(weatherInfo).forEach((div) => {
      if (div.classList.contains('fade-in2')) {
         div.classList.remove('fade-in2');
         div.offsetWidth;
         div.classList.add('fade-in2');
      } else {
         div.classList.add('fade-in2');
      }
   });
   document.querySelector('.condition').textContent = newData.condition;
   document.querySelector('.location').textContent = `${newData.location}`;
   document.querySelector('.degrees').textContent = newData.currentTemp.c;
   document.querySelector('.feels-like').textContent = `Feels like: ${newData.feelsLike.c}`;
   document.querySelector('.wind-kph').textContent = `Wind: ${newData.wind} KPH`;
   document.querySelector('.humidity').textContent = `Humidity: ${newData.humidity}`;
}

function reset() {
   form.reset();
}

// to get user location
function fetchWeather() {
   const input = document.querySelector('input[type="text"]');
   const userLocation = input.value;
   getWeatherData(userLocation);
}








// import _ from 'lodash';
// import './style.css';
// import Cloudy from './cloudy.jpg';

// function component() {
//    const element = document.createElement('div');

//   // Lodash, now imported by this script
//    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//    element.classList.add('hello');

//    const cloudyBackground = new Image();
//    cloudyBackground.src = Cloudy;

//    element.appendChild(cloudyBackground);

//    return element;
// }

//  document.body.appendChild(component());