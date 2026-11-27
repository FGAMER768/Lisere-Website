const ease = 'cubic-bezier(0.23, 1, 0.32, 1)';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLDetailsElement>('[data-mobile-nav]').forEach((details) => {
  const summary = details.querySelector<HTMLElement>('summary');
  const panel = details.querySelector<HTMLElement>('.site-header__mobile-panel');
  let animation: Animation | null = null;
  let closing = false;

  const play = (frames: Keyframe[], duration: number) => {
    if (!panel) return Promise.resolve();
    animation?.cancel();
    animation = panel.animate(frames, { duration, easing: ease });
    return animation.finished.catch(() => {});
  };

  const close = async (refocus = false) => {
    if (!details.open || closing) return;
    closing = true;
    if (!reducedMotion.matches) {
      await play(
        [
          { opacity: 1, transform: 'translateY(0) scale(1)' },
          { opacity: 0, transform: 'translateY(-6px) scale(0.98)' },
        ],
        140,
      );
    }
    details.open = false;
    if (refocus) summary?.focus();
    closing = false;
  };

  summary?.addEventListener('click', (event) => {
    if (!panel || reducedMotion.matches || closing) return;
    event.preventDefault();
    if (details.open) {
      void close();
      return;
    }
    details.open = true;
    void play(
      [
        { opacity: 0, transform: 'translateY(-6px) scale(0.98)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ],
      180,
    );
  });

  details.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      void close();
    });
  });

  details.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && details.open) {
      void close(true);
    }
  });
});
