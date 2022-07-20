<script lang="ts">
	import Window from '$lib/window/Window.svelte';
	import type { AppWindow } from '$stores/apps.store';

	export let appWindow: AppWindow;
	type AboutActiveTabs = 'Overview' | 'About' | 'Contact';
	const tabs: AboutActiveTabs[] = ['Overview', 'About', 'Contact'];
	let activeTab: AboutActiveTabs = 'Overview';
</script>

<Window
	startingHeight="360px"
	startingWidth="560px"
	headerClass="!bg-[rgb(48,45,52)] !shadow"
	windowClass="!ring-[2px] !ring-inset !ring-white/50 !border-[rgb(5,9,12)] !border"
	{appWindow}
>
	<div slot="header" class="flex w-full items-center justify-center pr-14">
		<div
			class="flex items-center justify-center gap-[1px] overflow-hidden rounded-md border border-slate-700 opacity-75 hover:opacity-100 "
		>
			{#each tabs as item, i}
				<button
					on:click|preventDefault|stopPropagation={() => (activeTab = item)}
					class="flex rounded px-1 text-center text-slate-500 {activeTab === item
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
	<div class="h-full w-full bg-[rgb(34,28,38)]">
		{#if activeTab === 'Overview'}
			<h1>Overview</h1>
		{:else if activeTab === 'About'}
			<h1>About</h1>
		{:else if activeTab === 'Contact'}
			<h1>Contact</h1>
		{/if}
	</div>
</Window>
