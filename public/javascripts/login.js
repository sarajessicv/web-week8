
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
    console.log("päästäänkö tänne");
    const submitBTN = document.getElementById("submit");
    submitBTN.addEventListener("submit", onSubmit);

}

function onSubmit(event) {
    event.preventDefault();
    console.log("entäs tänne");
    const errorText = document.getElementById("error");
    const formData = new FormData(event.target);

    fetch("/api/user/login", {
        method: "POST",
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.token) {
            console.log("Pääsenkö");
            storeToken(data.token);
            window.location.href="/";
        } else {
                //console.log("####" + (data.errors));
                errorText.innerText = data.errors;
        }

    });

}

function storeToken(token){
    localStorage.setItem("auth_token", token);
}