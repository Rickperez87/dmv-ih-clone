class Calendar {
  constructor() {
    this.months = [
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
    let d = new Date();
    this.currYear = d.getFullYear();
    this.currMonth = d.getMonth();
    this.currDay = d.getDate();
  }
  //creates calendar markup based on current month/year
  calendarMarkup() {
    let arr = [],
      firstWeekBlanks = [],
      LastWeekBlanks = [],
      dates = [],
      lastDay = new Date(this.currYear, this.currMonth + 1, 0).getDate(),
      firstDay = new Date(this.currYear, this.currMonth, 1).getDay();
    for (let i = 1; i <= lastDay; i++) {
      arr.push(i);
    }
    for (let i = 1; i <= firstDay; i++) {
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
      // add tr tags fore each row of calendar

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
    // add tr tags fore each row of calendar

    allDates.splice(0, 0, `</tr>`);
    allDates.splice(8, 0, `</tr><tr>`);
    allDates.splice(16, 0, `</tr><tr>`);
    allDates.splice(24, 0, `</tr><tr>`);
    allDates.splice(32, 0, `</tr><tr>`);
    allDates.splice(42, 0, `</tr>`);
    return allDates.join("");
  }
}

//load Calendar
window.onload = function () {
  //start Calendar
  console.log("run function");
  let c = new Calendar();
  // render Calendar
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = c.calendarMarkup();
  // render Calendar header
  let monthUI = document.getElementById("month"),
    yearUI = document.getElementById("year");
  monthUI.innerHTML = `${c.months[c.currMonth]}`;
  yearUI.innerHTML = `${c.currYear}`;
  //load any calendar events that are stored in local storage
  let events = Store.getEvents();
  if (events.month === c.currMonth) {
    backgroundImage(events.url, events.year, events.month, events.day);
  }
  // Cycle calendar using left and right buttons
  let left = document.getElementById("left"),
    right = document.getElementById("right");
  left.addEventListener("click", () => {
    updateLeft(c);
  });
  right.addEventListener("click", () => {
    updateRight(c);
  });
};

function updateLeft(c) {
  let monthUI = document.getElementById("month"),
    yearUI = document.getElementById("year"),
    tbody = document.querySelector("tbody");
  if (c.currMonth === 0) {
    c.currMonth = 11;
    c.currYear--;
    monthUI.innerHTML = `${c.months[c.currMonth]}`;
    yearUI.innerHTML = `${c.currYear}`;
    tbody.innerHTML = c.calendarMarkup();
  } else {
    c.currMonth--;
    monthUI.innerHTML = `${c.months[c.currMonth]}`;
    tbody.innerHTML = c.calendarMarkup();
  }
  let events = Store.getEvents();
  if (events.month === c.currMonth) {
    backgroundImage(events.url, events.year, events.month, events.day);
  }
}
function updateRight(c) {
  let monthUI = document.getElementById("month"),
    yearUI = document.getElementById("year"),
    tbody = document.querySelector("tbody");
  if (c.currMonth === 11) {
    c.currMonth = 0;
    c.currYear++;
    monthUI.innerHTML = `${c.months[c.currMonth]}`;
    yearUI.innerHTML = `${c.currYear}`;
    tbody.innerHTML = c.calendarMarkup();
  } else current = c.currMonth++;
  monthUI.innerHTML = `${c.months[c.currMonth]}`;
  tbody.innerHTML = c.calendarMarkup();
  let events = Store.getEvents();
  if (events.month === c.currMonth) {
    backgroundImage(events.url, events.year, events.month, events.day);
  }
}

// Storage of Events

class Store {
  constructor(date, url) {
    let d = new Calendar();
    this.month = date[0] + date[1] - 1;
    this.day = Number(date[3] + date[4]);
    this.year = Number(date.slice(6));
    this.name = `${d.months[this.month]} ${this.day}`;
    this.url = url;
  }
  // On submit event date and URL stored in local storage
  storeEvents() {
    localStorage.setItem("event", JSON.stringify(this));
  }
  static getEvents() {
    let event = JSON.parse(localStorage.getItem("event"));
    return event;
  }
}

// Submit url and date for future calendar event calls storeEvents
let submit = document
  .getElementById("eventSubmit")
  .addEventListener("click", (e) => {
    e.preventDefault();
    (eventDate = document.getElementById("eventDate")),
      (eventUrl = document.getElementById("eventUrl"));
    let s = new Store(eventDate.value, eventUrl.value);
    s.storeEvents();
    let events = Store.getEvents();
    backgroundImage(events.url, events.year, events.month, events.day);
  });

//executes render of event=>  backgroundImage(eventUrl.value, eventDate.value);

function backgroundImage(eventUrl, year, month, day) {
  let d = new Date(year, month, 1),
    firstDay = d.getDay();
  calendarELements = firstDay + Number(day);
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
