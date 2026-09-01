
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-login");
    if (!form) return;

    const inputUser     = document.getElementById("user");
    const inputPassword = document.getElementById("password");
    const inputRemember = document.getElementById("remember");
    const mensajeError  = document.getElementById("error-message");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuario  = inputUser.value.trim();
        const password = inputPassword.value.trim();

        if (usuario === "" || password === "") {
            if (mensajeError) mensajeError.classList.remove("hidden");
            return;
        }

        const usuariosRegistrados = obtenerUsuarios();

        if (usuariosRegistrados.length > 0) {
            const encontrado = buscarUsuario(usuario, password);

            if (!encontrado) {
                if (mensajeError) mensajeError.classList.remove("hidden");
                return;
            }

            if (mensajeError) mensajeError.classList.add("hidden");
            guardarSesion({
                nombre: encontrado.name,
                correo: encontrado.email,
                recordar: inputRemember ? inputRemember.checked : false
            });
        } else {
            if (mensajeError) mensajeError.classList.add("hidden");
            guardarSesion({
                nombre: usuario,
                correo: usuario,
                recordar: inputRemember ? inputRemember.checked : false
            });
        }

        window.location.href = "/HTML/home.html";
    });
});