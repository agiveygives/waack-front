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

<svelte:head><title>Trebuchet</title></svelte:head>

<div class="nav">
	<div class={open ? 'sidebar-open' : 'sidebar'}>
		<div class="sidebar-nav">
			<Button on:click={() => goto('/main/nav/goals')} style="padding-left: 0">
				<Icon class="material-icons sidebar_icon">pie_chart_outlined</Icon>
				<Label class="sidebar_label">Goals</Label>
			</Button>
			<Button on:click={() => goto('/main/nav/accomplishments')} style="padding-left: 0">
				<Icon class="material-icons sidebar_icon">list_alt</Icon>
				<Label class="sidebar_label">Accomplishments</Label>
			</Button>
			<Button on:click={() => goto('/main/nav/trophies')}>
				<Icon class="material-icons sidebar_icon" style="margin-right: 0"
					>emoji_events_outlined</Icon
				>
				<Label class="sidebar_label">Trophy Case</Label>
			</Button>
			<Button on:click={() => goto('/main/nav/career')} style="padding-left: 0">
				<Icon class="material-icons arrow sidebar_icon">arrow_circle_up</Icon>
				<Label class="sidebar_label">Tech Career Progression</Label>
			</Button>
		</div>
		<IconButton
			class="material-icons toggle"
			aria-label="goals"
			on:click={toggleOpen}
			style={open ? 'transform: rotate(-180deg)' : ''}>arrow_forward_ios</IconButton
		>
	</div>

	<div class="content">
		<slot />
	</div>
</div>

<style>
	.nav {
		display: flex;
		flex-direction: row;
		justify-content: left;
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
		background-color: #127475;
		justify-content: space-between;
		padding-bottom: 1px;
		width: 45px;
		min-width: 45px;
		transition: all 300ms;
		overflow: hidden;
	}
	.sidebar-open {
		width: 350px;
		min-width: 350px;
		overflow: visible;
	}
	.content {
		margin: 50px 20px;
		width: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: column;
	}
	:global(.arrow) {
		transform: rotate(45deg);
	}
	:global(.toggle) {
		margin-bottom: 56px;
		transition: all 300ms;
		color: #f5dfbb;
	}
	:global(.sidebar_icon) {
		width: 45px !important;
		font-size: 24px !important;
		color: #f5dfbb;
	}
	:global(.sidebar_label) {
		white-space: nowrap;
		color: #f5dfbb;
	}
</style>
