<script>
	import { fade } from 'svelte/transition';
	import AppBar from '$lib/appbar/AppBar.svelte';
	import DesktopApps from '$lib/desktopApps/DesktopApps.svelte';
	import DesktopTop from '$lib/desktopTop/DesktopTop.svelte';
	import { onMount } from 'svelte';

	export let loaded = false;

	let isMobile = false;

	onMount(() => {
		isMobile = window.innerWidth < 768;
	});
</script>

{#if isMobile}
	<div
		in:fade
		out:fade
		class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-4 shadow-2xl backdrop-blur"
	>
		<div class="flex flex-col gap-2 rounded-xl bg-black p-4">
			<h1 class="text-2xl font-black">Sorry!</h1>
			<p class="text-lg">
				This site is not yet optimized for mobile devices. Please still check it out, but if you run
				into issues please don't yell at me. I'm working on it.
			</p>
			<button
				class="ml-auto rounded border border-green-500 px-4 py-1 text-green-500"
				on:click={() => (isMobile = false)}>Continue</button
			>
		</div>
	</div>
{/if}

<img
	on:load={() => (loaded = true)}
	class="fixed left-0 top-0 -z-50 h-full w-full object-cover"
	src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&q=80"
	alt="Desktop Background"
/>
<div class="flex h-full flex-col">
	<DesktopTop />
	<div id="desktop" class="flex-grow">
		<div class="container mx-auto">
			<DesktopApps />
		</div>
	</div>
	<AppBar />
</div>
