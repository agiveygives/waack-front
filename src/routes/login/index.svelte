<script lang="ts">
	import Textfield from '@smui/textfield';
	import { Icon } from '@smui/common';
	import Paper from '@smui/paper';
	import Button, { Label } from '@smui/button';
	import { goto } from '$app/navigation';
	import { setLoginCookie } from '../../helpers/cookies';

	let email = '';
	let password = '';

	const handleLogin = async () => {
		const url = 'http://localhost:8080/auth/login';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		});
		const loginCookie = await response.text();
		// need to return user
		setLoginCookie(loginCookie);
		goto('/main/nav');
	};
</script>

<div class="main">
	<Paper>
		<div class="login">
			<Textfield class="shaped-filled" variant="filled" bind:value={email} label="email address">
				<Icon class="material-icons" slot="leadingIcon">person</Icon>
			</Textfield>
			<Textfield class="shaped-filled" variant="filled" bind:value={password} label="password">
				<Icon class="material-icons" slot="leadingIcon">lock</Icon>
			</Textfield>
			<Button on:click={handleLogin} variant="raised" disabled={!email || !password}>
				<Label>Log In</Label>
			</Button>
			<Button on:click={() => goto('/login/create')}>
				<Label>Sign up</Label>
			</Button>
		</div>
	</Paper>
</div>

<style>
	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}
	.login {
		display: flex;
		flex-direction: column;
		padding: 20px;
	}
	* :global(.shaped-filled) {
		margin-bottom: 24px;
	}
</style>
