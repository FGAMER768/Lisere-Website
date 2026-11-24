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
] as const;

export const videoPoints = [
  'Analyse FFmpeg : résolution, cadence, durée, codecs et audio.',
  'Timeline, transport clavier et aperçu sur la frame choisie.',
  'Lecture temps réel avec saut des frames quand le moteur ne suit pas.',
  'Résolution source, 2×, 4×, 1080p ou 2160p. Cadence source, 30, 60 ou 120 i/s.',
  'Interpolation RIFE ×2, désentrelacement bwdif et stabilisation vidstab.',
  'File d’attente séquentielle : chaque job garde ses réglages, un échec n’arrête pas les suivants.',
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
    description: 'Filtres déterministes, sans modèle neuronal. Le rendu de référence de l’application.',
  },
  {
    name: 'Real-ESRGAN ×4',
    kind: 'ONNX',
    description: 'Super-résolution générale, exécutée sur DirectML quand un adaptateur DirectX 12 est disponible.',
  },
  {
    name: 'Anime 6B ×4',
    kind: 'ONNX',
    description: 'Pour le dessin et l’animation. Lisse les aplats et les traits, avec un rendu plus doux.',
  },
  {
    name: 'AnimeVideo v3 ×4',
    kind: 'ONNX',
    description: 'Pour l’animation. Garde davantage de grain et de micro-texture que Anime 6B.',
  },
  {
    name: 'RIFE 4.9 ×2',
    kind: 'ONNX',
    description: 'Interpolation entre deux images. Limité au ×2.',
  },
  {
    name: 'YuNet',
    kind: 'ONNX',
    description: 'Détection des visages pour concentrer le renforcement sur la peau.',
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

export const testTotals = [
  { value: '486', label: 'tests' },
  { value: '125', label: 'Core' },
  { value: '27', label: 'Ai' },
  { value: '57', label: 'Vidéo' },
  { value: '277', label: 'App' },
] as const;
