<script lang="ts">
	import { VHSApp } from "./VHSApp.ts";
	import { onMount } from "svelte";

	onMount(() => {
		const canvas = document.getElementById(
			"babylon-canvas",
		) as HTMLCanvasElement | null;
		if (!canvas) return;

		const app = new VHSApp(canvas);
		app.setup();
	});
</script>

<canvas
	style="width: 100%; height: 100vh;"
	id="babylon-canvas"
	width="100%"
	height="100vh"
></canvas>
