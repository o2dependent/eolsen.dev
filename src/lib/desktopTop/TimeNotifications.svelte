<script>
	import CurrentTime from './CurrentTime.svelte';
</script>

<button>
	<CurrentTime />
</button>

<div class="fixed right-[1.125rem] top-10 flex w-[21.5rem] flex-col gap-2">
	<div
		class="group relative flex min-h-[4.25rem] w-full gap-3 rounded-2xl border border-[#474A56] bg-[#252B3B]/50 py-3 pl-3 pr-6 backdrop-blur-2xl"
	>
		<button
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
		<div class="flex w-9 items-center justify-center">
			<div class="aspect-square h-9 w-9 rounded-full bg-black p-0.5">
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 512 512"
					fill="black"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
				>
					<mask
						id="mask0_9225_963"
						style="mask-type:alpha"
						maskUnits="userSpaceOnUse"
						x="31"
						y="31"
						width="449"
						height="449"
					>
						<circle cx="255.5" cy="255.5" r="224.5" fill="#F8FAFC" stroke="white" />
					</mask>
					<g mask="url(#mask0_9225_963)">
						<rect x="77" y="384" width="357" height="55" fill="white" />
						<rect x="77" y="69" width="357" height="55" fill="white" />
						<rect x="31" y="233" width="253" height="55" fill="white" />
					</g>
				</svg>
			</div>
		</div>
		<div class="text-xs leading-tight">
			<h4 class="font-semibold">Disk Not Ejected Properly</h4>
			<p>Eject "Extreme SSD" before disconnecting or turning it off.</p>
		</div>
	</div>
</div>
