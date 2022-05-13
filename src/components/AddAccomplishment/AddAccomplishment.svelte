<script lang="ts">
	import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
	import Textfield from '@smui/textfield';
	import IconButton from '@smui/icon-button';
	import Button, { Label } from '@smui/button';

	export let open = false;

	let date: string = '';
	let description: string = '';
	let content: string = '';
	let uploadedFiles: FileList | null = null;

	let response = 'Nothing yet.';

	function closeHandler(e: CustomEvent<{ action: string }>) {
		switch (e.detail.action) {
			case 'close':
				response = 'Closed without response.';
				break;
			case 'reject':
				response = 'Rejected.';
				break;
			case 'accept':
				response = 'Accepted.';
				break;
		}
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
		<Textfield
			class="shaped-filled"
			variant="filled"
			type="file"
			bind:files={uploadedFiles}
			label="upload a file"
		/>
	</Content>
	<Actions>
		<Button action="reject">
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
</style>
