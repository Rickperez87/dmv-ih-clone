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
  }
  //creates calendar markup based on current month/year
  calendarMarkup() {
    let cY = this.currYear,
      cM = this.currMonth;
    let lastDay = new Date(cY, cM + 1, 0).getDate(),
      firstDay = new Date(cY, cM, 1).getDay(),
      lastWeekBlanks = 6 - new Date(cY, cM, lastDay).getDay();

    //create array of html markup for current year and month;
    let calHtml = [
      ...Array(firstDay + lastDay + lastWeekBlanks + 1).keys(),
    ].map((elem, i) => {
      let dayOfTheWeek = new Date(cY, cM, i - firstDay).getDay();

      //add empty calendar square for first and last week of the month
      if (i <= firstDay || i >= firstDay + lastDay + 1) {
        return (elem = `<td>${""}</td>`);
      } else {
        //if the day of the week is sunday prepend a new row
        elem =
          dayOfTheWeek === 0
            ? `</tr><tr><td>${i - firstDay}</td>`
            : `<td>${i - firstDay}</td>`;
        return elem;
      }
    });
    calHtml.shift();
    return calHtml.join("");
  }
}

//load any calendar events that are stored in local storage
function loadEvents(month, year) {
  let events = Store.getEvents();
  if (events) {
    events.forEach((event) => {
      if (
        Number(event.date.slice(0, 2)) - 1 === month &&
        Number(event.date.slice(6)) === year
      ) {
        backgroundImage(event.date, event.url);
      }
    });
  }
}

//load Calendar
window.onload = function () {
  let tbody = document.querySelector("tbody"),
    monthUI = document.getElementById("month"),
    yearUI = document.getElementById("year");

  //start Calendar
  let c = new Calendar();
  displayCalendar();

  //load any calendar events that are stored in local storage
  this.loadEvents(c.currMonth, c.currYear);

  // left & right arrows event
  let left = document.getElementById("left"),
    right = document.getElementById("right");
  left.addEventListener("click", () => {
    updateLeft(c);
  });
  right.addEventListener("click", () => {
    updateRight(c);
  });

  // on Submit add event to storage reload page which renders stored event on calendar
  (function addEvents() {
    let submit = document
      .getElementById("eventSubmit")
      .addEventListener("click", (e) => {
        (eventDate = document.getElementById("eventDate")),
          (eventUrl = document.getElementById("eventUrl"));
        let s = new Store(eventDate.value, eventUrl.value);
        s.storeEvents();
        if (
          Number(s.date.slice(0, 2)) - 1 === c.currMonth &&
          Number(s.date.slice(6)) === c.currYear
        ) {
          loadEvents(c.currMonth, c.currYear);
        }
        eventDate.value = "";
        eventUrl.value = "";
      });
  })();

  //Update the current month, back one month
  function updateLeft(c) {
    if (c.currMonth === 0) {
      c.currMonth = 11;
      c.currYear--;
    } else {
      c.currMonth--;
    }
    displayCalendar();
    loadEvents(c.currMonth, c.currYear);
  }

  //Update the current month, forward one month
  function updateRight(c) {
    if (c.currMonth === 11) {
      c.currMonth = 0;
      c.currYear++;
    } else {
      current = c.currMonth++;
    }
    displayCalendar();
    loadEvents(c.currMonth, c.currYear);
  }
  function displayCalendar() {
    monthUI.innerHTML = `${c.months[c.currMonth]}`;
    yearUI.innerHTML = `${c.currYear}`;
    tbody.innerHTML = c.calendarMarkup();
  }
};

// Storage class, creates objects to store submited calendar events
class Store {
  constructor(date, url) {
    this.date = date;
    this.url = url;
  }

  // set event date and URL of background image in local storage
  storeEvents = () => {
    let events = Store.getEvents();
    events.push(this);
    localStorage.setItem("events", JSON.stringify(events));
  };

  // get events stored in local storage
  static getEvents() {
    let events =
      localStorage.getItem("events") === null
        ? []
        : JSON.parse(localStorage.getItem("events"));

    return events;
  }
}

//display background image on calendar date passed
function backgroundImage(date, url) {
  (month = Number(date[0]) + Number(date[1]) - 1),
    (day = Number(date[3] + date[4])),
    (year = Number(date.slice(6)));

  let d = new Date(year, month, 1),
    firstDay = d.getDay(),
    calendarElements = firstDay + day;
  let item = document.querySelector(
    `tbody>tr:nth-child(${Math.ceil(calendarElements / 7)}) >td:nth-child(${
      calendarElements % 7 || 7
    })`
  );
  item.style = `background:url(${url}) no-repeat center center/cover`;
  // Add class for background behind date to make it visible with image background if applicable
  let eventDate = item.innerHTML;
  item.innerHTML = `<span class='eventDate'>${eventDate}</span>`;
}

//psuedo code.==>>

//2. delete event function.
