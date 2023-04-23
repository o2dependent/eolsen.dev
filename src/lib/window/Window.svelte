<script lang="ts">
	import { apps, focusApp, removeApp, type AppWindow } from '$stores/apps.store';
	import { draggable } from '@neodrag/svelte';
	import { scale, blur } from 'svelte/transition';

	export let appWindow: AppWindow;
	export let headerClass: string = '';
	export let windowClass: string = '';
	export let startingWidth = '30rem';
	export let startingHeight = '25rem';
	export let defaultPosition = {
		x: 0,
		y: 8
	};

	let isMouseDown = false;

	const onRemoveAppHandler = () => removeApp(appWindow.name, appWindow.id);
</script>

<div
	on:mousedown={() => focusApp(appWindow.id)}
	use:draggable={{
		bounds: {
			top: 28,
			bottom: -100000,
			left: -100000,
			right: -100000
		},
		defaultPosition,
		handle: '.handle',
		onDragEnd: () => {
			isMouseDown = false;
		}
	}}
	in:scale={{ duration: 150 }}
	out:blur={{ duration: 150 }}
	style="width: {startingWidth}; height: {startingHeight};"
	class="{$apps[$apps.length - 1].id === appWindow.id
		? 'shadow-xl'
		: 'shadow-md'} shadow-black/15 absolute flex max-w-[100vw] resize flex-col overflow-hidden rounded-lg transition-shadow {windowClass}"
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
		style="contain: layout"
		class="max-h-full flex-grow overflow-y-auto"
		on:mousedown|stopPropagation={() => focusApp(appWindow.id)}
	>
		<slot />
	</div>
</div>
