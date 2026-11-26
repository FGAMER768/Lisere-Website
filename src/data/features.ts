export const imageControls = [
  'Correction de compression',
  'Réduction du bruit',
  'Netteté',
  'Récupération des détails',
  'Réduction du halo',
  'Lissage des contours',
] as const;

export const imagePoints = [
  'Ouverture des formats pris en charge par Windows, y compris CMJN, 16 bits et transparence.',
  'Trois modes de comparaison : séparateur, image seule et côte à côte.',
  'Zoom synchronisé et déplacement dans l’image agrandie.',
  'Renforcement des visages YuNet, sans ajouter de grain au fond.',
  'Preset complet en JSON : curseurs, colorimétrie, moteur et visages.',
  'Choix Aucun (sans moteur) : le redimensionnement, la colorimétrie et l’export continuent de fonctionner.',
] as const;

export const videoPoints = [
  'Analyse FFmpeg : résolution, cadence, durée, codecs et audio.',
  'Timeline, transport clavier et aperçu sur la frame choisie.',
  'Lecture temps réel avec saut des frames quand le moteur ne suit pas.',
  'Résolution source, 2×, 4×, 1080p ou 2160p. Cadence source, 30, 60 ou 120 i/s.',
  'Encodage et décodage matériel quand la sonde en trouve : NVENC d’abord, Quick Sync ensuite.',
  'Interpolation RIFE ×2, désentrelacement bwdif et stabilisation vidstab.',
  'File d’attente séquentielle : chaque job garde ses réglages, un échec n’arrête pas les suivants.',
  'Export du preset vidéo complet : six réglages, colorimétrie et moteur dans un seul JSON.',
] as const;

export const presets = [
  {
    name: 'Chroma',
    description:
      'Le préréglage de référence. Détail multi-échelles borné, unsharp maîtrisé et courbe de tons relevée sur une référence Topaz.',
  },
  {
    name: 'Auto',
    description: 'Estime les paramètres à partir de l’image ou de quelques frames du clip.',
  },
  {
    name: 'Manuel',
    description: 'Applique directement les six valeurs saisies.',
  },
  {
    name: 'Auto + relatif moyen',
    description: 'Estimation automatique, puis ajustement relatif moyen.',
  },
  {
    name: 'Aucune',
    description: 'Aucune correction. La colorimétrie et l’export s’appliquent quand même.',
  },
] as const;

export const grades = [
  {
    name: 'Ultron CC',
    description:
      'Saturation 129,997 %, luminosité +5, contraste +7, vibrance +50 et accentuations. Les quatre curseurs restent réglables.',
  },
  {
    name: 'Matrix CC',
    description: 'Luminosité +30, contraste +20 et trois accentuations fixes.',
  },
  {
    name: 'Infinity CC',
    description: 'Accentuation multi-échelles, unsharp 16 % / rayon 9,8, halo doux et exposition −0,36.',
  },
  {
    name: 'Nebulus CC',
    description: 'Accentuation multi-échelles, unsharp 10 % / rayon 20 et halo marqué.',
  },
  {
    name: 'Splendida CC',
    description:
      'Netteté, unsharp 15 % / rayon 25, vignettage 25 % à 40°, luminosité +21, contraste +10 et courbe maître.',
  },
  {
    name: 'Manuel',
    description: 'Saturation, luminosité, contraste et vibrance réglés à la main.',
  },
  {
    name: 'Aucune',
    description: 'Aucun étalonnage. L’image garde les couleurs de l’amélioration.',
  },
] as const;

export const engines = [
  {
    name: 'Lisere Classic',
    kind: 'Pipeline local',
    description:
      'Filtres déterministes, sans modèle neuronal. Amélioration, redimensionnement, grain et étalonnage tournent en compute D3D12 sur le GPU dédié, avec un repli CPU exact.',
  },
  {
    name: 'Super-Resolution CNN ×3',
    kind: 'ONNX',
    description:
      'Super-résolution sous-pixel sur le plan de luminance, en tuiles de 224 px. Modèle ONNX local vérifié par SHA-256, exécuté sur DirectML avec repli CPU.',
  },
  {
    name: 'Real-ESRGAN général ×4',
    kind: 'ONNX',
    description:
      'Super-résolution générale en RVB : la couleur est reconstruite avec la netteté, sur des tuiles de taille libre, puis ramenée à la résolution de sortie choisie.',
  },
  {
    name: 'Anime ×4 (Real-ESRGAN 6B)',
    kind: 'ONNX',
    description:
      'Pour le dessin et l’animation : traits et aplats plus propres, mais plus lent que le modèle général. À éviter sur les photos.',
  },
  {
    name: 'Anime vidéo ×4 (Real-ESRGAN v3)',
    kind: 'ONNX',
    description: 'Version rapide pour les frames d’animation, plus douce que le modèle image.',
  },
  {
    name: 'Nettoyage photo 1×',
    kind: 'ONNX',
    description:
      'Retire le bruit et une partie des artefacts JPEG sans changer la taille de l’image. Le plus lent des moteurs.',
  },
  {
    name: 'Aucun',
    kind: 'Sans moteur',
    description:
      'Ni modèle ni pipeline. Le redimensionnement, la colorimétrie et l’export continuent de fonctionner.',
  },
] as const;

export const formats = [
  { label: 'Système', value: 'Windows 10 ou Windows 11, 64 bits' },
  { label: 'Images', value: 'PNG, JPEG, BMP, TIFF, GIF, ICO, WDP, JXR, WebP, HEIC, HEIF, AVIF selon les codecs Windows' },
  { label: 'Vidéos', value: 'MP4, MOV, MKV, AVI, WebM, M4V, MTS, M2TS, WMV, MPG, MPEG selon les codecs FFmpeg' },
  { label: 'Sortie vidéo', value: 'MP4 H.264 ou H.265, audio AAC' },
  { label: 'Export image', value: 'JPEG, qualité 92' },
  { label: 'Limite image', value: '24 Mo et 40 millions de pixels au décodage' },
  { label: 'Installation', value: 'Par utilisateur, sans droits administrateur' },
] as const;

export const architecture = [
  {
    name: 'src/Lisere',
    role: 'Application WPF, pages Image et Vidéo, view models, dialogues, localisation et mises à jour.',
  },
  {
    name: 'src/Lisere.Core',
    role: 'Modèles d’image, filtres, estimation, pipeline d’amélioration et détection de visages.',
  },
  {
    name: 'src/Lisere.Ai',
    role: 'Moteurs ONNX, super-résolution tuilée, RIFE, YuNet, DirectML et repli CPU.',
  },
  {
    name: 'src/Lisere.Video',
    role: 'FFmpeg, analyse, extraction de frames, rendu, interpolation, presets et progression.',
  },
  {
    name: 'src/Lisere.Setup',
    role: 'Installateur WPF, copie par utilisateur, raccourcis et désinstallation.',
  },
  {
    name: 'tests/',
    role: 'Quatre projets xUnit : Core, Ai, Video et App.',
  },
] as const;

export const testSuite = {
  total: 564,
  projects: [
    { name: 'App', tests: 280 },
    { name: 'Core', tests: 140 },
    { name: 'Vidéo', tests: 98 },
    { name: 'Ai', tests: 46 },
  ],
} as const;
