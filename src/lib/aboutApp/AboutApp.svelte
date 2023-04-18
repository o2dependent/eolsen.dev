<script lang="ts">
	import { fade } from 'svelte/transition';
	import EOSIcon from './EOSIcon.svelte';
	import Window from '$lib/window/Window.svelte';
	import type { AppWindow } from '$stores/apps.store';
	import OverviewPanel from './panels/OverviewPanel.svelte';
	import AboutPanel from './panels/AboutPanel.svelte';
	import { onMount } from 'svelte';

	export let appWindow: AppWindow;
	type AboutActiveTabs = 'Overview' | 'About' | 'Contact';
	const tabs: AboutActiveTabs[] = ['Overview', 'About', 'Contact'];
	let activeTab: AboutActiveTabs = 'Overview';
	let defaultPosition: { x: number; y: number } | null = null;

	onMount(() => {
		defaultPosition = {
			x: window.innerWidth / 2 - 280,
			y: window.innerHeight / 2 - 166 - 128
		};
	});
</script>

{#if defaultPosition}
	<!-- content here -->
	<Window
		{defaultPosition}
		startingHeight="332px"
		startingWidth="560px"
		headerClass="!bg-[rgb(48,45,51)] !shadow !border-b !border-black"
		windowClass="!ring-[2px] !ring-inset !ring-[rgb(5,9,12)] !border-white/10 !border !resize-none"
		{appWindow}
	>
		<div slot="header" class="flex w-full items-center justify-center pr-14">
			<div
				class="flex items-center justify-center gap-[1px] overflow-hidden rounded-md border border-slate-700 opacity-75 hover:opacity-100 "
			>
				{#each tabs as item, i}
					<button
						on:click|preventDefault|stopPropagation={() => (activeTab = item)}
						class="flex rounded px-1 text-center text-sm text-slate-500 {activeTab === item
							? 'bg-[#3F3C44] text-white'
							: ''}"
					>
						{item}
					</button>
					{#if i < 2}
						<div class="h-3 w-[1px] bg-[#3F3C44]" />
					{/if}
				{/each}
			</div>
		</div>
		<div class="relative flex h-full w-full flex-col bg-[#1E1B24]">
			{#key activeTab}
				<div
					in:fade={{ duration: 75 }}
					out:fade={{ duration: 75 }}
					class="absolute flex h-full w-full flex-grow flex-col"
				>
					{#if activeTab === 'Overview'}
						<OverviewPanel />
					{:else if activeTab === 'About'}
						<AboutPanel />
					{:else if activeTab === 'Contact'}
						<h1>Contact</h1>
					{/if}
					<p class="pb-1 text-center text-[10px] text-white/20">
						{new Date().getFullYear()} Ethan Olsen Development
					</p>
				</div>
			{/key}
		</div>
	</Window>
{/if}
