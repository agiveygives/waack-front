<script lang='ts'>
  import Calendar from '@comp/Calendar';
  import type { CalendarItemType } from '@comp/Calendar/CalendarUtils';
	import { Goal } from '@comp/Goal';

	export let year;
	export let month;
  export let goals = [];

  let todos = goals.filter((goal) => !goal.started);

  let inProgress = goals.filter((goal) => goal.started && !goal.complete);

  let completedItems = goals
    .filter((goal) => {
      return new Date(goal.complete).getMonth() === month
    })
    .map((goal) => (
      {
        title: goal.name,
        date: new Date(goal.complete)
      }
    ));

  let zones = [
    {
      name: 'Todo',
      items: todos
    },
    {
      name: 'In Progress',
      items: inProgress
    },
  ];

  let hoveringOverZone;

  function dragStart(event, zoneIndex, itemIndex) {
    // The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the zone from which it is leaving.
    const data = { zoneIndex, itemIndex };
    event.dataTransfer.setData('text/plain', JSON.stringify(data));
  }

  function drop(event, zoneIndex) {
    event.preventDefault();
    const json = event.dataTransfer.getData("text/plain");
    const data = JSON.parse(json);

    // Remove the item from one zone.
    // Splice returns an array of the deleted elements, just one in this case.
    const [item] = zones[data.zoneIndex].items.splice(data.itemIndex, 1);

    // Add the item to the drop target zone.
    zones[zoneIndex].items.push(item);
    zones = zones;

    hoveringOverZone = null;
  }
</script>

<div class='container'>
  {#each zones as zone, zoneIndex (zone)}
    <div
      class:todo={zoneIndex === 0}
      class:in-progress={zoneIndex === 1}
    >
      <div class='col-header'>{zone.name}</div>
      <ul
        class='goals-container'
        class:hovering={hoveringOverZone === zone.name}
        on:dragenter={() => hoveringOverZone = zone.name}
        on:dragleave={() => hoveringOverZone = null}
        on:drop={event => drop(event, zoneIndex)}
        ondragover="return false"
      >
        {#each zone.items as item, itemIndex (`${item.name}-${itemIndex}`)}
          <div>
            <li
              draggable={true}
              on:dragstart={event => dragStart(event, zoneIndex, itemIndex)}
            >
              <Goal goal={item} />
            </li>
          </div>
        {/each}
      </ul>
    </div>
  {/each}

  <div class='week-container'>
    <div class='col-header'>Completed</div>
      <Calendar
        {month}
        {year}
        items={completedItems}
      />
  </div>
</div>

<style>
  .container {
    padding-top: 20px;
    height: 100%;
    width: 100%;
    display: grid;
    grid-auto-columns: 50%;
    grid-gap: 10px;
  }
  .col-header {
    text-align: center;
    font-family: 'Roboto';
  }
  .hovering {
    border-color: orange;
  }
  .item {
    display: block;
  }
  li {
    list-style:none;
  }
  ul {
    border: solid lightgray 1px;
    color: black;
    background-color: white;
    height: 40px; /* needed when empty */
    padding: 10px;
  }

  .goals-container {
    height: 100%;
    border: white solid 1px;
    text-align: center;
    border-radius: 5px;
  }
  .todo {
    grid-column: 1 / 2;
  }
  .in-progress {
    grid-column: 2 / 3;
  }

  .week-container {
    margin-top: 100px;
    height: 100%;
    text-align: center;
    grid-column: 1 / 3;
  }
  .days-container {
    height: 100%;
    text-align: center;
    display: grid;
    grid-auto-columns: 13.75%;
    grid-gap: 10px;
    padding-top: 20px;
  }
  .day-container {
    height: 100%;
    border-radius: 5px;
  }
  .sunday {
    grid-column: 7 / 8;
  }
  .completed-item {
    draggable: none;
  }
</style>
