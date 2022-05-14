export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type DayType = {
  name: string,
  enabled: boolean,
  date: Date,
}

export const initMonth = (month: number, year: number) => {
  const days = [];

  const monthAbbrev = monthNames[month].slice(0,3);
  const nextMonthAbbrev = monthNames[(month+1)%12].slice(0,3);
  //	find the last Monday of the previous month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInThisMonth = new Date(year, month+1, 0).getDate();
  const daysInLastMonth = new Date(year, month, 0).getDate();
  const prevMonth = month==0 ? 11 : month-1;

  //	show the days before the start of this month (disabled) - always less than 7
  for (let i=daysInLastMonth-firstDay;i<daysInLastMonth;i++) {
    const d = new Date(prevMonth==11?year-1:year,prevMonth,i+1);
    days.push({name:''+(i+1),enabled:false,date:d,});
  }
  //	show the days in this month (enabled) - always 28 - 31
  for (let i=0;i<daysInThisMonth;i++) {
    const d = new Date(year,month,i+1);
    if (i==0) days.push({name:monthAbbrev+' '+(i+1),enabled:true,date:d,});
    else days.push({name:''+(i+1),enabled:true,date:d,});
    //console.log('i='+i+'  dt is '+d+' date() is '+d.getDate());
  }
  //	show any days to fill up the last row (disabled) - always less than 7
  for (let i=0;days.length%7;i++) {
    const d = new Date((month==11?year+1:year),(month+1)%12,i+1);
    if (i==0) days.push({name:nextMonthAbbrev+' '+(i+1),enabled:false,date:d,});
    else days.push({name:''+(i+1),enabled:false,date:d,});
  }

  return days
}

export type CalendarItemType = {
  title: string,
  date: Date,
  startCol?: number,
  startRow?: number,
}

const findRowCol = (days: DayType[], dt: Date) => {
  for (let i=0;i<days.length;i++) {
    const d = days[i].date;
    if (d.getFullYear() === dt.getFullYear()
      && d.getMonth() === dt.getMonth()
      && d.getDate() === dt.getDate())
      return {
        row: Math.floor(i / 7) + 2,
        col: i % 7 + 1
      };
  }
  return null;
}

export const initMonthItems = (days: DayType[], items: CalendarItemType[]) => {
  const monthItems = [];

  for (const i of items) {
    const rc = findRowCol(days, i.date);

    if (rc == null) {
      console.log('didn`t find date for ',i);
      console.log(i.date);
      console.log(days);
      i.startCol = i.startRow = 0;
    } else {
      i.startCol = rc.col;
      i.startRow = rc.row;
    }

    monthItems.push(i);
  }

  return monthItems;
}

export const nextMonth = (month: number, year: number) => {
  month++;

  if (month == 12) {
    year++;
    month=0;
  }

  return {
    month,
    year
  }
}
export const prevMonth = (month: number, year: number) => {
  if (month==0) {
    month=11;
    year--;
  } else {
    month--;
  }

  return {
    month,
    year
  }
}
