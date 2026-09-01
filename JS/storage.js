
const SESSION_KEY = "wc_session";
const HABITS_KEY  = "wc_habits";
const RECORDS_KEY = "wc_records";
const USERS_KEY   = "wc_users";

function guardarSesion(usuario) {
    const sesion = {
        nombre: usuario.nombre || usuario.correo.split("@")[0],
        correo: usuario.correo,
        fechaLogin: new Date().toISOString()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sesion));
}


function obtenerSesion() {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
}

function cerrarSesion() {
    localStorage.removeItem(SESSION_KEY);
}


function protegerPagina() {
    if (!obtenerSesion()) {
        window.location.href = "/HTML/login.html";
    }
}

function obtenerHabitos() {
    const data = localStorage.getItem(HABITS_KEY);
    return data ? JSON.parse(data) : {};
}

function guardarHabito(tipo, valor) {
    const habitos = obtenerHabitos();
    habitos[tipo] = valor;
    habitos.actualizado = new Date().toISOString();
    localStorage.setItem(HABITS_KEY, JSON.stringify(habitos));
}

function obtenerRegistros() {
    const data = localStorage.getItem(RECORDS_KEY);
    return data ? JSON.parse(data) : [];
}

function agregarRegistro(registro) {
    const registros = obtenerRegistros();
    registros.unshift(registro);
    localStorage.setItem(RECORDS_KEY, JSON.stringify(registros));
}

function obtenerUsuarios() {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
}

function guardarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
}

function buscarUsuario(identificador, password) {
    const usuarios = obtenerUsuarios();
    const idBuscado = identificador.toLowerCase();

    return usuarios.find((u) =>
        (u.name.toLowerCase() === idBuscado || u.email.toLowerCase() === idBuscado) &&
        u.password === password
    );
}