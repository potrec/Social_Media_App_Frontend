<body>
	<div class="main-page">
		<div class="main-page-navigation">
			<ul>
				<li>
					<a href="#">
						<span class="icon">
							<ion-icon name="home" />
						</span>
						<span class="title">Forum dla koksów</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span class="icon">
							<ion-icon name="home" />
						</span>
						<span class="title">Dashboard</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span class="icon">
							<ion-icon name="people" />
						</span>
						<span class="title">Friends</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span class="icon">
							<ion-icon name="chatbubble-ellipses" />
						</span>
						<span class="title">Message</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span class="icon">
							<ion-icon name="person" />
						</span>
						<span class="title">Profile</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span class="icon">
							<ion-icon name="log-out" />
						</span>
						<span class="title">Sign Out</span>
					</a>
				</li>
			</ul>
		</div>
		<!-- <div class="main-page-header">
			<h1>My App</h1>
			<a href="/login">Login</a>
		</div> -->
	</div>
</body>
<svelte:head>
	<script src="https://unpkg.com/ionicons@5.1.2/dist/ionicons.js"></script>
</svelte:head>

<style>
	:root {
		--blue: #1e90ff;
		--light-blue: #87ceeb;
		--dark-blue: #00008b;
		--white: #fff;
		--black: #000;
		--gray: #808080;
		--light-gray: #d3d3d3;
		--dark-gray: #a9a9a9;
	}
	body {
		min-height: 100vh;
		overflow-x: hidden;
	}
	.main-page {
		position: relative;
		width: 100%;
	}
	.main-page-navigation {
		position: fixed;
		width: 300px;
		height: 100%;
		background-color: var(--blue);
		border-left: 10px solid var(--blue);
		transition: 0.5s;
		overflow: hidden;
	}
	.main-page-navigation ul {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.main-page-navigation ul li {
		position: relative;
		width: 200%;
		list-style: none;
		border-top-left-radius: 30px;
		border-bottom-left-radius: 30px;
	}
	.main-page-navigation ul li:hover {
		background-color: var(--white);
	}
	.main-page-navigation ul li:nth-child(1) {
		margin-bottom: 40px;
		pointer-events: none;
	}
	.main-page-navigation ul li a {
		position: relative;
		display: block;
		width: 100%;
		display: flex;
		text-decoration: none;
		color: var(--white);
	}
	.main-page-navigation ul li:hover a {
		color: var(--blue);
	}
	.main-page-navigation ul li a .icon {
		position: relative;
		display: block;
		min-height: 60px;
		width: 60px;
		line-height: 60px;
		text-align: center;
	}
	.main-page-navigation ul li a .title {
		position: relative;
		display: block;
		padding: 0 10px;
		height: 60px;
		line-height: 60px;
	}
	.main-page-navigation ul li:hover a::before {
		content: '';
		position: absolute;
		right: 0;
		top: -50px;
		width: 50px;
		height: 50px;
		background: #f00;
		border-radius: 50%;
		box-shadow: 35px 35px 0px var(--white);
	}

	/* https://www.youtube.com/watch?v=nUUsUAPEjFc */
</style>
