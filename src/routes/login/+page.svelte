<script lang="ts">
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	import { auth } from '../../stores/auth';
	import { goto } from '$app/navigation';

	let email = '',
		password = '',
		errorMessage = '';
	const http = axios.create({
		baseURL: 'http://127.0.0.1:8000',
		headers: {
			'X-Requested-With': 'XMLHttpRequest'
		},
		withCredentials: true
	});

	async function getUser() {
		const csrf = await http.get('/sanctum/csrf-cookie');

		const login = await http
			.post('/api/login', {
				email: email,
				password: password
			})
			.then((response: AxiosResponse<{ error: string }>) => {
				auth.set(true);
				navigate('/home');
			})
			.catch((reason: AxiosError<{ error: string }>) => {
				if (reason.response!.status === 404) {
					errorMessage = reason.response!.data.error;
				} else if (reason.response!.status === 401) {
					errorMessage = reason.response!.data.error;
				} else if (reason.response!.status === 422) {
					errorMessage = reason.response!.data.error;
				} else {
					errorMessage = reason.message;
				}
				auth.set(false);
			});
	}
	async function navigate(/** @type {string | URL} */ link: string | URL) {
		await goto(link);
	}
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
<form on:submit|preventDefault={getUser}>
	<div>
		<label for="email">Email</label>
		<input bind:value={email} type="email" />
		<label for="password">Password</label>
		<input bind:value={password} type="password" />
		{#if errorMessage}
			<p>{errorMessage}</p>
		{/if}
		<button type="submit">Login</button>
	</div>
</form>
