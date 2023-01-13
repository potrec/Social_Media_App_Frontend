<script lang="ts">
import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
// import { goto } from '$app/navigation';
// import { writable } from "svelte/store";
import 'tailwindcss/tailwind.css';
import { afterUpdate, onMount } from 'svelte';
import Post from '../../components/post/post.svelte';
import { getToken } from '../../scripts/getToken';
import { getPosts } from '../../scripts/getPosts';
import { getUserName } from '../../scripts/getUserName';
// import { getUserNameById } from '../../scripts/getUserNameById';

let userName = '';
let messageContent:String ='';
let posts:[] = [];

onMount(async () => {
  userName = await getUserName();
  posts = await getPosts(); 
  setInterval(async () => {
    posts = await getPosts();
  }, 3000);
});
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

const http = axios.create({
		baseURL: 'http://127.0.0.1:8000',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
      "Authorization": "Bearer " + getToken(),
		},
		withCredentials: true
	});

async function createPost()
{
		const csrf = await http.get('/sanctum/csrf-cookie');

		const login = await http
			.post('/api/createpost', {
				messageContent: messageContent
			})
			.then((response: AxiosResponse<{ error: string }>) => {
				console.log(response);
        
			})
			.catch((reason: AxiosError<{ error: string }>) => {
				console.log(reason);
			})
      posts = await getPosts();
}


</script>


<svelte:head>
	<link rel="stylesheet" href="css/global.css" type="text/css" />
</svelte:head>
<div class="main-page">
  <form on:submit|preventDefault={createPost}>
    <div class="flex flex-col">
      <h2>Welcome {userName}</h2>
      <div class="container message-container">
        <h2>What do you wanna write?</h2>
        <textarea bind:value={messageContent} class="message-form" placeholder="Treść wiadomości" required></textarea>
        <button type="submit" class="submit-button">Post</button>
      </div>
      <textarea class="message-form"></textarea>
    </div>
  </form>
  <div class="row">
    {#each posts as post}
          <Post 
              id={post.id} 
              userId={post.user_id}
              userName={post.name}
              userEmail={post.email}  
              parentId={post.parent_id} 
              messageContent={post.messageContent} 
              createdAt={post.created_at} 
              updatedAt={post.updated_at} 
          />
    {/each}
  </div>
</div>





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
