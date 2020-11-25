import './assets/styles/main.css';

const getData = async () => {
  const cityName = 'Nigeria';
  const url = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid={API key}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};