<script lang="ts">
	import { removeApp, type AppNames, type AppWindow } from '$stores/apps.store';
	import { draggable } from '@neodrag/svelte';

	export let appKey: AppNames;
	export let appWindow: AppWindow;

	let isMouseDown = false;

	const onRemoveAppHandler = () => removeApp(appKey, appWindow.id);
</script>

<div
	use:draggable={{
		bounds: 'body',
		handle: '.handle',
		onDragEnd: () => {
			isMouseDown = false;
		}
	}}
	class="resize overflow-hidden rounded-lg min-w-fit h-40 absolute shadow flex flex-col"

>
	<div on:mousedown={() => {
		isMouseDown = true;
	}} class="handle flex bg-neutral-900 items-center gap-2 py-2 px-4 {isMouseDown
		? 'cursor-grabbing'
		: 'cursor-grab'}">
		<div class="flex gap-2">
			<button on:click={onRemoveAppHandler} on:mousedown|stopPropagation class="h-3 w-3 rounded-full bg-red-500" />
			<button on:mousedown|stopPropagation class="h-3 w-3 rounded-full bg-yellow-500" />
			<button on:mousedown|stopPropagation class="h-3 w-3 rounded-full bg-green-500" />
		</div>
	</div>
	<div class="flex-grow max-h-full overflow-y-auto" on:mousedown|stopPropagation>
		<slot />
	</div>
</div>
