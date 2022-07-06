const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			scrollbar: ['rounded']
		}
	},

	plugins: [require('tailwind-scrollbar')],
	variants: {}
};

module.exports = config;
