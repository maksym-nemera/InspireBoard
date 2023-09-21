import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export const wait = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
  },
});

const get = (url) => {
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Помилка під час запиту:', error);
      throw error;
    });
};

const writeToJSONFile = (data) => {
  const jsonData = JSON.stringify(data);
  fs.writeFile('./data.json', jsonData, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Помилка під час запису в файл:', error);
      return;
    }
    // eslint-disable-next-line no-console
    console.log('Дані були записані в файл data.json');
  });
};

const fetch = async () => {
  try {
    const result = await get('/photos');
    // eslint-disable-next-line no-console
    console.log('Кількість фотографій:', result.length);
    writeToJSONFile(result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Помилка під час виконання запиту та запису в файл:', error);
  }
};

fetch();
