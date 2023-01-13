<script lang="ts">
	import 'tailwindcss/tailwind.css';
	export let id: Number;
	export let userId: Number;
	export let userName: string;
	export let userEmail: string;
	export let parentId: Number;
	export let messageContent: string;
	export let createdAt: string;
	export let updatedAt: string;
	let email: string[] = userEmail.split('@');
	
	function getTimeDifference(date: string): string {
    const currentTime = new Date();
    const dataTime = new Date(date);
    const timeDifference = currentTime.getTime() - dataTime.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (seconds < 60) {
        return "just now";
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 3) {
        return `${days} days ago`;
    } else {
        return dataTime.toLocaleDateString();
    }
}
function checkUserIfUserPosted(loggedUserId: number,userId: number ): boolean {
	if(loggedUserId != userId)
	{
		return false;
	}
	return true;
}

function getFirstUsernameLetter(userName: string)
{
	return userName.charAt(0);
}



let isUserPost = false;
let userAvatar = getFirstUsernameLetter(userName);
let postTime = getTimeDifference(createdAt.toString());
let loggedUserId = sessionStorage.getItem('userId');
if(loggedUserId)
{
	isUserPost = checkUserIfUserPosted(parseInt(loggedUserId),userId);
}

</script>

<svelte:head>
	<link rel="stylesheet" href="css/post.css" type="text/css" />
</svelte:head>

<div class="post-module">
	<div class="post-header">
			<div class="post-userdata">
				<div class="avatar placeholder">
					<div class="bg-neutral-focus text-neutral-content rounded-full w-24">
						<span class="text-3xl">{userAvatar}</span>
					</div>
				</div> 
				<div class="post-meta wrapped-text">
					<p>{userName}</p>
					<p>@{email[0]}</p>
					<p>{postTime}</p>
					{#if isUserPost}
					<div class="flex-none">
						<button class="btn btn-square btn-ghost">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
						</button>
					</div>
					{/if}
				</div>
			</div>
	</div>
	<div class="post-content">
			<p>{messageContent}</p>
	</div>
</div>
