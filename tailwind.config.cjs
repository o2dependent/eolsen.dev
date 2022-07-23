const config = {
	content: ['./src/**/*.{html,js,svelte,ts,svx,md}'],

	theme: {
		extend: {
			scrollbar: ['rounded']
		}
	},

	plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
	variants: {}
};

module.exports = config;
