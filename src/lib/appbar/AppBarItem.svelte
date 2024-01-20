<script lang="ts">
	import { apps, addApp, type AppNames, focusApp } from '$stores/apps.store';
	import { fade } from 'svelte/transition';
	import AppIcon from '$lib/appIcons/AppIcon.svelte';
	import { browser } from '$app/environment';

	export let appKey: string;

	let isHovered: boolean = false;
	$: openApps = $apps.filter((app) => app.name === appKey)?.map((app) => app.id) ?? [];
	let isMouseDown: boolean = false;
	const hasOpenApps = () => $apps.some((app) => app.name === appKey);
	const onAddAppHandler = (appString: string) => () => {
		if (openApps?.length > 0) {
			openApps.forEach(focusApp);
		} else {
			addApp(appString as AppNames);
		}
	};
</script>

<button
	on:auxclick={(e) => {
		if (e?.button === 2) {
		}
	}}
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => ((isHovered = false), (isMouseDown = false))}
	on:click={onAddAppHandler(appKey)}
	on:mousedown={() => (isMouseDown = true)}
	on:mouseup={() => (isMouseDown = false)}
	class="group relative flex flex-col items-center justify-center rounded-lg ring-0 ring-orange-300 ring-opacity-0 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-opacity-75"
>
	<!-- <div class="h-12 w-12 flex items-center justify-center rounded-sm bg-neutral-500">
	</div> -->
	<div
		style="filter: brightness({isMouseDown ? '70%' : '100%'})"
		class:bounce={openApps?.length > 0}
	>
		<AppIcon {appKey} />
	</div>

	{#key openApps}
		{#if hasOpenApps()}
			<div
				in:fade={{ duration: 100 }}
				out:fade={{ duration: 100 }}
				class="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-neutral-300/80"
			/>
		{/if}
	{/key}
	{#if isHovered}
		<p
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
			style="filter: drop-shadow(1px 0 0 rgb(115 115 115)) drop-shadow(-1px 0 0 rgb(115 115 115)) drop-shadow(0 1px 0 rgb(115 115 115)) drop-shadow(0 -1px 0 rgb(115 115 115));"
			class="animat absolute bottom-[4.25rem] left-1/2 w-max -translate-x-1/2 rounded bg-neutral-800 p-0.5 px-2 py-1 text-white before:absolute before:-bottom-1 before:left-1/2 before:h-2 before:w-2 before:-translate-x-1/2 before:rotate-45 before:bg-neutral-800"
		>
			{appKey}
		</p>
	{/if}
</button>

<style lang="postcss">
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-25%);
		}
	}
	.bounce {
		/* animation: bounce 1s 2; */
		animation: bounce 750ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
</style>
