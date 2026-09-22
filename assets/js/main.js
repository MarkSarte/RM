(function () {
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');

  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.textContent = open ? 'Menu' : 'Close';
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A' && window.innerWidth <= 860) {
        nav.setAttribute('data-open', 'false');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Menu';
      }
    });
  }

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const requiredFields = Array.from(form.querySelectorAll('[required]'));

  function validateField(field) {
    const error = field.closest('.field').querySelector('.field-error');
    let message = '';

    if (!field.value.trim()) {
      message = 'This field is required.';
    } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value.trim())) {
      message = 'Enter a valid work email address.';
    }

    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message;
    return !message;
  }

  requiredFields.forEach(function (field) {
    field.addEventListener('blur', function () { validateField(field); });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', function (event) {
    const valid = requiredFields.map(validateField).every(Boolean);
    if (!valid) {
      event.preventDefault();
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
    }
  });
})();
