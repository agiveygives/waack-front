<script>
	import { Header as HeaderComponent } from '@components/Header/';
	import Accordion from '@smui-extra/accordion';
	import { Accomplishment } from '@components/Accomplishment';
	import Button from '@smui/button';
	import { Icon, Label } from '@smui/common';
	import { accomplishments } from '../../../store/accomplishments';

	let /** @type {import('../../../types/accomplishment').Accomplishment[]} */ accomplishmentData =
			[];
	accomplishments.subscribe((value) => (accomplishmentData = value));
</script>

<HeaderComponent header="Accomplishments" />
<Button on:click={() => console.log('hello you added a task')}>
	<Icon class="material-icons">add</Icon>
	<Label>Add accomplishment</Label>
</Button>
<div class="accordion-container">
	<Accordion>
		{#each accomplishmentData as accomplishment}
			<Accomplishment {accomplishment} />
		{/each}
	</Accordion>
</div>
