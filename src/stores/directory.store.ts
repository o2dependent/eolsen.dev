import { writable } from 'svelte/store';
import type { AppNames } from './apps.store';

export interface TextFileData {
	id: string;
	title: string;
	html: string;
}

export interface ProjectFileData {
	id: string;
	title: string;
	html: string;
	projectLink: string;
	githubLink: string;
	tags: string[];
}

export interface DirectoryFile {
	open: AppNames;
	data: ProjectFileData | TextFileData;
}

export interface Directory {
	name: string;
	contents: { [name: string]: Directory | DirectoryFile };
}
export const directory = writable<{ [name: string]: Directory }>({
	Desktop: {
		name: 'Desktop',
		contents: {
			Projects: {
				name: 'Projects',
				contents: {
					'SvelteKit.proj': {
						name: 'SvelteKit.proj',
						open: 'Project',
						data: {
							id: 'SvelteKit.proj',
							title: 'SvelteKit',
							html: '<h1>SvelteKit</h1>',
							projectLink: 'https://kit.svelte.dev',
							githubLink: 'https://github.com/sveltejs/kit',
							tags: ['svelte', 'kit']
						}
					},
					'FuckKit.proj': {
						name: 'FuckKit.proj',
						open: 'Project',
						data: {
							id: 'FuckKit.proj',
							title: 'FuckKit',
							html: '<h1>FuckKit</h1>',
							projectLink: 'https://kit.svelte.dev',
							githubLink: 'https://github.com/sveltejs/kit',
							tags: ['fuck', 'kit']
						}
					}
				}
			}
		}
	}
});
