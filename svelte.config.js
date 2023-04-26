import adapter from '@sveltejs/adapter-netlify';
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';
import { importAssets } from 'svelte-preprocess-import-assets';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			edge: false,
			split: false
		}),
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
		importAssets(),
		sveltePreprocess({
			postcss: true,
			typescript: true
		}),
		mdsvex({
			extensions: ['.md', '.svx']
		})
	]
};

export default config;
