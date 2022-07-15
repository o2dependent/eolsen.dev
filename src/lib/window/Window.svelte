<script lang="ts">
	import { focusApp, removeApp, type AppNames, type AppWindow } from '$stores/apps.store';
	import { draggable } from '@neodrag/svelte';
	import { scale, blur } from 'svelte/transition';

	export let appWindow: AppWindow;
	export let headerClass: string = '';

	let isMouseDown = false;

	const onRemoveAppHandler = () => removeApp(appWindow.name, appWindow.id);
</script>

<div
	on:mousedown={() => focusApp(appWindow.id)}
	use:draggable={{
		bounds: 'body',
		handle: '.handle',
		onDragEnd: () => {
			isMouseDown = false;
		}
	}}
	in:scale={{ duration: 150 }}
	out:blur={{ duration: 150 }}
	style="width: 40rem; height: 25rem;"
	class="absolute flex min-w-fit resize flex-col overflow-hidden rounded-lg shadow-lg"
>
	<div
		on:mousedown={() => {
			isMouseDown = true;
		}}
		class="handle flex items-center gap-2 bg-neutral-900 py-2 px-4 {headerClass} {isMouseDown
			? 'cursor-grabbing'
			: 'cursor-grab'}"
	>
		<div class="flex gap-2">
			<button
				on:click={onRemoveAppHandler}
				on:mousedown|stopPropagation
				class="h-3 w-3 rounded-full bg-red-500"
			/>
			<button on:mousedown|stopPropagation class="h-3 w-3 rounded-full bg-yellow-500" />
			<button on:mousedown|stopPropagation class="h-3 w-3 rounded-full bg-green-500" />
		</div>
		<slot name="header" />
	</div>
	<div
		class="max-h-full flex-grow overflow-y-auto"
		on:mousedown|stopPropagation={() => focusApp(appWindow.id)}
	>
		<slot />
	</div>
</div>
