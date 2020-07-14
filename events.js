class Month {
  constructor(year, month) {
    let days, months, d, lastDay, dates;
    this.year = year;
    this.month = month;
    this.d = new Date(this.year, this.month - 1, 1);
    this.days = days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.months = months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.lastDay = 31;
  }
  //   retrieve first day of the month and display date on calendar HTML element
  firstDay() {
    return this.d.getDay() + 1;
  }
  daysOfMonth() {
    return this.d.getDate();
  }
  numberOfDays() {
    let arr = [];
    for (let i = 1; i <= this.lastDay; i++) {
      arr.push(i);
    }
    return arr;
  }
}
const jan = new Month(2020, 1);
x = jan.firstDay();
firstDay = document.querySelector(`tbody>tr>td:nth-child(${x})`);
firstDay.innerHTML = jan.daysOfMonth();
console.log(jan.numberOfDays());
// add dates for all the rest of the month html element
