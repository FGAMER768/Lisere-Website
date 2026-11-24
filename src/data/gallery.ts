import type { ImageMetadata } from 'astro';
import mountCook from '../assets/images/gallery/mount-cook.jpg';
import animeEngines from '../assets/images/gallery/anime-engines.jpg';
import animeNoise from '../assets/images/gallery/anime-noise.jpg';
import nikitaShovel from '../assets/images/gallery/nikita-kolesnikov-shovel.jpg';
import nikitaCreature from '../assets/images/gallery/nikita-kolesnikov-creature.jpg';

export type GalleryItem = {
  image: ImageMetadata;
  alt: string;
  title: string;
  description: string;
  settings: string;
  credit: string;
  creditHref?: string;
  imageWidths?: number[];
};

export const galleryItems: GalleryItem[] = [
  {
    image: mountCook,
    alt:
      'Comparatif en deux rangées du lac Hooker et du mont Cook : bicubique ×4 à gauche, Real-ESRGAN ×4 à droite, avec un détail à 100 % en bas.',
    title: 'Lac Hooker, ×4',
    description:
      'Le comparatif complet. En haut, l’image entière. En bas, un détail à 100 % pour regarder les rochers, l’herbe et l’eau.',
    settings: 'Source 640 × 427 · sortie 2 560 × 1 708 · détails d’origine 20',
    credit: 'Photo de Danny Postma, CC0, via AltPhotos.',
    creditHref:
      'https://altphotos.com/photo/hooker-lake-at-the-bottom-of-mount-cook-new-zealand-1747/',
  },
  {
    image: animeEngines,
    alt:
      'Comparatif d’un extrait animé teinté jaune : AnimeVideo v3 à gauche et Anime 6B à droite, avec un détail à 100 %.',
    title: 'Deux moteurs anime',
    description:
      'AnimeVideo v3 à gauche, Anime 6B à droite. Même extrait, mêmes réglages. Le premier garde le grain, le second lisse les aplats.',
    settings: 'Namakura Gatana (1917) · 320 × 180 → 1 280 × 720 · 60 images',
    credit: 'Extrait de Jun’ichi Kōuchi, domaine public, via Internet Archive.',
    creditHref:
      'https://archive.org/details/1917-the-dull-sword-namakura-gatana',
  },
  {
    image: animeNoise,
    alt:
      'Deux cartes de bruit temporel en noir et blanc, AnimeVideo v3 à gauche et Anime 6B à droite, sur les toits et un sol plat.',
    title: 'Le bruit temporel, mesuré',
    description:
      'Différence moyenne entre images consécutives, amplifiée ×200. Plus la zone est sombre, moins elle change d’une image à l’autre.',
    settings: 'AnimeVideo v3 / Anime 6B · zone plate et texture p95',
    credit: 'Extrait de Jun’ichi Kōuchi, domaine public, via Internet Archive.',
    creditHref:
      'https://archive.org/details/1917-the-dull-sword-namakura-gatana',
  },

  {
    image: nikitaShovel,
    alt:
      'The Neighbor : illustration d’un homme voûté en gilet bleu, appuyé sur une pelle, rendue avec le moteur Anime ×4.',
    title: 'The Neighbor',
    description:
      'Illustration entière, sans recadrage ni détail à 100 %. Le rendu Anime ×4 est montré dans une carte de 560 px ; le trait et les aplats sont lissés.',
    settings: 'Source 480 × 964 · sortie 1 920 × 3 856 · Anime 6B ×4 · carte 560 px',
    credit: 'Illustration de Nikita Kolesnikov (@grandeturisto).',
    creditHref: 'https://www.instagram.com/grandeturisto/',
    imageWidths: [400, 560, 800],
  },
  {
    image: nikitaCreature,
    alt:
      'The Guest : illustration d’une créature filaire et d’un fauteuil aux pattes d’araignée, rendue avec le moteur Anime ×4.',
    title: 'The Guest',
    description:
      'Illustration entière, sans recadrage ni détail à 100 %. Le rendu Anime ×4 est montré dans une carte de 560 px ; les fils fins et les rayures restent lisibles.',
    settings: 'Source 480 × 451 · sortie 1 920 × 1 804 · Anime 6B ×4 · carte 560 px',
    credit: 'Illustration de Nikita Kolesnikov (@grandeturisto).',
    creditHref: 'https://www.instagram.com/grandeturisto/',
    imageWidths: [400, 560, 800],
  },
];
