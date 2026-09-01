
const METAS_HABITOS = {
    pasos: 10000,
    sueno: 8,
    agua: 8,
    alimentacion: 5
};

const UNIDADES_HABITOS = {
    pasos: "pasos",
    sueno: "horas",
    agua: "vasos",
    alimentacion: "raciones"
};

document.addEventListener("DOMContentLoaded", () => {
    protegerPagina();

    const sesion = obtenerSesion();
    const saludo = document.getElementById("user-greeting");
    if (saludo && sesion) {
        saludo.textContent = `¡Hola, ${sesion.nombre}! 👋`;
    }

    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
            window.location.href = "/HTML/login.html";
        });
    }

    pintarResumenHabitos();
});

function pintarResumenHabitos() {
    const habitos = obtenerHabitos();

    Object.keys(METAS_HABITOS).forEach((tipo) => {
        if (habitos[tipo] === undefined) return;

        const valorEl = document.getElementById(`home-valor-${tipo}`);
        const progressEl = document.getElementById(`home-progress-${tipo}`);
        const unidad = UNIDADES_HABITOS[tipo];

        if (valorEl) valorEl.textContent = `${habitos[tipo]} ${unidad}`;
        if (progressEl) progressEl.value = habitos[tipo];
    });

    if (habitos.estres) {
        const estresEl = document.getElementById("home-valor-estres");
        if (estresEl) {
            estresEl.textContent = habitos.estres.charAt(0).toUpperCase() + habitos.estres.slice(1);
        }
    }
}