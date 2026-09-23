const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

const galleryCard = document.querySelector('.gallery-card');
galleryCard?.addEventListener('click', () => {
  const flipped = galleryCard.classList.toggle('is-flipped');
  galleryCard.setAttribute('aria-pressed', String(flipped));
  galleryCard.setAttribute(
    'aria-label',
    flipped ? 'Show polished ASTM A270 sanitary tubing' : 'Show packaged ASTM A270 sanitary tubing',
  );
});

const inspectionGallery = document.querySelector('.inspection-gallery');
inspectionGallery?.addEventListener('click', () => {
  const flipped = inspectionGallery.classList.toggle('is-flipped');
  inspectionGallery.setAttribute('aria-pressed', String(flipped));
  inspectionGallery.setAttribute(
    'aria-label',
    flipped ? 'Show dimensional check photo' : 'Show material verification photo',
  );
});

const facilityGallery = document.querySelector('.facility-gallery');
facilityGallery?.addEventListener('click', () => {
  const flipped = facilityGallery.classList.toggle('is-flipped');
  facilityGallery.setAttribute('aria-pressed', String(flipped));
  facilityGallery.setAttribute(
    'aria-label',
    flipped ? 'Show Yongxin aerial facility view' : 'Show Yongxin manufacturing facility exterior',
  );
});

const certificateModal = document.querySelector('.certificate-modal');
const certificateModalImage = document.querySelector('.certificate-modal-image');
const certificateModalTitle = document.querySelector('#certificate-modal-title');
const certificateModalClose = document.querySelector('.certificate-modal-close');

document.querySelectorAll('.certificate-image').forEach((certificate) => {
  certificate.addEventListener('click', () => {
    const image = certificate.querySelector('img');
    if (!image || !certificateModal || !certificateModalImage || !certificateModalTitle) return;

    certificateModalImage.src = image.currentSrc || image.src;
    certificateModalImage.alt = image.alt;
    certificateModalTitle.textContent = certificate.dataset.certificateTitle || 'Certificate';
    certificateModal.showModal();
  });
});

certificateModalClose?.addEventListener('click', () => certificateModal?.close());

certificateModal?.addEventListener('click', (event) => {
  if (event.target === certificateModal) certificateModal.close();
});

const processTabs = document.querySelectorAll('.process-tab');
const processDecks = document.querySelectorAll('.process-deck');

processTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.processTarget;
    processTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    processDecks.forEach((deck) => {
      const active = deck.id === targetId;
      deck.classList.toggle('is-active', active);
      deck.hidden = !active;
    });
  });
});

processDecks.forEach((deck) => {
  const slides = Array.from(deck.querySelectorAll('.process-slide'));
  const counter = deck.querySelector('.deck-controls span');

  const showSlide = (nextIndex) => {
    const index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };

  deck.querySelectorAll('.deck-arrow').forEach((button) => {
    button.addEventListener('click', () => {
      const currentIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
      showSlide(currentIndex + (button.dataset.direction === 'next' ? 1 : -1));
    });
  });
});

const form = document.querySelector('#enquiry-form');
const status = document.querySelector('#form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  status.className = 'form-status';
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Please complete all required fields using a valid email address.';
    status.classList.add('error');
    return;
  }
  status.textContent = 'Validation passed. Connect this form to your approved email service or CRM before publishing.';
  status.classList.add('success');
});
