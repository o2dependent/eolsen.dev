<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import {
		type Directory,
		type DirectoryFile,
		type ProjectFileData,
		directory
	} from '$stores/directory.store';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const chProjNames = ['crossplatform-ci-cd', 'page-builder'];

	const projectDir = (
		($directory.contents?.['Desktop'] as Directory)?.contents?.['Projects'] as Directory
	).contents;
	let projects = Object.keys(projectDir)
		.map((key) => {
			const project = {
				...((projectDir[key as keyof typeof projectDir] as DirectoryFile).data as ProjectFileData),
				name: key
			};
			return project;
		})
		.filter(({ name }) => chProjNames.includes(name));

	let isMounted = false;
	let navHeight: number = 0;
	let canvasHeight = 0;
	$: canvasWidth = isMounted ? window.innerWidth : 0;
	// $: canvasHeight = containerHeight + navHeight;
	onMount(() => {
		isMounted = true;
		window.addEventListener('resize', () => {
			canvasWidth = window.innerWidth;
			// canvasHeight = window.innerHeight;
		});
	});
</script>

<div class="relative h-0 w-0">
	<div class="rainbow absolute left-0 top-0">
		{#await import('$lib/metaballs/Metaballs.svelte')}
			<div
				out:fade={{ duration: 100, delay: 75 }}
				class="w-full h-full bg-black absolute top-0 left-0"
			/>
		{:then Module}
			<div in:fade={{ duration: 100 }}>
				<Module.default bind:width={canvasWidth} bind:height={canvasHeight} />
			</div>
		{/await}
	</div>
</div>
<div bind:clientHeight={canvasHeight} class="background-shift w-full font-roboto text-gray-50">
	<Header bind:navHeight />
	<div class="relative w-full pt-9">
		<div class="fly-down mx-auto w-fit px-4">
			<h1
				style="filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 1px 1px black) drop-shadow(0px 2px 0px black);"
				class="rainbow mx-auto flex max-w-4xl flex-col bg-clip-text text-center text-6xl font-bold md:text-8xl"
			>
				<span>Crowdhub Work <span class="text-transparent">Writeups</span></span>
				<span class="text-2xl">How'd you find this?</span>
				<span class="text-lg">Maybe hire me?</span>
			</h1>
		</div>
		<div class="mt-20 grid w-full grid-cols-1 grid-rows-1">
			<div class="rainbow absolute bottom-0 left-0 h-1 w-screen" />
			<div
				style="grid-column: 1; grid-row: 1;"
				class="relative mx-auto grid w-full max-w-4xl grid-cols-1 grid-rows-1 px-4"
			>
				<div
					style="grid-column: 1; grid-row: 1; width: calc(100% + 0.5rem); height: calc(100% + 0.25rem);"
					class="rainbow -mx-1 -mt-1 aspect-square rounded-t-[1.75rem]"
				/>
				<div
					style="grid-column: 1; grid-row: 1;"
					class="relative z-10 flex w-full flex-grow flex-col overflow-hidden rounded-t-3xl border border-b-0 border-[#374151] bg-black pt-11"
				>
					<div
						class="absolute left-0 top-0 z-10 flex w-full gap-2.5 border-b border-slate-700 bg-neutral-950 p-4"
					>
						<div class="h-2.5 w-2.5 rounded-full bg-red-500 opacity-50" />
						<div class="h-2.5 w-2.5 rounded-full bg-yellow-500 opacity-50" />
						<div class="h-2.5 w-2.5 rounded-full bg-green-500 opacity-50" />
					</div>
					<div
						class="prose prose-invert mx-auto w-full max-w-4xl px-4 pt-8 prose-p:m-0 prose-a:no-underline"
					>
						<h2 id="projects" class="mb-10 text-5xl md:mb-4">Available writeups</h2>
						<div class="grid w-full grid-cols-1 gap-px overflow-hidden sm:grid-cols-2">
							{#each projects as project}
								<div class="flex aspect-square w-full flex-col gap-2 p-2 ring-[1px] ring-[#374151]">
									<strong class="text-2xl">{project.title}</strong>
									<p class="flex-grow text-sm">
										{project.description}
									</p>
									<div class="flex flex-col gap-2 text-sm">
										<span class="text-center opacity-50">
											{project.tags.join(' - ')}
										</span>
										<div class="flex justify-between">
											<a
												class:opacity-50={!project.githubLink}
												class:cursor-not-allowed={!project.githubLink}
												href={project.githubLink}
											>
												<svg
													width="32"
													height="32"
													viewBox="0 0 32 32"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<g clip-path="url(#clip0_7034_511)">
														<path
															d="M16 0C7.16533 0 0 7.164 0 16C0 23.0693 4.584 29.0667 10.9427 31.1827C11.7413 31.3307 12 30.8347 12 30.4133V27.4347C7.54933 28.4027 6.62267 25.5467 6.62267 25.5467C5.89467 23.6973 4.84533 23.2053 4.84533 23.2053C3.39333 22.212 4.956 22.2333 4.956 22.2333C6.56267 22.3453 7.408 23.8827 7.408 23.8827C8.83467 26.328 11.1507 25.6213 12.064 25.212C12.2067 24.1787 12.6213 23.472 13.08 23.0733C9.52667 22.6667 5.79067 21.2947 5.79067 15.1653C5.79067 13.4173 6.416 11.9907 7.43867 10.8707C7.27333 10.4667 6.72533 8.83867 7.59467 6.636C7.59467 6.636 8.93867 6.20667 11.996 8.276C13.272 7.92133 14.64 7.744 16 7.73733C17.36 7.744 18.7293 7.92133 20.008 8.276C23.0627 6.20667 24.404 6.636 24.404 6.636C25.2747 8.84 24.7267 10.468 24.5613 10.8707C25.588 11.9907 26.208 13.4187 26.208 15.1653C26.208 21.3107 22.4653 22.664 18.9027 23.06C19.476 23.556 20 24.5293 20 26.0227V30.4133C20 30.8387 20.256 31.3387 21.068 31.1813C27.4213 29.0627 32 23.0667 32 16C32 7.164 24.836 0 16 0Z"
															fill="#BBBBBB"
														/>
													</g>
													<defs>
														<clipPath id="clip0_7034_511">
															<rect width="32" height="32" fill="white" />
														</clipPath>
													</defs>
												</svg>
											</a>
											<a
												class="flex items-center justify-center rounded bg-white px-3 py-2 text-gray-950 opacity-75 hover:opacity-100"
												href="/project/{project.name}"><span>Visit</span></a
											>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<Footer />
