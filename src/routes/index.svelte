<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getUser } from '@waack-gql/queries/user';
	import { userInfo } from '../store/login';
	import cookies from '../helpers/cookies';

	onMount(async () => {
		const userToken = cookies.get('token');
		if (userToken) {
			const user = await getUser(userToken);
			if (user) {
				userInfo.set(user);
				goto('/main/nav');
				return;
			}
		}
		goto('/login');
	});
</script>

<svelte:head><title>Trebuchet</title></svelte:head>
