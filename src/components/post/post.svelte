<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	import { getToken } from '../../scripts/getToken';
	import { onMount } from 'svelte';
	import Comment from '../../components/comment/comment.svelte';
	import { getComments } from '../../scripts/getPostComments';
	import { getTimeDifference } from '../../scripts/getTime';
	import {
		checkUserIfUserPosted,
		getFirstUsernameLetter,
		createComment,
		deletePost,
		getCommentsCount
	} from '../../scripts/basicScripts';
	import { http } from '../../scripts/http';

	export let id: string;
	export let userId: string;
	export let userName: string;
	export let userEmail: string;
	export let messageContent: string;
	export let createdAt: string;
	export let reactionStatus: boolean | null;
	export let reactionsCount: number[];

	interface LikeStats {
		likes_count: number;
		dislikes_count: number;
	}
	interface Comment {
		user_id: string;
		name: string;
		messageContent: string;
		created_at: string;
	}

	let email: string[] = userEmail.split('@');
	let isUserPost = true;
	let userAvatar = getFirstUsernameLetter(userName);
	let postTime = getTimeDifference(createdAt.toString());
	let loggedUserId = sessionStorage.getItem('userId');
	if (loggedUserId) {
		isUserPost = checkUserIfUserPosted(loggedUserId, userId);
	}
	let showMenu = false;
	let likeStats: LikeStats | null = null;
	let likeCount: Number = reactionsCount[0];
	let dislikeCount: Number = reactionsCount[1];
	let commentCount: Number = 0;
	let isDisLiked: Boolean = false;
	let commentContent = '';
	let hide = true;
	let comments: Comment[] = [];

	function toggleMenu() {
		showMenu = !showMenu;
	}
	async function likePost(post_id: string, like: boolean) {
		console.log(post_id, like, reactionStatus);
		if (reactionStatus != null) {
			if (reactionStatus == like) {
				reactionStatus = null;
			} else {
				reactionStatus = !reactionStatus;
			}
		} else {
			reactionStatus = like;
		}
		console.log(post_id, like, reactionStatus);
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
		if (likeStats) {
			likeCount = likeStats.likes_count;
			dislikeCount = likeStats.dislikes_count;
		}
	}
	async function getPostsStats(post_id: string) {
		const request = await http
			.post(`/api/reaction/like/count`, {
				post_id: post_id
			})
			.then((response: AxiosResponse) => {
				likeStats = response.data;
			})
			.catch((reason: AxiosError<{ error: string }>) => {
				console.log(reason);
			});
		return likeStats;
	}
	async function initComments(id: string) {
		comments = await getComments(id);
		hide = false;
	}
	async function refreshComments(id: string, commentContent: string) {
		await createComment(id, commentContent);
		comments = await getComments(id);
		commentCount = await getCommentsCount(id);
	}
	onMount(async () => {
		likeStats = await getPostsStats(id);
		if (likeStats) {
			likeCount = likeStats.likes_count;
			dislikeCount = likeStats.dislikes_count;
		}
		commentCount = await getCommentsCount(id);
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
			<div class="flex">
				<button class="btn btn-square btn-ghost" on:click={() => toggleMenu()}>
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
				><span class="likes">
					Likes count:{likeCount}<i
						class:liked={reactionStatus == true && reactionStatus != null}
						class="fa fa-thumbs-up"
					/>
				</span></button
			>
			<button on:click={() => likePost(id, false)}
				><span class="dislikes">
					Dislikes count:{dislikeCount}<i
						class:disliked={reactionStatus == false && reactionStatus != null}
						class="fa fa-thumbs-down"
					/>
				</span></button
			>
			<button on:click={() => initComments(id)}
				><span class="comments">
					Comments count:{commentCount}<i class="fa fa-commenting" />
				</span></button
			>
		</div>
	</div>
	<div class:hidden={hide} class="post-comments">
		{#if comments}
			<div class="comment-form">
				<form on:submit|preventDefault={() => refreshComments(id, commentContent)}>
					<textarea
						bind:value={commentContent}
						class="message-form"
						placeholder="Treść wiadomości"
						required
					/>
					<button type="submit" class="submit-button">Post</button>
					<button on:click={() => (hide = true)} type="button" class="submit-button">Hide</button>
				</form>
			</div>
			{#each comments as comment}
				<Comment
					userId={comment.user_id}
					userName={comment.name}
					messageContent={comment.messageContent}
					createdAt={comment.created_at.toString()}
				/>
			{/each}
		{/if}
	</div>
</div>
