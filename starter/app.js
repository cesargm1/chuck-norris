// UP5_A3 · Chistes de Chuck Norris con XMLHttpRequest
// En esta práctica NO se usa fetch: todo va con XMLHttpRequest.

const API = "https://api.chucknorris.io/jokes";
const URL_XML = "datos/chistes.xml";
const URL_VALORACIONES = "https://jsonplaceholder.typicode.com/posts";
const TIEMPO_MAXIMO = 5000;

const selCategoria = document.getElementById("categoria");
const btnChiste = document.getElementById("btn-chiste");
const btnCasa = document.getElementById("btn-casa");
const btnValorar = document.getElementById("btn-valorar");
const selNota = document.getElementById("nota");
const pEstado = document.getElementById("estado");
const pChiste = document.getElementById("chiste");
const pOrigen = document.getElementById("origen");
const pEstadoValoracion = document.getElementById("estado-valoracion");

let chisteActual = null; // { id, texto } del chiste que se está mostrando

// ---------- Interfaz (ya hecho) ----------
/** tipo: '' | 'cargando' | 'error' | 'ok' */
function mostrarEstado(elemento, mensaje, tipo = "") {
	elemento.textContent = mensaje;
	elemento.className = `estado ${tipo}`.trim();
}

function mostrarChiste(id, texto, origen) {
	chisteActual = { id, texto };
	pChiste.textContent = texto;
	pChiste.hidden = false;
	pOrigen.textContent = origen;
	btnValorar.disabled = false;
}

// ---------- Ejercicios 1 y 2 · Función genérica de petición ----------
/**
 * Lanza una petición asíncrona con XMLHttpRequest.
 * opciones = {
 *   metodo: 'GET' | 'POST',
 *   url,
 *   tipo: 'json' | 'document' | 'text'   (responseType),
 *   cuerpo: objeto que se envía como JSON (opcional),
 *   alCargar(respuesta, xhr): se llama SOLO con status 2xx,
 *   alFallar(mensaje): errores HTTP, de red, de tiempo y de formato,
 *   alTerminar(): siempre, al final (opcional)
 * }
 */
function peticion({
	metodo = "GET",
	url,
	tipo = "json",
	cuerpo,
	alCargar,
	alFallar,
	alTerminar,
}) {
	// TODO Ej. 1: crear el XMLHttpRequest, open, responseType y send.
	const xhr = new XMLHttpRequest();
	xhr.open(metodo, url);
	xhr.responseType = tipo;
	xhr.send();

	// TODO Ej. 1: en load, si status es 2xx → alCargar(xhr.response, xhr).
	// TODO Ej. 2: en load con otro status → alFallar(`La API no responde (código ${xhr.status})`).
	// TODO Ej. 2: respuesta 2xx pero xhr.response === null (formato no válido) → alFallar(...).
	// TODO Ej. 2: error de red → alFallar(...). Tiempo agotado (TIEMPO_MAXIMO) → alFallar(...).
	// TODO Ej. 2: loadend → alTerminar?.()
	// TODO Ej. 5: si hay cuerpo, cabecera Content-Type y JSON.stringify.

	xhr.timeout = TIEMPO_MAXIMO;
	xhr.onload = () => {
		if (xhr.status < 300 && xhr.status > 199) {
			if (xhr.response === null) {
				return alFallar("Formato no valido");
			}
			alCargar(xhr.response, xhr);
		} else {
			alFallar(`La api no responde(codigo${xhr.status})`);
		}
	};
	xhr.ontimeout = () => {
		return alFallar(`Tiempo agotado ${xhr.timeout}`);
	};

	xhr.onloadend = () => {
		alTerminar();
	};

	xhr.onerror = function () {
		alFallar(`Error de red`);
	};
}

// ---------- Ejercicio 1 · Chiste aleatorio ----------
function pedirChiste() {
	// TODO: estado 'Cargando chiste…', botón deshabilitado mientras dura la petición.
	// TODO Ej. 3: si hay categoría elegida, añade ?category=… a la URL.
	// TODO: al cargar, mostrarChiste(dato.id, dato.value, 'api.chucknorris.io') y limpiar el estado.
}

// ---------- Ejercicio 3 · Categorías ----------
function cargarCategorias() {
	// TODO: GET `${API}/categories` y un <option> por categoría (createElement + textContent).
	// Si falla, la aplicación sigue funcionando con «Cualquiera».
}

// ---------- Ejercicio 4 · Otro formato: XML ----------
function pedirChisteDeLaCasa() {
	// TODO: GET de URL_XML con tipo 'document'. La respuesta es un documento XML.
	// TODO: elige un <chiste> al azar y muéstralo con su id y su categoría (atributos).
}

// ---------- Ejercicio 5 · Enviar datos: POST con JSON ----------
function enviarValoracion() {
	// TODO: POST a URL_VALORACIONES con { chisteId, nota, texto }.
	// TODO: muestra en #estado-valoracion «Valoración n.º <id> guardada (código 201)».
}

// ---------- Eventos ----------
btnChiste.addEventListener("click", pedirChiste);
btnCasa.addEventListener("click", pedirChisteDeLaCasa);
btnValorar.addEventListener("click", enviarValoracion);
cargarCategorias();
