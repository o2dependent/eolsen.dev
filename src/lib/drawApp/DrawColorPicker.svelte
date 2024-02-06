<script lang="ts">
	import { fly } from "svelte/transition";
	import { clickOutside } from "$utils/clickOutside";
	import ColorPicker from "svelte-awesome-color-picker";
	export let color: string;

	let open = false;
</script>

<div use:clickOutside={() => (open = false)} class="relative w-6 h-6">
	<button
		type="button"
		on:click={() => (open = !open)}
		class="h-full aspect-square px-1"
	>
		<div
			style="background-color: {color}"
			class="h-full aspect-square rounded-full border border-white/50"
		></div>
	</button>
	{#if open}
		<div
			in:fly={{ y: -4, duration: 350 }}
			out:fly={{ y: -4, duration: 250 }}
			class="absolute top-10 -right-4 w-fit dark"
		>
			<ColorPicker isDark label="" isDialog={false} bind:hex={color} />
		</div>
	{/if}
</div>

<style>
	.dark {
		--cp-bg-color: #0a0a0a;
		--cp-border-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
	}
</style>
