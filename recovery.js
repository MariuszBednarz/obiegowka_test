const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateRegisterForm()) {
    console.log("request");
    const success = document.getElementById("success");
    success.classList.add("show");
    setTimeout(() => {
      success.classList.remove("show");
    }, 2000);
  } else {
    console.log("no request");
    const format = document.getElementById("format");
    format.classList.add("show");
    setTimeout(() => {
      format.classList.remove("show");
    }, 2000);
  }
});

function validateRegisterForm() {
  let proceed = true;

  const email = document.querySelector("#email");
  const emailError = document.querySelector("#emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value)) {
    email.classList.add("error");
    emailError.classList.add("visible");
    proceed = false;
  } else {
    email.classList.remove("error");
    emailError.classList.remove("visible");
    proceed = true;
  }

  function shouldProceed(v) {
    if (!v) {
      return false;
    }
    return true;
  }
  return shouldProceed(proceed);
}
