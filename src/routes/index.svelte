<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import cookies from '../helpers/cookies';

	onMount(() => {
		const userLoggedIn = cookies.get('username');
		if (userLoggedIn) {
			goto('/main/nav');
		} else {
			goto('/login');
		}
	});
</script>

<svelte:head><title>WAACK</title></svelte:head>
