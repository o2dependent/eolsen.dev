import { fontFamily } from "tailwindcss/defaultTheme";

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
			colors: {
				border: {
					DEFAULT: "hsl(var(--border-card))",
					input: "hsl(var(--border-input))",
					"input-hover": "hsl(var(--border-input-hover))",
				},
				background: {
					DEFAULT: "hsl(var(--background) / <alpha-value>)",
					alt: "hsl(var(--background-alt) / <alpha-value>)",
				},
				foreground: {
					DEFAULT: "hsl(var(--foreground) / <alpha-value>)",
					alt: "hsl(var(--foreground-alt) / <alpha-value>)",
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground))",
				},
				dark: {
					DEFAULT: "hsl(var(--dark) / <alpha-value>)",
					4: "hsl(var(--dark-04))",
					10: "hsl(var(--dark-10))",
					40: "hsl(var(--dark-40))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
				},
				contrast: {
					DEFAULT: "hsl(var(--contrast) / <alpha-value>)",
				},
			},
			fontFamily: {
				sans: ["StudioFeixenSans", ...fontFamily.sans],
				mono: ["StudioFeixenMono", "Source Code Pro", ...fontFamily.mono],
				alt: ["Courier", ...fontFamily.sans],
				edgy: ["StudioFeixenEdgy", ...fontFamily.sans],
			},
			fontSize: {
				xxs: "10px",
			},
			borderWidth: {
				6: "6px",
			},
			borderRadius: {
				card: "16px",
				"card-lg": "20px",
				"card-sm": "10px",
				input: "9px",
				button: "5px",
				"5px": "5px",
				"9px": "9px",
				"10px": "10px",
				"15px": "15px",
			},
			height: {
				input: "3rem",
				"input-sm": "2.5rem",
			},
			boxShadow: {
				mini: "var(--shadow-mini)",
				"mini-inset": "var(--shadow-mini-inset)",
				popover: "var(--shadow-popover)",
				kbd: "var(--shadow-kbd)",
				btn: "var(--shadow-btn)",
				card: "var(--shadow-card)",
				"date-field-focus": "var(--shadow-date-field-focus)",
			},
			opacity: {
				8: "0.08",
			},
			scale: {
				80: ".80",
				98: ".98",
				99: ".99",
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
