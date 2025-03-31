import { auth, googleProvider } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


function validatePassword(password) {
    const lengthValid = password.length >= 8;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const numberValid = /\d/.test(password);
    const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    document.getElementById('length').classList.toggle('valid', lengthValid);
    document.getElementById('uppercase').classList.toggle('valid', uppercaseValid);
    document.getElementById('lowercase').classList.toggle('valid', lowercaseValid);
    document.getElementById('number').classList.toggle('valid', numberValid);
    document.getElementById('special').classList.toggle('valid', specialValid);

    document.getElementById('length').classList.toggle('invalid', !lengthValid);
    document.getElementById('uppercase').classList.toggle('invalid', !uppercaseValid);
    document.getElementById('lowercase').classList.toggle('invalid', !lowercaseValid);
    document.getElementById('number').classList.toggle('invalid', !numberValid);
    document.getElementById('special').classList.toggle('invalid', !specialValid);

    return lengthValid && uppercaseValid && lowercaseValid && numberValid && specialValid;
}


function registerUser() {
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const message = document.getElementById("reg-message");

    if (!validatePassword(password)) {
        message.innerHTML = "La contraseña no cumple con los requisitos.";
        message.style.color = "red";
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            message.innerHTML = "¡Registro exitoso! Revisa tu correo para verificar tu cuenta.";
            message.style.color = "green";
            setTimeout(() => {
                window.location.href = "waiting.html";
            }, 2000);
        })
        .catch((error) => {
            message.innerHTML = "Error: " + error.message;
            message.style.color = "red";
        });
}


function googleRegister() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById("reg-message").innerHTML = "Error: " + errorMessage;
            document.getElementById("reg-message").style.color = "red";
        });
}


document.getElementById("reg-password").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        registerUser();
    }
});

document.getElementById("reg-password").addEventListener("input", function () {
    validatePassword(this.value);
});

document.getElementById("registerBtn").addEventListener("click", function (event) {
    event.preventDefault();
    registerUser();
});

document.getElementById("googleRegisterBtn").addEventListener("click", function (event) {
    event.preventDefault();
    googleRegister();
});



