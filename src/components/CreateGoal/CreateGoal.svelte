<script>
  import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import Select, { Option } from '@smui/select';
  import Icon from '@smui/select/icon';
  import Chip, { Set, Text, TrailingAction } from '@smui/chips';
  import { goal } from '@waack-gql/mutations/createGoal.ts';

  export let open = false;
  export let refetchGoals = () => null;

  let categories = ['Technical Ability', 'Client Satisfaction/Feedback', 'Leadership', 'Nerdiness', 'Misc.'];

  let tagToAdd = '';

  let tagsToAdd = [];

  let name = '';
  let category = '';
  let valueLeadingIcon = '';
  let valueInvalid = '';
  let response = 'Nothing yet.';
  let focused = false;
  let dirty = false;
  let invalid = false;
  let selected;
  $: disabled = focused || !name || !dirty || invalid;
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
    <div class='container'>
      <div class="textbox">
        <Textfield
          style="height: 70%; width: 90%;"
          helperLine$style="height: 70%; width: 90%;"
          textarea
          bind:value={name}
          label="Add a new goal bruh!"
        >
          <HelperText slot="helper"></HelperText>
        </Textfield>
      </div>
      <div class='categories'>
        <Select style="width: 90%;" bind:value={category} label="Select a Category">
          <Option value="" />
          {#each categories as category}
            <Option value={category}>{category}</Option>
          {/each}
          <svelte:fragment slot="helperText"></svelte:fragment>
        </Select>
      </div>
      <div class='tags'>
        <span class='tag-input'>
          <Textfield
            style='width: 75%;'
            variant="outlined"
            bind:value={tagToAdd}
            label="Add a Tag"
          >
            <Icon
              class="material-icons"
              slot="leadingIcon"
              style="margin: auto 10px;"
            >
              local_offer
            </Icon>
          </Textfield>
        </span>
        <span>
          <Button
            variant="raised"
            on:click={() => {
              tagsToAdd = tagsToAdd.concat(tagToAdd);
              tagToAdd = '';
            }}
          >
            Add Tag
          </Button>
        </span>
      </div>
      <div class='added-tags'>
        <Set bind:chips={tagsToAdd} let:chip input>
          <Chip {chip}>
            <Text>{chip}</Text>
            <TrailingAction icon$class="material-icons">cancel</TrailingAction>
          </Chip>
        </Set>
      </div>
    </div>
  </Content>
  <Actions>
    <Button action="reject">
      <Label>Cancel</Label>
    </Button>
    <Button
      action="accept"
      defaultAction
      on:click={() => {
        goal.create(name, [category, ...tagsToAdd], refetchGoals)
      }}
    >
      <Label>Add New Goal</Label>
    </Button>
  </Actions>
</Dialog>

<style>
  .container {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 25% 25% 25% 25%;
    grid-gap: 20px;
    min-height: 40vh;
  }
  .textbox {
    padding: 10px;
    height: 100%;
    width: 100%;
    grid-column: 1 / 2;
    grid-row: 1 / 5;
  }
  .categories {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  .tags {
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  .added-tags {
    width: 100%;
    height: 100%;
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
</style>


