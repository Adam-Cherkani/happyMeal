var Calendar = FullCalendar.Calendar;
var Draggable = FullCalendar.Draggable;

let list = JSON.parse(localStorage.getItem("favRecipes"));

function createRecipeList() {
  let containerEl = document.getElementById("external-events-list");

  containerEl.innerHTML = "";

  list.forEach((element) => {
    let recipeDiv = document.createElement("div");
    recipeDiv.classList.add("fc-event");

    recipeDiv.textContent = element.nom;

    recipeDiv.setAttribute(
      "data-event",
      JSON.stringify({
        id: element.id,
        title: element.nom,
        start: "2024-04-11",
      })
    );

    containerEl.appendChild(recipeDiv);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createRecipeList();
});

document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.querySelector("#calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next,today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    events: list,
    editable: true,

    eventDrop: function (info) {
      alert(
        info.event.title + " was dropped on " + info.event.start.toISOString()
      );
    },

    eventClick: function (info) {
      info.event.remove();
    },
  });

  calendar.render();

  let containerEl = document.getElementById("external-events-list");
  new Draggable(containerEl, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      return JSON.parse(eventEl.getAttribute("data-event"));
    },
  });
});

let test = 1;

console.log(test);
