import axios from 'axios';
import { BASE_URL, ACCESS_KEY } from '@env';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

const get = (url: string) => {
  return axiosInstance.get(url);
};

const post = <T>(url: string, data: T) => {
  return axiosInstance.post(url, data);
};

const put = <T>(url: string, data: T) => {
  return axiosInstance.put(url, data);
};

const remove = (url: string) => {
  return axiosInstance.delete(url);
};

export const client = {
  get,
  post,
  put,
  remove,
};
