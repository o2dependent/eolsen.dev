<script lang="ts">
	import type { ProjectFileData } from "$stores/directory.store";
	import rehypeStringify from "rehype-stringify";
	import remarkParse from "remark-parse";
	import remarkRehype from "remark-rehype";
	import { unified } from "unified";

	export let scrollContainer: HTMLDivElement;
	export let curProject: ProjectFileData & { name: string };

	let file: Awaited<ReturnType<(typeof unified)["process"]>>;
	$: {
		unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeStringify)
			.process(curProject.body)
			.then((f) => (file = f));
	}
	const resetScroll = () => {
		scrollContainer.scrollTo(0, 0);
	};

	$: curProject && resetScroll();
</script>

<div class="prose prose-invert mb-4 w-full border-b border-slate-600 pb-2">
	<h1 class="heading !m-0 !w-fit pb-2 !text-5xl !font-black !text-white">
		{curProject?.title}
	</h1>
	<div class="flex w-full">
		<div class="flex flex-grow gap-2">
			{#each curProject.tags as tag}
				<button
					type="button"
					class="inline-flex h-6 items-center justify-center rounded-full bg-slate-700 px-2 text-sm text-white text-opacity-50 transition-colors hover:text-opacity-100"
				>
					{tag}
				</button>
			{/each}
		</div>
		<div class="flex gap-4">
			<a
				href={curProject?.githubLink ?? ""}
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 32 32"
					fill="none"
				>
					<path
						d="M16 0C7.16533 0 0 7.164 0 16C0 23.0693 4.584 29.0667 10.9427 31.1827C11.7413 31.3307 12 30.8347 12 30.4133V27.4347C7.54933 28.4027 6.62267 25.5467 6.62267 25.5467C5.89467 23.6973 4.84533 23.2053 4.84533 23.2053C3.39333 22.212 4.956 22.2333 4.956 22.2333C6.56267 22.3453 7.408 23.8827 7.408 23.8827C8.83467 26.328 11.1507 25.6213 12.064 25.212C12.2067 24.1787 12.6213 23.472 13.08 23.0733C9.52667 22.6667 5.79067 21.2947 5.79067 15.1653C5.79067 13.4173 6.416 11.9907 7.43867 10.8707C7.27333 10.4667 6.72533 8.83867 7.59467 6.636C7.59467 6.636 8.93867 6.20667 11.996 8.276C13.272 7.92133 14.64 7.744 16 7.73733C17.36 7.744 18.7293 7.92133 20.008 8.276C23.0627 6.20667 24.404 6.636 24.404 6.636C25.2747 8.84 24.7267 10.468 24.5613 10.8707C25.588 11.9907 26.208 13.4187 26.208 15.1653C26.208 21.3107 22.4653 22.664 18.9027 23.06C19.476 23.556 20 24.5293 20 26.0227V30.4133C20 30.8387 20.256 31.3387 21.068 31.1813C27.4213 29.0627 32 23.0667 32 16C32 7.164 24.836 0 16 0Z"
						fill="currentColor"
					/>
				</svg>
			</a>
			<a
				href={curProject?.projectLink ?? ""}
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.8281 10.172C13.078 9.4221 12.0607 9.00084 11.0001 9.00084C9.93942 9.00084 8.92219 9.4221 8.17208 10.172L4.17208 14.172C3.79004 14.541 3.48531 14.9823 3.27567 15.4704C3.06604 15.9584 2.95569 16.4833 2.95108 17.0144C2.94646 17.5455 3.04767 18.0722 3.24879 18.5638C3.44992 19.0554 3.74693 19.502 4.1225 19.8776C4.49807 20.2531 4.94468 20.5501 5.43626 20.7513C5.92785 20.9524 6.45457 21.0536 6.98569 21.049C7.5168 21.0444 8.04168 20.934 8.5297 20.7244C9.01771 20.5148 9.45909 20.21 9.82808 19.828L10.9301 18.727M10.1721 13.828C10.9222 14.5779 11.9394 14.9991 13.0001 14.9991C14.0607 14.9991 15.078 14.5779 15.8281 13.828L19.8281 9.82798C20.5567 9.07357 20.9599 8.06316 20.9508 7.01438C20.9417 5.96559 20.521 4.96234 19.7794 4.22071C19.0377 3.47907 18.0345 3.0584 16.9857 3.04928C15.9369 3.04017 14.9265 3.44335 14.1721 4.17198L13.0721 5.27198"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</a>
		</div>
	</div>
</div>
<div class="prose prose-invert w-full">
	{@html file?.value ?? ""}
</div>
