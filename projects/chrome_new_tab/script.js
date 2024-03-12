// Selecting Clock ID's
let timeID = document.getElementById("time"),
  zoneID = document.getElementById("zone"),
  dayTimeID = document.getElementById("dayTime");

// Time Function
function startTime() {
    let a = new Date(),
    bHour = a.getHours(),
    hour = 0,
    bMin = a.getMinutes(),
    min = 0;

  //Hour format
  function hourFormat() {
    if (Radio12Hr.checked) {
      bHour === 0
        ? (hour = 12)
        : bHour > 12
          ? (hour = bHour - 12)
          : (hour = bHour);
    } else {
      hour = bHour;
    }
  }

  // Time Zone
  function timeZone() {
    if (Radio12Hr.checked === true) {
      if (bHour > 11) {
        zoneID.innerHTML = "PM";
      } else {
        zoneID.innerHTML = "AM";
      }
    } else if (Radio12Hr.checked === false) {
      zoneID.innerHTML = "";
    }
  }

  // Day Time
  function dayTime() {
    if (bHour >= 5 && bHour < 12) {
      dayTimeID.innerHTML = "Good Morning, ";
    } else if (bHour >= 12 && bHour < 16) {
      dayTimeID.innerHTML = "Good After Noon, ";
    } else if (bHour >= 16 && bHour < 21) {
      dayTimeID.innerHTML = "Good Evening, ";
    } else {
      dayTimeID.innerHTML = "Good Night, ";
    }
  }

  // Adding 0 to minutes
  function adding0() {
    bMin < 10 ? (min = `0${bMin}`) : (min = bMin);
    if (Radio24Hr.checked) {
      bHour < 10 ? (hour = `0${bHour}`) : (hour = bHour);
    }
  }

  hourFormat();
  timeZone();
  dayTime();
  adding0();

  // Printing Time
  timeID.innerHTML = `${hour}:${min}`
  setTimeout(startTime, 1000);
}
document.body.onload = startTime();
document.body.onload = BatteryFunction();

window.onclick = function (event) {
  // Close Setting on Outside Click
  let clickInsideSetting = event.target.closest("#setting-box");
  let clickInsideOpenSettingBtn = event.target.closest("#open-setting");
  if (!clickInsideSetting && !clickInsideOpenSettingBtn) {
    settingBox.style.width = "0px";
  }

  // Close Tasks
  let insideOpenTasksBtn = event.target.closest(".open-tasks");
  let insideTasksPane = event.target.closest(".tasks-pane");
  if (!insideOpenTasksBtn && !insideTasksPane) {
    tasksPane.style.width = "0px";
  }

  // Close Notes
  let insideOpenNotesBtn = event.target.closest(".open-notes");
  let insideNotesPane = event.target.closest(".notes-pane");
  if (!insideOpenNotesBtn && !insideNotesPane) {
    notesPane.style.width = "0px";
  }

  // Hide Left Side Button
  if (settingBox.style.width > "1px") {
    document.querySelector(".left-side-btns").style.display = "none";
  } else {
    setTimeout(() => {
      document.querySelector(".left-side-btns").style.display = "flex";
    }, 300);
  }

  // Hide Right Side Buttons
  if (tasksPane.style.width > "1px" || notesPane.style.width > "1px") {
    document.querySelector(".right-side-btns").style.display = "none";
  } else {
    setTimeout(() => {
      document.querySelector(".right-side-btns").style.display = "flex";
    }, 250);
  }

  // Hide Reset Box
  let clickInsideSureBox = event.target.closest("#sure-reset") !== null;
  if (!clickInsideSureBox && event.target !== resetBtn) {
    sureBox.style.height = "0px";
    sureBox.style.padding = "0px";
  }
};

// Shortcut Delete
shortcutContainer.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  console.log("contextmenu");
  shortcuts.forEach((element) => {
    element.style.animation = "rotate .4s linear infinite";
    element.addEventListener("click", removeShortcut);
  });
});

function removeShortcut(e) {
  e.preventDefault();
  e.stopPropagation();
  this.remove();
  localStorage.setItem("shortcut-container", shortcutContainer.innerHTML);
}

document.body.addEventListener("click", function () {
  shortcuts.forEach((element) => {
    element.style.animation = "none";
    element.removeEventListener("click", removeShortcut);
  });
});

