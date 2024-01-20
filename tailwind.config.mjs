/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			scrollbar: ["rounded"],
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
