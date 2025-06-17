const apiBaseUrl = "https://localhost:7272";
const willReceivejsonToken = true; //for debuging and switching from cookies to token based JWT authentication

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
        sessionStorage.setItem('id', userDetails.id);
        sessionStorage.setItem('username', userDetails.username);
        sessionStorage.setItem('email', userDetails.email);
        sessionStorage.setItem('role', userDetails.role);
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

async function LoadProducts() {
    const response = await fetch(apiBaseUrl + "/Product/getAll", {
        method: "GET"
    });
    if (response.status === 200) {
        const products = await response.json();
        return products;
    }
    return null;
}

function getWillReceivejsonToken() {
    return willReceivejsonToken;
}

async function isLoggedin() {
    if (sessionStorage.getItem("username") == null) {
        await getUserDetails();
        return false;
    }
    return true;
}

export default {
    getapiBaseUrl,
    isLoggedin,
    LoadProducts,
    getWillReceivejsonToken,
    getUserDetails,
    LoginandGetUserData
}