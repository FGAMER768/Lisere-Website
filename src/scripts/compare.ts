const initialiseComparators = () => {
  const roots = document.querySelectorAll<HTMLElement>('[data-compare]');

  roots.forEach((root) => {
    const range = root.querySelector<HTMLInputElement>('[data-compare-range]');
    if (!range) return;

    const update = () => {
      const value = Number(range.value);
      root.style.setProperty('--compare-position', `${value}%`);
      range.setAttribute('aria-valuetext', `${value} % de l’image après`);
    };

    range.addEventListener('input', update, { passive: true });
    update();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseComparators, { once: true });
} else {
  initialiseComparators();
}
