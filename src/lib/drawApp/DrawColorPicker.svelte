<script lang="ts">
	import { clickOutside } from "$utils/clickOutside";
	import ColorPicker from "svelte-awesome-color-picker";
	export let color: string;

	let open = false;
</script>

<div class="relative w-full">
	<button
		type="button"
		on:click={() => (open = true)}
		class="w-full aspect-square px-1"
	>
		<div
			style="background-color: {color}"
			class="w-full aspect-square rounded-full border border-black/50"
		></div>
	</button>
	{#if open}
		<div
			use:clickOutside={() => (open = false)}
			class="absolute bottom-0 left-full"
		>
			<ColorPicker label="" isDialog={false} bind:hex={color} />
		</div>
	{/if}
</div>
