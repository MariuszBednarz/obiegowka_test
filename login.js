const form = document.getElementById("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const remember = document.querySelector("#rememberCheckbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateLoginForm()) {
    console.log("request");
  } else {
    console.log("no request - validation error");
  }
});

function validateRegisterForm() {
  let proceed = {
    email: true,
    password: true,
  };

  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
