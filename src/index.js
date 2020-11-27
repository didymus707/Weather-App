import './assets/styles/main.css';
import page from './page';
import "regenerator-runtime/runtime.js"; //eslint-disable-line

page.appendElements();

const header = document.querySelector('.header');
const icon = document.querySelector('.icon');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const search = document.querySelector('#search');
const submit = document.querySelector('#search-button');

const getData = async (link) => {
  const response = await fetch(link, { mode: 'cors' });
  const data = await response.json();
  return data;
};

submit.addEventListener('click', async (e) => {
  e.preventDefault();
  const query = search.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=1167e47fcac43a43c26e928ef53a787b`;
  const data = getData(url);
  const result = await data;
  console.log(result);
  const { main, name, sys, weather } = result;
  search.value = '';
  header.textContent = name;
  temp.textContent = main.temp;
});