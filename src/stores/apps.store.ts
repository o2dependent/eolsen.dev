import { writable } from 'svelte/store';

export type AppNames = 'Terminal' | 'Project' | 'About Site' | 'Settings';
export interface AppWindow {
	id: string;
	name: AppNames;
}

export type Apps = AppWindow[];

export const apps = writable<Apps>([{ id: 'init-terminal', name: 'Terminal' }]);

export const addApp = (appName: AppNames) => {
	const appWindow: AppWindow = { id: new Date().toISOString(), name: appName };
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
