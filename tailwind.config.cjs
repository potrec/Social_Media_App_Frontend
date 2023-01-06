/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		maxWidth: {
			'1/2': '50%',
			'3/4': '75%',
		},
		extend: {}
	},
	plugins: [require('daisyui')]
};
