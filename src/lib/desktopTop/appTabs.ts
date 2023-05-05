import { type AppNames, apps, addApp } from '$stores/apps.store';
import { writable } from 'svelte/store';

export const activeTab = writable('');

export interface Tab {
	name: string;
	content: {
		name: string;
		onClick: () => void;
	}[];
}

export type AppTabs = Record<AppNames, Tab[]>;

export const removeAppsByName = (appName: AppNames) => {
	apps.update((apps) => {
		const newApps = apps.filter((app) => app.name !== appName);
		console.log({
			newApps
		});
		return newApps;
	});
	activeTab.set('');
};

export const appTabs: AppTabs = {
	Terminal: [
		{
			name: 'Terminal',
			content: [
				{
					name: 'Add Window',
					onClick: () => {
						addApp('Terminal');
					}
				},
				{
					name: 'Quit',
					onClick: () => {
						removeAppsByName('Terminal');
					}
				}
			]
		}
	],
	'About Site': [],
	Project: [
		{
			name: 'Project',
			content: [
				{
					name: 'Add Window',
					onClick: () => {
						addApp('Project');
					}
				},
				{
					name: 'Quit',
					onClick: () => {
						removeAppsByName('Project');
					}
				}
			]
		}
	],
	Blog: [
		{
			name: 'Blog',
			content: [
				{
					name: 'Add Window',
					onClick: () => {
						addApp('Blog');
					}
				},
				{
					name: 'Quit',
					onClick: () => {
						removeAppsByName('Blog');
					}
				}
			]
		}
	],
	'Pixel Paint': [
		{
			name: 'Pixel Paint',
			content: [
				{
					name: 'Add Window',
					onClick: () => {
						addApp('Pixel Paint');
					}
				},
				{
					name: 'Quit',
					onClick: () => {
						removeAppsByName('Pixel Paint');
					}
				}
			]
		}
	],
	Settings: []
};