// Show New Shortcut box
let newShortcutBox = document.getElementById("add-shortcut-box");
let newShortcutBtn = document.getElementById("new-shortcut");
newShortcutBtn.addEventListener("click", showNewShortcutBox);
newShortcutBtn.addEventListener("dblclick", showNewShortcutBox);
function showNewShortcutBox() {
  newShortcutBox.style.width = "400px";
  container.style.backdropFilter = "blur(20px)";
  timeContainer.style.display = "none";
  msgContainer.style.display = "none";
  searchContainer.style.display = "none";
  shortcutContainer.style.display = "none";
  document.querySelector(".left-side-btns").style.visibility = "hidden";
  document.querySelector(".right-side-btns").style.visibility = "hidden";
}

// Hide New Shortcut Box
let hideNewShortcutBtn = document.querySelector(".close-add-shortcut-box");
hideNewShortcutBtn.addEventListener("click", newShortcutFormReset);
function newShortcutFormReset() {
  addShortcutForm.reset();
  addFormBtn.disabled = true;
  previewImage.src = "https://cdn-icons-png.flaticon.com/128/1006/1006771.png";
  newShortcutBox.style.width = "0px";
  timeContainer.style.display = "flex";
  msgContainer.style.display = "block";
  searchContainer.style.display = "block";
  shortcutContainer.style.display = "grid";
  document.querySelector(".left-side-btns").style.visibility = "visible";
  document.querySelector(".right-side-btns").style.visibility = "visible";
  containerBlur();
}

// Add Shortcut Form Validation
let formNameInput = document.getElementById("form-name-input");
let formUrlInput = document.getElementById("form-url-input");
let addFormBtn = document.getElementById("done-shortcut-btn");

formNameInput.addEventListener("input", formButtomValidation);
formUrlInput.addEventListener("input", formButtomValidation);
formUrlInput.addEventListener("input", httpValidation);
function formButtomValidation() {
  if (
    formUrlInput.value.includes("http://") ||
    (formUrlInput.value.includes("https://") && formNameInput.value.length > 0)
  ) {
    addFormBtn.disabled = false;
  } else {
    addFormBtn.disabled = true;
  }
}
function httpValidation() {
  if (
    formUrlInput.value.includes("http://") ||
    formUrlInput.value.includes("https://")
  ) {
    document.querySelector(".http-error").style.display = "none";
  } else {
    document.querySelector(".http-error").style.display = "block";
  }
}

// URL Icon Update
const previewImage = document.getElementById("preview-img");
let newShortcutIconUrl =
  "https://cdn-icons-png.flaticon.com/128/1006/1006771.png";
formUrlInput.addEventListener("input", function () {
  newShortcutIconUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${formUrlInput.value}&sz=256`;
  previewImage.src = newShortcutIconUrl;
});

// Add new shortcut
let addShortcutForm = document.querySelector(".add-shortcut-form");
let newShortcut;
addShortcutForm.addEventListener("submit", function (event) {
  event.preventDefault();
  newShortcut = document.createElement("a");
  newShortcutBtn.insertAdjacentElement("beforebegin", newShortcut);
  newShortcut.outerHTML = `<a href="${formUrlInput.value}" class="shortcut" draggable="true">
  <div class="shortcut-icon">
  <img src="${newShortcutIconUrl}">
  </div>
  <div class="shortcut-title">${formNameInput.value}</div>
  </a>`;
  localStorage.setItem("shortcut-container", shortcutContainer.innerHTML);
  newShortcutFormReset();
  newTabOpen();
  iconCorners();
  shortcuts = document.querySelectorAll(".shortcut");
  shortcutDelete = document.querySelectorAll(".shortcut-delete");
});

// Battery Script
function BatteryFunction(){
  navigator.getBattery().then((battery) => {
    let batteryLevel = Math.round(battery.level * 100);
    let batteryInner = document.querySelector(".battery-inner");
    document.querySelector(
      ".battery-percentage"
    ).innerHTML = `${batteryLevel}%`;
    batteryInner.style.width = `${batteryLevel}%`;
    battery.charging
      ? (document.querySelector(".battery-charging").style.display = "block")
      : (document.querySelector(".battery-charging").style.display = "none");
    if (batteryLevel < 16) {
      batteryInner.style.background = "#b91c1c";
    } else if (batteryLevel > 15 && batteryLevel < 31) {
      batteryInner.style.background = "#fdba74";
    } else {
      batteryInner.style.background = "#16a34a";
    }
    setInterval(BatteryFunction, 1000)
  });
}

// Network Script
let networkImg = document.querySelector(".network-img");
window.addEventListener("offline", function () {
  networkImg.src = "https://cdn-icons-png.flaticon.com/128/11789/11789297.png";
});
window.addEventListener("online", function () {
  networkImg.src = "https://cdn-icons-png.flaticon.com/128/11433/11433365.png";
});