import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://example.com/api',
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
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
