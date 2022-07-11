<script lang="ts">
	import type { AppNames } from '$stores/apps.store';
	import ProjectIcon from './ProjectIcon.svelte';
	import TerminalIcon from './TerminalIcon.svelte';

	export let appKey: AppNames | string;
</script>

{#if appKey === 'Terminal'}
	<TerminalIcon />
{:else if appKey === 'Project'}
	<ProjectIcon />
{:else}
	<TerminalIcon />
{/if}
