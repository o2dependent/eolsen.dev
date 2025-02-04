<script lang="ts">
	import gsap from "gsap";
	import HamburgerButton from "./HamburgerButton.svelte";

	let active = false;
	let menu: HTMLElement;
	let menuItems: HTMLElement[] = [];
	let showMenu = false;
	let animations: (null | gsap.core.Tween)[] = [];

	$: {
		animations?.forEach((a) => a?.pause());
		if (typeof window !== "undefined") {
			if (active) {
				showMenu = true;
				for (let i = 0; i < menuItems.length; i++) {
					if (!menuItems?.[i]) continue;
					const animation = gsap.to(menuItems[i], {
						x: 0,
						opacity: 1,
						duration: 0.5,
						delay: i * 0.1 + 0.25,
						ease: "power3.out",
					});
					animations.push(animation);
				}
				const animation = gsap.to(menu, {
					backgroundColor: "rgb(0 0 0 / 0.75)",
					"--tw-backdrop-blur": "blur(16px)",
					duration: 0.25 + menuItems.length * 0.1,
				});
				animations.push(animation);
			} else {
				for (let i = 0; i < menuItems.length; i++) {
					if (!menuItems?.[i]) continue;
					const animation = gsap.to(menuItems[i], {
						x: -100,
						opacity: 0,
						duration: 0.3,
						delay: i * 0.01,
						ease: "power3.out",
					});
					animations.push(animation);
				}
				const animation = gsap
					.to(menu, {
						backgroundColor: "rgb(0 0 0 / 0)",
						"--tw-backdrop-blur": "blur(0px)",
						duration: menuItems.length * 0.1 + 0.3,
					})
					.eventCallback("onComplete", () => {
						showMenu = false;
					});
				animations.push(animation);
			}
		}
	}
</script>

<nav class="flex h-16 md:hidden w-full items-center justify-end sticky top-0">
	<HamburgerButton bind:active />
	<div
		bind:this={menu}
		class:flex={showMenu}
		class:hidden={!showMenu}
		class="fixed top-0 left-0 w-full pt-20 h-full bg-black/75 backdrop-blur-lg z-40 px-4 flex flex-col gap-4 overflow-hidden text-3xl"
	>
		<a on:click={() => (active = false)} bind:this={menuItems[0]} href="/"
			>Home
		</a>
		<a on:click={() => (active = false)} bind:this={menuItems[1]} href="/about"
			>About
		</a>
		<a
			on:click={() => (active = false)}
			bind:this={menuItems[2]}
			href="/project"
			>Projects
		</a>
		<a on:click={() => (active = false)} bind:this={menuItems[3]} href="/blog"
			>Blog
		</a>
		<a on:click={() => (active = false)} bind:this={menuItems[4]} href="/music"
			>Music
		</a>
		<a
			on:click={() => (active = false)}
			bind:this={menuItems[5]}
			href="mailto:131eolsen@gmail.com"
			>Contact
		</a>
		<a
			on:click={() => (active = false)}
			bind:this={menuItems[6]}
			class="fixed bottom-4 left-4 flex gap-4 items-center text-xl"
			href="/"
		>
			<svg
				class="h-12 w-12"
				viewBox="0 0 48 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="24" cy="24" r="24" fill="#FAFAFA" />
				<mask
					id="mask0_6476_542"
					style="mask-type:alpha"
					maskUnits="userSpaceOnUse"
					x="4"
					y="4"
					width="39"
					height="40"
				>
					<circle cx="23.3438" cy="24" r="19.3125" fill="#FEFEFE" />
				</mask>
				<g mask="url(#mask0_6476_542)">
					<path d="M7.5 7.96875H41.1562V12.6562H7.5V7.96875Z" fill="#111111" />
					<path d="M7.5 35.0625H41.1562V39.75H7.5V35.0625Z" fill="#111111" />
					<path
						d="M2.34375 22.0312H24.75V26.7188H2.34375V22.0312Z"
						fill="#111111"
					/>
				</g>
			</svg>
			<span>Ethan Olsen</span>
		</a>
	</div>
</nav>
