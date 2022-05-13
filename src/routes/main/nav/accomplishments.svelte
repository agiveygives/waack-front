<script lang="ts">
	import { Header as HeaderComponent } from '@components/Header/';
	import Accordion from '@smui-extra/accordion';
	import { Accomplishment } from '@components/Accomplishment';
	import { AddAccomplishment } from '@components/AddAccomplishment';
	import Button from '@smui/button';
	import { Icon, Label } from '@smui/common';
	import { accomplishments } from '../../../store/accomplishments';

	let accomplishmentData: Accomplishment[] = [];
	accomplishments.subscribe((value) => (accomplishmentData = value));

	let addModalOpen = false;
	const toggleModal = () => {
		addModalOpen = !addModalOpen;
	};

	function handleAdd(event: Accomplishment) {
		accomplishments.set([...accomplishmentData, event.detail]);
	}
</script>

<HeaderComponent header="Accomplishments" />
<AddAccomplishment bind:open={addModalOpen} on:addAccomplishment={handleAdd} />
<div>
	<Button on:click={toggleModal}>
		<Icon class="material-icons">add</Icon>
		<Label>Add accomplishment</Label>
	</Button>
</div>

<div class="accordion-container">
	<Accordion>
		{#each accomplishmentData as accomplishment}
			<Accomplishment {accomplishment} />
		{/each}
	</Accordion>
</div>
