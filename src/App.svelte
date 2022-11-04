<script>
	export let name;
	const handleClick = () => {
		alert(`Hello ${name}!`);
	};
	const sign_up = async () => {
		const res = await fetch('/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});
		const result = await res.json();
		console.log(result);
	};
</script>

<main>
	<div class="sing-up">
		<div class="sign-up-content">
			<h1 class="sign-up-title">Sign up</h1>
			<div class="sign-up-form">
				<div class="sign-up-input">
					<i class="zmdi zmdi-account material-icons-name"></i>
					<input type="text" placeholder="Your Name"/>
				</div>
				<div class="sign-up-input">
					<i class="zmdi zmdi-email"></i>
					<input type="email" placeholder="Your Email"/>
				</div>
				<div class="sign-up-input">
					<i class="zmdi zmdi-lock"></i>
					<input type="password" placeholder="Password"/>
				</div>
				<div class="sign-up-input">
					<i class="zmdi zmdi-lock-outline"></i>
					<input type="password" placeholder="Repeat your password"/>
				</div>
				<button class="sign-up-button" on:click={sign_up}>Sign up</button>
				<div class="sign-up-social">
					<a href="#" class="social-link"><i class="zmdi zmdi-facebook"></i></a>
					<a href="#" class="social-link"><i class="zmdi zmdi-twitter"></i></a>
					<a href="#" class="social-link"><i class="zmdi zmdi-google"></i></a>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;

	}
	h1 {
		color: #2b2828;
		text-transform: uppercase;
		font-weight: 50;
	}
	.sing-up {
		background: #fff;
		margin-top: 10%;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0,0,0,0.1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.sign-up-content {
		padding: 50px;
		/* center content inside */

	}
	.sign-up-button{
		background: #2b2828;
		color: #fff;
		border: none;
		outline: none;
		border-radius: 20px;
		padding: 10px 20px;
		cursor: pointer;
		width: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>