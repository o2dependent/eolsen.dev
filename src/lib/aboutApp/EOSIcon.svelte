<script lang="ts">
	import texture from './Texture 18.png';
</script>

<div class="relative h-fit w-fit overflow-hidden rounded-full bg-white ring-[3px] ring-white">
	<img
		id="texture"
		src={texture}
		class="absolute top-0 left-0  h-full w-full rounded-full object-cover"
		alt="Texture"
	/>
	<div class="z-50 h-[153px] w-[153px]">
		<svg
			width="153"
			height="153"
			viewBox="0 0 512 512"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="absolute"
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
				<circle cx="255.5" cy="255.5" r="224.5" fill="#F8FAFC" />
			</mask>
			<g mask="url(#mask0_9225_963)">
				<rect x="77" y="384" width="357" height="55" fill="white" />
				<rect x="77" y="69" width="357" height="55" fill="white" />
				<rect x="31" y="233" width="253" height="55" fill="white" />
			</g>
		</svg>
	</div>
</div>
