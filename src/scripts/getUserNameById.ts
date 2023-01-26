import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { getToken } from './getToken';
import { navigate } from './navigate';

export async function getUserNameById(userId: number) {
  let userName = '';
  const http = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    "Authorization": "Bearer " + getToken(),
  },
  withCredentials: true
  });
  const response = http.get(`/api/getuser/${userId}`)
  .then((response: AxiosResponse) => {
    // User is authenticated
    userName = response.data;
  })
  .catch((reason: AxiosError) => {
    console.log(reason);
  });
  return userName;
}