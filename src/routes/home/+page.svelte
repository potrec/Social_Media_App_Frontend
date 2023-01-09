<script lang="ts">
import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { goto } from '$app/navigation';
import { writable } from "svelte/store";
import 'tailwindcss/tailwind.css';
import { afterUpdate, onMount } from 'svelte';
import Post from '../../components/post/post.svelte';
import { getToken } from '../../scripts/getToken';
import { getPosts } from '../../scripts/getPosts';
import { getUserName } from '../../scripts/getUserName';
import { getUserNameById, getUserNameById } from '../../scripts/getUserNameById';

let userName = '';
let messageContent:String ='';
let posts:[] = [];


// if (typeof window !== 'undefined') {
// // Perform localStorage action
// const token = localStorage.getItem('token')
// console.log(token);
// }
// function getToken() {
//   if (typeof window !== 'undefined') {
//   const token = localStorage.getItem('token')
//   console.log(token);
//   return token;
//   }
// }

// async function getUserName() {
//   const http = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'X-Requested-With': 'XMLHttpRequest',
//     "Authorization": "Bearer " + getToken(),
//   },
//   withCredentials: true
//   });
//   const response = await http.get('/api/user')
//     .then((response: AxiosResponse) => {
//       // User is authenticated
//       userName = response.data.name;
//       userLoged = true;
//       console.log(userName);
//     })
//     .catch((reason: AxiosError) => {
//       if(reason.response!.status === 404)
//       {
//         navigate('/login');
//       }
//       if(reason.response!.status === 401)
//       {
//         navigate('/login');
//       }
//     });
// }
// async function getPosts()
// {
//   const http = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'X-Requested-With': 'XMLHttpRequest',
//     "Authorization": "Bearer " + getToken(),
//   },
//   withCredentials: true
//   });
//   const response = await http.get('/api/getposts')
//     .then((response: AxiosResponse) => {
//       // User is authenticated
//       console.log(response);
//     })
//     .catch((reason: AxiosError) => {
//       console.error(reason);
//     });

//     posts = response.data;
// }



onMount(async () => {
  userName = await getUserName();
  console.log("userName: ",userName);
  posts = await getPosts();
  console.log("posts: ",posts);
  // const result = getUserName();
  // let [a,b] = await getUserName();
  // console.log(result);
  // // getPosts(posts);
  // console.log("dwie zmienne: ",a,b);
});


// async function navigate(/** @type {string | URL} */ link: string | URL) {
//   await goto(link);
// }

// onMount(() => {
//   // let textarea = document.getElementsByClassName("message-form")
//   // let textarea = document.querySelector("h2");
//   let textarea = document.getElementsByClassName("message-form")
//   console.log(textarea);
// if(textarea){
//   textarea.item.addEventListener("keyup", e =>{
//   let scHeight = e.target.scrollHeight;
//   console.log(scHeight);
//   });
// }
// });
afterUpdate(() => {
  let textarea = document.querySelector("textarea");
  if(textarea){
    textarea.addEventListener("keyup", e =>{
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
  });
}
	// if (autoscroll) div.scrollTo(0, div.scrollHeight);
});
</script>


<svelte:head>
	<link rel="stylesheet" href="css/global.css" type="text/css" />
</svelte:head>
<form>
  <div class="flex flex-col h-screen ">
    <h2>Welcome {userName}</h2>
    <div class="container message-container">
      <h2>What do you wanna write?</h2>
      <textarea bind:value={messageContent} class="message-form" placeholder="Treść wiadomości" required></textarea>
      <button type="submit" class="submit-button">Post</button>
    </div>
    <textarea class="message-form"></textarea>
  </div>
</form>
<ul>
  {#each posts as post}
      <Post 
          id={post.id} 
          userId={post.user_id}
          userName={getUserNameById(post.user_id)}  
          parentId={post.parent_id} 
          messageContent={post.messageContent} 
          createdAt={post.created_at} 
          updatedAt={post.updated_at} 
      />
  {/each}
  <!-- <Post 
          id={1} 
          userId={1}
          userName={getUserNameById(post.user_id)} 
          parentId={1} 
          messageContent={'dfghdfghdfg'} 
          createdAt={13241} 
          updatedAt={11324123} 
      /> -->
</ul>




<!-- <div class="flex flex-col h-screen ">
	<Header />
	<div class="flex-1">
		<Post />
		<Post />
		<Post />
		<Post />
		<Post />
	</div>
	<Footer />
</div> -->
