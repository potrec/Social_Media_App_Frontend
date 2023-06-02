import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { getToken } from './getToken';
import { http } from './http';

export async function getPosts()
{
  let posts:[] = [];
  const response = await http.get('/api/getposts')
  .then((response: AxiosResponse) => {
    posts = response.data;
  })
  .catch((reason: AxiosError) => {
    console.error(reason);
  });
  console.log(posts);
  console.log(posts[0].user.name);
  return posts;
}