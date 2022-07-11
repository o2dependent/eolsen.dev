<script lang="ts">
	import { removeApp, type AppNames, type AppWindow } from '$stores/apps.store';
	import { draggable } from '@neodrag/svelte';
	import { scale, blur } from 'svelte/transition';

	export let appKey: AppNames;
	export let appWindow: AppWindow;
	export let headerClass: string = '';

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
	in:scale={{ duration: 150 }}
	out:blur={{ duration: 150 }}
	class="absolute flex h-40 min-w-fit resize flex-col overflow-hidden rounded-lg shadow-lg"
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
	<div class="max-h-full flex-grow overflow-y-auto" on:mousedown|stopPropagation>
		<slot />
	</div>
</div>
