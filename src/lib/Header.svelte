<script lang="ts">
	export let navHeight = 0;
	export let isHome = false;
</script>

<header bind:clientHeight={navHeight} class="relative z-50 flex w-full items-center justify-center">
	<nav class="container flex px-4">
		<div class="flex flex-grow items-center gap-2">
			<a
				class="relative z-50 flex items-center justify-center gap-2 py-4 text-2xl transition-all before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:origin-center before:bg-current before:transition-all hover:opacity-100 hover:before:h-0.5"
				href="/"
				><svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="24" cy="24" r="24" fill="#FAFAFA" />
					<mask
						id="mask0_6476_541"
						style="mask-type:alpha"
						maskUnits="userSpaceOnUse"
						x="4"
						y="4"
						width="39"
						height="40"
					>
						<circle cx="23.3438" cy="24" r="19.3125" fill="#FEFEFE" />
					</mask>
					<g mask="url(#mask0_6476_541)">
						<path d="M7.5 7.96875H41.1562V12.6562H7.5V7.96875Z" fill="#111111" />
						<path d="M7.5 35.0625H41.1562V39.75H7.5V35.0625Z" fill="#111111" />
						<path d="M2.34375 22.0312H24.75V26.7188H2.34375V22.0312Z" fill="#111111" />
					</g>
				</svg>
				<span>Ethan Olsen</span>
			</a>
		</div>
		<div class="flex flex-grow items-center justify-end gap-2 text-lg">
			<a
				class="relative flex h-full items-center justify-center px-2 py-4 opacity-75 transition-all before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:origin-center before:bg-current before:transition-all hover:opacity-100 hover:before:h-0.5"
				href={isHome ? '#about' : '/#about'}
			>
				About
			</a>
			<a
				class="relative flex h-full items-center justify-center px-2 py-4 opacity-75 transition-all before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:origin-center before:bg-current before:transition-all hover:opacity-100 hover:before:h-0.5"
				href={isHome ? '#projects' : '/#projects'}
			>
				Projects
			</a>
			<a
				class="my-4 flex items-center justify-center rounded bg-white px-3 py-2 text-black opacity-75 transition-all hover:opacity-100 active:scale-95"
				href="/desktop"
			>
				Open Desktop
			</a>
		</div>
	</nav>
</header>
