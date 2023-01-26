<script lang="ts">
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	import { getToken } from '../../scripts/getToken';
	import { onMount } from 'svelte';
	import { getTimeDifference } from '../../scripts/getTime';

	export let userId: number;
	export let userName: string;
	export let messageContent: string;
	export let createdAt: string;

	let loggedUserId = sessionStorage.getItem('userId');

	const http = axios.create({
		baseURL: 'http://127.0.0.1:8000',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			Authorization: 'Bearer ' + getToken()
		},
		withCredentials: true
	});
</script>

{#if userId != Number(loggedUserId)}
	<div class="comment-module">
		<div class="chat chat-start">
			<div class="chat-header">
				{userName}
				<time class="text-xs opacity-50">{getTimeDifference(createdAt)}</time>
			</div>
			<div class="chat-bubble">{messageContent}</div>
		</div>
	</div>
{:else}
	<div class="chat chat-end">
		<div class="chat-header">
			{userName}
			<time class="text-xs opacity-50">{getTimeDifference(createdAt)}</time>
		</div>
		<div class="chat-bubble chat-bubble-primary">{messageContent}</div>
	</div>
{/if}