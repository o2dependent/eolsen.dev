<script lang="ts">
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	const formatTime = () => format(new Date(), 'EEE MMM d p');

	let currentTime = formatTime();

	onMount(() => {
		setInterval(() => {
			currentTime = formatTime();
		}, 1000);
	});
</script>

{currentTime}
