import './assets/styles/main.css';

const getData = async () => {
  try {
    // const cityName = 'London';
    const url = `api.openweathermap.org/data/2.5/weather?q=London&appid=1167e47fcac43a43c26e928ef53a787b`;
    const response = await fetch(url);
    console.log(response);
  } catch (error) {
    console.log(`Error:  ${error}`);
  }
};

getData();