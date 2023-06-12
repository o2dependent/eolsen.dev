<script lang="ts">
	import { expoIn } from 'svelte/easing';
	import { notifications } from '$stores/notifications.store';
	import NotificationItem from './NotificationItem.svelte';

	export let open = false;

	const shrink = (node: HTMLElement) => {
		const { height } = node.getBoundingClientRect();
		return {
			duration: 500,
			css: (t: number) => {
				const eased = expoIn(t);

				return `
					user-select: none;
					height: ${height * eased}px;
					opacity: ${eased};
				`;
			}
		};
	};
</script>

<div class="fixed right-0 top-6 h-8 px-[1.125rem] blur-md" />
<div class="fixed right-[1.125rem] top-10 flex w-[21.5rem] cursor-default select-none flex-col">
	{#each $notifications as notification, idx (notification.id)}
		<div out:shrink class="transition-all duration-75" class:mt-2={idx !== 0}>
			<NotificationItem {notification} {open} />
		</div>
	{/each}
</div>
