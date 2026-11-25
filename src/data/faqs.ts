export const faqs = [
  {
    question: 'Mes fichiers quittent-ils mon ordinateur ?',
    answer:
      'Non. Le traitement est local. Seule la vérification de mise à jour, quand vous la demandez, interroge GitHub.',
  },
  {
    question: 'Faut-il un GPU pour lancer Liseré ?',
    answer:
      'Non. Lisere Classic exécute son pipeline en compute D3D12 sur le GPU dédié quand il est disponible, avec un repli CPU exact. Les moteurs ONNX utilisent DirectML sur l’adaptateur DXGI qui possède le plus de VRAM dédiée, avec un repli CPU dont la raison est affichée dans la note du moteur. Le repli CPU est plus lent. La revalidation complète sur la RTX 4070 de référence reste ouverte.',
  },
  {
    question: 'Pourquoi Windows affiche-t-il un avertissement ?',
    answer:
      'Le binaire n’est pas signé avec un certificat commercial. Vérifiez l’empreinte SHA-256 publiée avec la release, ou signez vos propres builds avec les scripts fournis.',
  },
  {
    question: 'Puis-je importer des presets d’une autre application ?',
    answer:
      'Oui pour les presets vidéo JSON. Liseré transpose les réglages qu’il comprend et exporte aussi un preset vidéo complet : six réglages, colorimétrie et moteur dans un seul fichier. Aucun poids propriétaire n’est lu et le rendu utilise le moteur choisi dans Liseré.',
  },
  {
    question: 'L’encodage vidéo utilise-t-il le GPU ?',
    answer:
      'Oui quand un encodeur matériel répond : NVENC d’abord, Quick Sync ensuite, après une sonde qui réalise un vrai encodage et un vrai décodage. L’encodeur CPU n’est retenu que si vous le choisissez ou si aucun encodeur matériel n’est disponible : il n’y a pas de bascule silencieuse vers x264.',
  },
] as const;
