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

//load any calendar events that are stored in local storage
function loadEvents(month) {
  let events = Store.getEvents();
  if (events) {
    events.forEach((event) => {
      if (Number(event.date.slice(0, 2)) - 1 === month) {
        backgroundImage(event.date, event.url);
      }
    });
  }
}

//load Calendar
window.onload = function () {
  //start Calendar
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
  this.loadEvents(c.currMonth);

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
  loadEvents(c.currMonth);
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
  } else {
    current = c.currMonth++;
    monthUI.innerHTML = `${c.months[c.currMonth]}`;
    tbody.innerHTML = c.calendarMarkup();
  }
  loadEvents(c.currMonth);
}

// Storage of Events

class Store {
  constructor(date, url) {
    this.date = date;
    this.url = url;
  }
  // On submit event date and URL stored in local storage
  storeEvents = () => {
    let events = Store.getEvents();
    console.log(events);
    events.push(this);
    localStorage.setItem("events", JSON.stringify(events));
  };
  static getEvents() {
    let events;
    if (localStorage.getItem("events") === null) {
      events = [];
    } else {
      events = JSON.parse(localStorage.getItem("events"));
    }
    return events;
  }
}
// on Submit add event to storage
(function addEvents() {
  let submit = document
    .getElementById("eventSubmit")
    .addEventListener("click", (e) => {
      (eventDate = document.getElementById("eventDate")),
        (eventUrl = document.getElementById("eventUrl"));
      let s = new Store(eventDate.value, eventUrl.value);
      s.storeEvents();
    });
})();
//executes render of event=>  backgroundImage(eventUrl.value, eventDate.value);

function backgroundImage(date, url) {
  let c = new Calendar(),
    month = Number(date[0]) + Number(date[1]) - 1,
    day = Number(date[3] + date[4]),
    year = Number(date.slice(6));

  console.log(year, month, day);
  let d = new Date(year, month, 1),
    firstDay = d.getDay(),
    calendarElements = firstDay + day;
  let item = document.querySelector(
    `tbody>tr:nth-child(${Math.ceil(calendarElements / 7)}) >td:nth-child(${
      calendarElements % 7 || 7
    })`
  );
  item.style = `background:url(${url}) no-repeat center center/cover`;
}

//psuedo code.==>>
//1. add display event to check year
//2. fix style for calendar date with background applied.
//3.clear form function
//4. delete event function.
