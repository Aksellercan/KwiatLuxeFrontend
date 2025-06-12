import Globals from "./Globals.js";

const messageDiv = document.getElementById("message");

document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username").value.trim();
  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  await requestRegister(usernameInput, emailInput, passwordInput);
});

async function requestRegister(usernameInput, emailInput, passwordInput) {
  const response = await fetch(Globals.getapiBaseUrl() + "/Auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameInput, email: emailInput, password: passwordInput }),
    });

    if(response.status === 200) {
      await Globals.LoginandGetUserData(usernameInput, passwordInput, emailInput);
      return;
    } else {
      messageDiv.textContent = "Registration failed";
      messageDiv.style.color = "red";
    }
}