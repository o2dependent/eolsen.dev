<script lang="ts">
	import FullHeader from "./FullHeader.svelte";
	import MobileHeader from "./MobileHeader.svelte";
	export let navHeight = 0;
	export let isHome = false;
</script>

<header bind:clientHeight={navHeight} class="relative z-50 w-full">
	<FullHeader {isHome} />
	<MobileHeader {navHeight} />
</header>
