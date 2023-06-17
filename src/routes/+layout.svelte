<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { afterNavigate } from '$app/navigation';

	afterNavigate((navigation) => {
		window.document.body.setAttribute('data-href', navigation.to?.url?.pathname ?? '');
	});
</script>

<main class="h-full w-full">
	<slot />
</main>
