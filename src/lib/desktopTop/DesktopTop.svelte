<script lang="ts">
</script>

<div class="flex w-full bg-slate-800 bg-opacity-30 px-2 shadow-sm backdrop-blur-md">
	<div id="desktop-top-left" class="flex flex-grow">
		<button>
			<svg
				width="16"
				height="16"
				viewBox="0 0 512 512"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					x="42"
					y="42"
					width="430"
					height="430"
					rx="212"
					fill="white"
					stroke="white"
					stroke-width="4"
				/>
				<circle cx="256" cy="256" r="235" stroke="white" stroke-width="42" />
				<mask
					id="mask0_9209_886"
					style="mask-type:alpha"
					maskUnits="userSpaceOnUse"
					x="43"
					y="50"
					width="412"
					height="412"
				>
					<circle cx="249" cy="256" r="206" fill="#FEFEFE" />
				</mask>
				<g mask="url(#mask0_9209_886)">
					<line x1="74" y1="110" x2="469" y2="110" stroke="black" stroke-width="50" />
					<line x1="74" y1="399" x2="469" y2="399" stroke="black" stroke-width="50" />
					<line x1="30" y1="260" x2="264" y2="260" stroke="black" stroke-width="50" />
				</g>
			</svg>
		</button>
		<button class="">Code</button>
	</div>
</div>

<style lang="postcss">
	#desktop-top-left > button {
		@apply rounded bg-white bg-opacity-0 px-3 py-0.5 text-opacity-50 transition-colors focus:bg-opacity-25 focus:text-opacity-100;
	}
</style>
