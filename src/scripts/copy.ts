const fallbackCopy = (text: string) => {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand('copy');
  field.remove();
  return copied;
};

const copyText = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  return fallbackCopy(text);
};

const initialiseCopyButtons = () => {
  document.querySelectorAll<HTMLElement>('[data-copy-hash]').forEach((root) => {
    const button = root.querySelector<HTMLButtonElement>('[data-copy-value]');
    const label = root.querySelector<HTMLElement>('[data-copy-label]');
    const status = root.querySelector<HTMLElement>('[data-copy-status]');
    if (!button || !label || !status) return;

    let resetTimer: number | undefined;

    button.addEventListener('click', async () => {
      const value = button.dataset.copyValue;
      if (!value) return;

      try {
        await copyText(value);
        label.textContent = 'Copié';
        button.setAttribute('aria-label', 'Empreinte copiée');
        status.textContent = 'Empreinte copiée dans le presse-papiers.';
      } catch {
        label.textContent = 'À sélectionner';
        status.textContent = 'La copie automatique est indisponible. Sélectionnez l’empreinte à la main.';
      }

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        label.textContent = 'Copier';
        button.removeAttribute('aria-label');
        status.textContent = '';
      }, 2400);
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseCopyButtons, { once: true });
} else {
  initialiseCopyButtons();
}
