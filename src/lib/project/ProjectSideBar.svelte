<script lang="ts">
	import type { ProjectFileData } from '$stores/directory.store';
	import type { createHistory } from '$utils/createHistory';

	import { fly } from 'svelte/transition';

	export let projects: (ProjectFileData & { name: string })[];
	export let history: ReturnType<typeof createHistory>;
	export let curProject: typeof projects[0] | undefined;
</script>

<div
	in:fly={{ duration: 200, x: -100 }}
	out:fly={{ duration: 200, x: -100 }}
	class="absolute flex h-full w-60 flex-col border-r-2 border-slate-700 bg-slate-800"
>
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
				{project.title}
			</button>
		{/each}
	</ul>
</div>
