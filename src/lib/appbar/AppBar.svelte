<script lang="ts">
	import {addApp, apps, type AppNames, type AppWindow} from '../../stores/apps.store'



	const onAddAppHandler = (appString: string) => () => addApp(appString as AppNames)
</script>

<div class="mb-4 w-full flex justify-center items-center">
	<div class="p-2 flex gap-4 rounded-lg bg-neutral-500 bg-opacity-50 backdrop-blur ring ring-neutral-500">
		{#each Object.keys($apps) as appKey}
		<button on:click={onAddAppHandler(appKey)} class="flex flex-col items-center justify-center">
			<div class="h-12 w-12 flex items-center justify-center rounded-sm bg-neutral-500">
			</div>
			{appKey}
		</button>
		{/each}
	</div>
</div>
