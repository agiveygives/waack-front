<script>
	import { goto } from '$app/navigation';
	import IconButton from '@smui/icon-button';
</script>

<div class="nav">
	<div class="sidebar">
		<IconButton class="material-icons" aria-label="goals" on:click={() => goto('/main/nav/goals')}
			>pie_chart_outlined</IconButton
		>
		<IconButton
			class="material-icons"
			aria-label="accomplishments"
			on:click={() => goto('/main/nav/accomplishments')}>list_alt</IconButton
		>
		<IconButton
			class="material-icons"
			aria-label="trophies"
			on:click={() => goto('/main/nav/trophies')}>emoji_events</IconButton
		>
		<IconButton
			class="material-icons arrow"
			aria-label="career"
			on:click={() => goto('/main/nav/career')}>arrow_circle_up</IconButton
		>
	</div>
	<slot />
</div>

<style>
	.nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 100%;
	}
	.sidebar {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #676778;
	}
	:global(.arrow) {
		transform: rotate(45deg);
	}
</style>
