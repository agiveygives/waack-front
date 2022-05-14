<script lang="ts">
  import CircularProgress from '@smui/circular-progress';
	import IconButton from '@smui/icon-button';
  import Select, { Option } from '@smui/select';
  import Button, { Icon, Label } from '@smui/button';
  import { Daily, Weekly, Monthly } from '@comp/GoalsCalendar';
  import { nextMonth, prevMonth } from '@comp/Calendar/CalendarUtils';
  import { Header } from '@comp/Header';
  import { goals } from '@waack-gql/queries/goals.ts';

  let calendarOptions = ['Daily', 'Weekly', 'Monthly'];

  let value = calendarOptions[0];

  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
</script>

<Header header="Goals" />
<span class='header-controls'>
  <div class='select'>
    <Select bind:value>
      {#each calendarOptions as option}
        <Option value={option}>{option}</Option>
      {/each}
    </Select>
  </div>

  <span class='month'>
    {#if value === 'Monthly'}
      <IconButton class='material-icons' on:click={()=>year--}>
        keyboard_double_arrow_left
      </IconButton>
      <IconButton
        class='material-icons'
        on:click={() => {
          const prev = prevMonth(month, year);

          month = prev.month;
          year = prev.year;
        }}
      >
        keyboard_arrow_left
      </IconButton>
      <h2 class='month-text'>
        {monthNames[month]} {year}
      </h2>
      <IconButton
        class='material-icons'
        on:click={() => {
          const next = nextMonth(month, year);

          month = next.month;
          year = next.year;
        }}
      >
        keyboard_arrow_right
      </IconButton>
      <IconButton class='material-icons' on:click={()=>year++}>
        keyboard_double_arrow_right
      </IconButton>
    {/if}
  </span>

  <span class="add-goal">
    <Button on:click={() => console.log('Add a Goal')}>
      <Icon class="material-icons">add</Icon>
      <Label>Add a Goal</Label>
    </Button>
  </span>
</span>

{#if $goals.status === 'lodaing'}
  <CircularProgress style="height: 32px; width: 32px;" indeterminate />
{:else if $goals.status === 'success'}
  {#if value === 'Daily'}
    <Daily goals={$goals.data} />
  {:else if value === 'Weekly'}
    <Weekly goals={$goals.data} />
  {:else if value === 'Monthly'}
    <Monthly
      goals={$goals.data}
      {month}
      {year}
    />
  {/if}
{:else if $goals.status === 'error'}
  <p>{$goals.error.message}</p>
{/if}

<style>
  .header-controls {
    display: grid;
    grid-auto-columns: 33%;
    align-items: center;
  }
  .select {
    grid-column: 1/2;
    max-width: 30%;
  }
  .month {
    grid-column: 2/3;
    margin-left: auto;
    margin-right: auto;
  }
  .month-text {
    display: inline;
    font-family: 'roboto'
  }
  .add-goal {
    grid-column: 3/4;
    margin-left: auto;
  }
</style>
