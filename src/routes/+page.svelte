<script lang="ts">
	import Nav from '../components/navigation/nav.svelte';
	import Footer from '../components/footer/footer.svelte';
	import Header from '../components/header/header.svelte';
	import Post from '../components/post/post.svelte';
	import axios from 'axios';
	import type { AxiosResponse, AxiosError } from 'axios';
	

	let selectedLanguage = 'en'
  let languages = {
    en: [
      'Final project for the Web Application Programming',
			'Technologies that i have used: ',
			'For front-end:',
			'SvelteKit, Tailwind CSS, TypeScript',
			'For the back-end:',
			'Laravel',
			'And to comunication between back-end and front-end i have used: Axios',
			'About the project:',
			'This project is a platform for creating posts, similar to Twitter, where multiple users can read and post their own thoughts. The goal of this project is to create a user-friendly and easy-to-use platform where people can share their ideas and connect with others.',

    ],
    pl: [
      'Projekt na zaliczenie labolatorium z zajęć Aplikacji internetowych',
			'Technologie jakie użyłem',
			'Do frontendu:',
			'SvelteKit, Tailwind, TypeScript',
			'Do backendu:',
			'Laravel',
			'Oraz do komunikacji pomiędzy backendem i frontendem użyłem: Axios',
			'O projekcie',
			'Ten projekt to platforma do tworzenia postów, podobna do Twittera, gdzie wielu użytkowników może czytać i zamieszczać własne myśli. Celem tego projektu jest stworzenie przyjaznej i łatwej w użyciu platformy, gdzie ludzie mogą dzielić się swoimi pomysłami i łączyć z innymi.',
			]
	}

	function handleLanguageChange(event) {
		selectedLanguage = event.target.value
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div class="flex-1 px-2 mx-2 white-text">Post'em </div>
      <div class="flex-none hidden lg:block">
        <ul class="menu menu-horizontal">
          <!-- Navbar menu content here -->
					<select class="select w-full max-w-xs bg-neutral-content" on:change={handleLanguageChange}>
						<option disabled selected>Choose a language</option>
						<option value="en">English</option>
						<option value="pl">Polski</option>
					</select>
          <li><a href="/login">Login</a></li>
      		<li><a href="/register">Register</a></li>
        </ul>
      </div>
    </div>
    <div class="welcome-container">
			{#each languages[selectedLanguage] as text}
  			<p>{text}</p>
			{/each}
    </div>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay"></label> 
    <ul class="menu p-4 w-80 bg-base-100">
      <!-- Sidebar content here -->
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
      <select class="select w-full max-w-xs bg-neutral-content" on:change={handleLanguageChange}>
				<option disabled selected>Choose a language</option>
				<option value="en">English</option>
				<option value="pl">Polski</option>
			</select>
    </ul>
  </div>
</div>


	

