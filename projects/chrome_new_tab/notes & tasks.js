let openNotesBtn = document.querySelector(".open-notes");
let notesPane = document.querySelector(".notes-pane");

openNotesBtn.addEventListener("click", openNotesFunction);
function openNotesFunction() {
  notesPane.style.width = "400px";
  openNotesBtn.style.display = "none";
  openTasksBtn.style.display = "none";
}

let openTasksBtn = document.querySelector(".open-tasks");
let tasksPane = document.querySelector(".tasks-pane");

openTasksBtn.addEventListener("click", openTasksFunction);
function openTasksFunction() {
  tasksPane.style.width = "400px";
  openNotesBtn.style.display = "none";
  openTasksBtn.style.display = "none";
}

// Add Task Form
let addTaskForm = document.querySelector(".add-task-form");
let addedTasksDiv = document.querySelector(".added-tasks");
let idCount = 0;
addTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  idCount++;
  let taskInput = document.querySelector(".task-input").value;
  let newTask = document.createElement("div");
  addedTasksDiv.prepend(newTask);
  newTask.classList.add("task");
  newTask.innerHTML = `<input type="checkbox" id="task-checkbox${idCount}" class="task-checkbox" />
  <label for="task-checkbox${idCount}">&#10003; </label>
  <p class="task-text">${taskInput}</p>
  <p class="delete-task">&#10005;</p>`;

  document.querySelector(".task-input").value = "";
  localStorage.setItem("task", addedTasksDiv.innerHTML);

  deleteTaskFunction();
  doneTaskFunction();
});

// Done Task
function doneTaskFunction() {
  let taskCheckbox = document.querySelectorAll(".task-checkbox");
  let taskText = document.querySelectorAll(".task-text");
  taskCheckbox.forEach((checkbox, index) => {
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        checkbox.setAttribute("checked", "true");
        taskText[index].style.textDecoration = "line-through";
        taskText[index].style.color = "#d6d6d6";
        localStorage.setItem("task", addedTasksDiv.innerHTML);
      } else {
        checkbox.removeAttribute("checked");
        taskText[index].style.textDecoration = "none";
        taskText[index].style.color = "#fff";
        localStorage.setItem("task", addedTasksDiv.innerHTML);
      }
    });
  });
}
doneTaskFunction();

// Delete Task
function deleteTaskFunction() {
  let taskDelete = document.querySelectorAll(".delete-task");
  let task = document.querySelectorAll(".task");
  taskDelete.forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      task[index].remove();
      localStorage.setItem("task", addedTasksDiv.innerHTML);
    });
  });
}
deleteTaskFunction();

// <--------------------------------  Notes  -------------------------------->

let notesTitleInput = document.querySelector(".notes-title-input");
let notesDescInput = document.querySelector(".notes-desc-input");
let notesFormSubmit = document.querySelector(".notes-form-submit");

notesDescInput.addEventListener("input", function () {
  notesDescInput.style.height = "";
  notesDescInput.style.height = notesDescInput.scrollHeight + "px";
});

notesTitleInput.addEventListener("input", notesFormSubmitDisable);
notesDescInput.addEventListener("input", notesFormSubmitDisable);
function notesFormSubmitDisable() {
  if (notesTitleInput.value.length > 0 && notesDescInput.value.length > 0) {
    notesFormSubmit.removeAttribute("disabled");
  } else {
    notesFormSubmit.setAttribute("disabled", "true");
  }
}

// Add Notes Form
let addedNotesDiv = document.querySelector(".added-notes-div");
let addNoteForm = document.querySelector(".notes-form");

addNoteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let newNote = document.createElement("div");
  addedNotesDiv.prepend(newNote);
  newNote.classList.add("notes-box");
  let notesTitleInputValue = document.querySelector(".notes-title-input").value;
  let notesDescInputValue = document.querySelector(".notes-desc-input").value;
  let formattedDesc = notesDescInputValue.replace(/\n/g, "<br>");
  newNote.innerHTML = `<div class="added-note-title">${notesTitleInputValue}</div>
    <div class="added-note-desc">${formattedDesc}</div>
    <div class="note-delete">&#10005;</div>`;
  document.querySelector(".notes-title-input").value = "";
  document.querySelector(".notes-desc-input").value = "";
  document.querySelector(".notes-desc-input").style.height = "42px";
  notesFormSubmitDisable();

  localStorage.setItem("notes", addedNotesDiv.innerHTML);

  notes = document.querySelectorAll(".notes-box");
  deleteNote = document.querySelectorAll(".note-delete");
  deleteNoteFunction();
});

// Delete Notes
function deleteNoteFunction() {
  let notes = document.querySelectorAll(".notes-box");
  let deleteNote = document.querySelectorAll(".note-delete");
  deleteNote.forEach((element, index) => {
    element.addEventListener("click", function (event) {
      event.stopPropagation();
      notes[index].remove();
      localStorage.setItem("notes", addedNotesDiv.innerHTML);
    });
  });
}
deleteNoteFunction();
