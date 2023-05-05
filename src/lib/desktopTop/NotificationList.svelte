<script>
	import { notifications } from '$stores/notifications.store';
	import NotificationItem from './NotificationItem.svelte';
</script>

<div
	class="fixed right-[1.125rem] top-10 flex w-[21.5rem] cursor-default select-none flex-col gap-2"
>
	{#each $notifications as notification}
		<NotificationItem {notification} />
	{/each}
</div>
