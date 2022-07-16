import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$stores: './src/stores',
			'$stores/*': './src/stores/*',
			$utils: './src/utils',
			'$utils/*': './src/utils/*'
		}
	},

	extensions: ['.svelte', '.md', '.svx'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		sveltePreprocess({
			postcss: true
		}),
		mdsvex({
			extensions: ['.md']
		})
	]
};

export default config;
