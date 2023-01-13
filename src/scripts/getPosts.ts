import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { getToken } from './getToken';

export async function getPosts()
{
  let posts:[] = [];
  const http = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    "Authorization": "Bearer " + getToken(),
  },
  withCredentials: true
  });
  const response = await http.get('/api/getposts')
    .then((response: AxiosResponse) => {
      posts = response.data;
    })
    .catch((reason: AxiosError) => {
      console.error(reason);
    });

    return posts;
}