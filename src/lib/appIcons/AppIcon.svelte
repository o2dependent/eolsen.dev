<script lang="ts">
	import type { AppNames } from '$stores/apps.store';
	import BlogIcon from './BlogIcon.svelte';
	import ProjectIcon from './ProjectIcon.svelte';
	import TerminalIcon from './TerminalIcon.svelte';

	export let appKey: AppNames | string;
	export let size: 'small' | 'medium' = 'medium';
</script>

<div class:w-9={size === 'small'} class:w-12={size === 'medium'} class="aspect-square">
	{#if appKey === 'Terminal'}
		<TerminalIcon />
	{:else if appKey === 'Project'}
		<ProjectIcon />
	{:else if appKey === 'Blog'}
		<BlogIcon />
	{:else if appKey === 'Pixel Paint'}
		<div
			class="aspect-square h-full w-full overflow-hidden rounded-lg border-2 border-white bg-white/5 p-1"
		>
			<img
				src="./pixel_paint_icon.png"
				class="w-full"
				style="image-rendering:pixelated;"
				alt="Pixel Paint Icon"
			/>
		</div>
	{:else}
		<div class="aspect-square h-full w-full rounded-full bg-black p-0.5">
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 512 512"
				fill="black"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid meet"
			>
				<mask
					id="mask0_9225_963"
					style="mask-type:alpha"
					maskUnits="userSpaceOnUse"
					x="31"
					y="31"
					width="449"
					height="449"
				>
					<circle cx="255.5" cy="255.5" r="224.5" fill="#F8FAFC" stroke="white" />
				</mask>
				<g mask="url(#mask0_9225_963)">
					<rect x="77" y="384" width="357" height="55" fill="white" />
					<rect x="77" y="69" width="357" height="55" fill="white" />
					<rect x="31" y="233" width="253" height="55" fill="white" />
				</g>
			</svg>
		</div>
	{/if}
</div>
