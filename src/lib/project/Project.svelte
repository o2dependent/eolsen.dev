<script lang="ts">
	import {
		directory,
		type Directory,
		type DirectoryFile,
		type ProjectFileData
	} from '$stores/directory.store';
	import Window from '$lib/window/Window.svelte';
	import type { AppWindow } from '$stores/apps.store';
	import { createHistory } from '$utils/createHistory';

	export let appWindow: AppWindow;

	let curDir: string[] = ['Desktop'];

	const projectDir = ($directory['Desktop'].contents['Projects'] as Directory).contents;

	let projects = Object.keys(projectDir).map((key) => {
		const project = {
			...(projectDir[key as keyof typeof projectDir] as DirectoryFile).data,
			name: key
		};
		return project as ProjectFileData & { name: string };
	});

	let history = createHistory('');

	let curProject: typeof projects[0] | undefined;

	$: {
		console.log({ $history });
		if ($history.current) {
			curProject = projects.find((project) => project.name === $history.current);
		} else {
			curProject = undefined;
		}
	}
</script>

<Window headerClass="!bg-slate-900" {appWindow}>
	<div slot="header" class="flex w-full flex-grow px-4">
		<button
			on:click={() => {
				history.back();
			}}
			disabled={!$history.canGoBack}
			class="flex h-6 w-6 items-center justify-center rounded bg-black bg-opacity-0 transition-opacity hover:bg-opacity-25 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15 19L8 12L15 5"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<button
			on:click={() => {
				history.forward();
			}}
			disabled={!$history.canGoForward}
			class="flex h-6 w-6 items-center justify-center rounded bg-black bg-opacity-0 transition-opacity hover:bg-opacity-25 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9 5L16 12L9 19"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<div class="flex w-full flex-grow items-center justify-center pr-12">
			<p>
				Projects{curProject ? ` - ${curProject.name}` : ''}
			</p>
		</div>
	</div>
	<form class="flex h-full bg-white font-mono text-sm text-black">
		<div class="flex w-60 flex-col border-r-2 border-slate-700 bg-slate-800">
			<h2 class="border-b-2 border-slate-700 bg-slate-900 p-2 text-xl font-bold text-white">
				Projects
			</h2>
			<ul class="flex flex-col gap-2 p-2">
				{#each projects as project, index}
					<button
						on:click={() => {
							if ($history.current === project.name || curProject?.name === project.name) {
								return;
							}
							history.push(`${project.name}`);
						}}
						type="button"
						class="{curProject?.name === project.name
							? 'bg-slate-700 text-opacity-100'
							: ''} rounded p-2 text-left text-white text-opacity-50 transition-colors hover:bg-slate-700 hover:text-opacity-100"
					>
						{project.name}
					</button>
				{/each}
			</ul>
		</div>
		<div class="flex-grow bg-slate-800 p-4">
			<div
				class="mx-auto flex h-full w-full flex-col items-center {curProject
					? ''
					: 'justify-center'}"
			>
				{#if curProject}
					<div class="w-full max-w-prose text-white">
						<h1 class="text-2xl font-black">{curProject?.id}</h1>
						<div class="flex w-full">
							<a href={curProject?.githubLink ?? ''} target="_blank" rel="noopener noreferrer"
								>Github</a
							>
							<a href={curProject?.projectLink ?? ''} target="_blank" rel="noopener noreferrer"
								>Live Project</a
							>
						</div>
					</div>
				{:else}
					<p class="w-80 text-center text-lg text-slate-300">Select a project</p>
				{/if}
			</div>
		</div>
	</form>
</Window>

<style>
	label::-webkit-scrollbar-thumb {
		border-radius: 10px !important;
	}
	.stage::before {
		animation: animateBg 10s linear infinite;
		background-image: linear-gradient(
			90deg,
			#897ed3,
			#5b73df,
			#498ada,
			#208ea2,
			#64b3d9,
			#42eca6,
			#64b3d9,
			#208ea2,
			#498ada,
			#5b73df,
			#897ed3
		);
		background-size: 1100% 100%;
	}
	@keyframes animateBg {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 100% 0%;
		}
	}
</style>
