/* Progressive enhancement: all content and links work without JavaScript. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  const mobile = window.matchMedia('(max-width: 640px)');
  const closeMenu = () => {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.innerHTML = 'Menu <span aria-hidden="true">+</span>';
  };
  const syncMenu = () => {
    menu.hidden = !mobile.matches;
    closeMenu();
  };
  syncMenu();
  mobile.addEventListener('change', syncMenu);
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.innerHTML = open ? 'Close <span aria-hidden="true">−</span>' : 'Menu <span aria-hidden="true">+</span>';
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });

  const copyButton = document.querySelector('.copy-email');
  const status = document.getElementById('copy-status');
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(copyButton.dataset.email);
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Select the email address above to copy it, or click it to open your mail app.';
    }
  });
})();
