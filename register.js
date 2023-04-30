const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const form = document.getElementById("form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const terms = document.querySelector("#terms");

const main = document.querySelector("main");
const popup = document.querySelector("#popup");

const success = document.getElementById("success");
const failed = document.getElementById("failed");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateRegisterForm()) {
    const data = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
    };
    register(data);
    localStorage.setItem("registered_email", email.value);
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

async function register(data) {
  try {
    const response = await fetch(`${BASE_URL}auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      handleSuccess();
    } else if (response.status === 403) {
      handleFailure("Taki user istnieje, użyj innego maila");
      return;
    }
  } catch (error) {
    handleFailure("Coś poszło nie tak!");
    console.error("err", error);
  }
}

const handleSuccess = function () {
  main.classList.add("blur");
  popup.classList.add("showPopup");
  setTimeout(() => {
    main.classList.remove("blur");
    popup.classList.remove("showPopup");
    success.classList.add("show");
    setTimeout(() => {
      success.classList.remove("show");
      window.location.href = "confirm.html";
    }, 1500);
  }, 1500);
};

const handleFailure = function (message) {
  failed.innerHTML = message;
  failed.classList.add("show");
  setTimeout(() => {
    failed.classList.remove("show");
  }, 1500);
};
