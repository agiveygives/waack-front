<script lang="ts">
	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import { goto } from '$app/navigation';

	let topAppBar: TopAppBarComponentDev;
</script>

<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
		<Section>
			<a href={'/main/nav'}><img src="bnr_logo.png" alt="BNR logo" class="logo" /></a>
			<Title>Accomplish</Title>
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
	/* Hide everything above this component. */
	:global(app),
	:global(body),
	:global(html) {
		display: block !important;
		height: auto !important;
		width: auto !important;
		position: static !important;
	}
	a {
		height: 90%;
	}
	.logo {
		height: 100%;
	}
</style>
