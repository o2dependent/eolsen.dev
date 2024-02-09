<script lang="ts">
	import FormattedDate from "./FormattedDate.svelte";

	export let image: string | undefined;
	export let href: string;
	export let title: string;
	export let pubDate: Date;
	export let isFull: boolean = false;
</script>

<li class={`flex items-center justify-center ${isFull ? "md:col-span-2" : ""}`}>
	<a class={`group mx-auto w-fit ${isFull ? "md:text-center" : ""}`} {href}>
		<img
			style="grid-area: 1 / 1"
			class="rounded-xl border-2 border-black/5 z-10 group-hover:-translate-y-1 transition-transform duration-500 ease-in-out"
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
