<script lang="ts">
	import {
		magneticHover,
		type MagneticHoverOptions,
	} from "$utils/magneticHover";
	import { cursorFlow } from "$utils/cursorFlow";

	const DEFAULT_MAG: MagneticHoverOptions = {
		strength: { x: 0.2, y: 0.2 },
	};

	export let href: string;
	export let mag: MagneticHoverOptions = DEFAULT_MAG;
	export let ref: HTMLElement | undefined = undefined;
	export let blendDifference = true;

	let zIndex = "";
</script>

<a
	data-blend-difference={blendDifference}
	on:mouseenter={() => (zIndex = "40")}
	on:mouseleave={() => (zIndex = "")}
	style:z-index={zIndex}
	use:cursorFlow
	use:magneticHover={{ ...DEFAULT_MAG, ...mag }}
	{href}
	bind:this={ref}
	{...$$restProps}
>
	<slot />
</a>
