<script>
	import { Goal } from '@comp/Goal';
  import { goals as GoalsStore } from '@waack-gql/queries/goals.ts';
  import { goal } from '@waack-gql/mutations/updateGoal';

  export let goals = [];

  let todos = goals.filter((goal) => !goal.started);

  let inProgress = goals.filter((goal) => goal.started && !goal.complete);

  let complete = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  };

  goals
    .filter((goal) => {
      const goalDate = new Date(goal.complete);

      const todayObj = new Date();
      const todayDate = todayObj.getDate();
      const todayDay = todayObj.getDay();

      // get first date of week
      const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
      firstDayOfWeek.setHours(0);
      firstDayOfWeek.setMinutes(0);

      // get last date of week
      const lastDayOfWeek = new Date(firstDayOfWeek);
      console.log(lastDayOfWeek);
      console.log(lastDayOfWeek.getDate());
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
      lastDayOfWeek.setHours(23);
      lastDayOfWeek.setMinutes(59);

      // if date is equal or within the first and last dates of the week
      return goalDate >= firstDayOfWeek && goalDate <= lastDayOfWeek;
    })
    .map((goal) => {
      const goalDay = new Date(goal.complete).getDay();

      switch (goalDay) {
        case 0:
          complete.sunday.push(goal);
          break;
        case 1:
          complete.monday.push(goal);
          break;
        case 2:
          complete.tuesday.push(goal);
          break;
        case 3:
          complete.wednesday.push(goal);
          break;
        case 4:
          complete.thursday.push(goal);
          break;
        case 5:
          complete.friday.push(goal);
          break;
        case 6:
          complete.saturday.push(goal);
          break;
      }
    })

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

  const dailyZones = [
    {
      name: 'Sunday',
      items: complete.sunday
    },
    {
      name: 'Monday',
      items: complete.monday
    },
    {
      name: 'Tuesday',
      items: complete.tuesday
    },
    {
      name: 'Wednesday',
      items: complete.wednesday
    },
    {
      name: 'Thursday',
      items: complete.thursday
    },
    {
      name: 'Friday',
      items: complete.friday
    },
    {
      name: 'Saturday',
      items: complete.saturday
    },
  ]

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

    switch (zoneIndex) {
      case 0:
        goal.update({ uuid: item.uuid, complete: null, started: null }, GoalsStore.refetch)
        break;
      case 1:
        goal.update({ uuid: item.uuid, complete: null, started: new Date() }, GoalsStore.refetch)
        break;
    }

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
      <div class='days-container'>
        {#each dailyZones as zone, zoneIndex (zone)}
          <div class:sunday={zoneIndex === 6}>
            <div class='col-header'>{zone.name}</div>
            <ul
              class='day-container'
              class:hovering={hoveringOverZone === zone.name}
            >
              {#each zone.items as item, itemIndex (`${item.name}-${itemIndex}`)}
                <div>
                  <li>
                    <Goal goal={item} />
                  </li>
                </div>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
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
    list-style: none;
    width: fit-content;
    height: fit-content;
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 5px;
    float: none;
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
