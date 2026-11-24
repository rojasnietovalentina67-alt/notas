// Listas paralelas, igual que en el programa original en Python
const nombre = [];
const correo = [];
const cedula = [];
const materia = [];
const nota = [];

const TOTAL = 5;
const NOTA_MINIMA_APROBAR = 3.0;

const formulario = document.getElementById("formulario");
const tituloForm = document.getElementById("titulo-form");
const barra = document.getElementById("barra");
const mensajeError = document.getElementById("error");
const btnGuardar = document.getElementById("btn-guardar");
const seccionResultados = document.getElementById("resultados");
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const btnReiniciar = document.getElementById("btn-reiniciar");

function actualizarProgreso() {
  const actual = nombre.length;
  tituloForm.textContent = `Estudiante ${Math.min(actual + 1, TOTAL)} de ${TOTAL}`;
  barra.style.width = `${(actual / TOTAL) * 100}%`;
  btnGuardar.textContent = actual === TOTAL - 1 ? "Guardar y ver resultados" : "Guardar estudiante";
}

function validar(nombreE, correoE, cedulaE, materiaE, notaTexto) {
  if (!nombreE || !correoE || !cedulaE || !materiaE || notaTexto === "") {
    return "Completa todos los campos.";
  }
  if (!/^\S+@\S+\.\S+$/.test(correoE)) {
    return "Escribe un correo electrónico válido.";
  }
  if (!/^\d+$/.test(cedulaE)) {
    return "La cédula solo debe tener números.";
  }
  const notaE = Number(notaTexto);
  if (Number.isNaN(notaE)) {
    return "Debes ingresar un número válido en la nota.";
  }
  if (notaE < 0 || notaE > 5) {
    return "La nota debe estar entre 0 y 5.";
  }
  return "";
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombreE = document.getElementById("nombre").value.trim();
  const correoE = document.getElementById("correo").value.trim();
  const cedulaE = document.getElementById("cedula").value.trim();
  const materiaE = document.getElementById("materia").value.trim();
  const notaTexto = document.getElementById("nota").value.trim();

  const error = validar(nombreE, correoE, cedulaE, materiaE, notaTexto);
  mensajeError.textContent = error;
  if (error) return;

  nombre.push(nombreE);
  correo.push(correoE);
  cedula.push(cedulaE);
  materia.push(materiaE);
  nota.push(parseFloat(notaTexto));

  formulario.reset();
  document.getElementById("nombre").focus();
  actualizarProgreso();

  if (nombre.length === TOTAL) {
    mostrarResultados();
  }
});

function mostrarResultados() {
  cuerpoTabla.innerHTML = "";

  for (let i = 0; i < TOTAL; i++) {
    const aprobo = nota[i] >= NOTA_MINIMA_APROBAR;
    const fila = document.createElement("tr");

    [nombre[i], correo[i], cedula[i], materia[i], nota[i].toFixed(1)].forEach((valor) => {
      const celda = document.createElement("td");
      celda.textContent = valor; // textContent evita inyectar HTML
      fila.appendChild(celda);
    });

    const celdaEstado = document.createElement("td");
    const etiqueta = document.createElement("span");
    etiqueta.className = `estado ${aprobo ? "aprobo" : "reprobo"}`;
    etiqueta.textContent = aprobo ? "APROBÓ" : "REPROBÓ";
    celdaEstado.appendChild(etiqueta);
    fila.appendChild(celdaEstado);

    cuerpoTabla.appendChild(fila);
  }

  formulario.closest(".panel").hidden = true;
  seccionResultados.hidden = false;
}

btnReiniciar.addEventListener("click", () => {
  nombre.length = correo.length = cedula.length = materia.length = nota.length = 0;
  seccionResultados.hidden = true;
  formulario.closest(".panel").hidden = false;
  mensajeError.textContent = "";
  actualizarProgreso();
});

actualizarProgreso();
