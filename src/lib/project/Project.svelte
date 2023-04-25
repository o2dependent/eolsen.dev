<script lang="ts">
	import { scale } from 'svelte/transition';
	import {
		directory,
		type Directory,
		type DirectoryFile,
		type ProjectFileData
	} from '$stores/directory.store';
	import Window from '$lib/window/Window.svelte';
	import type { AppWindow } from '$stores/apps.store';
	import { createHistory } from '$utils/createHistory';
	import ProjectHome from './ProjectHome.svelte';
	import ProjectView from './ProjectView.svelte';
	import ProjectSideBar from './ProjectSideBar.svelte';

	export let appWindow: AppWindow;

	let alertDismissed = false;

	const projectDir = (
		($directory.contents?.['Desktop'] as Directory)?.contents?.['Projects'] as Directory
	).contents;

	let projects = Object.keys(projectDir).map((key) => {
		const project = {
			...((projectDir[key as keyof typeof projectDir] as DirectoryFile).data as ProjectFileData),
			name: key
		};
		return project;
	});

	let tags = [...new Set(projects.flatMap((project) => project.tags))];

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

<Window headerClass="!bg-purple-900" {appWindow} startingWidth="60rem" startingHeight="40rem">
	<div slot="header" class="flex w-full flex-grow px-4">
		<button
			on:click={() => {
				history.replace('');
			}}
			disabled={$history.current === ''}
			class="mr-4 flex h-6 w-6 items-center justify-center rounded bg-black bg-opacity-0 transition-opacity hover:bg-opacity-25 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H9M19 10L21 12M19 10V20C19 20.2652 18.8946 20.5196 18.7071 20.7071C18.5196 20.8946 18.2652 21 18 21H15M9 21C9.26522 21 9.51957 20.8946 9.70711 20.7071C9.89464 20.5196 10 20.2652 10 20V16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15H13C13.2652 15 13.5196 15.1054 13.7071 15.2929C13.8946 15.4804 14 15.7348 14 16V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21M9 21H15"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
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
	<div class="flex h-full max-h-full flex-col overflow-y-auto">
		{#if !alertDismissed && !curProject}
			<div class="flex bg-red-500 px-4 py-1 text-black">
				<p class="flex-grow">
					I specialize in team internal tooling so most projects are not publicly available. A write
					up will still be available
				</p>
				<button
					on:click={() => {
						alertDismissed = true;
					}}
					class="rounded border border-white/0 bg-white/0 transition-colors duration-200 hover:border-white/30 hover:bg-white/20"
				>
					<svg
						width="22"
						height="22"
						xmlns="http://www.w3.org/2000/svg"
						class="ionicon"
						viewBox="0 0 512 512"
						><path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="32"
							d="M368 368L144 144M368 144L144 368"
						/></svg
					>
				</button>
			</div>
		{/if}
		<form class="flex h-full w-full min-w-fit bg-white font-mono text-sm text-black">
			{#if curProject}
				<ProjectSideBar {curProject} {projects} {history} />
			{/if}
			<div
				class="flex-grow bg-slate-800 p-4 {curProject
					? 'pl-60 transition-all max-h-full overflow-y-scroll'
					: 'pl-0 transition-colors'} duration-200"
			>
				<div
					class="mx-auto flex h-full w-full flex-col items-center px-2 {curProject
						? ''
						: 'justify-center'}"
				>
					{#key curProject}
						{#if curProject}
							<ProjectView {curProject} />
						{:else}
							<ProjectHome {curProject} {projects} {history} {tags} />
						{/if}
					{/key}
				</div>
			</div>
		</form>
	</div>
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
