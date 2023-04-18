<script lang="ts">
	import type { AppNames } from '$stores/apps.store';
	import BlogIcon from './BlogIcon.svelte';
	import ProjectIcon from './ProjectIcon.svelte';
	import TerminalIcon from './TerminalIcon.svelte';

	export let appKey: AppNames | string;
</script>

{#if appKey === 'Terminal'}
	<TerminalIcon />
{:else if appKey === 'Project'}
	<ProjectIcon />
{:else if appKey === 'Blog'}
	<BlogIcon />
{:else if appKey === 'Pixel Paint'}
	<div class="h-12 w-12 overflow-hidden rounded-lg border-2 border-white bg-white/5 p-1">
		<img
			src="./pixel_paint_icon.png"
			class="w-full"
			style="image-rendering:pixelated;"
			alt="Pixel Paint Icon"
		/>
	</div>
{:else}
	<TerminalIcon />
{/if}
