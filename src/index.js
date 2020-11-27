import './assets/styles/main.css';
import lookup from 'country-code-lookup';
import page from './page';
import "regenerator-runtime/runtime.js"; //eslint-disable-line

page.appendElements();

const header = document.querySelector('.header');
const para = document.querySelector('p');
const img = document.querySelector('.img');
const figcaption = document.querySelector('.figcaption');
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

const conversion = (tem) => {
  const celcius = tem;
  const faren = (celcius * 1.8) + 32;
  if (header.textContent.includes('°C')) header.textContent = `${faren}°F`;
  else header.textContent = `${tem}°C`;
  return header;
};

const country = cty => lookup.byIso(cty);

submit.addEventListener('click', async (e) => {
  e.preventDefault();
  const query = search.value;
  const apiKey = '1167e47fcac43a43c26e928ef53a787b';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
  const result = await getData(url).catch(error => {
    header.textContent = `${error}... That happened and we are trying to fix it at the moment. We are so sorry`;
  });
  // console.log(result);
  const {
    main, name, sys, weather,
  } = result;
  form.reset();
  code = country(sys.country);
  const content = weather[0];
  header.textContent = `${main.temp}°C`;
  para.innerHTML = `${name}, ${code.country}`;
  figcaption.textContent = content.main;
  weatherTemp = main.temp;
  desc.textContent = content.description;
  img.src = `https://openweathermap.org/img/wn/${content.icon}@2x.png`;
});

header.addEventListener('click', async () => {
  const num = Number(weatherTemp);
  conversion(num);
});