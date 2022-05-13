<script>
  import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import Select, { Option } from '@smui/select';
  import Icon from '@smui/select/icon';
 
  let fruits = ['Technical Ability', 'Client Satisfaction/Feedback', 'Leadership', 'Nerdiness', 'Misc.'];
 
  let value = '';
  let valueHelperText = '';
  let valueLeadingIcon = '';
  let valueInvalid = '';
  let open = true;
  let response = 'Nothing yet.';
  let focused = false;
  let dirty = false;
  let invalid = false;
  let selected;
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
    <div class="margins textbox">
      <Textfield textarea bind:value label="Add a new goal bruh!">
          <HelperText slot="helper"></HelperText>
        </Textfield>
     </div> 
     <div>
      <Select bind:value={valueHelperText} label="Select a Category">
        <Option value="" />
        {#each fruits as fruit}
          <Option value={fruit}>{fruit}</Option>
        {/each}
        <svelte:fragment slot="helperText"></svelte:fragment>
      </Select>
    </div>
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
.textbox{
		display: flex;
		align-items: left;
		justify-content: Left;
		flex-direction: column;
		padding: 10px;
    min-height: 15vh;
    max-width: 75vw;
    min-width: 50vw;
  }
	:global(.datepicker){		
		display: flex;
		align-items: left;
		justify-content: left;
		flex-direction: row;
		padding: 150px;}
	:global(.buttongrouping){
		display: flex;
		align-items: left;
		justify-content: left;
		flex-direction: row;
		padding: 150px;}
</style>


