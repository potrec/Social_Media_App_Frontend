import type { AxiosResponse, AxiosError } from 'axios';
import { http } from './http';

export function checkUserIfUserPosted(loggedUserid: string, userId: string): boolean {
  if (loggedUserId != userId) {
    return true;
  }
  return false;
}
export function getFirstUsernameLetter(userName: string) {
  return userName.charAt(0);
}
export async function createComment(post_id: string, messageContent: string)
{
  const response = await http
  .post(`/api/post/comment/create`, {
    post_id: post_id,
    messageContent: messageContent
  })
  .then((response: AxiosResponse<{ error: string }>) => {
  })
  .catch((error: any) => {
    console.log(error);
  });
}
export function commentInit(post_id: string, messageContent: string){
  createComment(post_id, messageContent); 
}
export async function deletePost(postid: string) {
  const request = await http
    .delete(`/api/posts/${postId}`)
    .then((response: AxiosResponse<{ error: string }>) => {
      location.reload();
    })
    .catch((reason: AxiosError<{ error: string }>) => {
      console.log(reason);
    });
}
export async function getCommentsCount(id: string) {
  let count: number = 0;
  const request = await http
    .get(`/api/getposts/comments/count/${id}`)
    .then((response: AxiosResponse) => {
      // User is authenticated
      count = response.data;
    })
    .catch((reason: AxiosError) => {
      console.log(reason);
    });
  return count;
}