<script lang="ts">
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	import { auth } from '../../stores/auth';
	import { goto } from '$app/navigation';

	let email = '',
		password = '',
		name = '',
		password_confirmation = '',
		errorMessage = '';
	$: {
		console.log;
	}

	const http = axios.create({
		baseURL: 'http://127.0.0.1:8000',
		headers: {
			'X-Requested-With': 'XMLHttpRequest'
		},
		withCredentials: true
	});

	// register user
	async function registerUser() {
		if (errorMessage != '') {
			errorMessage = '';
		}
		const csrf = await http.get('/sanctum/csrf-cookie');

		const register = await http
			.post('/api/register', {
				name: name,
				email: email,
				password: password,
				password_confirmation: password_confirmation
			})
			.then((response: AxiosResponse<{ user: { name: string } }>) => {
				auth.set(true);
				navigate('/');
			})
			.catch((reason: AxiosError<{ error: string[] }>) => {
				let errorList = reason.response!.data.errors;
				for (const [key, value] of Object.entries(errorList)) {
					errorMessage += value + ' \n';
				}
				auth.set(false);
			});
	}
	async function navigate(/** @type {string | URL} */ link: string | URL) {
		await goto(link);
	}
</script>

<!-- make register form using svelte -->
<form on:submit|preventDefault={registerUser}>
	<div>
		<label for="name">Name</label>
		<input bind:value={name} type="text" />
		<label for="email">Email</label>
		<input bind:value={email} type="email" />
		<label for="password">Password</label>
		<input bind:value={password} type="password" />
		<label for="password_confirmation">Password Confirmation</label>
		<input bind:value={password_confirmation} type="password" />
		<button type="submit">Register</button>
		{#if errorMessage}
			<p style="background: red; color: black">{errorMessage}</p>
		{/if}
	</div>
</form>
