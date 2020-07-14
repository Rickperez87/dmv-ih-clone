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

  calendar() {
    let arr = [],
      blank = [],
      dates = [],
      firstDay = this.d.getDay();
    for (let i = 1; i <= this.lastDay; i++) {
      arr.push(i);
    }
    for (let i = 1; i <= firstDay; i++) {
      blank.push("");
    }
    dates = blank.concat(arr);
    let allDates = dates.map((date) => `<td>${date}</td>`);

    allDates.splice(0, 0, `</tr>`);
    allDates.splice(8, 0, `</tr><tr>`);
    allDates.splice(16, 0, `</tr><tr>`);
    allDates.splice(24, 0, `</tr><tr>`);
    allDates.splice(32, 0, `</tr><tr>`);
    allDates.splice(42, 0, `</tr>`);
    return allDates.join("");
    // need to add tr tags to every 7th td and then can inner HTML tbody.
  }
}
const jan = new Month(2020, 1);
x = jan.firstDay();
firstDay = document.querySelector(`tbody>tr>td:nth-child(${x})`);
let tbody = document.querySelector("tbody");
firstDay.innerHTML = jan.daysOfMonth();
tbody.innerHTML = jan.calendar();

// create array of calendar dates with html markups
let f = new Date(2020, 0, 31);
