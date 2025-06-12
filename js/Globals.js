const apiBaseUrl = "https://localhost:7272";

function getapiBaseUrl() {
    return apiBaseUrl;
}

async function getUserDetails() {
    const response = await fetch(apiBaseUrl + "/Auth/CurrentUser", {
        method: "GET",
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
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

export default {
    getapiBaseUrl,
    getUserDetails
}