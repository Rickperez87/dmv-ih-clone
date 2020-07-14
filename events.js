class Month {
  constructor(year, month) {
    let days, months, d, lastDay, dates;
    months = [
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
    this.yr = year;
    this.m = month;
    this.d = new Date(this.yr, this.m, 1);
    this.month = months[this.d.getMonth()];
    // this.days = days = [
    //   "Sunday",
    //   "Monday",
    //   "Tuesday",
    //   "Wednesday",
    //   "Thursday",
    //   "Friday",
    //   "Saturday",
    // ];

    this.lastDay = new Date(this.yr, this.m + 1, 0).getDate();
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
  static fullYear(year) {
    let fullyear = [],
      months = [
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
    months.map((month, index) => {
      month = new Month(year, index);
      fullyear.push(month);
    });
    return fullyear;
  }
}
// create array of calendar dates with html markups
function displayMonth(year, month) {
  const MonthsObj = Month.fullYear(year),
    months = [
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
  console.log(MonthsObj);
  x = MonthsObj[months.indexOf(month)].firstDay();
  firstDay = document.querySelector(`tbody>tr>td:nth-child(${x})`);
  let tbody = document.querySelector("tbody");
  firstDay.innerHTML = MonthsObj[months.indexOf(month)].daysOfMonth();
  tbody.innerHTML = MonthsObj[months.indexOf(month)].calendar();
}
displayMonth(2020, "July");
