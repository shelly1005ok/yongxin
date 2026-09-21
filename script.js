const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
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

