<script lang="ts">
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	import { auth } from '../../stores/auth';
	import { goto } from '$app/navigation';
	import 'tailwindcss/tailwind.css';

	let email = '',
		password = '',
		name = '',
		password_confirmation = '',
		errorMessage = '',
		isLoading = false,
		emailFocused = false,
		nameFocused = false,
		passwordConfirmationFocused = false,
		passwordFocused = false;

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
				navigate('/login');
			})
			.catch((reason: AxiosError<{ error: string[] }>) => {
				let errorList = reason.response!.data.errors;
				for (const [key, value] of Object.entries(errorList)) {
					errorMessage += value + ' ';
				}
				auth.set(false);
			});
	}
	async function navigate(/** @type {string | URL} */ link: string | URL) {
		await goto(link);
	}
	async function hideErrorMessage() {
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
<form on:submit|preventDefault={registerUser}>
	<div class="container">
		<div class="inputBox">
			<input
				bind:value={name}
				on:focus={() => (nameFocused = true)}
				on:blur={() => (nameFocused = false)}
				type="username"
			/>
			<span class:focused={nameFocused} class:filled={name}>Name</span>
			<i class:focused={nameFocused} class:filled={name} />
		</div>
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
		<div class="inputBox">
			<input
				bind:value={password_confirmation}
				on:focus={() => (passwordConfirmationFocused = true)}
				on:blur={() => (passwordConfirmationFocused = false)}
				type="password"
			/>
			<span class:focused={passwordConfirmationFocused} class:filled={password_confirmation}
				>Password Confirmation</span
			>
			<i class:focused={passwordConfirmationFocused} class:filled={password_confirmation} />
		</div>
		<button type="submit" class="submit-button">Register</button>
		<a href="/login">Login on your account if have one</a>
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
