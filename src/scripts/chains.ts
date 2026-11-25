const initialiseChains = () => {
  document.querySelectorAll<HTMLElement>('[data-chains]').forEach((root) => {
    const range = root.querySelector<HTMLInputElement>('[data-chains-range]');
    if (!range) return;

    const slots = {
      source: root.querySelector<HTMLElement>('[data-slot="source"]'),
      render: root.querySelector<HTMLElement>('[data-slot="render"]'),
    };
    const planInputs = root.querySelectorAll<HTMLInputElement>('[data-plan-pick]');
    const chainInputs = root.querySelectorAll<HTMLInputElement>('[data-chain-pick]');
    const chainLabel = root.querySelector<HTMLElement>('[data-chain-label]');
    const chainNote = root.querySelector<HTMLElement>('[data-chain-note]');

    const checkedValue = (inputs: NodeListOf<HTMLInputElement>) =>
      Array.from(inputs).find((input) => input.checked)?.value ?? '';

    // Les variantes vivent dans des <template> : une seule image par côté est chargée.
    const paint = (slot: HTMLElement | null, key: string) => {
      const template = root.querySelector<HTMLTemplateElement>(`template[data-tpl="${key}"]`);
      if (slot && template) slot.replaceChildren(template.content.cloneNode(true));
    };

    range.addEventListener(
      'input',
      () => {
        const value = Number(range.value);
        root.style.setProperty('--compare-position', `${value}%`);
        range.setAttribute('aria-valuetext', `${value} % du rendu`);
      },
      { passive: true },
    );

    const updateChain = () => {
      const plan = checkedValue(planInputs);
      const chain = checkedValue(chainInputs);

      root.dataset.plan = plan;
      root.dataset.chain = chain;
      paint(slots.source, `${plan}:source`);
      paint(slots.render, `${plan}:${chain}`);

      const picked = Array.from(chainInputs).find((input) => input.value === chain);
      if (picked) {
        const label = picked.dataset.label ?? '';
        if (chainLabel) chainLabel.textContent = label;
        if (chainNote) chainNote.textContent = picked.dataset.note ?? '';
        range.setAttribute('aria-label', `Comparer la source et ${label}`);
      }
    };

    [...planInputs, ...chainInputs].forEach((input) => input.addEventListener('change', updateChain));
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseChains, { once: true });
} else {
  initialiseChains();
}
