<script lang="ts">
	import AppIcon from '$lib/appIcons/AppIcon.svelte';
	import { dismissNotification, type Notification } from '$stores/notifications.store';

	export let notification: Notification;

	$: ({ id, appKey, description, title, onClick, dismissOnClick } = notification);
</script>

<button
	type="button"
	class="group relative flex min-h-[4.25rem] w-full cursor-default gap-3 rounded-2xl border border-[#474A56] bg-[#252B3B]/50 py-3 pl-3 pr-6 text-left backdrop-blur-2xl"
	on:click|stopPropagation={() => {
		onClick?.();
		dismissOnClick && dismissNotification(id);
	}}
>
	<button
		on:click|stopPropagation={() => dismissNotification(id)}
		class="absolute -left-2 -top-2 ml-auto rounded-full border border-[#474A56] bg-[#252B3B]/50 p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
		><svg
			width="16"
			height="16"
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
		></button
	>
	<div class="flex h-full w-9 items-center justify-center">
		<AppIcon {appKey} size="small" />
	</div>
	<div class="text-xs leading-tight">
		<h4 class="font-semibold">{title}</h4>
		<p>{description}</p>
	</div>
</button>
