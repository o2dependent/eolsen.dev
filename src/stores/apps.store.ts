import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

export type AppNames = 'Terminal' | 'Project' | 'Blog' | 'About Site' | 'Pixel Paint' | 'Settings';
export interface AppWindow {
	id: string;
	name: AppNames;
	component?: SvelteComponent;
}

export type Apps = AppWindow[];

export const apps = writable<Apps>([
	{ id: 'init-terminal', name: 'Terminal' },
	{ id: 'about-site', name: 'About Site' }
]);

function generateUUID() {
	const buf = new Uint8Array(16);
	window.crypto.getRandomValues(buf);
	buf[6] = (buf[6] & 0x0f) | 0x40; // set version number to 4
	buf[8] = (buf[8] & 0x3f) | 0x80; // set variant number to RFC4122
	const hex = Array.prototype.map.call(buf, (x) => ('00' + x.toString(16)).slice(-2)).join('');
	return `${hex.substr(0, 8)}-${hex.substr(8, 4)}-4${hex.substr(12, 3)}-8${hex.substr(
		16,
		3
	)}-${hex.substr(20, 12)}`;
}

export const addOrFocusApp = (appName: AppNames) => {
	apps.update((oldApps) => {
		const app = oldApps.find((app) => app.name === appName);
		if (app) {
			return [...oldApps.filter((app) => app.name !== appName), app];
		}
		const appWindow: AppWindow = { id: generateUUID(), name: appName };
		return [...oldApps, appWindow];
	});
};

export const addApp = (appName: AppNames) => {
	const appWindow: AppWindow = { id: generateUUID(), name: appName };
	apps.update((oldApps) => {
		return [...oldApps, appWindow];
	});
};

export const removeApp = (appKey: AppNames, appId: string) => {
	apps.update((oldApps) => {
		console.log({ oldApps, appKey, appId });
		return oldApps.filter((app) => app.id !== appId);
	});
};

export const focusApp = (appId: string) => {
	apps.update((oldApps) => {
		const app = oldApps.find((app) => app.id === appId);
		if (app) {
			return [...oldApps.filter((app) => app.id !== appId), app];
		}
		return oldApps;
	});
};
