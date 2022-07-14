import { writable } from 'svelte/store';
import type { AppNames } from './apps.store';

export interface DirectoryFile {
	open: AppNames;
	data: any;
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
							id: 'SvelteKit.proj'
						}
					},
					'FuckKit.proj': {
						name: 'FuckKit.proj',
						open: 'Project',
						data: {
							id: 'FuckKit.proj'
						}
					}
				}
			}
		}
	}
});
