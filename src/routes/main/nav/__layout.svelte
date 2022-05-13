<script>
	import { goto } from '$app/navigation';
	import IconButton from '@smui/icon-button';
	import Button from '@smui/button';
	import { Icon, Label } from '@smui/common';
	let open = false;
	const toggleOpen = () => {
		open = !open;
	};
</script>

<div class="nav">
	<div class={open ? 'sidebar-open' : 'sidebar'}>
		<div class="sidebar-nav">
			<Button on:click={() => goto('/main/nav/goals')} style="padding-left: 0">
				<Icon class="material-icons">pie_chart_outlined</Icon>
				<Label class="label">Goals</Label>
			</Button>
			<Button on:click={() => goto('/main/nav/accomplishments')} style="padding-left: 0">
				<Icon class="material-icons">list_alt</Icon>
				<Label>Accomplishments</Label>
			</Button>
			<Button on:click={() => goto('/main/nav/trophies')}>
				<Icon class="material-icons">emoji_events_outlined</Icon>
				<Label>Trophy Case</Label>
			</Button>
			<Button on:click={() => goto('/main/nav/career')} style="padding-left: 0">
				<Icon class="material-icons arrow">arrow_circle_up</Icon>
				<Label>Tech Career Progression</Label>
			</Button>
		</div>
		<IconButton
			class="material-icons toggle"
			aria-label="goals"
			on:click={toggleOpen}
			style={open ? 'transform: rotate(-180deg)' : ''}>arrow_forward_ios</IconButton
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
	.sidebar,
	.sidebar-open,
	.sidebar-nav {
		display: flex;
		flex-direction: column;
	}
	.sidebar-nav {
		align-items: flex-start;
	}
	.sidebar,
	.sidebar-open {
		height: 100%;
		background-color: #676778;
		justify-content: space-between;
		padding-bottom: 1px;
		width: 45px;
		transition: all 300ms;
		overflow: hidden;
	}
	.sidebar-open {
		width: 350px;
		overflow: visible;
	}
	:global(.arrow) {
		transform: rotate(45deg);
	}
	:global(.toggle) {
		margin-bottom: 56px;
		transition: all 300ms;
	}
	:global(.mdc-button .mdc-button__icon) {
		width: 45px;
		font-size: 24px;
	}
	:global(.label) {
		white-space: nowrap;
	}
</style>
