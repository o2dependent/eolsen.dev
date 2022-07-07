import { writable } from 'svelte/store';

interface AppWindow {
	id: string;
}

interface App {
	name: 'Terminal' | 'Project';
	windows: AppWindow[];
}

interface Desktop {
	openApps: App[];
}

export const desktop = writable<Desktop>({openApps: [{name: 'Terminal', windows: []}]});
