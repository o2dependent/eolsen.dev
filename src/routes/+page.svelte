<script lang="ts">
	import Lua from '$lib/aboutApp/panels/lua.png';
	import LuaStanding from '$lib/aboutApp/panels/lua_standing.png';
	import Omen from '$lib/aboutApp/panels/omen.png';
	import AboutPhoto from '$lib/aboutApp/about_photo.jpeg';
	import TerminalBase from '$lib/terminal/TerminalBase.svelte';
	import type { TerminalLine } from '$lib/terminal/terminal';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { intersectionObserver } from '$lib/actions/intersectionObserver';

	let execute: (command: string) => void;
	let lines: TerminalLine[] = [
		{
			class: 'bg-clip-text text-transparent rainbow font-bold',
			text:
				'    __  __       __ __             ____ _                              \n' +
				'   / / / /___   / // /____        /  _/( )____ ___                     \n' +
				'  / /_/ // _ \\ / // // __ \\       / /  |// __ `__ \\                    \n' +
				' / __  //  __// // // /_/ /_    _/ /    / / / / / /                    \n' +
				'/_/ /_/ \\___//_//_/ \\____/( )  /___/   /_/ /_/ /_/                     \n' +
				'    ______ __   __        |/           ____   __                    __ \n' +
				'   / ____// /_ / /_   ____ _ ____     / __ \\ / /_____ ___   ____   / / \n' +
				'  / __/  / __// __ \\ / __ `// __ \\   / / / // // ___// _ \\ / __ \\ / /  \n' +
				' / /___ / /_ / / / // /_/ // / / /  / /_/ // /(__  )/  __// / / //_/   \n' +
				'/_____/ \\__//_/ /_/ \\__,_//_/ /_/   \\____//_//____/ \\___//_/ /_/(_)    \n' +
				'                                                                      '
		},
		{
			class: 'text-white/60',
			text: '╔═══════════════════════════════════╗'
		},
		{
			class: 'text-white/60',
			text: '║ cmd line for nerds and explorers! ║'
		},
		{
			isMarkdown: true,
			class: 'prose-a:text-blue-500 prose-a:underline text-white/60',
			text: '║ check out the desktop app <a href="/desktop">here</a>    ║'
		},
		{
			class: 'text-white/60',
			text: '╚═══════════════════════════════════╝'
		}
	];

	let isMounted = false;
	onMount(() => {
		execute('help');
		execute('ls');
		isMounted = true;
	});

	let isAboutVisible = false;
	$: canvasWidth = isMounted ? window.innerWidth : 0;
	$: canvasHeight = isMounted ? window.innerHeight : 0;
</script>

