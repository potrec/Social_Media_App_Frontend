import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { getToken } from './getToken';
import { http } from './http';

export async function getComments(post_id: string) {
  let comments:[] = [];
  const request = await http
    .get(`/api/getposts/comments/${post_id}`)
    .then((response: AxiosResponse) => {
      comments = response.data;
      console.log("Comments:"+comments);
    })
    .catch((reason: AxiosError<{ error: string }>) => {
      console.log(reason);
    });
    return comments;
}