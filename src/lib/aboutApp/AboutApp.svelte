<script lang="ts">
	import { fade } from 'svelte/transition';
	import EOSIcon from './EOSIcon.svelte';
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
		{#if activeTab === 'Overview'}
			<div
				in:fade={{ duration: 100 }}
				out:fade={{ duration: 100 }}
				class="absolute flex h-full w-full flex-grow flex-col"
			>
				<div class="flex flex-grow items-center justify-center gap-12">
					<EOSIcon />
					<div class="flex gap-4">
						<div class="flex flex-col gap-4">
							<div>
								<h1 class="text-3xl font-medium">
									olsenOS <span class="font-extralight">Mint</span>
								</h1>
								<p class="text-xs">Version <span class="font-light">1.0</span></p>
							</div>
							<div class="flex flex-col gap-0.5">
								<p class="text-xs">Ethan Olsen Dev (2022)</p>
								<div class="flex gap-2 text-xs">
									<p>Developer</p>
									<p class="font-light">Full-Stack</p>
								</div>
								<div class="flex gap-2 text-xs">
									<p>Chip</p>
									<p class="font-light">Pringles</p>
								</div>
								<div class="flex gap-2 text-xs">
									<p>Memory</p>
									<p class="font-light">Pretty good</p>
								</div>
								<div class="flex gap-2 text-xs">
									<p>Cereal Number</p>
									<p class="font-light">A lot I guess</p>
								</div>
							</div>
							<div class="flex w-full gap-2">
								<button
									class="flex-grow rounded bg-[#56545C] py-[1px] px-1.5 text-xs text-white"
									type="button"
								>
									System Report
								</button>
								<button
									class="flex-grow rounded bg-[#56545C] py-[1px] px-1.5 text-xs text-white"
									type="button"
								>
									Software Update
								</button>
							</div>
						</div>
					</div>
				</div>
				<p class="pb-1 text-center text-[10px] text-white/20">2022 Ethan Olsen Development</p>
			</div>
		{:else if activeTab === 'About'}
			<div
				in:fade={{ duration: 100 }}
				out:fade={{ duration: 100 }}
				class="absolute flex h-full w-full flex-grow flex-col"
			>
				<h1>About</h1>
			</div>
		{:else if activeTab === 'Contact'}
			<div
				in:fade={{ duration: 100 }}
				out:fade={{ duration: 100 }}
				class="absolute flex h-full w-full flex-grow flex-col"
			>
				<h1>Contact</h1>
			</div>
		{/if}
	</div>
</Window>
