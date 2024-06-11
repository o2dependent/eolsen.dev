<script lang="ts">
	import TerminalBase from "$lib/terminal/TerminalBase.svelte";
	import type { TerminalLine } from "$lib/terminal/terminal";
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import { intersectionObserver } from "$lib/actions/intersectionObserver";
	import Header from "$lib/Header/Header.svelte";
	import type { DirectoryFile } from "$stores/directory.store";
	// @ts-ignore
	import { navigate } from "astro:transitions/client";
	import GlitchText from "./GlitchText.svelte";

	let execute: (command: string) => void;
	let lines: TerminalLine[] = [
		{
			class: "bg-clip-text text-transparent rainbow font-bold",
			text:
				"    __  __       __ __             ____ _                              \n" +
				"   / / / /___   / // /____        /  _/( )____ ___                     \n" +
				"  / /_/ // _ \\ / // // __ \\       / /  |// __ `__ \\                    \n" +
				" / __  //  __// // // /_/ /_    _/ /    / / / / / /                    \n" +
				"/_/ /_/ \\___//_//_/ \\____/( )  /___/   /_/ /_/ /_/                     \n" +
				"    ______ __   __        |/           ____   __                    __ \n" +
				"   / ____// /_ / /_   ____ _ ____     / __ \\ / /_____ ___   ____   / / \n" +
				"  / __/  / __// __ \\ / __ `// __ \\   / / / // // ___// _ \\ / __ \\ / /  \n" +
				" / /___ / /_ / / / // /_/ // / / /  / /_/ // /(__  )/  __// / / //_/   \n" +
				"/_____/ \\__//_/ /_/ \\__,_//_/ /_/   \\____//_//____/ \\___//_/ /_/(_)    \n" +
				"                                                                      ",
		},
		{
			class: "text-white/60",
			text: "╔═══════════════════════════════════╗",
		},
		{
			class: "text-white/60",
			text: "║ cmd line for nerds and explorers! ║",
		},
		{
			isMarkdown: true,
			class: "prose-a:text-blue-500 prose-a:underline text-white/60",
			text: '║ check out the desktop app <a href="/desktop">here</a>    ║',
		},
		{
			class: "text-white/60",
			text: "╚═══════════════════════════════════╝",
		},
	];

	let isMounted = false;
	let isAboutVisible = false;
	let halfTerminalHeight: number = 0;
	let textHeight: number = 0;
	let terminalMarginTop: number = 80;
	let navHeight: number = 0;
	let containerPaddingTop: number = 36;
	$: canvasWidth = isMounted ? window.innerWidth : 0;
	$: canvasHeight =
		halfTerminalHeight +
		textHeight +
		terminalMarginTop +
		navHeight +
		containerPaddingTop;
	onMount(() => {
		isMounted = true;
		window.addEventListener("resize", () => {
			canvasWidth = window.innerWidth;
			canvasHeight = window.innerHeight;
		});
	});

	const terminalOpen = (file: DirectoryFile) => {
		navigate(`/${file.open.toLowerCase()}/${file.slug}`);
	};
</script>

