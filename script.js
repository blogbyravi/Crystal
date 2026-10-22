const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const navigationLinks = navigation.querySelectorAll('a');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navigationLinks.forEach((item) => item.classList.toggle('active', item === link));
    closeMenu();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) closeMenu();
});

window.matchMedia('(min-width: 641px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

const consultationForm = document.querySelector('#consultation-form');

if (consultationForm) {
  const nameInput = consultationForm.elements.namedItem('name');
  const queryInput = consultationForm.elements.namedItem('query');

  [nameInput, queryInput].forEach((field) => {
    field.addEventListener('input', () => field.setCustomValidity(''));
  });

  consultationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const customerName = nameInput.value.trim();
    const customerQuery = queryInput.value.trim();

    nameInput.setCustomValidity(customerName ? '' : 'Please enter your name.');
    queryInput.setCustomValidity(customerQuery ? '' : 'Please enter your question.');
    if (!consultationForm.reportValidity()) return;

    const message = [
      'Hello Devine Crystal & Astrology Services,',
      'I would like to request an astrology consultation.',
      'Consultation charge: INR 501',
      '',
      `Name: ${customerName}`,
      `Query: ${customerQuery}`,
      '',
      'Please share the available appointment times and payment details.'
    ].join('\n');
    const whatsappUrl = new URL('https://wa.me/918073493134');
    whatsappUrl.searchParams.set('text', message);
    window.location.assign(whatsappUrl.href);
  });
}