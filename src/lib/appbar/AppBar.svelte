<script lang="ts">
	import {desktop} from '../../stores/desktop.store'
</script>

<div class="w-full flex justify-center items-center">
	<div class="p-2 rounded-lg bg-neutral-500 bg-opacity-50 backdrop-blur ring ring-neutral-500">
		{#each $desktop.openApps as app}
		<div>

			<div class="h-8 w-8 flex items-center justify-center rounded-sm bg-neutral-700">
			</div>
			{app.name}
		</div>
		{/each}
	</div>
</div>
