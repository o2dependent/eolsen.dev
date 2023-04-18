<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import BootLogo from './BootLogo.svelte';
	export let isShowing = false;
</script>

{#if isShowing}
	<div
		out:fade={{
			duration: 1500
		}}
		class="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black"
	>
		<BootLogo />
	</div>
{/if}
