var day = $("#currentDay");
var timeBlock = $(".time-block");
var form = $(".schedule");
var inputItems = [];
var date = moment().format("dddd, MMMM Do");
var hour = moment().format("H");

function initializeSchedule() {

  timeBlock.each(function () {
    var block = $(this);
    var blockHour = parseInt(block.attr("data-hour"));
    var object = {
      hour: blockHour,
      text: "",
    }

    inputItems.push(object);
  });

  localStorage.setItem("todo-input", JSON.stringify(inputItems));

}

function timeBlockSetUp() {
  timeBlock.each(function () {
    var block = $(this);
    var blockHour = parseInt(block.attr("data-hour"));

    if (blockHour == hour) {
      block.addClass("present").removeClass("past future");
    }
    if (blockHour < hour) {
      block.addClass("past").removeClass("present future");
    }
    if (blockHour > hour) {
      block.addClass("future").removeClass("past present");
    }
  });
}

function renderSchedule() {
  inputItems = localStorage.getItem("todo-input");
  inputItems = JSON.parse(inputItems);

  for (var i = 0; i < inputItems.length; i++) {
    var hourItem = inputItems[i].hour;
    var textItem = inputItems[i].text;

    $("[data-hour=" + hourItem + "]").children("textarea").val(textItem);
  }
}

function save() {
  var block = $(this).parent();
  var hourUpdate = $(this).parent().attr("data-hour");
  var addItem = (($(this).parent()).children("textarea")).val();


  for (var h = 0; h < inputItems.length; h++) {
    if (inputItems[h].hour == hourUpdate) {
       inputItems[h].text = addItem;
    }
  }
  localStorage.setItem("todo-input", JSON.stringify(inputItems));
  renderSchedule();
}


$(document).ready(function () {


  timeBlockSetUp();

  if (!localStorage.getItem("todo-input")) {

    initializeSchedule();
  }

  day.text(date);

  renderSchedule();

  form.on("click", "button", save);

});