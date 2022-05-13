<script lang='ts'>
  import { initMonth, initMonthItems } from './CalendarUtils.ts';
  import type { CalendarItemsType } from './CalendarUtils.ts';
  import Calendar from "./Calendar.svelte";
  import {createEventDispatcher, onMount} from 'svelte';

  export let items: CalendarItemsType[] = [];

  let completedItems = items;

  var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let now = new Date();
  let year = now.getFullYear();    //  this is the month & year displayed
  let month = now.getMonth();
  let eventText="Click an item or date";

  var days = [];  //  The days to display in each box

  $: month,year,initContent();

  // choose what date/day gets displayed in each date box.
  function initContent() {
    days = initMonth(month, year);
    completedItems = initMonthItems(days, items);
  }

  function itemClick(e) {
    eventText='itemClick '+JSON.stringify(e) + ' localtime='+e.date.toString();
  }
  function dayClick(e) {
    eventText='onDayClick '+JSON.stringify(e) + ' localtime='+e.date.toString();
  }
  function headerClick(e) {
    eventText='onHheaderClick '+JSON.stringify(e);
  }
  function next() {
    month++;
    if (month == 12) {
      year++;
      month=0;
    }
  }
  function prev() {
    if (month==0) {
      month=11;
      year--;
    } else {
      month--;
    }
  }

</script>

<div class="calendar-container">
  <div class="calendar-header">
    <h1>
      <button on:click={()=>year--}>&Lt;</button>
      <button on:click={()=>prev()}>&lt;</button>
        {monthNames[month]} {year}
      <button on:click={()=>next()}>&gt;</button>
      <button on:click={()=>year++}>&Gt;</button>
    </h1>
    {eventText}
  </div>

  <Calendar
    {days}
    items={completedItems}
    on:dayClick={(e)=>dayClick(e.detail)}
    on:itemClick={(e)=>itemClick(e.detail)}
    on:headerClick={(e)=>headerClick(e.detail)}
    />
</div>

<style>
.calendar-container {
  width: 90%;
  margin: auto;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #fff;
  max-width: 1200px;
}
.calendar-header {
  text-align: center;
  padding: 20px 0;
  background: #eef;
  border-bottom: 1px solid rgba(166, 168, 179, 0.12);
}
.calendar-header h1 {
  margin: 0;
  font-size: 18px;
}
.calendar-header button {
  background: #eef;
  border: 1px ;
  padding: 6;
  color: rgba(81, 86, 93, 0.7);
  cursor: pointer;
  outline: 0;
}
</style>
