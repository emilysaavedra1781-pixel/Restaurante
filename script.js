// =========================================================
// script.js — SABORÉ
// Un solo archivo de JavaScript para las 5 páginas del sitio.
// Cada bloque revisa primero si sus elementos existen en la
// página actual (con un "if (!elemento) return;") antes de
// hacer algo, así no truena en las páginas donde no aplica.
// =========================================================

const WHATSAPP_NUM = '51987654321'; // número de la caja del restaurante

const DIAS = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const DIAS_LABEL = {
  domingo: 'Domingo', lunes: 'Lunes', martes: 'Martes', miercoles: 'Miércoles',
  jueves: 'Jueves', viernes: 'Viernes', sabado: 'Sábado'
};

// =========================================================
// 1) MENÚ DEL DÍA — lee menu-semana.json
//    (usado en index.html y menu.html, sección "menu-section-dinamico")
// =========================================================
let menuSemana = null;

async function cargarMenuDia() {
  const contenedor = document.getElementById('menuContenido');
  if (!contenedor) return; // esta página no tiene esta sección

  try {
    const respuesta = await fetch('menu-semana.json');
    if (!respuesta.ok) throw new Error('No se encontró menu-semana.json');
    const data = await respuesta.json();
    menuSemana = data.menu_semana;
    mostrarVistaDia('hoy');
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = '<p>No se pudo cargar el menú en este momento.</p>';
  }
}

function obtenerDia(offset) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + offset);
  return { key: DIAS[fecha.getDay()], fecha };
}

// Fotos ya descargadas en imagenes/ que reutilizamos para el menú del día
// (mismos platos que aparecen en la carta completa).
const IMAGENES_PLATOS = {
  'Causa limeña': 'imagenes/causa-limena.jpg',
  'Papa a la huancaína': 'imagenes/papa-huancaina.jpg',
  'Lomo saltado': 'imagenes/lomo-saltado.jpg',
  'Ají de gallina': 'imagenes/aji-gallina.jpg',
  'Arroz con pollo': 'imagenes/arroz-pollo.jpg',
  'Seco de res con frejoles': 'imagenes/seco-res.jpg',
  'Suspiro a la limeña': 'imagenes/suspiro.jpg',
  'Arroz con leche': 'imagenes/arroz-leche.jpg',
  'Mazamorra morada': 'imagenes/mazamorra-morada.webp',
  'Chicha morada': 'imagenes/chicha-morada.webp',
  'Jugo de maracuyá': 'imagenes/jugo-maracuya.jpg',
  'Ensalada rusa': 'imagenes/ensalada-rusa.jpg',
  'Tallarines verdes con bistec': 'imagenes/tallarines-bistec.jpg',
  'Jugo de papaya': 'imagenes/jugo-papaya.jpg'
};

function crearCardDia(tag, titulo) {
  const imagen = IMAGENES_PLATOS[titulo];
  return `
    <article class="menu-card">
      ${imagen ? `<img src="${imagen}" alt="${titulo}">` : ''}
      <span class="menu-tag">${tag}</span>
      <h3>${titulo}</h3>
    </article>`;
}

function renderDia(diaInfo) {
  if (!diaInfo || diaInfo.cerrado) {
    return `<div class="menu-grid">${crearCardDia('Aviso', diaInfo?.mensaje || 'Cerrado hoy')}</div>`;
  }
  return `
    <div class="menu-grid">
      ${crearCardDia('Entrada', diaInfo.entrada)}
      ${crearCardDia('Segundo', diaInfo.segundo)}
      ${crearCardDia('Postre', diaInfo.postre)}
      ${crearCardDia('Bebida', diaInfo.bebida)}
      ${crearCardDia('Precio', 'S/ ' + diaInfo.precio.toFixed(2))}
    </div>`;
}

function formatearFecha(fecha) {
  return fecha.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });
}

function mostrarVistaDia(vista) {
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

function iniciarTabsDia() {
  const botones = document.querySelectorAll('.tab-btn[data-view]');
  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
      mostrarVistaDia(boton.dataset.view);
    });
  });
}

// =========================================================
// 2) CARTA POR CATEGORÍAS — lee menu-carta.json
//    (usado solo en menu.html, sección "menu-carta")
// =========================================================
let cartaCategorias = null;

