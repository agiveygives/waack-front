<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '@smui/button';
	import { Label } from '@smui/common';
	import DataTable, { Body, Row, Cell } from '@smui/data-table';
	import type { User } from '../../types/user';
	import cookies from '../../helpers/cookies';
	import { initialUserInfo, userInfo } from '../../store/login';
	import { Icon } from '@smui/common';

	let userValue: User = initialUserInfo;

	userInfo.subscribe((value) => (userValue = value));
	const handleLogout = async () => {
		const url = 'https://d703-76-105-101-89.ngrok.io/auth/logout';
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
	<div class="flex-column">
		<Icon class="material-icons">account_circle_outlined</Icon>
		<h3>{userValue?.name || ''}</h3>
		<p class="title">{userValue?.title || ''}</p>
		<p class="logout">
			Are you sure you want log out? If you forget your password you can never come back in.....and
			will then be unable to get promoted....and then will lose your job.....and then will never
			again receive gainful employment
		</p>
		<Button on:click={handleLogout} variant="unelevated" color="primary" style="width: 80%;">
			<Label>Logout</Label>
		</Button>
	</div>
	<div class="flex-column-1">
		<DataTable table$aria-label="People list">
			<Body>
				<Row>
					<Cell>Username</Cell>
					<Cell>{userValue.email}</Cell>
				</Row>
				<Row>
					<Cell>Name</Cell>
					<Cell>{userValue.name}</Cell>
				</Row>
				<Row>
					<Cell>Manager</Cell>
					<Cell>{userValue.manager}</Cell>
				</Row>
				<Row>
					<Cell>Title</Cell>
					<Cell>{userValue.title}</Cell>
				</Row>
			</Body>
		</DataTable>
	</div>
	<div class="flex-column integrate">
		<h3>Integrate With</h3>
		<img src="/images/slack.png" alt="slack" />
		<img src="/images/github.png" alt="github" />
		<img src="/images/openair.png" alt="open air" />
	</div>
</div>

<style>
	.flexbox-container {
		display: flex;
		align-items: flex-start;
		justify-content: space-around;
		flex-direction: row;
		height: 100%;
		padding: 20px;
	}
	.flex-column {
		width: 20%;
		margin: 0 10px;
	}
	.flex-column-1 {
		flex: 1;
	}
	h3,
	p {
		margin: 0px;
	}
	.title {
		text-transform: capitalize;
		font-size: 12px;
	}
	.logout {
		margin: 20px 0;
	}
	:global(.mdc-data-table) {
		width: 100%;
	}

	.integrate {
		display: flex;
		flex-direction: column;
	}
	img {
		max-width: 100%;
		margin: 20px 0;
	}
</style>
