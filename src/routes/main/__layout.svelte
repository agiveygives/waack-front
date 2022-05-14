<script lang="ts">
	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import { goto } from '$app/navigation';

	let topAppBar: TopAppBarComponentDev;
</script>

<svelte:head><title>Trebuchet</title></svelte:head>

<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
		<Section>
			<a href={'/main/nav'}><img src="/images/bnr_logo.png" alt="BNR logo" class="logo" /></a>
			<div class="title">
				<Title>Trebuchet</Title>
				<h3 class="launch">Launch your career</h3>
			</div>
		</Section>
		<Section align="end" toolbar>
			<IconButton class="material-icons" aria-label="account" on:click={() => goto('/main/profile')}
				>account_circle_outlined</IconButton
			>
			<IconButton
				class="material-icons"
				aria-label="notifications"
				on:click={() => goto('/main/notifications')}>circle_notifications_outlined</IconButton
			>
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar} />

<slot />

<style>
	a {
		height: 100%;
		display: flex;
		align-items: center;
	}
	.logo {
		height: 80%;
	}
	.title {
		margin: 0 20px;
		height: 100%;
	}
	:global(.title > span) {
		padding: 0;
	}
	.launch {
		font-family: 'Roboto';
		font-weight: 100;
		font-size: 12px;
		margin: 0;
	}
	:global(.mdc-icon-button--display-flex) {
		display: inline-block;
	}
</style>
