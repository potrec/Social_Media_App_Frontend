<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	import { getToken } from '../../scripts/getToken';
	import { onMount } from 'svelte';
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
			return 'just now';
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
	function checkUserIfUserPosted(loggedUserId: number, userId: number): boolean {
		if (loggedUserId != userId) {
			return true;
		}
		return false;
	}

	function getFirstUsernameLetter(userName: string) {
		return userName.charAt(0);
	}

	let isUserPost = true;
	let userAvatar = getFirstUsernameLetter(userName);
	let postTime = getTimeDifference(createdAt.toString());
	let loggedUserId = sessionStorage.getItem('userId');
	if (loggedUserId) {
		isUserPost = checkUserIfUserPosted(parseInt(loggedUserId), userId);
	}
	let showMenu = false;

	const http = axios.create({
		baseURL: 'http://127.0.0.1:8000',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			Authorization: 'Bearer ' + getToken()
		},
		withCredentials: true
	});

	function toggleMenu() {
		showMenu = !showMenu;
	}
	async function deletePost(postId: Number) {
		const request = await http
			.delete(`/api/posts/${postId}`)
			.then((response: AxiosResponse<{ error: string }>) => {
				console.log(response);
				location.reload();
			})
			.catch((reason: AxiosError<{ error: string }>) => {
				console.log(reason);
			});
	}

	let likeStats: Array<any>;
	let likeCount: Number = 0;
	let dislikeCount: Number = 0;
	let commentCount: Number = 0;
	let isLiked: Boolean = false;
	let isDisLiked: Boolean = false;

	async function likePost(post_id: number, like: boolean) {
		const request = await http
			.post(`/api/reaction/like`, {
				post_id: post_id,
				like: like
			})
			.then((response: AxiosResponse<{ error: string }>) => {})
			.catch((reason: AxiosError<{ error: string }>) => {
				console.log(reason);
			});
		await getPostsStats(post_id);
		likeCount = likeStats.likes_count;
		dislikeCount = likeStats.dislikes_count;
		console.log(likeCount + ' ' + dislikeCount);
		getPostStatus(post_id);
	}

	async function getPostsStats(post_id: number) {
		console.log(post_id);
		const request = await http
			.post(`/api/reaction/like/count`, {
				post_id: post_id
			})
			.then((response: AxiosResponse<{ error: string }>) => {
				likeStats = response.data;
			})
			.catch((reason: AxiosError<{ error: string }>) => {
				console.log(reason);
			});
		return likeStats;
	}
	async function getPostStatus(post_id: number) {
		console.log('changing color of post');
		const request = await http
			.post(`/api/reaction/like/check`, {
				post_id: post_id
			})
			.then((response: AxiosResponse<{ error: string }>) => {
				// console.log("isLiked:"+response.data.message);
				if (response.data.message == 1) {
					console.log('isLiked:' + response.data.message);
					isLiked = true;
					isDisLiked = false;
				} else if (response.data.message == 0) {
					console.log('isDisliked:' + response.data.message);
					isDisLiked = true;
					isLiked = false;
				} else {
					isDisLiked = false;
					isLiked = false;
				}
			})
			.catch((reason: AxiosError<{ error: string }>) => {
				console.log(reason);
			});
	}
	onMount(async () => {
		likeStats = await getPostsStats(id);
		if (likeStats) likeCount = likeStats.likes_count;
		dislikeCount = likeStats.dislikes_count;
		console.log(likeStats);
		getPostStatus(id);
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="css/post.css" type="text/css" />
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	/>
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
				<button class="btn btn-square btn-ghost" on:click={toggleMenu}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-5 h-5 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
						/></svg
					>
				</button>
				<div class="menu" class:hidden={!showMenu}>
					<button class="btn btn-square btn-ghost">Edit post</button>
					<button on:click={() => deletePost(id)} class="btn btn-square btn-ghost"
						>Delete post</button
					>
				</div>
			</div>
		{/if}
	</div>
	<div class="post-content">
		<p>{messageContent}</p>
	</div>
	<div class="post-footer">
		<div class="post-stat">
			<button on:click={() => likePost(id, true)}
				><div class="likes">
					Likes count:{likeCount}<i class:liked={isLiked} class="fa fa-thumbs-up" />
				</div></button
			>
			<button on:click={() => likePost(id, false)}
				><div class="dislikes">
					Dislikes count:{dislikeCount}<i class:disliked={isDisLiked} class="fa fa-thumbs-down" />
				</div></button
			>
			<button
				><div class="comments">
					Comments count:{commentCount}<i class="fa fa-commenting" />
				</div></button
			>
		</div>
	</div>
</div>