async function cargarCarta() {
  const contenedor = document.getElementById('cartaContenido');
  if (!contenedor) return;

  try {
    const respuesta = await fetch('menu-carta.json');
    if (!respuesta.ok) throw new Error('No se encontró menu-carta.json');
    const data = await respuesta.json();
    cartaCategorias = data.categorias;
    mostrarCategoria('todos');
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = '<p>No se pudo cargar la carta en este momento.</p>';
  }
}

// Arma el link de WhatsApp con el mensaje del pedido ya escrito
function linkPedidoWhatsapp(nombrePlato, precio) {
  const mensaje = `Hola Saboré, quiero pedir: ${nombrePlato} (S/ ${precio.toFixed(2)})`;
  return `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(mensaje)}`;
}

function crearCardPlato(plato) {
  return `
    <article class="menu-card">
      <img src="${plato.imagen}" alt="${plato.nombre}">
      <h3>${plato.nombre}</h3>
      <p>${plato.descripcion}</p>
      <div class="price">S/ ${plato.precio.toFixed(2)}</div>
      <a class="btn-whatsapp" href="${linkPedidoWhatsapp(plato.nombre, plato.precio)}" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i> Pedir por WhatsApp
      </a>
    </article>`;
}

function mostrarCategoria(catId) {
  const contenedor = document.getElementById('cartaContenido');
  if (!cartaCategorias) return;

  const platos = catId === 'todos'
    ? cartaCategorias.flatMap(cat => cat.platos)
    : (cartaCategorias.find(cat => cat.id === catId)?.platos || []);

  contenedor.innerHTML = platos.map(crearCardPlato).join('');
}

function iniciarFiltroCarta() {
  const botones = document.querySelectorAll('.tab-btn[data-cat]');
  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
      mostrarCategoria(boton.dataset.cat);
    });
  });
}

// =========================================================
// 3) FORMULARIO DE RESERVACIONES — reservaciones.html
//    Bootstrap valida los campos; nosotros solo armamos el
//    resumen, lo mostramos en un modal y generamos el link de WhatsApp.
// =========================================================
function iniciarFormReserva() {
  const form = document.getElementById('formReserva');
  if (!form) return;

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    evento.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const datos = {
      nombre: document.getElementById('resNombre').value,
      telefono: document.getElementById('resTelefono').value,
      fecha: document.getElementById('resFecha').value,
      hora: document.getElementById('resHora').value,
      personas: document.getElementById('resPersonas').value,
      ocasion: document.getElementById('resOcasion').value,
      comentarios: document.getElementById('resComentarios').value
    };

    const resumen = document.getElementById('resumenReserva');
    resumen.innerHTML = `
      <li><strong>Nombre:</strong> ${datos.nombre}</li>
      <li><strong>Teléfono:</strong> ${datos.telefono}</li>
      <li><strong>Fecha:</strong> ${datos.fecha}</li>
      <li><strong>Hora:</strong> ${datos.hora}</li>
      <li><strong>Personas:</strong> ${datos.personas}</li>
      <li><strong>Ocasión:</strong> ${datos.ocasion}</li>
      ${datos.comentarios ? `<li><strong>Comentarios:</strong> ${datos.comentarios}</li>` : ''}
    `;

    const mensaje = `Hola Saboré, quiero reservar una mesa.\n` +
      `Nombre: ${datos.nombre}\nTeléfono: ${datos.telefono}\n` +
      `Fecha: ${datos.fecha}\nHora: ${datos.hora}\nPersonas: ${datos.personas}\n` +
      `Ocasión: ${datos.ocasion}` + (datos.comentarios ? `\nComentarios: ${datos.comentarios}` : '');

    document.getElementById('btnEnviarWhatsapp').href =
      `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(mensaje)}`;

    const modal = new bootstrap.Modal(document.getElementById('modalReserva'));
    modal.show();
  });
}

// =========================================================
// 4) FORMULARIO DE CONTACTO — contacto.html
//    No hay servidor real: solo validamos y mostramos una
//    alerta de éxito (con transición CSS) para simular el envío.
// =========================================================
function iniciarFormContacto() {
  const form = document.getElementById('formContacto');
  if (!form) return;

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    evento.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    document.getElementById('alertaContacto').classList.add('mostrar');
    form.reset();
    form.classList.remove('was-validated');
  });
}

// =========================================================
// INICIO: se ejecuta cuando el HTML terminó de cargar
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  iniciarTabsDia();
  cargarMenuDia();
  iniciarFiltroCarta();
  cargarCarta();
  iniciarFormReserva();
  iniciarFormContacto();
});
