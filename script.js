// Cierra el menú móvil de Bootstrap al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    var nav = document.getElementById('nav');
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
    }
  });
});

// Scroll suave (refuerzo, además del href="#")
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var targetId = this.getAttribute('href');
    var target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});