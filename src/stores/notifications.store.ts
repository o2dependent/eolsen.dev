import { writable } from 'svelte/store';
import { addOrFocusApp, type AppNames } from './apps.store';

export interface Notification {
	id: string;
	title: string;
	description: string;
	appKey: AppNames;
	pinned?: boolean;
	onClick?: () => void;
	dismissOnClick?: boolean;
}

export const dismissNotification = (id: string) => {
	notifications.update((notifications) => {
		const newNotifications = notifications.filter((notification) => notification.id !== id);
		return newNotifications;
	});
};

export const addNotification = (notification: Notification) => {
	notifications.update((notifications) => {
		const newNotifications = [...notifications, notification];
		return newNotifications;
	});
};

export const notifications = writable<Notification[]>([
	{
		id: 'wip',
		title: `Work in Progress ahead!`,
		description: `I'm still working on getting this site working just right. If you find any bugs, please let me know!`,
		appKey: 'About Site',
		pinned: true,
		onClick: () => {
			addOrFocusApp('About Site');
		},
		dismissOnClick: true
	}
]);
