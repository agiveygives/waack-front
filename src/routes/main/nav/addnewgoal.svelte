<script>
  import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import { Datepicker } from 'svelte-calendar';

  let value = '';
  let open = true;
  let response = 'Nothing yet.';
  let focused = false;
  let dirty = false;
  let invalid = false;
  $: disabled = focused || !value || !dirty || invalid;

  function closeHandler(e) {
    switch (e.detail.action) {
      case 'close':
        response = 'Closed without response.';
        break;
      case 'reject':
        response = 'Rejected';
        break;
      case 'accept':
        response = 'Goal Added';
        break;
    }
  }
	
	  function clickHandler() {
    alert(`Sending to ${value}!`);
    value = null;
    dirty = false;
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
    <Title id="fullscreen-title">Add a New Goal</Title>
    <IconButton action="close" class="material-icons xbutton">X</IconButton>
  </Header>
  <Content id="fullscreen-content">
    <div class="margins">
      <Textfield textarea bind:value label="Add a new goal bruh!">
          <HelperText slot="helper"></HelperText>
        </Textfield>
			Pick a date
     </div> 
     <Datepicker />
  </Content>
  <Actions>
    <Button action="reject">
      <Label>Cancel</Label>
    </Button>
    <Button action="accept" defaultAction>
      <Label>Add New Goal</Label>
    </Button>
  </Actions>
</Dialog>

<style>
	:global(.xbutton){		
		display: flex;
		align-items: right;
		justify-content: right;
		flex-direction: row;
		height: 20px;
		width: 20px;}
	:global(.textbox){
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 150px;}
	:global:(.datepicker){		
		display: flex;
		align-items: left;
		justify-content: left;
		flex-direction: row;
		padding: 150px;}
	:global:(.buttongrouping){
		display: flex;
		align-items: left;
		justify-content: left;
		flex-direction: row;
		padding: 150px;}
</style>

<pre class="status">Response: {response}</pre>

