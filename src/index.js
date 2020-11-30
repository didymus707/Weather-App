import './assets/styles/main.css';
import lookup from 'country-code-lookup';
import moment from 'moment';
import page from './page';
import "regenerator-runtime/runtime.js"; //eslint-disable-line

page.appendElements();

const perror = document.querySelector('.error');
const mainEl = document.querySelector('.main');
const header = document.querySelector('.header');
const btn = document.querySelector('button');
const para = document.querySelector('p');
const img = document.querySelector('.img');
const figcaption = document.querySelector('.figcaption');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
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

const fetchError = err => {
  mainEl.classList.add('none');
  perror.innerHTML = `${err.message}... <br>We are so sorry, Your city cannot be located`;
};

const removeNone = ele => {
  if (ele.classList.contains('none')) {
    ele.classList.remove('none');
  }
};

const checkResult = res => {
  if (res.cod === '404') fetchError(res);
  else removeNone(mainEl);
};

const conversion = (tem) => {
  const faren = (tem * 1.8) + 32;
  if (header.textContent.includes('°C')) header.textContent = `${faren}°F`;
  else header.textContent = `${tem}°C`;
  return header;
};

const country = cty => lookup.byIso(cty);

const mins = time => {
  const timns = time / 60;
  const curr = moment().utcOffset(timns).format('MMMM DD, YYYY-h:mm A');
  return curr.split('-');
};

submit.addEventListener('click', async (e) => {
  e.preventDefault();
  const query = search.value;
  const apiKey = '1167e47fcac43a43c26e928ef53a787b';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
  const result = await getData(url).catch(err => {
    header.innerHTML = err;
  });
  const {
    main, name, sys, timezone, weather,
  } = result;
  form.reset();
  checkResult(result);
  btn.classList.remove('none');
  const dateTime = mins(timezone);
  date.textContent = dateTime.shift();
  time.textContent = dateTime.pop();
  code = country(sys.country);
  const content = weather[0];
  header.textContent = `${main.temp}°C`;
  para.innerHTML = `${name}, ${code.country}`;
  figcaption.textContent = content.main;
  weatherTemp = main.temp;
  desc.textContent = content.description;
  img.src = `https://openweathermap.org/img/wn/${content.icon}@2x.png`;
});

btn.addEventListener('click', async () => {
  const num = Number(weatherTemp);
  conversion(num);
});