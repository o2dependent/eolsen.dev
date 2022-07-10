import { writable } from 'svelte/store';

export type AppNames = 'Terminal' | 'Project' | 'Settings';
export interface AppWindow {
	id: string;
}

export type Apps = Record<AppNames, AppWindow[]>;

export const apps = writable<Apps>({
	Terminal: [],
	Project: [],
	Settings: []
});

export const addApp = (appKey: AppNames) => {
	const appWindow: AppWindow = { id: new Date().toISOString() };
	apps.update((oldApps) => {
		return {
			...oldApps,
			[appKey]: [...oldApps[appKey], appWindow]
		};
	});
};

export const removeApp = (appKey: AppNames, appId: string) => {
	apps.update((oldApps) => {
		console.log({ oldApps, appKey, appId });
		return {
			...oldApps,
			[appKey]: oldApps[appKey].filter((app) => app.id !== appId)
		};
	});
};
