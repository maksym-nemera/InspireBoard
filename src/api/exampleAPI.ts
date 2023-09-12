import { client } from '../utils/fetchClient';

export const getExample = (id: number) => {
  return client.get(`/example?id=${id}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addExample = (path: string, data: any) => {
  return client.post(path, data);
};

export const removeExample = (id: number) => {
  return client.remove(`/example/${id}`);
};

export const changeExample = (
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
) => {
  return client.post(`/example/${id}`, data);
};
