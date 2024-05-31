<script lang="ts">
	import StickyLink from "$components/StickyLink.svelte";
	export let isHome = false;
</script>

<nav
	class="container px-4 hidden md:flex w-full items-center justify-center mx-auto"
>
	<div class="flex flex-grow items-center gap-2">
		<StickyLink
			mag={{
				strength: { x: 0.3, y: 0.3 },
			}}
			class="relative px-1 rounded-lg z-50 flex items-center justify-center gap-2 py-4 text-2xl transition-opacity hover:opacity-100"
			href="/"
		>
			<svg
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
					<path
						d="M2.34375 22.0312H24.75V26.7188H2.34375V22.0312Z"
						fill="#111111"
					/>
				</g>
			</svg>
			<span>Ethan Olsen</span>
		</StickyLink>
	</div>
	<div class="flex flex-grow items-center justify-end gap-2 text-lg">
		<StickyLink
			mag={{
				strength: { x: 0.3, y: 0.3 },
			}}
			class="relative rounded-lg flex h-full items-center justify-center px-2 py-4 opacity-75 transition-opacity hover:opacity-100"
			href={isHome ? "#about" : "/#about"}
		>
			About
		</StickyLink>
		<StickyLink
			mag={{
				strength: { x: 0.3, y: 0.3 },
			}}
			class="relative rounded-lg flex h-full items-center justify-center px-2 py-4 opacity-75 transition-opacity hover:opacity-100"
			href="/project"
		>
			Projects
		</StickyLink>
		<StickyLink
			mag={{
				strength: { x: 0.3, y: 0.3 },
			}}
			class="relative rounded-lg flex h-full items-center justify-center px-2 py-4 opacity-75 transition-opacity hover:opacity-100"
			href="/blog"
		>
			Blogs
		</StickyLink>
		<StickyLink
			mag={{
				strength: { x: 0.3, y: 0.3 },
			}}
			class="my-4 flex items-center justify-center rounded bg-white px-3 py-2 text-black opacity-75 transition-colors hover:bg-white/10 hover:text-white active:ring active:ring-white hover:opacity-100 active:scale-95"
			href="/music"
		>
			Music Visualizer
		</StickyLink>
	</div>
</nav>
