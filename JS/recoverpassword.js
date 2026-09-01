
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-recover");
    if (!form) return;

    const inputEmail = document.getElementById("email");
    const mensajeExito = document.getElementById("email-sent");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (inputEmail.value.trim() === "") return;
        if (mensajeExito) {
            mensajeExito.classList.remove("hidden");
        }

        form.reset();
    });
});