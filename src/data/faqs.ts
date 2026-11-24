export const faqs = [
  {
    question: 'Mes fichiers quittent-ils mon ordinateur ?',
    answer:
      'Non. Le traitement est local. Seule la vérification de mise à jour, quand vous la demandez, interroge GitHub.',
  },
  {
    question: 'Faut-il un GPU pour lancer Liseré ?',
    answer:
      'Non. Les moteurs ONNX utilisent DirectML quand un adaptateur DirectX 12 est disponible, sinon le CPU. Le repli CPU est plus lent et la note du moteur indique lequel est actif. Les essais 4K restent bloqués faute de GPU exploitable.',
  },
  {
    question: 'Pourquoi Windows affiche-t-il un avertissement ?',
    answer:
      'Le binaire n’est pas signé avec un certificat commercial. Vérifiez l’empreinte SHA-256 publiée avec la release, ou signez vos propres builds avec les scripts fournis.',
  },
  {
    question: 'Puis-je importer des presets d’une autre application ?',
    answer:
      'Oui pour les presets vidéo JSON. Liseré transpose les réglages qu’il comprend. Aucun poids propriétaire n’est lu et le rendu utilise le moteur choisi dans Liseré.',
  },
  {
    question: 'Pourquoi le développement est-il en pause ?',
    answer:
      'Les essais 4K ne sollicitent pas correctement le GPU disponible. Le développement est suspendu tant qu’un GPU utilisable pour ces expérimentations n’est pas accessible. Les releases restent téléchargeables.',
  },
] as const;
