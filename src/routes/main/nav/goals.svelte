<script lang="ts">
	import Select, { Option } from '@smui/select';
	import Button, { Icon, Label } from '@smui/button';
	import { Daily, Weekly, Monthly } from '@comp/GoalsCalendar';
	import { Header } from '@comp/Header';

	let calendarOptions = ['Daily', 'Weekly', 'Monthly'];

	let value = calendarOptions[0];
</script>

<Header header="Goals" />
<span>
	<Select bind:value>
		{#each calendarOptions as option}
			<Option value={option}>{option}</Option>
		{/each}
	</Select>

	<span class="add-goal">
		<Button on:click={() => console.log('Add a Goal')}>
			<Icon class="material-icons">add</Icon>
			<Label>Add a Goal</Label>
		</Button>
	</span>
</span>

{#if value === 'Daily'}
	<Daily />
{:else if value === 'Weekly'}
  <Weekly />
{:else}
  <Monthly />
{/if}

<style>
	.add-goal {
		float: right;
	}
</style>
