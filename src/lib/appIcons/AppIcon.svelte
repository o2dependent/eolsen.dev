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
{:else}
	<TerminalIcon />
{/if}
