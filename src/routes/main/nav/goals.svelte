<script lang="ts">
  import Select, { Option } from '@smui/select';
  import Button, { Icon, Label } from '@smui/button';
  import { Daily, Weekly, Monthly } from '@components/GoalsCalendar';

  let calendarOptions = [
    'Daily',
    'Weekly',
    'Monthly'
  ];

  let value = calendarOptions[2];
</script>

<div class='header'>Goals</div>
<span>
  <Select bind:value>
    {#each calendarOptions as option}
      <Option value={option}>{option}</Option>
    {/each}
  </Select>

  <span class='add-goal'>
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
  .header {
    font-size: 40px;
    font-weight: 'bold';
    padding-bottom: 20px;
    font-family: 'Roboto'
  }

  .add-goal {
    float: right;
  }
</style>
