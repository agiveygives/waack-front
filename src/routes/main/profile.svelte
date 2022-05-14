<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '@smui/button';
	import { Label } from '@smui/common';
	import DataTable, { Body, Row, Cell } from '@smui/data-table';
	import cookies from '../../helpers/cookies';

	let name = '';
	let username = '';
	const handleLogout = async () => {
		const url = 'http://localhost:8080/auth/logout';
		await fetch(url, {
			headers: {
				session_id: cookies.get('token')
			}
		});

		cookies.set('token', '', -1);
		goto('/login');
	};
</script>

<div class="flexbox-container">
	<DataTable table$aria-label="People list">
		<Body>
			<Row>
				<Cell>Username</Cell>
				<Cell>{username}</Cell>
			</Row>
			<Row>
				<Cell>Name</Cell>
				<Cell>{name}</Cell>
			</Row>
		</Body>
	</DataTable>

	<h3>
		Are you sure you want log out? If you forget your password you can never come back in.....and
		will then be unable to get promoted....and then will lose your job.....and then will never again
		recieve gainful employment
	</h3>
	<Button on:click={handleLogout} variant="unelevated" color="primary" style="width: 80%;">
		<Label>Logout</Label>
	</Button>
</div>

<style>
	.flexbox-container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 10%;
	}
	:global(.mdc-data-table) {
		width: 100%;
	}
</style>
