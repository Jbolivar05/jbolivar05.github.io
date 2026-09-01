
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-record");
    if (!form) return;
    let mensajeError = document.getElementById("record-error");
    if (!mensajeError) {
        mensajeError = document.createElement("p");
        mensajeError.id = "record-error";
        mensajeError.classList.add("hidden");
        form.insertAdjacentElement("afterend", mensajeError);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const password        = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            mensajeError.textContent = "Las contraseñas no coinciden.";
            mensajeError.classList.remove("hidden");
            return;
        }

        const usuario = {
            name:           document.getElementById("name").value.trim(),
            email:          document.getElementById("email").value.trim(),
            identification: document.getElementById("identification").value.trim(),
            birthdate:      document.getElementById("birthdate").value,
            gender:         document.getElementById("gender").value,
            phone:          document.getElementById("phone").value.trim(),
            password:       password
        };
        const yaExiste = obtenerUsuarios().some(
            (u) => u.email.toLowerCase() === usuario.email.toLowerCase()
        );
        if (yaExiste) {
            mensajeError.textContent = "Ya existe una cuenta con ese correo.";
            mensajeError.classList.remove("hidden");
            return;
        }

        mensajeError.classList.add("hidden");
        guardarUsuario(usuario);

        alert("Cuenta creada correctamente. Ahora puedes iniciar sesión.");
        window.location.href = "/HTML/login.html";
    });
});