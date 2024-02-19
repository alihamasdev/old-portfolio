function toggleAnswer(id) {
  var answer = document.getElementById("answer" + id);
  var sign = document.getElementById("sign" + id);
  if (answer.style.display === "none" || answer.style.display === "") {
    answer.style.display = "block";
    sign.classList.remove("fa-plus");
    sign.classList.add("fa-xmark");
  } else {
    answer.style.display = "none";
    sign.classList.remove("fa-xmark");
    sign.classList.add("fa-plus");
  }
}
