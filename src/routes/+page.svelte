<body>
	<div class="main-page">
		<div class="main-page-navigation">
			<ul>
				<li>
					<a href="#">
						<span class="icon">
							<ion-icon name="heart" />
						</span>
						<span class="title">Home</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span class="icon">
							<i class="fas fa-home" />
						</span>
						<span class="title">Home</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span class="icon">
							<i class="fas fa-home" />
						</span>
						<span class="title">Home</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span class="icon">
							<i class="fas fa-home" />
						</span>
						<span class="title">Home</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="main-page-header">
			<h1>My App</h1>
			<a href="/login">Login</a>
		</div>
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
	}
	/* https://www.youtube.com/watch?v=nUUsUAPEjFc */
</style>
