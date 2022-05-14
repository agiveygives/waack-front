<script>
  import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import Select, { Option } from '@smui/select';
  import Icon from '@smui/select/icon';

  export let open = false;

  let fruits = ['Technical Ability', 'Client Satisfaction/Feedback', 'Leadership', 'Nerdiness', 'Misc.'];

  let value = '';
  let valueHelperText = '';
  let valueLeadingIcon = '';
  let valueInvalid = '';
  let response = 'Nothing yet.';
  let focused = false;
  let dirty = false;
  let invalid = false;
  let selected;
  $: disabled = focused || !value || !dirty || invalid;

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
>
  <Header>
    <Title id="fullscreen-title">Add a New Goal</Title>
    <IconButton action="close" class="material-icons">close</IconButton>
  </Header>
  <Content id="fullscreen-content">
    <div class="margins textbox">
      <Textfield textarea bind:value label="Add a new goal bruh!">
        <HelperText slot="helper"></HelperText>
      </Textfield>
    </div>
    <Select bind:value={valueHelperText} label="Select a Category">
      <Option value="" />
      {#each fruits as fruit}
        <Option value={fruit}>{fruit}</Option>
      {/each}
      <svelte:fragment slot="helperText"></svelte:fragment>
    </Select>
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
  .textbox{
    display: flex;
    flex-direction: column;
    padding: 10px;
    min-height: 50px;
  }
</style>


