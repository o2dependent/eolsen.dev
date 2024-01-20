<script lang="ts">
	import type { ProjectFileData } from '$stores/directory.store';
	import type { createHistory } from '$utils/createHistory';

	import { fly, fade } from 'svelte/transition';

	export let projects: (ProjectFileData & { name: string })[];
	export let history: ReturnType<typeof createHistory>;
	export let curProject: typeof projects[0] | undefined;
	export let open = false;

	$: {
		if (!curProject) {
			open = false;
		}
	}
</script>

{#if curProject}
	<div
		in:fly={{ duration: 500, x: -32 }}
		out:fly={{ duration: 250, x: -32 }}
		class="menu-button-container z-10"
	>
		<div class="menu-button" class:open on:click={() => (open = !open)}>
			<div class="icon" />
		</div>
	</div>
	{#if open}
		<div
			in:fly={{ duration: 500, x: -750 }}
			out:fly={{ duration: 500, x: -250 }}
			class="absolute flex h-full w-60 flex-col border-r-2 border-slate-700 bg-slate-800"
		>
			<div class="border-b-2 border-slate-700 bg-purple-900 p-2 pl-9 text-xl font-bold text-white">
				<h2 in:fade={{ delay: 400, duration: 250 }}>Projects</h2>
			</div>
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
						{project.title}
					</button>
				{/each}
			</ul>
		</div>
	{/if}
{/if}

<style lang="postcss">
	.menu-button-container {
		position: absolute;
		left: 0.5rem;
		top: 0.825rem;
	}
	.menu-button {
		position: relative;
		width: 1rem;
		height: 1rem;
		transition-duration: 0.5s;
		cursor: pointer;
		color: white;
		opacity: 0.75;
	}
	.menu-button .icon {
		transition-duration: 500ms;
		position: absolute;
		height: calc(1 / 5 * 100%);
		width: 100%;
		top: calc(2 / 5 * 100%);
		background-color: currentColor;
	}
	.menu-button .icon:before {
		transition-duration: 0.5s;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: currentColor;
		content: '';
		top: -200%;
	}
	.menu-button .icon:after {
		transition-duration: 0.5s;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: currentColor;
		content: '';
		top: 200%;
	}
	.menu-button.open {
		opacity: 1;
	}
	.menu-button.open .icon {
		transition-duration: 0.5s;
		transform: rotateZ(180deg);
	}
	.menu-button.open .icon:before {
		transform: rotateZ(45deg) scaleX(0.75) translate(25%, -25%);
	}
	.menu-button.open .icon:after {
		transform: rotateZ(-45deg) scaleX(0.75) translate(25%, 25%);
	}
</style>
