<script lang="ts">
	import Window from '$lib/window/Window.svelte';
	import type { AppWindow } from '$stores/apps.store';

	export let appWindow: AppWindow;
	type AboutActiveTabs = 'Overview' | 'About' | 'Contact';
	const tabs: AboutActiveTabs[] = ['Overview', 'About', 'Contact'];
	let activeTab: AboutActiveTabs = 'Overview';
</script>

<Window
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
						? 'bg-slate-700 text-white'
						: ''}"
				>
					{item}
				</button>
				{#if i < 2}
					<div class="h-3 w-[1px] bg-slate-500" />
				{/if}
			{/each}
		</div>
	</div>
	<div class="flex h-full w-full flex-col bg-[rgb(29,26,37)]">
		{#if activeTab === 'Overview'}
			<div class="flex flex-grow items-center justify-center gap-12">
				<div
					class="h-32 w-32 rounded-full bg-gradient-to-tr from-purple-900 to-purple-700 ring-[0.375rem] ring-white"
				/>
				<div class="flex gap-4">
					<div class="flex flex-col">
						<h1 class="text-3xl font-medium">
							olsenOS <span class="font-extralight">Monterey</span>
						</h1>
						<p class="text-xs font-light">Version 1.0</p>
					</div>
				</div>
			</div>
		{:else if activeTab === 'About'}
			<h1>About</h1>
		{:else if activeTab === 'Contact'}
			<h1>Contact</h1>
		{/if}
	</div>
</Window>
