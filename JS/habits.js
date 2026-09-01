
const CONFIG_HABITOS = {
    pasos:         { max: 10000, unidad: "pasos",    pregunta: "¿Cuántos pasos llevas hoy?" },
    sueno:         { max: 8,     unidad: "horas",    pregunta: "¿Cuántas horas dormiste?" },
    agua:          { max: 8,     unidad: "vasos",    pregunta: "¿Cuántos vasos de agua llevas hoy?" },
    alimentacion:  { max: 5,     unidad: "raciones", pregunta: "¿Cuántas raciones de frutas/verduras llevas hoy?" }
};

document.addEventListener("DOMContentLoaded", () => {
    protegerPagina();
    document.querySelectorAll(".button-habits[data-habit]").forEach((boton) => {
        boton.addEventListener("click", () => manejarRegistroHabito(boton));
    });

    const btnEstres = document.getElementById("btn-registrar-estres");
    if (btnEstres) {
        btnEstres.addEventListener("click", manejarRegistroEstres);
    }
});

function manejarRegistroHabito(boton) {
    const tipo = boton.dataset.habit;
    const config = CONFIG_HABITOS[tipo];
    if (!config) return;

    const respuesta = prompt(config.pregunta);
    if (respuesta === null) return;

    const valor = parseFloat(respuesta);
    if (isNaN(valor) || valor < 0 || valor > config.max) {
        alert(`Ingresa un número válido entre 0 y ${config.max}.`);
        return;
    }

    guardarHabito(tipo, valor);

    const progressEl = document.getElementById(`progress-${tipo}`);
    const valorEl = document.getElementById(`valor-${tipo}`);
    if (progressEl) progressEl.value = valor;
    if (valorEl) valorEl.textContent = `${valor} ${config.unidad}`;

    const textoOriginal = boton.textContent;
    boton.textContent = "REGISTRADO";
    boton.disabled = true;
    setTimeout(() => {
        boton.textContent = textoOriginal;
        boton.disabled = false;
    }, 1200);
}

function manejarRegistroEstres() {
    const seleccionado = document.querySelector('input[name="estres"]:checked');
    if (!seleccionado) return;

    const valor = seleccionado.value;
    guardarHabito("estres", valor);

    const estadoEl = document.getElementById("estado-estres");
    if (estadoEl) {
        estadoEl.textContent = valor.charAt(0).toUpperCase() + valor.slice(1);
    }
}