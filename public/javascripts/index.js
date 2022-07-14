
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
        logoutBTN.id = "logout";
        logoutBTN.innerHTML = "Logout";
        logoutBTN.classList.add("btn");
        
        const LIST = document.createElement("ul");

        content.appendChild(LIST);
        
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
        const inputText = document.createElement("input");
        inputText.type = "text";
        inputText.id = "add-item";
    
        content.appendChild(inputText);

        inputText.addEventListener("keypress", (event)=> {
            if (event.key === 'Enter') { 
                event.preventDefault();
                console.log(inputText.value);
                let todoString = inputText.value;
                console.log("Huhuuu");
                fetch("/api/todos", {
                    method: "POST",
                    headers: {
                        "authorization": "Bearer " + token,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "items": [todoString]
                    })
                })
                console.log("Ei varmaan täällä");
                inputText.value = "";
            }
          });

          fetch("api/todos", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token
            }
          })
          .then((response) => response.json())
          .then((todoList) => {
            if(todoList.length == null) {
                console.log("No DATA");
              } else {
              todoList.forEach(item => {
                let li = document.createElement("li");
                li.innerHTML = item;
                LIST.appendChild(li);
              });
            }
        });
        content.appendChild(logoutBTN);
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
