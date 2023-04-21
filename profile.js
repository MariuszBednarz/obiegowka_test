const access_token = localStorage.getItem("access_token");
const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const userContent = document.getElementById("userContent");
const innerContent = document.getElementById("innerContent");
const logoutButton = document.querySelector(".logout")

if (!access_token) {
  userContent.innerHTML = `<h3> Coś poszło nie tak.</h3> <p>Taki użytkownik nie istnieje, lub wystąpił błąd podczas logowania. Spróbuj ponownie później</p> <a href="login.html">Wróć do strony logowania</a>
  `;
} else {
  getUser();
}

async function getUser() {
  try {
    const response = await fetch(`${BASE_URL}profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    result.forEach((item) => {
      innerContent.innerHTML += `<li>${item.userId} ${item.firstName} ${item.lastName}</li>`;
    });
  } catch (error) {
    console.log(error);
  }
}

logoutButton.addEventListener("click",()=>{
  logout();
})

function logout() {
  localStorage.setItem("access_token", "");
  window.location.href = "login.html";
}
