import { auth, googleProvider } from "./firebase-config.js";
import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (userCredential.user.emailVerified) {
                message.innerHTML = "Inicio de sesión exitoso. Redirigiendo...";
                message.style.color = "green";
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 2000);
            } else {
                message.innerHTML = "Por favor, verifica primero tu correo.";
                message.style.color = "red";
                setTimeout(() => {
                    window.location.href = "waiting.html";
                }, 2000);
            }
        })
        .catch((error) => {
            message.innerHTML = "Error: " + error.message;
            message.style.color = "red";
        });
}


document.getElementById("password").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        loginUser();
    }
});


document.getElementById("loginBtn").addEventListener("click", function (event) {
    event.preventDefault();
    loginUser();
});


function googleLogin() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            document.getElementById("message").innerHTML = "Error: " + error.message;
            document.getElementById("message").style.color = "red";
        });
}


document.getElementById("googleLoginBtn").addEventListener("click", function (event) {
    event.preventDefault();
    googleLogin();
});