<div class="overflow-x-hidden">
	<div class="relative h-0 w-0">
		<div class="absolute left-0 top-0 rainbow">
			{#await import("$lib/metaballs/Metaballs.svelte")}
				<div class="w-full h-full bg-black absolute top-0 left-0" />
			{:then Module}
				<div>
					<Module.default bind:width={canvasWidth} bind:height={canvasHeight} />
				</div>
			{/await}
		</div>
	</div>
	<div class="background-shift h-full w-full font-roboto text-gray-50">
		<Header bind:navHeight />
		<div in:fly class="relative h-full w-full pt-9">
			<div class="mx-auto w-fit px-4">
				<h1
					bind:clientHeight={textHeight}
					style="filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 1px 1px black) drop-shadow(0px 2px 0px black);"
					class="select-none mx-auto max-w-4xl py-8 text-left font-bold text-[calc(100vw/6)] sm:text-8xl md:text-9xl font-mono"
				>
					<GlitchText glitchText={["LEARN", "CREATE", "ENJOY"]}></GlitchText>
				</h1>
			</div>

			<div class="mt-20 grid w-full grid-cols-1 grid-rows-1">
				<div
					style="grid-column: 1; grid-row: 1;"
					class="grid h-full w-full grid-rows-2"
				>
					<div bind:clientHeight={halfTerminalHeight} />
					<div class="h-full bg-gray-950">
						<div class="rainbow h-1"></div>
					</div>
				</div>
				<div
					style="grid-column: 1; grid-row: 1;"
					class="relative mx-auto grid w-full max-w-4xl grid-cols-1 grid-rows-1 px-4"
				>
					<div
						style="grid-column: 1; grid-row: 1; width: calc(100% + 0.5rem); height: calc(100% + 0.5rem);"
						class="rainbow -m-1 aspect-square rounded-[1.75rem]"
					/>
					<div
						style="grid-column: 1; grid-row: 1;"
						class="relative z-10 flex aspect-square w-full flex-grow flex-col overflow-hidden rounded-3xl border border-[#374151] bg-black pt-11"
					>
						<div
							class="absolute left-0 top-0 z-10 flex w-full gap-2.5 border-b border-slate-700 bg-gray-950 p-4"
						>
							<div class="h-2.5 w-2.5 rounded-full bg-red-500 opacity-50" />
							<div class="h-2.5 w-2.5 rounded-full bg-yellow-500 opacity-50" />
							<div class="h-2.5 w-2.5 rounded-full bg-green-500 opacity-50" />
						</div>
						<TerminalBase
							className="!bg-opacity-100 !backdrop-blur-none"
							style="font-size: clamp(0.25rem, 2vw, 0.75rem); line-height: calc(0.25rem + clamp(0.25rem, 2vw, 0.75rem));"
							id="home"
							preExecute={["help", "ls"]}
							open={terminalOpen}
							bind:lines
							bind:execute
						/>
					</div>
				</div>
			</div>
			<div
				class="-mt-1 flex h-full w-full flex-col overflow-hidden bg-gray-950 pb-32 pt-32"
			>
				<div
					use:intersectionObserver={{ callback: () => (isAboutVisible = true) }}
					class="prose prose-invert mx-auto flex w-full max-w-4xl flex-col gap-2 px-4 prose-p:opacity-90"
				>
					<h2 id="about" class="mb-10 text-5xl md:col-span-2 md:mb-4">About</h2>
					<div
						class="flex flex-col-reverse gap-2 lg:grid lg:grid-cols-[1fr_11rem]"
					>
						<div class="w-full">
							<div
								class:opacity-100={isAboutVisible}
								class:opacity-50={!isAboutVisible}
								class="m-0 transition-all duration-1000"
							>
								<p>
									I'm a full stack cross platform web developer with a focus on
									developing internal development frameworks and tools to
									increase developer and admin productivity. My primary
									experience is in UI and UX design and development, backend
									development, and database management.
								</p>
								<p>
									Outside of software development, I enjoy making art and music
									as well as skateboarding. I have a passion for learning and
									creating new things. I'm always looking for new projects to
									work on and new ideas to explore. I have a strong interest in
									the intersection of art and technology and how they can be
									used to create new and interesting experiences, which has been
									my primary focus as a hobby for years.
								</p>
								<p>
									I have two cats named Lua and Omen. Lua is a tortoiseshell cat
									with short tail and Omen is a tabby with a not short tail. We
									got Lua from a family friend when she was about 6 months old.
									She's sweet, sassy, and disturbingly smart with how well she's
									able to communicate with my partner and I. Omen was abandoned
									by his mom as a kitten when my Grandma found him almost gone
									in the sun. She nursed him back to health and a few weeks
									later we took him in, and he's been my sweet little boy since
									then. They are my constant companions and are always by my
									side when I'm working on projects.
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
			</div>
		</div>
	</div>
</div>

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
