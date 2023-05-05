<script>
	import CurrentTime from './CurrentTime.svelte';
</script>

<button>
	<CurrentTime />
</button>

<div class="fixed right-[1.125rem] top-10 flex w-[21.5rem] flex-col gap-2">
	<div
		class="flex min-h-[4.25rem] w-full gap-3 rounded-2xl border border-[#474A56] bg-[#252B3B]/50 py-3 pl-3 pr-6 backdrop-blur-2xl"
	>
		<div class="flex items-center justify-center">
			<div class="aspect-square h-9 w-9 bg-blue-500" />
		</div>
		<div class="text-xs leading-tight">
			<h4 class="font-semibold">Disk Not Ejected Properly</h4>
			<p>Eject "Extreme SSD" before disconnecting or turning it off.</p>
		</div>
	</div>
</div>
