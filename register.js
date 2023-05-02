const form = document.getElementById("form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const terms = document.querySelector("#terms");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateRegisterForm()) {
   console.log("request")
  } else {
    console.log("no request - validation error");
  }
});

function validateRegisterForm() {
  let proceed = {
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    terms: true,
  };

  const firstNameError = document.querySelector("#firstNameError");
  const lastNameError = document.querySelector("#lastNameError");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");
  const termsError = document.querySelector("#termsError");

  const firstNameRegex = /^[A-Z][a-z]{1,19}$/;
  const lastNameRegex = /^[A-Z][a-z]{1,19}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!firstNameRegex.test(firstName.value)) {
    firstName.classList.add("error");
    firstNameError.classList.add("visible");
    proceed.firstName = false;
  } else {
    firstName.classList.remove("error");
    firstNameError.classList.remove("visible");
    proceed.firstName = true;
  }
  if (!lastNameRegex.test(lastName.value)) {
    lastName.classList.add("error");
    lastNameError.classList.add("visible");
    proceed.lastName = false;
  } else {
    lastName.classList.remove("error");
    lastNameError.classList.remove("visible");
    proceed.lastName = true;
  }
  if (!emailRegex.test(email.value)) {
    email.classList.add("error");
    emailError.classList.add("visible");
    proceed.email = false;
  } else {
    email.classList.remove("error");
    emailError.classList.remove("visible");
    proceed.email = true;
  }
  if (!passwordRegex.test(password.value)) {
    password.classList.add("error");
    passwordError.classList.add("visible");
    proceed.password = false;
  } else {
    password.classList.remove("error");
    passwordError.classList.remove("visible");
    proceed.password = true;
  }
  if (!terms.checked) {
    terms.classList.add("error");
    termsError.classList.add("visible");
    proceed.terms = false;
  } else {
    terms.classList.remove("error");
    termsError.classList.remove("visible");
    proceed.terms = true;
  }

  function shouldProceed(obj) {
    for (let key in obj) {
      if (!obj[key]) {
        return false;
      }
    }
    return true;
  }
  return shouldProceed(proceed);
}