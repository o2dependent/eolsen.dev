<script lang="ts">
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	let currentTime = format(new Date(), 'EEE MMM d h:mm b');

	onMount(() => {
		setInterval(() => {
			currentTime = format(new Date(), 'EEE MMM d h:mm b');
		}, 1000);
	});
</script>

{currentTime}
