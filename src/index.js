import './assets/styles/main.css';
import page from './page';
import "regenerator-runtime/runtime.js"; //eslint-disable-line
import lookup from 'country-code-lookup';

page.appendElements();

const header = document.querySelector('.header');
const sup = document.querySelector('sup');
const img = document.querySelector('.img');
const figcaption = document.querySelector('.figcaption');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const form = document.querySelector('form');
const search = document.querySelector('#search');
const submit = document.querySelector('#search-button');
let weatherTemp;
let code;

const getData = async (link) => {
  const response = await fetch(link, { mode: 'cors' });
  const data = await response.json();
  return data;
};

const conversion = (tem, unit) => {
  const celcius = tem;
  const faren = (celcius * 1.8) + 32;
  if (temp.textContent.includes('°C')) temp.textContent = `${faren}°F`;
  else temp.textContent = `${tem}°C`;
  return temp;
};

submit.addEventListener('click', async (e) => {
  e.preventDefault();
  const query = search.value;
  const apiKey = '1167e47fcac43a43c26e928ef53a787b';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
  const result = await getData(url).catch(error => {
    header.textContent = `${error}... That happened and we are trying to fix it at the moment. We are so sorry`;
  });
  console.log(result);
  const {
    main, name, sys, weather,
  } = result;
  form.reset();
  const content = weather[0];
  header.textContent = name;
  figcaption.textContent = content.main;
  temp.textContent = `${main.temp}°C`;
  weatherTemp = main.temp;
  desc.textContent = content.description;
  img.src = `https://openweathermap.org/img/wn/${content.icon}@2x.png`;
});

temp.addEventListener('click', async () => {
  const num = Number(weatherTemp);
  conversion(num);
});