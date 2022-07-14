
if (document.readyState !== "loading") {
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("Document ready after waiting!");
        initializeCode();
    })
}


function initializeCode() {
    const content = document.getElementById("content");
    const token = localStorage.getItem("auth_token");
    if(token){
        const logoutBTN = document.createElement("button");
        logoutBTN.setAttribute("value", "Logout");
        logoutBTN.innerHTML = "Logout";
        logoutBTN.classList.add("btn");
        content.appendChild(logoutBTN);
        fetch("/api/private", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token
            }
        })
        .then((response) => response.json())
        .then((email) => {
            const emailString = document.createElement("p");
            emailString.innerHTML = email.email;
            content.appendChild(emailString);
        })
        logoutBTN.addEventListener("click", logout);
    } else {
        const loginLink = document.createElement("a");
        const registerLink = document.createElement("a");

        loginLink.href = "/login.html";
        registerLink.href = "/register.html";

        loginLink.innerHTML= "Login";
        registerLink.innerHTML = "Register";

        content.appendChild(loginLink);
        content.appendChild(registerLink);
    }
}


function logout() {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}
