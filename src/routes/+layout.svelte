<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { afterNavigate } from '$app/navigation';

	afterNavigate((navigation) => {
		console.log('afterNavigate', navigation);
		window.scrollTo(0, 0);
		window.document.body.setAttribute('data-href', navigation.to?.url?.pathname ?? '');
	});
</script>

<main class="h-full w-full">
	<slot />
</main>
