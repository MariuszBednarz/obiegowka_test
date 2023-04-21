const BASE_URL = "https://ds-elp2-be.herokuapp.com/"

const form = document.getElementById("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const success = document.getElementById("success");
const failed = document.getElementById("failed");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateRegisterForm()) {
    const data = {
      "email": email.value,
      "password": password.value
    }
    login(data);
  } else {
    console.log("no request");
  }
});

async function login(data) {
  try {
    const response = await fetch(`${BASE_URL}auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await response.json();
    if (result.message == "Unauthorized"){
      failed.classList.add("show");
      setTimeout(() => {
        failed.classList.remove("show");
      }, 3000);
    } else {
      localStorage.setItem('access_token', result.access_token);
      success.classList.add("show");
      setTimeout(() => {
        success.classList.remove("show");
        window.location.href = "profile.html";
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
}



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
      console.log(obj[key]);
      if (!obj[key]) {
        return false;
      }
    }
    return true;
  }
  return shouldProceed(proceed);
}

