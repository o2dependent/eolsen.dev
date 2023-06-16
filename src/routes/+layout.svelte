<script>
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		// add a data-href to body
		window.document.body.setAttribute('data-href', window.location.pathname);
		// add listener for url changes
		window.addEventListener('popstate', () => {
			window.document.body.setAttribute('data-href', window.location.pathname);
		});
	});
</script>

<main style="display: contents" class="h-full w-full">
	<slot />
</main>
