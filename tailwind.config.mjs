/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			scrollbar: ["rounded"],
			backgroundImage: {
				"light-noise-25": "url(/noise-light-25.png)",
				"light-noise-50": "url(/noise-light-50.png)",
				"light-noise-full": "url(/noise-light-full.png)",
				"dark-noise": "url(/noise-dark.png)",
			},
		},
		fontFamily: {
			mono: ["Roboto Mono", "monospace"],
			roboto: ["Roboto", "sans-serif"],
			cmd: ["VT323", "monospace"],
		},
	},

	plugins: [require("@tailwindcss/typography"), require("tailwind-scrollbar")],
	variants: {},
};
