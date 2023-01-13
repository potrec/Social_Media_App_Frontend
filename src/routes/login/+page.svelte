<script lang="ts">
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	import { auth } from '../../stores/auth';
	import { goto } from '$app/navigation';
	import 'tailwindcss/tailwind.css';


	// const csrfToken = document.querySelector('meta[name="csrf-token"]')!.getAttribute('content');

	
	let email = '',
		password = '',
		errorMessage = '',
		isLoading = false,
		emailFocused = false,
		passwordFocused = false,
		token: string;
	const http = axios.create({
		baseURL: 'http://127.0.0.1:8000',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
		},
		withCredentials: true
	});

	async function getUser() {
		isLoading = true;
		const csrf = await http.get('/sanctum/csrf-cookie');

		const login = await http
			.post('/api/login', {
				email: email,
				password: password
			})
			.then((response: AxiosResponse<{ error: string }>) => {
				auth.set(true);
				navigate('/home');
				const token = response.data.token;
				console.log(token);
				localStorage.setItem("token", token);
				sessionStorage.setItem("userId",response.data.user.id);
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
			})
			.finally(() => {
				isLoading = false;
			});
	}
	async function navigate(/** @type {string | URL} */ link: string | URL) {
		await goto(link);
	}

	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	async function hideErrorMessage() {
		//await sleep(5000);
		errorMessage = '';
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="css/global.css" type="text/css" />
</svelte:head>
{#if isLoading}
	<div class="loader-container">
		<div class="loader">
			<span />
			<span />
			<span />
			<span />
		</div>
	</div>
{/if}
<form on:submit|preventDefault={getUser}>
	<div class="container">
		<div class="inputBox">
			<input
				bind:value={email}
				on:focus={() => (emailFocused = true)}
				on:blur={() => (emailFocused = false)}
				type="email"
			/>
			<span class:focused={emailFocused} class:filled={email}>Email</span>
			<i class:focused={emailFocused} class:filled={email} />
		</div>
		<div class="inputBox">
			<input
				bind:value={password}
				on:focus={() => (passwordFocused = true)}
				on:blur={() => (passwordFocused = false)}
				type="password"
			/>
			<span class:focused={passwordFocused} class:filled={password}>Password</span>
			<i class:focused={passwordFocused} class:filled={password} />
		</div>
		<button type="submit" class="submit-button">Login</button>
		<a href="/register">Create an account if you don't have one</a>
	</div>
	{#if errorMessage}
		<div class="error-container">
			<div class="alert alert-error shadow-lg max-w-[90%] show">
				<div>
					<button on:click|once={hideErrorMessage}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
					<span class="wrapped-text">{errorMessage}</span>
				</div>
			</div>
		</div>
	{/if}
</form>
