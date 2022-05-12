<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let userLoggedIn = false;
	onMount(() => {
		if (userLoggedIn) {
			goto('/home');
		} else {
			goto('/login');
		}
	});
</script>
