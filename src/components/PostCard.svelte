<script lang="ts">
	import { magneticHover } from "./../utils/magneticHover.ts";
	import FormattedDate from "./FormattedDate.svelte";

	export let image: string | undefined;
	export let href: string;
	export let title: string;
	export let pubDate: Date;
	export let isFull: boolean = false;

	let hoverParent: HTMLElement;
	let imageBoundingRect: DOMRect;
	$: initTranslate = {
		x: imageBoundingRect?.width * -0.5,
		y: imageBoundingRect?.height * (-2 / 3),
	};
	$: console.log(imageBoundingRect);
</script>

<li
	class={`relative max-w-fit mx-auto group flex items-center justify-center ${
		isFull ? "md:col-span-2" : ""
	}`}
>
	<div
		class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center w-full h-5/6 transition-all"
	>
		<img
			class="group-hover:rounded-3xl rounded-2xl border-2 blur-xl opacity-15 w-full h-full ease-in-out -mb-full"
			src={image ?? `/blog_placeholder${(title?.length % 4) + 1}-.jpg`}
			alt=""
			bind:contentRect={imageBoundingRect}
			use:magneticHover={{
				strength: { x: 0.25, y: 0.25 },
				hoverParent: hoverParent,
				duration: 4,
				opacity: { hover: 0.5, init: 0.15, duration: 2 },
				scale: { hover: 1.1, init: 1, duration: 1 },
			}}
		/>
	</div>
	<a
		{href}
		use:magneticHover={{
			strength: { x: isFull ? 0.1 : 0.15, y: isFull ? 0.1 : 0.15 },
		}}
		bind:this={hoverParent}
		class={`z-10 mx-auto w-fit ${isFull ? "md:text-center" : ""}`}
	>
		<img
			style="grid-area: 1 / 1"
			class="rounded-xl border-2 border-black/5 z-10"
			width={720}
			height={360}
			src={image ?? `/blog_placeholder${(title?.length % 4) + 1}-.jpg`}
			alt=""
		/>
		<h4 class={`${isFull ? "md:text-3xl text-xl" : "text-xl"} font-bold`}>
			{title}
		</h4>
		<p class="text-white/75">
			<FormattedDate date={pubDate} />
		</p>
	</a>
</li>
