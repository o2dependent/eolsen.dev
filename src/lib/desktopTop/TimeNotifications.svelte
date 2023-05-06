<script>
	import CurrentTime from './CurrentTime.svelte';
	import NotificationList from './NotificationList.svelte';

	let open = false;
</script>

<button on:click={() => (open = !open)}>
	<CurrentTime />
</button>

<NotificationList {open} />
