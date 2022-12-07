<script lang="ts">
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	import { auth } from '../../stores/auth';
	import { goto } from '$app/navigation';

	let email = '',
		password = '';
	$: {
		console.log(email + ' ' + password);
	}
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
			.then((response: AxiosResponse<{ user: { name: string } }>) => {
				auth.set(true);
				navigate('/');
			})
			.catch((reason: AxiosError<{ additionalInfo: string }>) => {
				if (reason.response!.status === 401) {
					// Handle bad credentials
				} else {
					// Handle else
					console.log(reason.message);
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
		<button type="submit">Login</button>
	</div>
</form>
