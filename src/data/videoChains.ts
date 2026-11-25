import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('../assets/images/video-chains/*.jpg', {
  eager: true,
  import: 'default',
});

const image = (plan: string, chain: string) => {
  const file = files[`../assets/images/video-chains/${plan}-${chain}.jpg`];
  if (!file) throw new Error(`Image de comparatif manquante : ${plan}-${chain}.jpg`);
  return file;
};

export type ChainId = 'ultron-ae' | 'lisere' | 'lisere-ultron' | 'topaz' | 'topaz-ultron';

export type Chain = {
  id: ChainId;
  label: string;
  note: string;
};

export type ChainPlan = {
  id: string;
  label: string;
  alt: string;
  source: ImageMetadata;
  renders: Record<ChainId, ImageMetadata>;
};

export const chains: Chain[] = [
  {
    id: 'ultron-ae',
    label: 'Ultron CC seul',
    note: 'After Effects CC, étalonnage sans amélioration',
  },
  {
    id: 'lisere',
    label: 'Liseré Classic',
    note: 'préréglage Chroma, sans étalonnage',
  },
  {
    id: 'lisere-ultron',
    label: 'Liseré + Ultron CC',
    note: 'Chroma puis Ultron CC',
  },
  {
    id: 'topaz',
    label: 'Topaz',
    note: 'amélioration IA, sans étalonnage',
  },
  {
    id: 'topaz-ultron',
    label: 'Topaz + AE CC',
    note: 'amélioration IA puis Ultron CC',
  },
];

const plan = (id: string, label: string, alt: string): ChainPlan => ({
  id,
  label,
  alt,
  source: image(id, 'source'),
  renders: Object.fromEntries(chains.map((chain) => [chain.id, image(id, chain.id)])) as Record<
    ChainId,
    ImageMetadata
  >,
});

export const plans: ChainPlan[] = [
  plan('05', 'Armure', 'Armure complète et réacteur allumé, flammes en arrière-plan'),
  plan('08', 'Gros plan', 'Gros plan sur un visage couvert de suie, barbe et peau à l’échelle du détail'),
  plan('10', 'Portrait', 'Portrait à la lumière froide, barbe grise et col roulé noir'),
];

export const defaultChain: ChainId = 'lisere-ultron';
