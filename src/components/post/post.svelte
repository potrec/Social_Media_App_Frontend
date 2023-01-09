<script lang="ts">
	import 'tailwindcss/tailwind.css';
	export let id;
	export let userId;
	export let userName;
	export let parentId;
	export let messageContent;
	export let createdAt;
	export let updatedAt;
	import { getUserNameById } from '../../scripts/getUserNameById';
	import { afterUpdate, onMount } from 'svelte';

	
</script>

<svelte:head>
	<link rel="stylesheet" href="css/post.css" type="text/css" />
</svelte:head>

<div class="post-module">
	<div class="post-header">
			<h2 class="post-title">{messageContent}</h2>
			<div class="post-meta">
					<p>Posted by {userName}</p>
					<p>On {createdAt}</p>
			</div>
	</div>
	<div class="post-content">
			<p>{messageContent}</p>
	</div>
</div>


<!-- <div class="post bg-black text-white">
	<div class="post-header flex justify-center content-start">
		<div class="profile-picture mr-4 ml-4">
			<img
				class="w-15 h-10 min-w-10 min-h-10 rounded-full"
				src="profilePhoto.png"
				alt="profilePhoto"
			/>
		</div>
		<div class="flex flex-col min-w-0">
			<p class="flex text-sn">
				<span class="truncate text-cool-gray-500">
					<span class="font-bold text-cool-gray-900">Maciej Potręć</span>
					<span class="pl-1 text-cool-gray-500">@potrec</span>
				</span>
				<span class="flex-shrink-0">
					<span class="pl-1 text-cool-gray-500">.</span>
					<span class="text-cool-gray-500 ml-40">2022-12-09</span>
				</span>
			</p>
			<p class="text-sn max-w-prose">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</p>
			<div class="flex justify-between mt-2 text-cool-gray-500">
				<div class="like flex items-center justify-center w-20">
					<img class="w-5 h-5" src="icons/heart.svg" alt="heart" />
					256
				</div>
				<div class="like flex items-center justify-center w-20">
					<img class="w-5 h-5" src="icons/mail.svg" alt="heart" />
					16
				</div>
				<div class="like flex items-center justify-center w-20">
					<img class="w-5 h-5" src="icons/share.svg" alt="heart" />
					11
				</div>
			</div>
		</div>
	</div>
</div> -->
<!-- <div class="post-names">
			<p class="ml-5 text-xl ">Maciej Potręć</p>
			<p class="ml-5 text-xl font-medium">@potrec</p>
		</div>
		<div class="post-time">
			<p class="ml-5 text-xl font-medium">2022-12-09</p>
		</div>
		<div class="post-options">
			<p class="ml-5 text-xl font-bold">...</p>
		</div> -->
<!-- </div>
	<div class="post-main">
		<p class="ml-5 text-xl">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies
			lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl. Donec auctor, nisl eget
			ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl.
		</p>
		-->
<!-- <div class="post-footer flex-end border-b border-gray-200">
		<div class="post-footer-icons flex items-center justify-center">
			<div class="like flex items-center justify-center w-20">
				<img class="w-5 h-5" src="icons/heart.svg" alt="heart" />
				256
			</div>
			<div class="like flex items-center justify-center w-20">
				<img class="w-5 h-5" src="icons/mail.svg" alt="heart" />
				16
			</div>
			<div class="like flex items-center justify-center w-20">
				<img class="w-5 h-5" src="icons/share.svg" alt="heart" />
				11
			</div>
		</div>
	</div> -->
<!-- profile photo -->

<!-- post content -->
