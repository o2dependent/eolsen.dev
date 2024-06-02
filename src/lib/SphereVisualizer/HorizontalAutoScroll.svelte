<script lang="ts">
	export let text: string;

	let textClientWidth: number = 0;
	let containerClientWidth: number = 0;
	$: width =
		textClientWidth > containerClientWidth
			? textClientWidth
			: containerClientWidth;
</script>

<div
	bind:clientWidth={containerClientWidth}
	class="w-full h-full overflow-hidden relative grid grid-cols-1 grid-rows-1 place-items-center"
>
	<div
		bind:clientWidth={textClientWidth}
		style="--delay: -5s; --width: {width}px;"
		class="horizontal-auto-scroll-container"
	>
		<p>
			{text}
		</p>
	</div>
	<div
		style="--delay: 0; --width: {width}px;"
		class="horizontal-auto-scroll-container"
	>
		<p>
			{text}
		</p>
	</div>
</div>

<style lang="postcss">
	@keyframes scrollX {
		0% {
			transform: translateX(calc(-1 * var(--width) - var(--gap)));
		}
		100% {
			transform: translateX(var(--width));
		}
	}
	.horizontal-auto-scroll-container {
		--gap: 25%;
		--anim-time: 10s;
		--width: 100%;
		animation: scrollX var(--anim-time) linear infinite;
		animation-delay: var(--delay);
		@apply h-full w-fit will-change-transform absolute top-0 left-0 grid place-items-center;
	}
</style>
