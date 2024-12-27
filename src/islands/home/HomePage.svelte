<script lang="ts">
	import { fly } from "svelte/transition";
	import { intersectionObserver } from "$lib/actions/intersectionObserver";

	let isAboutVisible = false;
</script>

<div
	use:intersectionObserver={{ callback: () => (isAboutVisible = true) }}
	class="prose prose-invert mx-auto flex w-full max-w-4xl flex-col gap-2 px-4 prose-p:opacity-90"
>
	<h2 id="about" class="mb-10 text-5xl md:col-span-2 md:mb-4">About</h2>
	<div class="flex flex-col-reverse gap-2 lg:grid lg:grid-cols-[1fr_11rem]">
		<div class="w-full">
			<div
				class:opacity-100={isAboutVisible}
				class:opacity-50={!isAboutVisible}
				class="m-0 transition-all duration-1000"
			>
				<p>
					I'm a full stack cross platform web developer with a focus on
					developing internal development frameworks and tools to increase
					developer and admin productivity. My primary experience is in UI and
					UX design and development, backend development, and database
					management.
				</p>
				<p>
					Outside of software development, I enjoy making art and music as well
					as skateboarding. I have a passion for learning and creating new
					things. I'm always looking for new projects to work on and new ideas
					to explore. I have a strong interest in the intersection of art and
					technology and how they can be used to create new and interesting
					experiences, which has been my primary focus as a hobby for years.
				</p>
			</div>
		</div>
		<div class="relative my-2 h-44 w-44 md:mr-4">
			{#if isAboutVisible}
				<img
					in:fly={{ x: 100, delay: 500, duration: 1000 }}
					class="absolute -bottom-8 -right-24 h-32 -scale-x-100"
					src="/about_app/lua.png"
					alt=""
				/>
				<img
					in:fly={{ x: 100, delay: 750, duration: 1000 }}
					class="absolute -right-16 -top-20 h-32 -rotate-12 -scale-x-100"
					src="/about_app/omen.png"
					alt=""
				/>
				<img
					in:fly={{ y: 100, delay: 1000, duration: 2000 }}
					class="absolute -top-24 right-1/4 h-40 md:-top-32"
					src="/about_app/lua_standing.png"
					alt=""
				/>
			{/if}
			<div
				class:grayscale={!isAboutVisible}
				class="absolute left-0 top-0 m-0 h-44 w-44 overflow-hidden rounded-xl object-cover ring-4 ring-gray-950 transition-all duration-500"
			>
				<img
					class:scale-[400%]={!isAboutVisible}
					class:-translate-y-24={!isAboutVisible}
					class:translate-x-20={!isAboutVisible}
					class="m-0 h-44 w-44 object-cover object-center transition-all duration-1000"
					src="/about_app/about_photo.jpeg"
					alt="Ethan Olsen and Omen"
					height="11rem"
					width="11rem"
				/>
			</div>
		</div>
	</div>
</div>
<slot name="content" />

<style lang="postcss">
	@keyframes background-shift {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 0% 100%;
		}
	}
	.background-shift {
		animation: background-shift 2s linear infinite;
	}

	@keyframes fly-down {
		0% {
			transform: translateY(-200%);
		}
		60% {
			transform: translateY(10%);
		}
		80% {
			transform: translateY(-5%);
		}
		100% {
			transform: translateY(0%);
		}
	}
	.fly-down {
		transform-origin: center center;
		animation: fly-down 2.25s ease-in-out;
	}
</style>
