<script>
	import CurrentTime from './CurrentTime.svelte';
	import TimeNotifications from './TimeNotifications.svelte';
</script>

<div id="desktop-top-right" class="flex h-full items-center">
	<TimeNotifications />
</div>

<style lang="postcss">
	#desktop-top-right > div {
		@apply relative h-6;
	}
	#desktop-top-right > div > button {
		@apply h-full rounded bg-white bg-opacity-0 px-3 py-0.5 text-left text-opacity-50 transition-colors;
	}
	#desktop-top-right > div > button.active {
		@apply bg-opacity-25 text-opacity-100;
	}
	.dropdown {
		@apply absolute left-0 top-full z-50 flex min-w-[10rem] flex-col rounded-lg border border-neutral-700 bg-neutral-800/80 p-1 backdrop-blur-md;
	}
	.dropdown > button {
		@apply w-full rounded px-2 text-left hover:bg-blue-500 hover:text-white;
	}
</style>
