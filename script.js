let contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", function (event) {
  console.log("Submit");
  event.preventDefault();
  contactForm.reset();
  Email.send({
    Host: "smtp.gmail.com",
    Username: "alihamasghurki4@gmail.com",
    Password: "123456845453534",
    To: "alihamasghurki4@gmail.com",
    From: document.getElementById("email").value,
    Subject: "This is the subject",
    Body: "And this is the body",
  }).then((message) => alert(message));
});
