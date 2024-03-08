var showHideCheckbox = document.getElementById("show_hide_checkbox");
var Pass = document.getElementById("password");
var showHIdeCheckLabel = document.getElementById("show_hide_check_label");

// Password Show Hide Function
function onClickShowHide() {
    if (Pass.type === "password") {
        Pass.type = "text";
    } else {
        Pass.type = "password";
    }
}

showHideCheckbox.addEventListener("click", onClickShowHide)

// Show Hide Text Changing Function
function ShowHideText() {

    if (showHideCheckbox.checked) {
        showHIdeCheckLabel.innerHTML = "HIDE";
    }
    else {
        showHIdeCheckLabel.innerHTML = "SHOW";
    }
}

showHideCheckbox.addEventListener("click", ShowHideText)