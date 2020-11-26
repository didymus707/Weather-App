import './assets/styles/main.css';

const getData = async () => {
  try {
    const cityName = 'Ibadan';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1167e47fcac43a43c26e928ef53a787b`;
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(`Error:  ${error}`);
  }
};

getData();