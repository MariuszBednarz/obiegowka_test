
const userContent = document.getElementById("userContent");
const innerContent = document.getElementById("innerContent");
const logoutButton = document.querySelector(".logout");

const loggedOut = true;

if (loggedOut) {
  userContent.innerHTML = `<h3> Coś poszło nie tak.</h3> <p>Taki użytkownik nie istnieje, lub wystąpił błąd podczas logowania. Spróbuj ponownie później</p> <a href="login.html">Wróć do strony logowania</a>
  `;
} else {
  console.log("profile request")
}

logoutButton.addEventListener("click", () => {
  logout();
});

function logout() {
  window.location.href = "login.html";
}
