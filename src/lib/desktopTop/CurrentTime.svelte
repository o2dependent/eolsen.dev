<script lang="ts">
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	let currentTime = format(new Date(), 'EEE MMM d h:mm p');

	onMount(() => {
		setInterval(() => {
			currentTime = format(new Date(), 'EEE MMM d h:mm p');
		}, 1000);
	});
</script>

{currentTime}
