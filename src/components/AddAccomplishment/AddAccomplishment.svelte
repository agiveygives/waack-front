<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
	import Textfield from '@smui/textfield';
	import IconButton from '@smui/icon-button';
	import Button, { Label } from '@smui/button';

	export let open = false;

	let date: string = '';
	let description: string = '';
	let content: string = '';
	let tags: string = '';
	let uploadedFiles: FileList | null = null;

	const dispatch = createEventDispatcher();

	function clearData() {
		console.log('here');
		date = '';
		description = '';
		content = '';
		uploadedFiles = null;
	}

	function closeHandler(e: CustomEvent<{ action: string }>) {
		if (e.detail.action === 'accept') {
			dispatch('addAccomplishment', {
				date,
				description,
				content,
				uploadedFiles
			});
		}
		clearData();
	}
</script>

<Dialog
	bind:open
	fullscreen
	aria-labelledby="fullscreen-title"
	aria-describedby="fullscreen-content"
	on:SMUIDialog:closed={closeHandler}
>
	<Header>
		<Title id="fullscreen-title">Add something great!</Title>
		<IconButton action="close" class="material-icons">close</IconButton>
	</Header>
	<Content id="fullscreen-content" class="modal-content">
		<Textfield class="shaped-filled" variant="filled" bind:value={date} label="date" />
		<Textfield
			class="shaped-filled"
			variant="filled"
			bind:value={description}
			label="description"
		/>
		<Textfield class="shaped-filled" variant="filled" bind:value={content} label="content" />
		<div class="hide-file-ui">
			<Textfield
				class="shaped-filled"
				variant="filled"
				type="file"
				bind:files={uploadedFiles}
				label="upload a file"
			/>
		</div>
		<Textfield
			class="shaped-filled"
			variant="filled"
			bind:value={tags}
			label="add tags, separated by a comma"
		/>
	</Content>
	<Actions>
		<Button action="close">
			<Label>Cancel</Label>
		</Button>
		<Button action="accept" defaultAction>
			<Label>Save</Label>
		</Button>
	</Actions>
</Dialog>

<style>
	:global(.modal-content) {
		display: flex;
		flex-direction: column;
	}

	.hide-file-ui,
	.hide-file-ui > :global(label) {
		width: 100%;
	}

	.hide-file-ui :global(input[type='file']::file-selector-button) {
		display: none;
	}

	.hide-file-ui :global(:not(.mdc-text-field--label-floating) input[type='file']) {
		color: transparent;
	}
</style>
