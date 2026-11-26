export const site = {
  name: 'Liseré',
  description:
    "Liseré améliore vos photos et vos vidéos sur votre PC Windows. Comparaison avant/après, moteurs locaux, presets et code source public.",
  github: 'https://github.com/FGAMER768/Lisere',
  releases: 'https://github.com/FGAMER768/Lisere/releases',
  latestRelease: 'https://github.com/FGAMER768/Lisere/releases/latest',
  guide: 'https://github.com/FGAMER768/Lisere/blob/master/GUIDE-UTILISATION.md',
  readme: 'https://github.com/FGAMER768/Lisere#readme',
  issues: 'https://github.com/FGAMER768/Lisere/issues',
  installer: 'https://github.com/FGAMER768/Lisere/releases/latest/download/Lisere-Setup.exe',
  zip: 'https://github.com/FGAMER768/Lisere/releases/latest/download/Lisere.zip',
  installerChecksum:
    'https://github.com/FGAMER768/Lisere/releases/latest/download/Lisere-Setup.exe.sha256',
  zipChecksum: 'https://github.com/FGAMER768/Lisere/releases/latest/download/Lisere.zip.sha256',
  defaultImage: '/og/lisere-og.jpg',
  author: 'FGAMER768',
} as const;

export const release = {
  version: '1.6.0',
  date: '26 novembre 2026',
  installerSize: '211,3 Mo',
  zipSize: '208,7 Mo',
  installerHash: 'c767a86009fe497413538533fb1329ea65fb9a7ddfec461685bc8edde3bbf30f',
  zipHash: 'd71e55189454f5305114de703e7b4a743fdde165b2911db005d326b0cabc1552',
} as const;

export const nav = [
  { label: 'Fonctionnalités', href: '/fonctionnalites/' },
  { label: 'Galerie', href: '/galerie/' },
  { label: 'Code source', href: '/code-source/' },
] as const;

export const footerGroups = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', href: '/fonctionnalites/' },
      { label: 'Galerie de comparatifs', href: '/galerie/' },
      { label: 'Télécharger', href: '/telecharger/' },
    ],
  },
  {
    title: 'Projet',
    links: [
      { label: 'Code source', href: '/code-source/' },
      { label: 'Dépôt GitHub', href: site.github, external: true },
      { label: 'Toutes les releases', href: site.releases, external: true },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: "Guide d'utilisation", href: site.guide, external: true },
      { label: 'README du projet', href: site.readme, external: true },
      { label: 'Signaler un problème', href: site.issues, external: true },
    ],
  },
] as const;

export const heroCompare = {
  beforeAlt:
    'Lac Hooker et mont Cook, image de départ agrandie en bicubique, avec les rochers et le torrent encore flous.',
  afterAlt:
    'Le même paysage après Real-ESRGAN ×4, avec les rochers, l’herbe et l’eau plus nets.',
  caption:
    'Lac Hooker et mont Cook. Bicubique ×4 à gauche, Real-ESRGAN ×4 à droite. Source 640 × 427, sortie 2 560 × 1 708.',
  credit: 'Photo de Danny Postma, CC0, via AltPhotos.',
  creditHref:
    'https://altphotos.com/photo/hooker-lake-at-the-bottom-of-mount-cook-new-zealand-1747/',
} as const;
