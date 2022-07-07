<script lang="ts">
	import { draggable } from '@neodrag/svelte';

	let isMouseDown = false;
</script>

<div
	use:draggable={{
		bounds: 'body',
		onDragEnd: () => {
			isMouseDown = false;
		}
	}}
	on:mousedown={() => {
		isMouseDown = true;
	}}
	class="mx-auto overflow-hidden ring ring-neutral-900 ring-opacity-80 rounded-lg  max-w-xl relative {isMouseDown
		? 'cursor-grabbing'
		: 'cursor-grab'}"
>
	<div class="flex bg-neutral-900 items-center gap-2 py-2 px-4">
		<div class="h-3 w-3 rounded-full bg-neutral-500" />
		<div class="h-3 w-3 rounded-full bg-neutral-500" />
		<div class="h-3 w-3 rounded-full bg-neutral-500" />
	</div>
	<div on:mousedown|stopPropagation>
		<slot />
	</div>
</div>
