document.querySelectorAll<HTMLDetailsElement>('[data-mobile-nav]').forEach((details) => {
  details.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      details.open = false;
    });
  });

  details.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && details.open) {
      details.open = false;
      details.querySelector<HTMLElement>('summary')?.focus();
    }
  });
});
