<script lang="ts">
	import EOSIcon from "$lib/aboutApp/EOSIcon.svelte";
</script>

<div class="flex flex-grow items-center justify-center gap-12">
	<EOSIcon />
	<div class="flex gap-4">
		<div class="flex flex-col gap-4">
			<div>
				<h1 class="text-3xl font-medium">
					olsenOS <span class="font-extralight">Headspace</span>
				</h1>
				<p class="text-xs">Version <span class="font-light">1.2</span></p>
			</div>
			<div class="flex flex-col gap-0.5">
				<p class="text-xs">Ethan Olsen Dev ({new Date().getFullYear()})</p>
				<div class="flex gap-2 text-xs">
					<p>Developer</p>
					<p class="font-light">Full-Stack</p>
				</div>
				<div class="flex gap-2 text-xs">
					<p>Chip</p>
					<p class="font-light">Tim's Jalapeno</p>
				</div>
				<div class="flex gap-2 text-xs">
					<p>Memory</p>
					<p class="font-light">1 petabyte</p>
				</div>
				<div class="flex gap-2 text-xs">
					<p>Cereal Number</p>
					<p class="font-light uppercase">fr0573dwh347</p>
				</div>
			</div>
			<div class="flex w-full gap-2">
				<button
					class="flex-grow rounded bg-[#56545C] px-1.5 py-[1px] text-xs text-white disabled:cursor-not-allowed disabled:opacity-75"
					type="button"
					disabled
				>
					System Report
				</button>
				<button
					class="flex-grow rounded bg-[#56545C] px-1.5 py-[1px] text-xs text-white disabled:cursor-not-allowed disabled:opacity-75"
					disabled
					type="button"
				>
					Software Update
				</button>
			</div>
		</div>
	</div>
</div>
