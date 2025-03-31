import { auth } from "./firebase-config.js";
import { sendEmailVerification, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


document.getElementById("resendVerificationBtn").addEventListener("click", () => {
    const user = auth.currentUser;

    if (user && !user.emailVerified) {
        sendEmailVerification(user)
            .then(() => {
                document.getElementById("verificationMessage").innerHTML = "Correo de verificación reenviado. Revisa tu bandeja de entrada.";
                document.getElementById("verificationMessage").style.color = "green";
            })
            .catch((error) => {
                document.getElementById("verificationMessage").innerHTML = "Error al reenviar el correo: " + error.message;
                document.getElementById("verificationMessage").style.color = "red";
            });
    } else {
        document.getElementById("verificationMessage").innerHTML = "El correo ya está verificado o no hay usuario.";
        document.getElementById("verificationMessage").style.color = "red";
    }
});


onAuthStateChanged(auth, (user) => {
    if (user) {
        
        if (user.emailVerified) {
            
            window.location.href = "dashboard.html"; 
        }
    }
});
