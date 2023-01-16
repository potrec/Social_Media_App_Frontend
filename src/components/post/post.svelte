<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	import { getToken } from '../../scripts/getToken';
	export let id: number;
	export let userId: number;
	export let userName: string;
	export let userEmail: string;
	export let parentId: number;
	export let messageContent: string;
	export let createdAt: string;
	export let updatedAt: string;
	let email: string[] = userEmail.split('@');
	

	function getTimeDifference(date: string): string {
    const currentTime = new Date();
    const dataTime = new Date(date);
    const timeDifference = currentTime.getTime() - dataTime.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (seconds < 60) {
        return "just now";
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 3) {
        return `${days} days ago`;
    } else {
        return dataTime.toLocaleDateString();
    }
}
function checkUserIfUserPosted(loggedUserId: number,userId: number ): boolean {
	if(loggedUserId != userId)
	{
		return true;
	}
	return false;
}

function getFirstUsernameLetter(userName: string)
{
	return userName.charAt(0);
}



let isUserPost = true;
let userAvatar = getFirstUsernameLetter(userName);
let postTime = getTimeDifference(createdAt.toString());
let loggedUserId = sessionStorage.getItem('userId');
if(loggedUserId)
{
	isUserPost = checkUserIfUserPosted(parseInt(loggedUserId),userId);
}

let showMenu = false;

function toggleMenu() {
	showMenu = !showMenu;
}
async function deletePost(postId: Number){
	console.log(postId);
	const http = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    "Authorization": "Bearer " + getToken(),
  },
  withCredentials: true
  });
	const request = await http
			.delete(`/api/posts/${postId}`)
			.then((response: AxiosResponse<{ error: string }>) => {
				console.log(response);
				location.reload();
			})
			.catch((reason: AxiosError<{ error: string }>) => {
				console.log(reason);
			})
}

let likeCount: Number = 0;

</script>

<svelte:head>
	<link rel="stylesheet" href="css/post.css" type="text/css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<div class="post-module">
	<div class="post-header">
		<div class="post-userdata">
			<div class="avatar placeholder">
				<div class="bg-neutral-focus text-neutral-content rounded-full">
					<span class="text-3xl">{userAvatar}</span>
				</div>
			</div> 
			<div class="post-meta wrapped-text">
				<p>{userName}</p>
				<p>@{email[0]}</p>
				<p>{postTime}</p>
			</div>
		</div>
		{#if !isUserPost}
			<div class="flex-none">
				<button class="btn btn-square btn-ghost"  on:click={toggleMenu}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
				</button>
				<div class="menu" class:hidden={!showMenu}>
					<button class="btn btn-square btn-ghost">Edit post</button>
					<button on:click={deletePost(id)} class="btn btn-square btn-ghost">Delete post</button>
				</div>
			</div>
		{/if}
	</div>
	<div class="post-content">
			<p>{messageContent}</p>
	</div>
	<div class="post-footer">
		<div class="post-stat">
			<button><div class="likes">Likes count:{likeCount} <i class="fa fa-thumbs-up"></i></div></button>
			<button><div class="dislikes">Dislikes count:{likeCount}<i class="fa fa-thumbs-down"></i></div></button>
			<button><div class="comments">Comments count:{likeCount}<i class="fa fa-commenting"></i></div></button>
		</div>
	</div>
</div>
