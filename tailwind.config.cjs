const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			scrollbar: ['rounded']
		}
	},

	plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
	variants: {}
};

module.exports = config;
