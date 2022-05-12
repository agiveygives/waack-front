<script>
	import Textfield from '@smui/textfield';
	import { Icon } from '@smui/common';
	import Paper from '@smui/paper';
	import Button, { Label } from '@smui/button';
	import Select, { Option } from '@smui/select';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let shareEmail = '';

	const categories = ['developer', 'senior developer', 'solution architect'];
	let selectedOption = '';

	const handleCreate = (/** @type {Event} */ event) => {
		console.log('create', event);
		goto('/main/home');
	};
</script>

<svelte:head>
	<title>SIGN UP</title>
</svelte:head>

<div class="main">
	<Paper>
		<div class="signup">
			<Textfield class="shaped-filled" variant="filled" bind:value={email} label="email address">
				<Icon class="material-icons" slot="leadingIcon">person</Icon>
			</Textfield>
			<Textfield class="shaped-filled" variant="filled" bind:value={password} label="password">
				<Icon class="material-icons" slot="leadingIcon">lock</Icon>
			</Textfield>
			<Select
				class="shaped-filled"
				variant="filled"
				bind:value={selectedOption}
				label="current title"
			>
				<Icon class="material-icons" slot="leadingIcon">terminal</Icon>
				<Option value="" />
				{#each categories as category}
					<Option value={category}>{category}</Option>
				{/each}
			</Select>
			<Textfield
				class="shaped-filled"
				variant="filled"
				bind:value={shareEmail}
				label="manager's email"
			>
				<Icon class="material-icons" slot="leadingIcon">share</Icon>
			</Textfield>
			<Button on:click={handleCreate} variant="raised">
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
