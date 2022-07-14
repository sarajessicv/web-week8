
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

    fetch("/api/user/register", {
        method: "POST",
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.success === true) {
            console.log("Pääsenkö");
            window.location.href="/login.html";
        }
        else {
            console.log("####" + (data.errors));
            errorText.innerText = data.errors;
        }
    });

}
