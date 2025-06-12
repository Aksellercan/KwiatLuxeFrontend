const apiBaseUrl = "https://localhost:7272";

function getapiBaseUrl() {
    return apiBaseUrl;
}

async function getUserDetails() {
    const response = await fetch(apiBaseUrl + "/Auth/CurrentUser", {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === 200) {
        const userDetails = await response.json();
        //temporary method before implementing HTTP-Only Tokens
        localStorage.setItem('id', userDetails.id);
        localStorage.setItem('username', userDetails.username);
        localStorage.setItem('email', userDetails.email);
        localStorage.setItem('role', userDetails.role);
        return true
    } else {
        console.log(`Error: Status Code ${response.status}`);
        return false;
    }
}

async function LoginandGetUserData(usernameInput, passwordInput, emailInput) {
    const response = await fetch(apiBaseUrl + "/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password: passwordInput, email: emailInput }),
    });
    if (response.status != 200) {
        console.log("Something went TERRIBLY wrong!!!");
    } else {
        const getToken = await response.json();
        //Temporary
        localStorage.setItem('token', getToken.token);
        if (localStorage.getItem('token') === null) {
            console.log('token empty');
            return;
        }
        if (await getUserDetails()) {
            window.location.href = '../pages/user.html';
            return;
        }
        console.log("Error on getting user details");
        return;
    }
    return;
}

export default {
    getapiBaseUrl,
    getUserDetails,
    LoginandGetUserData
}