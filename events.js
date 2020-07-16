class Month {
  static months = [
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
  constructor(year, month) {
    this.yr = year;
    this.m = month;
  }
  //   retrieve first day of the month and display date on calendar HTML element
  getFirstDay() {
    let firstDateDayOfWkIndex = new Date(this.yr, this.m, 1).getDay();
    return firstDateDayOfWkIndex;
  }
  getLastDay() {
    let lastDate = new Date(this.yr, this.m + 1, 0).getDate();
    return lastDate;
  }
  getMonth() {
    let monthIndex = new Date(this.yr, this.m, 1).getMonth();
    return months[monthIndex];
  }
  calendar() {
    let arr = [],
      firstWeekBlanks = [],
      LastWeekBlanks = [],
      dates = [];
    for (let i = 1; i <= this.getLastDay(); i++) {
      arr.push(i);
    }
    for (let i = 1; i <= this.getFirstDay(); i++) {
      firstWeekBlanks.push("");
    }
    dates = firstWeekBlanks.concat(arr);

    // add blanks to last row to make full row
    if (dates.length % 7 !== 0) {
      let i = dates.length;
      while (i % 7 !== 0) {
        LastWeekBlanks.push("");
        i++;
      }
      dates = dates.concat(LastWeekBlanks);
    }

    if (dates.length - 1 >= 35) {
      let allDates = dates.map((date) => `<td>${date}</td>`);
      // need to add tr tags fore each row of calendar

      allDates.splice(0, 0, `</tr>`);
      allDates.splice(8, 0, `</tr><tr>`);
      allDates.splice(16, 0, `</tr><tr>`);
      allDates.splice(24, 0, `</tr><tr>`);
      allDates.splice(32, 0, `</tr><tr>`);
      allDates.splice(40, 0, `</tr><tr>`);
      allDates.splice(48, 0, `</tr>`);
      return allDates.join("");
    }
    let allDates = dates.map((date) => `<td>${date}</td>`);
    // need to add tr tags fore each row of calendar

    allDates.splice(0, 0, `</tr>`);
    allDates.splice(8, 0, `</tr><tr>`);
    allDates.splice(16, 0, `</tr><tr>`);
    allDates.splice(24, 0, `</tr><tr>`);
    allDates.splice(32, 0, `</tr><tr>`);
    allDates.splice(42, 0, `</tr>`);
    return allDates.join("");
  }

  static fullYear(year) {
    let fullyear = [];
    this.months.map((month, index) => {
      month = new Month(year, index);
      fullyear.push(month);
    });
    return fullyear;
  }
}
// create array of calendar dates with html markups
function displayMonth(year, month) {
  const MonthsObj = Month.fullYear(year);
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
  let x = MonthsObj[months.indexOf(month)].getFirstDay(),
    firstDay = document.querySelector(`tbody>tr>td:nth-child(${x + 1})`),
    tbody = document.querySelector("tbody");
  firstDay.innerHTML = MonthsObj[months.indexOf(month)].getMonth();
  tbody.innerHTML = MonthsObj[months.indexOf(month)].calendar();
}
(function setMonth() {
  // display month on UI of calendar
  let monthIndex = new Date().getMonth(),
    monthUI = document.getElementById("month"),
    yearUI = document.getElementById("year"),
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
    ],
    current = months[monthIndex];
  currentYear = 2020;

  monthUI.innerHTML = `${current}`;
  yearUI.innerHTML = `${currentYear}`;
  displayMonth(2020, `${current}`);
  // click event to control current
  let left = document.getElementById("left"),
    right = document.getElementById("right");
  left.addEventListener("click", () => {
    updateLeft();
  });
  right.addEventListener("click", () => {
    updateRight();
  });
  function updateLeft() {
    if (monthIndex === 0) {
      monthIndex = 11;
      current = this.months[monthIndex];
      currentYear--;
      monthUI.innerHTML = `${current}`;
      yearUI.innerHTML = `${currentYear}`;
      displayMonth(`${currentYear}`, `${current}`);
    } else monthIndex--;
    current = this.months[monthIndex];
    monthUI.innerHTML = `${current}`;
    displayMonth(2020, `${current}`);
  }
  function updateRight() {
    if (monthIndex === 11) {
      monthIndex = 0;
      current = this.months[monthIndex];
      currentYear++;
      monthUI.innerHTML = `${current}`;
      yearUI.innerHTML = `${currentYear}`;
      displayMonth(`${currentYear}`, `${current}`);
    } else monthIndex++;
    current = this.months[monthIndex];
    monthUI.innerHTML = `${current}`;
    displayMonth(`${currentYear}`, `${current}`);
  }
})();

class Store {
  constructor(day, year, name, url) {
    this.day = day;
    this.year = year;
    this.name = name;
    this.url = url;
  }
}

// On submit event date and URL stored in local storage
function storeEvents(date, url) {
  let month = date[0] + date[1] - 1,
    day = date[3] + date[4],
    year = date.slice(6),
    name = `${Month.months[month]} ${day}`;
  let event = new Store(day, year, name, url);
  localStorage.setItem(name, JSON.stringify(event));
  console.log(MonthsObj[month]);
}

// Submit url and date for future calendar event calls storeEvents
let submit = document
  .getElementById("eventSubmit")
  .addEventListener("click", (e) => {
    e.preventDefault();
    (eventDate = document.getElementById("eventDate")),
      (eventUrl = document.getElementById("eventUrl"));
    storeEvents(eventDate.value, eventUrl.value);
  });

//executes render of event=>  backgroundImage(eventUrl.value, eventDate.value);

function backgroundImage(eventUrl, date) {
  let month, year, day, calendarELements;
  month = date[0] + date[1] - 1;
  day = date[3] + date[4];
  year = date.slice(6);
  let d = new Date(year, month, 1),
    firstDay = d.getDay();
  calendarELements = firstDay + Number(day);
  console.log(calendarELements);
  let item = document.querySelector(
    `tbody>tr:nth-child(${Math.ceil(calendarELements / 7)}) >td:nth-child(${
      calendarELements % 7 || 7
    })`
  );
  item.style = `background:url(${eventUrl}) no-repeat center center/cover`;
}

//psuedo code.==>>
//1. Store year object in local storage set events property false by default.
//2.If submit event for the month set the object in storage events property to true.
//2. have the change month event listner have a if event:true execute
//function to retrieve from local storage and function to display on DOM.
