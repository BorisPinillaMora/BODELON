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

// Construye la galería a partir de las fotografías guardadas en assets/trabajos/.
const workCategories = [
  {
    folder: 'papeleria',
    label: 'Papelería',
    files: [
      'WhatsApp Image 2026-11-25 at 10.57.44 PM (1).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.45 PM (1).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.45 PM (3).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.46 PM (1).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.46 PM (2).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.46 PM (3).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.48 PM (1).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.48 PM (2).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.48 PM.jpeg',
    ],
  },
  {
    folder: 'publicaciones',
    label: 'Publicaciones',
    files: [
      'WhatsApp Image 2026-11-25 at 10.57.47 PM (1).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.47 PM (2).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.47 PM (3).jpeg',
      'WhatsApp Image 2026-11-26 at 9.47.10 AM.jpeg',
    ],
  },
  {
    folder: 'promocional',
    label: 'Promocional',
    files: [
      'WhatsApp Image 2026-11-25 at 10.57.39 PM.jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.40 PM (1).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.40 PM (2).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.40 PM (3).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.40 PM.jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.44 PM.jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.45 PM (2).jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.45 PM.jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.46 PM.jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.47 PM.jpeg',
      'WhatsApp Image 2026-11-25 at 10.57.49 PM.jpeg',
    ],
  },
];

const projectGrid = document.querySelector('.grid');

if (projectGrid) {
  workCategories.forEach(({ folder, label, files }) => {
    files.forEach((file, index) => {
      const title = `${label} ${String(index + 1).padStart(2, '0')}`;
      const imagePath = `assets/trabajos/${folder}/${encodeURIComponent(file)}`;
      const card = document.createElement('article');
      const image = document.createElement('img');
      const info = document.createElement('div');
      const viewIcon = document.createElement('span');
      const eye = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const eyeOutline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const pupil = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      card.className = 'project reveal';
      card.dataset.cat = folder;
      card.dataset.title = title;
      card.dataset.desc = `Una muestra de nuestro trabajo de ${label.toLowerCase()}, producido con cuidado en cada detalle.`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Ver imagen: ${title}`);

      image.className = 'project-image';
      image.src = imagePath;
      image.alt = `${label} de Bodelón Impresos`;
      image.loading = 'lazy';
      image.decoding = 'async';

      info.className = 'project-info';
      viewIcon.className = 'view-icon';
      viewIcon.setAttribute('aria-hidden', 'true');
      eye.setAttribute('viewBox', '0 0 24 24');
      eye.setAttribute('aria-hidden', 'true');
      eyeOutline.setAttribute('d', 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z');
      pupil.setAttribute('cx', '12');
      pupil.setAttribute('cy', '12');
      pupil.setAttribute('r', '3');
      eye.append(eyeOutline, pupil);
      viewIcon.append(eye);

      info.append(viewIcon);
      card.append(image, info);
      projectGrid.append(card);
    });
  });
}

// Filtra las tarjetas de proyectos según la categoría del botón seleccionado.
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((filter) => {
      filter.classList.remove('active');
      filter.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    const currentFilter = button.dataset.filter;

    projects.forEach((project) => {
      const shouldShow = currentFilter === 'all' || project.dataset.cat === currentFilter;
      project.hidden = !shouldShow;
      if (shouldShow) {
        project.classList.remove('show');
        requestAnimationFrame(() => project.classList.add('show'));
      }
    });
  });
});

// Muestra los detalles del proyecto en una ventana modal y permite cerrarla.
const modal = document.querySelector('.modal');

if (modal) {
  const modalTitle = modal.querySelector('h3');
  const modalText = modal.querySelector('p');
  const modalImage = modal.querySelector('.modal-image');
  const closeButton = modal.querySelector('.close');
  let activeProject = null;

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (activeProject) {
      activeProject.focus();
      activeProject = null;
    }
  };

  // Copia a la ventana los datos guardados en la tarjeta seleccionada.
  projects.forEach((project) => {
    const openModal = () => {
      if (modalTitle) {
        modalTitle.textContent = project.dataset.title || '';
      }

      if (modalText) {
        modalText.textContent = project.dataset.desc || '';
      }

      const projectImage = project.querySelector('.project-image');
      if (modalImage && projectImage) {
        modalImage.src = projectImage.src;
        modalImage.alt = projectImage.alt;
      }

      activeProject = project;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      if (closeButton) closeButton.focus();
    };

    project.addEventListener('click', openModal);
    project.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal();
      }
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
