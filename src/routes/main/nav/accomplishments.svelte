<script lang="ts">
	import { Header as HeaderComponent } from '@comp/Header/';
	import Accordion from '@smui-extra/accordion';
	import { Accomplishment } from '@comp/Accomplishment';
	import { AddAccomplishment } from '@comp/AddAccomplishment';
	import { accomplishments } from '@waack-gql/queries/accomplishments.ts';
	import CircularProgress from '@smui/circular-progress';
	import Button from '@smui/button';
	import { Icon, Label } from '@smui/common';

	let addModalOpen = false;
	const toggleModal = () => {
		addModalOpen = !addModalOpen;
	};

	function handleAdd(event: Accomplishment) {}
</script>

<HeaderComponent header="Accomplishments" />
<AddAccomplishment bind:open={addModalOpen} on:addAccomplishment={handleAdd} />
<div>
	<Button on:click={toggleModal}>
		<Icon class="material-icons">add</Icon>
		<Label>Add accomplishment</Label>
	</Button>
</div>

{#if $accomplishments.status === 'loading'}
	<CircularProgress style="height: 32px; width: 32px;" indeterminate />
{:else}
	<div class="accordion-container">
		<Accordion>
			{#each $accomplishments.data as accomplishment}
				<Accomplishment {accomplishment} />
			{/each}
		</Accordion>
	</div>
{/if}
