import './assets/styles/main.css';
import "regenerator-runtime/runtime.js"; //eslint-disable-line

const getData = async () => {
  try {
    const cityName = 'Ibadan';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1167e47fcac43a43c26e928ef53a787b`;
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error:  ${error}`);
  }
};

const processData = async () => {
  const result = await getData();
  const {
    name, clouds, main, sys, weather,
  } = result;
  console.log(name, clouds, main, sys, weather);
};

processData();
