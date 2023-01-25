<script lang="ts">
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	import 'tailwindcss/tailwind.css';
	import { afterUpdate, onMount } from 'svelte';
	import Post from '../../components/post/post.svelte';
	import { getToken } from '../../scripts/getToken';
	import { getPosts } from '../../scripts/getPosts';
	import { getUserName } from '../../scripts/getUserName';

	let userName = '';
	let messageContent: String = '';
	let posts: [] = [];

	onMount(async () => {
		userName = await getUserName();
		posts = await getPosts();
		// setInterval(async () => {
		//   posts = await getPosts();
		// }, 5000);
	});
	afterUpdate(() => {
		let textarea = document.querySelector('textarea');
		if (textarea) {
			textarea.addEventListener('keyup', (e) => {
				let scHeight = e.target.scrollHeight;
				textarea.style.height = `${scHeight}px`;
			});
		}
	});

	const http = axios.create({
		baseURL: 'http://127.0.0.1:8000',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			Authorization: 'Bearer ' + getToken()
		},
		withCredentials: true
	});

	async function createPost() {
		const csrf = await http.get('/sanctum/csrf-cookie');

		const login = await http
			.post('/api/createpost', {
				messageContent: messageContent
			})
			.then((response: AxiosResponse<{ error: string }>) => {
				console.log(response);
				location.reload();
			})
			.catch((reason: AxiosError<{ error: string }>) => {
				console.log(reason);
			});
		posts = await getPosts();
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="css/global.css" type="text/css" />
</svelte:head>
<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col self-center">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-none lg:hidden">
				<label for="my-drawer-3" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</label>
			</div>
			<div class="flex-1 px-2 mx-2 white-text">Post'em</div>
			<li><a href="/login">Logout</a></li>
		</div>
		<div class="main-page">
			<form on:submit|preventDefault={createPost}>
				<div class="post-form">
					<div class="container message-container">
						<h2>Welcome {userName}</h2>
						<h2>What do you wanna post?</h2>
						<textarea
							bind:value={messageContent}
							class="message-form"
							placeholder="Treść wiadomości"
							required
						/>
						<button type="submit" class="submit-button">Post</button>
					</div>
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
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100">
			<!-- Sidebar content here -->
			<li><a href="/login">Logout</a></li>
		</ul>
	</div>
</div>
