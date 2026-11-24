// Abre el menú móvil y lo cierra cuando se selecciona uno de sus enlaces.
const menu = document.querySelector('.menu');
const links = document.querySelector('.links');

if (menu && links) {
  menu.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  document.querySelectorAll('.links a').forEach((link) => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// Filtra las tarjetas de proyectos según la categoría del botón seleccionado.
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((filter) => filter.classList.remove('active'));
    button.classList.add('active');

    const currentFilter = button.dataset.filter;

    projects.forEach((project) => {
      const shouldShow = currentFilter === 'all' || project.dataset.cat === currentFilter;
      project.style.display = shouldShow ? 'block' : 'none';
    });
  });
});

// Muestra los detalles del proyecto en una ventana modal y permite cerrarla.
const modal = document.querySelector('.modal');

if (modal) {
  const modalTitle = modal.querySelector('h3');
  const modalText = modal.querySelector('p');
  const closeButton = modal.querySelector('.close');

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  // Copia a la ventana los datos guardados en la tarjeta seleccionada.
  projects.forEach((project) => {
    project.addEventListener('click', () => {
      if (modalTitle) {
        modalTitle.textContent = project.dataset.title || '';
      }

      if (modalText) {
        modalText.textContent = project.dataset.desc || '';
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // También se cierra al pulsar fuera de la tarjeta o presionar Escape.
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

// Revela elementos al entrar en pantalla; sin IntersectionObserver los muestra de inmediato.
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('show'));
}
