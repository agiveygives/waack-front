<script lang="ts">
  import Select, { Option } from '@smui/select';
  import Button, { Icon, Label } from '@smui/button';
  import { Daily, Weekly, Monthly } from '@comp/GoalsCalendar';
  import { nextMonth, prevMonth } from '@comp/Calendar/CalendarUtils';
  import { Header } from '@comp/Header';

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
      <button on:click={()=>year--}>&Lt;</button>
      <button
        on:click={() => {
          const prev = prevMonth(month, year);

          month = prev.month;
          year = prev.year;
        }}
      >
        &lt;
      </button>
        {monthNames[month]} {year}
      <button
      on:click={() => {
        const next = nextMonth(month, year);

        month = next.month;
        year = next.year;
      }}
      >
        &gt;
      </button>
      <button on:click={()=>year++}>&Gt;</button>
    {/if}
  </span>

  <span class="add-goal">
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
{:else if value === 'Monthly'}
  <Monthly
    {month}
    {year}
  />
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
  .add-goal {
    grid-column: 3/4;
    margin-left: auto;
  }
</style>
