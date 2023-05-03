<script>
	import { fade, fly } from 'svelte/transition';
	import AppBar from '$lib/appbar/AppBar.svelte';
	import DesktopApps from '$lib/desktopApps/DesktopApps.svelte';
	import DesktopTop from '$lib/desktopTop/DesktopTop.svelte';
	import { onMount } from 'svelte';

	export let loaded = false;

	let isMobile = false;
	let wipAcknowledge = false;

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

{#if !wipAcknowledge}
	<div
		in:fly={{ x: 250, duration: 250 }}
		out:fly={{ x: 250, duration: 250 }}
		class="group fixed right-4 top-8 z-50 flex w-64 flex-col gap-2 rounded-2xl border border-white/30 bg-black/40 p-4 backdrop-blur"
	>
		<h1 class="text-lg">Work in Progress ahead!</h1>
		<p class="text-sm">
			I'm still working on getting this site working just how I'd like it. Please excuse the mess
			and check back later for more!
		</p>
		<button
			class="absolute -left-2 -top-2 ml-auto rounded-full border border-white/30 bg-neutral-800 p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
			on:click={() => (wipAcknowledge = true)}
			><svg
				width="16"
				height="16"
				xmlns="http://www.w3.org/2000/svg"
				class="ionicon"
				viewBox="0 0 512 512"
				><path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M368 368L144 144M368 144L144 368"
				/></svg
			></button
		>
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
