<script lang="ts">
	import {
		magneticHover,
		type MagneticHoverOptions,
	} from "$utils/magneticHover.ts";
	import { cursorFlow } from "$utils/cursorFlow.ts";

	export let href: string;
	export let mag: MagneticHoverOptions = {
		strength: { x: 0.2, y: 0.2 },
	};
	export let ref: HTMLElement | undefined = undefined;

	let zIndex = "";
</script>

<a
	on:mouseenter={() => (zIndex = "50")}
	on:mouseleave={() => (zIndex = "")}
	style:z-index={zIndex}
	use:cursorFlow
	use:magneticHover={mag}
	{href}
	bind:this={ref}
	{...$$restProps}
>
	<slot />
</a>