<div class="relative h-0 w-0">
	{#await import('$lib/metaballs/Metaballs.svelte') then Module}
		<div class="rainbow absolute top-0 left-0" in:fade={{ duration: 1000 }}>
			<Module.default width={canvasWidth} height={canvasHeight} />
		</div>
	{/await}
</div>
<div class="background-shift h-full w-full font-roboto text-gray-50">
	<header class="flex w-full items-center justify-center">
		<nav class="container flex p-4">
			<div class="flex flex-grow items-center gap-2">
				<a class="z-50 flex items-center justify-center gap-2 text-2xl" href="/"
					><svg
						width="48"
						height="48"
						viewBox="0 0 48 48"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="24" cy="24" r="24" fill="#FAFAFA" />
						<mask
							id="mask0_6476_541"
							style="mask-type:alpha"
							maskUnits="userSpaceOnUse"
							x="4"
							y="4"
							width="39"
							height="40"
						>
							<circle cx="23.3438" cy="24" r="19.3125" fill="#FEFEFE" />
						</mask>
						<g mask="url(#mask0_6476_541)">
							<path d="M7.5 7.96875H41.1562V12.6562H7.5V7.96875Z" fill="#111111" />
							<path d="M7.5 35.0625H41.1562V39.75H7.5V35.0625Z" fill="#111111" />
							<path d="M2.34375 22.0312H24.75V26.7188H2.34375V22.0312Z" fill="#111111" />
						</g>
					</svg>
					<span>Ethan Olsen</span>
				</a>
			</div>
			<div class="flex flex-grow items-center justify-end gap-2 text-lg">
				<a
					class="relative flex h-full items-center justify-center px-2 opacity-75 transition-all before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:origin-center before:bg-current before:transition-all hover:opacity-100 hover:before:h-0.5 active:scale-95"
					href="#about"
				>
					About
				</a>
				<a
					class="relative flex h-full items-center justify-center px-2 opacity-75 transition-all before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:origin-center before:bg-current before:transition-all hover:opacity-100 hover:before:h-0.5 active:scale-95"
					href="#projects"
				>
					Projects
				</a>
				<a
					class="flex h-full items-center justify-center rounded bg-white px-3 py-2 text-black opacity-75 transition-all hover:opacity-100 active:scale-95"
					href="/app/desktop"
				>
					Open Desktop
				</a>
			</div>
		</nav>
	</header>
	<div class="relative h-full w-full pt-9">
		<div class="fly-up mx-auto w-fit px-4">
			<h1
				style="filter: drop-shadow(2px 4px 0px black);"
				class="rainbow mx-auto max-w-2xl bg-clip-text text-center text-6xl font-bold"
			>
				Full-Stack Developer With <span class="text-transparent">Passion</span>
			</h1>
		</div>
		<div class="mt-20 grid w-full grid-cols-1 grid-rows-1">
			<div
				style="grid-column: 1; grid-row: 1;"
				class="relative mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 px-4"
			>
				<div
					style="grid-column: 1; grid-row: 1;"
					class="rainbow aspect-square w-full rounded-3xl blur-md"
				/>
				<div
					style="grid-column: 1; grid-row: 1;"
					class="relative z-10 flex aspect-square w-full flex-grow flex-col overflow-hidden rounded-3xl border border-[rgba(55,65,81,1)] bg-black pt-11"
				>
					<div
						class="absolute left-0 top-0 z-10 flex w-full gap-2.5 border-b border-slate-700 bg-neutral-950 p-4"
					>
						<div class="h-2.5 w-2.5 rounded-full bg-red-500 opacity-50" />
						<div class="h-2.5 w-2.5 rounded-full bg-yellow-500 opacity-50" />
						<div class="h-2.5 w-2.5 rounded-full bg-green-500 opacity-50" />
					</div>
					<TerminalBase
						style="font-size: clamp(0.25rem, 2vw, 0.75rem); line-height: calc(0.25rem + clamp(0.25rem, 2vw, 0.75rem));"
						id="home"
						bind:lines
						bind:execute
					/>
				</div>
			</div>
			<div style="grid-column: 1; grid-row: 1;" class="grid h-full w-full grid-rows-2">
				<div />
				<div class="h-full bg-gray-950" />
			</div>
		</div>
		<div class="-mt-1 h-full w-full overflow-hidden bg-gray-950">
			<div
				use:intersectionObserver={{ callback: () => (isAboutVisible = true) }}
				class="prose prose-invert mx-auto max-w-2xl px-4 pt-12 prose-p:opacity-90"
			>
				<h2 class="mb-4 text-5xl">About</h2>
				<div class="relative my-2 h-44 w-44 md:float-right md:mr-4">
					{#if isAboutVisible}
						<img
							in:fly={{ x: 100, delay: 500, duration: 1000 }}
							class="absolute -bottom-8 -right-24 h-32 -scale-x-100"
							src={Lua}
							alt=""
						/>
						<img
							in:fly={{ x: 100, delay: 750, duration: 1000 }}
							class="absolute -right-16 -top-20 h-32 -rotate-12 -scale-x-100"
							src={Omen}
							alt=""
						/>
						<img
							in:fly={{ y: 100, delay: 1000, duration: 2000 }}
							class="absolute -top-32 right-1/4 h-40"
							src={LuaStanding}
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
							src={AboutPhoto}
							alt="Ethan Olsen and Omen"
							height="11rem"
							width="11rem"
						/>
					</div>
				</div>
				<p>
					I am a full stack cross platform web developer with a focus on developing internal
					development frameworks and tools to increase developer and admin productivity. My primary
					experience is in UI and UX design and development, backend development, and database
					management.
				</p>
				<p>
					I've got two cats, Omen and Lua. They are both a year old and are very cute. Omen is a
					standard issue cat and Lua is a short tail tortoise shell cat. I ended up getting to name
					Lua which means "moon" in portuguese. It is also a scripting language I like. Please don't
					tell my girlfriend she does not know.
				</p>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@keyframes rainbow {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
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
	:global(html) {
		--rainbow-gradient: linear-gradient(
			90deg,
			#fb5b58 0%,
			#ff3d74 14.58%,
			#f92195 25.52%,
			#e322bc 37.5%,
			#b55ee6 51.56%,
			#7680fc 64.06%,
			#0096ff 76.04%,
			#00d0f2 87.5%,
			#00e3b8 100%
		);
	}
	:global(.rainbow) {
		background-image: var(--rainbow-gradient);
		background-size: 400% 400%;

		animation: rainbow 10s ease infinite;
	}
	@keyframes fly-up {
		0% {
			transform: translateY(200%);
		}
		80% {
			transform: translateY(-10%);
		}
		100% {
			transform: translateY(0%);
		}
	}
	.fly-up {
		animation: fly-up 1.25s ease-in-out;
	}
</style>
