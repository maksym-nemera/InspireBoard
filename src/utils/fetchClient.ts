import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL, ACCESS_KEY } from '@env';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

const request = async <T>(
  requestFunction: () => Promise<AxiosResponse<T>>,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await requestFunction();

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      throw axiosError;
    } else {
      throw error;
    }
  }
};

const get = <T>(url: string) => {
  return request<T>(() => axiosInstance.get(url));
};

const post = <T>(url: string) => {
  return request<T>(() => axiosInstance.post(url));
};

const put = <T>(url: string, data: T) => {
  return request<T>(() => axiosInstance.put(url, data));
};

const remove = <T>(url: string) => {
  return request<T>(() => axiosInstance.delete(url));
};

export const client = {
  get,
  post,
  put,
  remove,
};
