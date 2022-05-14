<script lang="ts">
	import Textfield from '@smui/textfield';
	import { Icon } from '@smui/common';
	import Paper from '@smui/paper';
	import Button, { Label } from '@smui/button';
	import Select, { Option } from '@smui/select';
	import { goto } from '$app/navigation';
	import { userInfo } from '../../store/login';
	import { setLoginCookie } from '../../helpers/cookies';

	let email = '';
	let password = '';
	let name = '';
	let manager = '';

	const titleCategories = ['developer', 'senior developer', 'solution architect'];
	let title = '';

	const handleCreate = async (event: Event) => {
		const url = 'http://localhost:8080/auth/register';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				password,
				email,
				title,
				manager
			})
		});
		const loginCookie = await response.text();
		setLoginCookie(loginCookie);
		userInfo.set({
			name,
			email,
			title,
			manager
		});
		goto('/main/nav');
	};
</script>

<div class="main">
	<Paper>
		<div class="signup">
			<Textfield class="shaped-filled" variant="filled" bind:value={email} label="email address">
				<Icon class="material-icons" slot="leadingIcon">person</Icon>
			</Textfield>
			<Textfield
				class="shaped-filled"
				variant="filled"
				bind:value={password}
				label="password"
				type="password"
			>
				<Icon class="material-icons" slot="leadingIcon">lock</Icon>
			</Textfield>
			<Textfield class="shaped-filled" variant="filled" bind:value={name} label="name">
				<Icon class="material-icons" slot="leadingIcon">badge</Icon>
			</Textfield>
			<Select class="shaped-filled" variant="filled" bind:value={title} label="current title">
				<Icon class="material-icons" slot="leadingIcon">terminal</Icon>
				<Option value="" />
				{#each titleCategories as category}
					<Option value={category}>{category}</Option>
				{/each}
			</Select>
			<Textfield
				class="shaped-filled"
				variant="filled"
				bind:value={manager}
				label="manager's email"
			>
				<Icon class="material-icons" slot="leadingIcon">share</Icon>
			</Textfield>
			<Button
				on:click={handleCreate}
				variant="raised"
				disabled={!email || !password || !name || !title}
			>
				<Label>Sign Up</Label>
			</Button>
			<Button on:click={() => goto('/login')}>
				<Label>Back to log in</Label>
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
	.signup {
		display: flex;
		flex-direction: column;
		padding: 20px;
	}
	* :global(.shaped-filled) {
		margin-bottom: 24px;
	}
</style>
