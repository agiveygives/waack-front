<script>
	import { Goal } from '@comp/Goal';

  export let goals = [];

  let todos = goals.filter((goal) => !goal.started);

  let inProgress = goals.filter((goal) => goal.started && !goal.complete);

  let complete = goals.filter((goal) => {
    return new Date(goal.complete).getDate() === new Date().getDate()
  });

  let zones = [
    {
      name: 'Todo',
      items: todos
    },
    {
      name: 'In Progress',
      items: inProgress
    },
    {
      name: 'Complete',
      items: complete
    }
  ];

  let hoveringOverZone;

  function dragStart(event, zoneIndex, itemIndex) {
    // The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the zone from which it is leaving.
    const data = {zoneIndex, itemIndex};
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
      class:complete={zoneIndex === 2}
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
          <li
            draggable={true}
            on:dragstart={event => dragStart(event, zoneIndex, itemIndex)}
          >
            <Goal goal={item} />
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

<style>
  .container {
    padding-top: 20px;
    height: 100%;
    width: 100%;
    display: grid;
    grid-auto-columns: 33%;
    grid-gap: 10px;
  }
  .col-header {
    text-align: center;
    font-family: 'Roboto';
  }
  .hovering {
    border-color: orange;
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
    border-radius: 5px;
    border: white solid 1px;
    text-align: center;
  }
  .todo {
    grid-column: 1 / 2;
  }

  .in-progress {
    grid-column: 2 / 3;
  }

  .complete {
    grid-column: 3 / 4;
  }
</style>
