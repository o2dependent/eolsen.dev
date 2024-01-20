<script lang="ts">
	import { onMount } from 'svelte';

	const videoIds = [
		'I6v0nhEFUK8',
		'1Bw2dTY3SsQ',
		'dQw4w9WgXcQ',
		'z97qLNXeAMQ',
		'sticXkHxZC4',
		'PO3mri47s7M',
		'W43aQxzjyeM',
		'9QSp53U_-vo'
	];
	let videoId = '';
	onMount(() => {
		videoId = videoIds[Math.floor(Math.random() * videoIds.length)];
	});
</script>

{#if videoId}
	<iframe
		class="h-full w-full"
		width="560"
		height="315"
		src="https://www.youtube.com/embed/{videoId}?controls=0&amp;autoplay=0&amp;loop=1"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	/>
{/if}
