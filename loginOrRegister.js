function register () {
    var login = document.getElementById("login").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    const request = new XMLHttpRequest();
    request.open("post", url+"/api/register/?name="+login+"&email="+email+"&password="+password+"&password_confirmation="+confirmPassword);
    request.onload = () => {
        try {
            const json_data = JSON.parse(request.responseText);
            //console.log(json_data);
            if (!("access_token" in json_data)==0){
                alert("Pomyślnie zarejestrowano! Teraz możesz się zalogować.")
                window.location.href = "login.html";
            }else{
                alert("Rejestracja nie powiodła się! Spróbuj jeszcze raz.");
                console.warn(e);
                window.location.href = "register.html";
            }
        } catch (e) {
            console.warn("Rejestracja nie powiodła się! Spróbuj jeszcze raz.");
            console.warn(e);
            alert("Rejestracja nie powiodła się! Spróbuj jeszcze raz.");
            window.location.href = "register.html";
        }
    };
    request.send();
};

function Login () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    const request = new XMLHttpRequest();
    request.open("post", url+"/api/login?email="+email+"&password="+password);
    request.onload = () => {
        try {
            const json_data = JSON.parse(request.responseText);
            if (!("access_token" in json_data)==0){
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
                localStorage.setItem("access_token", json_data.access_token);
                localStorage.setItem("name", json_data.name);
                localStorage.setItem("saldo", json_data.saldo);
                findUserID();
                alert("Pomyślnie zalogowano! Witamy w CryptoInvestor.")
                window.location.href = "index.html";
            }else{
                alert("Logowanie nie udane! Spróbuj ponownie.");
                console.warn(e);
                window.location.href = "login.html";
            }
        } catch (e) {
            console.warn("Logowanie nie udane! Spróbuj ponownie.");
            console.warn(e);
            window.location.href = "login.html";
        }
    };
    request.send();
};

function findUserID () {
    const request = new XMLHttpRequest();
    request.open("get", url+"/api/ranking");
    request.onload = () => {
        try {
            const json_data = JSON.parse(request.responseText);
            for (const data in json_data){
                if (json_data[data]["id"] == localStorage.getItem("name")){
                    localStorage.setItem("id", data["id"]);
                }
            }
        } catch (e) {
            console.warn("Could not find user id!");
            console.warn(e);
        }
    };
    request.send();
};




function Logout () {
    localStorage.clear();
};


function setButton(){
    var logButton = document.getElementById("logButton");
    if (!(localStorage.getItem("access_token") === null)){ //jeżeli użytkownik jest zalogowany
        logButton.innerText = 'Wyloguj';
        logButton.onclick = function (){
            Logout();
            alert("Pomyślnie wylogowano")
        }
    }
    else{ //jeżeli użytkownik jest nie zalogowany
        logButton.innerText = 'Zaloguj';
    }
};
window.addEventListener('DOMContentLoaded', (event) => {
    setButton();
    console.log(localStorage);
});