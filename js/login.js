var apiBaseUrl = "https://localhost:7272";
const messageDiv = document.getElementById("message");

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const emailInput = document.getElementById("email").value.trim();
  
  await requestLogin(usernameInput, passwordInput, emailInput);
});

async function requestLogin(usernameInput, passwordInput, emailInput) {
  const response = await fetch(apiBaseUrl + "/Auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ username: usernameInput, password: passwordInput, email: emailInput }),
    });
    if (response.status != 200) {
      messageDiv.textContent = "Login failed";
      messageDiv.style.color = "red";
    } else {
      const getToken = await response.json();
      localStorage.setItem('token', getToken.token);
      window.location.href = '../pages/user.html';
      return;
    }
    return;
}