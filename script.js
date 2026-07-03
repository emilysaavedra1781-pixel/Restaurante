// script.js — Menú dinámico de Sazón Casera
// Lee menu-semana.json y arma las tarjetas según la pestaña elegida.

const DIAS = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const DIAS_LABEL = {
  domingo: 'Domingo',
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado'
};

let menuSemana = null;

// Carga el JSON una sola vez al abrir la página
async function cargarMenu() {
  const contenedor = document.getElementById('menuContenido');
  try {
    const respuesta = await fetch('menu-semana.json');
    if (!respuesta.ok) throw new Error('No se encontró menu-semana.json');
    const data = await respuesta.json();
    menuSemana = data.menu_semana;
    mostrarVista('hoy');
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = '<p>No se pudo cargar el menú en este momento.</p>';
  }
}

// Devuelve la clave del día (lunes, martes...) y la fecha real, según un desplazamiento en días
function obtenerDia(offset) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + offset);
  return { key: DIAS[fecha.getDay()], fecha };
}

// Genera el HTML de una tarjeta individual
function crearCard(tag, titulo) {
  return `
    <article class="menu-card">
      <span class="menu-tag">${tag}</span>
      <h3>${titulo}</h3>
    </article>`;
}

// Genera el bloque completo de tarjetas para un día
function renderDia(diaInfo) {
  if (!diaInfo || diaInfo.cerrado) {
    return `<div class="menu-grid">${crearCard('Aviso', diaInfo?.mensaje || 'Cerrado hoy')}</div>`;
  }
  return `
    <div class="menu-grid">
      ${crearCard('Entrada', diaInfo.entrada)}
      ${crearCard('Segundo', diaInfo.segundo)}
      ${crearCard('Postre', diaInfo.postre)}
      ${crearCard('Bebida', diaInfo.bebida)}
      ${crearCard('Precio', 'S/ ' + diaInfo.precio.toFixed(2))}
    </div>`;
}

// Formatea una fecha en español, ej: "viernes, 3 de julio"
function formatearFecha(fecha) {
  return fecha.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });
}

// Cambia lo que se muestra según la pestaña elegida
function mostrarVista(vista) {
  const contenido = document.getElementById('menuContenido');
  const fechaTexto = document.getElementById('menuFecha');

  if (!menuSemana) return;

  if (vista === 'hoy') {
    const { key, fecha } = obtenerDia(0);
    fechaTexto.textContent = 'Hoy, ' + formatearFecha(fecha);
    contenido.innerHTML = renderDia(menuSemana[key]);

  } else if (vista === 'manana') {
    const { key, fecha } = obtenerDia(1);
    fechaTexto.textContent = 'Mañana, ' + formatearFecha(fecha);
    contenido.innerHTML = renderDia(menuSemana[key]);

  } else if (vista === 'pasado') {
    const { key, fecha } = obtenerDia(2);
    fechaTexto.textContent = 'Pasado mañana, ' + formatearFecha(fecha);
    contenido.innerHTML = renderDia(menuSemana[key]);

  } else if (vista === 'semana') {
    fechaTexto.textContent = 'Menú completo de la semana';
    const orden = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    contenido.innerHTML = orden.map(dia => `
      <div class="semana-bloque">
        <h4>${DIAS_LABEL[dia]}</h4>
        ${renderDia(menuSemana[dia])}
      </div>
    `).join('');
  }
}

// Conecta los botones de pestañas
function iniciarTabs() {
  const botones = document.querySelectorAll('.tab-btn');
  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
      mostrarVista(boton.dataset.view);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  iniciarTabs();
  cargarMenu();
});