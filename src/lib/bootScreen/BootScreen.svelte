<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import BootLogo from './BootLogo.svelte';
	import { onMount } from 'svelte';

	let bootingUp = true;
	let audio: HTMLAudioElement;

	onMount(() => {
		setTimeout(() => {
			bootingUp = false;
		}, 2650);
	});
</script>

<audio bind:this={audio} src="./boot_up.wav" />
{#if bootingUp}
	<div
		out:fade={{
			duration: 500
		}}
		class="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black"
	>
		<BootLogo {audio} />
	</div>
{/if}
