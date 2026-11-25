# Liseré, site de présentation

Site statique de présentation de **Liseré**, l’application Windows qui améliore les photos et les vidéos localement. Le site sert de porte d’entrée vers les fonctionnalités, les comparatifs et le dépôt GitHub.

Construit avec **Astro 7** et prévu pour **Cloudflare Pages**. Aucun adaptateur serveur n’est nécessaire : le build produit uniquement des fichiers statiques.

## Démarrage

```bash
npm install
cp .env.example .env
npm run dev
```

Le serveur local écoute par défaut sur `http://localhost:4321`.

Commandes utiles :

```bash
npm run check      # typage et diagnostics Astro
npm run build      # build statique dans dist/
npm run preview    # prévisualisation du build
npm run validate   # astro check + astro build
npm run assets:og  # régénère l’image Open Graph et les icônes
```

Le projet demande Node.js 22 LTS ou plus récent.

## Routes

| URL | Contenu |
| --- | --- |
| `/` | Accueil, comparateur principal et promesse produit |
| `/fonctionnalites/` | Image, vidéo, préréglages, moteurs, formats et traitement local |
| `/galerie/` | Comparatifs commentés et crédits |
| `/telecharger/` | Version 1.5.5, installateur, empreinte SHA-256 et installation |
| `/code-source/` | Dépôt GitHub, architecture, tests et limites de licence |

Les URL sont générées en dossiers avec slash final (`/galerie/`, pas `/galerie.html`). `trailingSlash: 'always'` et `build.format: 'directory'` sont réglés dans `astro.config.mjs`.

## Structure

```text
src/
  assets/images/
    hero/       comparateur d’accueil et détail
    gallery/    comparatifs de la galerie
  components/   composants Astro + un fichier CSS par composant
  data/         textes, liens, versions, crédits et fonctionnalités
  layouts/      BaseLayout : SEO, OG, Twitter, JSON-LD, header et footer
  pages/        une page par route
  scripts/      comparateur, copie du hash, menu mobile
  styles/
    tokens.css  couleurs, typographies, espacements et mouvement
    global.css  base, focus, accessibilité et utilitaires
    layout.css  structure générale
    pages/      styles propres à chaque page
public/
  brand/        icône SVG
  icons/        icônes PWA et Apple Touch
  og/           image Open Graph 1200 × 630
  _headers      cache et en-têtes de sécurité Cloudflare Pages
scripts/
  make-og.mjs   génération de l’image sociale et des icônes
```

Les textes produits sont centralisés dans `src/data/site.ts`, `features.ts`, `gallery.ts` et `faqs.ts`. Les composants visuels sont dans `src/components/`, chacun avec son CSS.

## Remplacer les images de démonstration

Les images actuelles sont des **substituts libres**, pas les captures définitives :

- le comparatif du lac Hooker est une photo **CC0** de Danny Postma ;
- les images animées viennent de *Namakura Gatana* (1917), dans le domaine public.

Pour mettre les vraies images, remplacez les fichiers en conservant leur nom, ou adaptez les imports.

### Accueil et comparateur

| Fichier | Rôle | Format conseillé |
| --- | --- | --- |
| `src/assets/images/hero/before.jpg` | image de départ | ratio proche de 3:2, 1800 × 1208 pour HiDPI |
| `src/assets/images/hero/after.jpg` | image après traitement | même cadrage, mêmes dimensions que `before.jpg` |
| `src/assets/images/hero/detail.jpg` | détail à 100 % | 1800 × 1200, crop réel sans agrandissement artificiel |

Le comparateur utilise le même cadrage pour les deux images. Si les dimensions diffèrent, il recadre via `object-fit: cover` : gardez donc exactement le même cadrage avant/après.

`after.jpg` sert aussi de fond à l’image Open Graph.

### Galerie

| Fichier | Rôle |
| --- | --- |
| `src/assets/images/gallery/mount-cook.jpg` | comparatif complet du lac Hooker |
| `src/assets/images/gallery/anime-engines.jpg` | comparaison AnimeVideo v3 / Anime 6B |
| `src/assets/images/gallery/anime-noise.jpg` | cartes de bruit temporel |

Fournissez des images d’au moins **1600 px de large** ; Astro génère les variantes WebP et AVIF. Les ratios peuvent différer d’une image à l’autre, la galerie respecte le ratio natif.

### Comparatif à cinq chaînes

Les dix-huit fichiers de `src/assets/images/video-chains/` suivent le motif `<plan>-<chaîne>.jpg` : plans `05` (armure), `08` (gros plan), `10` (portrait), chaînes `source`, `ultron-ae`, `lisere`, `lisere-ultron`, `topaz` et `topaz-ultron`. Les fichiers font 960 × 960, Astro produit les variantes AVIF, WebP et JPEG aux largeurs 420, 640 et 960. Libellés, notes et plans sont dans `src/data/videoChains.ts`.

Après remplacement :

1. mettez à jour les textes `alt`, descriptions, réglages et crédits dans `src/data/gallery.ts` ;
2. mettez à jour le crédit et les textes du comparateur d’accueil dans `src/data/site.ts` ;
3. relancez `npm run assets:og` si l’image `after.jpg` a changé ;
4. vérifiez le rendu avec `npm run dev`, puis `npm run validate`.

Les images de contenu vont dans `src/assets/`, pas dans `public/`, pour bénéficier du pipeline d’images Astro. Seuls les visuels sociaux, favicons et icônes restent dans `public/`.

## Domaine, SEO et Open Graph

Le domaine public est lu au **build** depuis `SITE_URL` :

```bash
# .env
SITE_URL=https://lisere.example
```

`SITE_URL` ne doit pas avoir de slash final. La valeur alimente :

- les URL canoniques ;
- `robots.txt` ;
- `sitemap-index.xml` et `sitemap-0.xml` ;
- les URL absolues `og:image` et `twitter:image`.

Sans variable, le fallback est `https://lisere.pages.dev`. **Remplacez-le par le domaine final avant la mise en ligne.**

### Open Graph et Twitter Card

`src/layouts/BaseLayout.astro` génère pour chaque page :

- `og:type`, `og:locale`, `og:site_name`, `og:title`, `og:description`, `og:url` ;
- `og:image`, `og:image:width`, `og:image:height`, `og:image:alt` ;
- `twitter:card` en `summary_large_image`, titre, description, image et texte alternatif ;
- une URL canonique et un graphe JSON-LD.

L’image par défaut est `public/og/lisere-og.jpg` en **1200 × 630**. Le script `scripts/make-og.mjs` la régénère à partir de `src/assets/images/hero/after.jpg`. Il lit `SITE_URL` depuis `.env` (ou depuis la variable d’environnement) pour afficher le bon domaine.

```bash
npm run assets:og
```

Après un changement de domaine ou d’image sociale :

1. reconstruisez le site ;
2. testez l’URL avec le [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) et le [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) ;
3. si un réseau garde l’ancienne vignette, demandez un nouveau scrape.

### Sitemap et Search Console

Le build génère :

- `dist/sitemap.xml` : le sitemap unique à déclarer ;
- `dist/sitemap-index.xml` : l’index généré par Astro (solution de secours) ;
- `dist/sitemap-0.xml` : les URL détaillées ;
- `dist/robots.txt` : la directive `Sitemap:`.

Sur `*.pages.dev`, Google Search Console peut afficher « Impossible de récupérer le sitemap » même quand l’URL répond en 200 : c’est un comportement connu de Cloudflare sur le domaine partagé. Le sitemap unique évite l’étape supplémentaire de l’index ; pour une récupération fiable sur le long terme, utilisez un domaine personnalisé.

La page 404 est exclue de la sitemap. Les priorités sont définies dans `astro.config.mjs`.

Après le déploiement :

1. ouvrez [Google Search Console](https://search.google.com/search-console/) et ajoutez le domaine final.
   - **Propriété de domaine** : vérification DNS, recommandée si le domaine est géré dans Cloudflare.
   - **Préfixe d’URL** : vérification par balise HTML ou fichier, utile pour une URL `*.pages.dev`.
2. Dans **Indexation > Sitemaps**, soumettez exactement :

   ```text
   https://<votre-domaine>/sitemap.xml
   ```

   Ne soumettez pas `sitemap-0.xml` : le sitemap unique contient déjà les URL. Si Search Console refuse encore `sitemap.xml`, essayez l’index `sitemap-index.xml` ; les deux fichiers sont générés.
3. Vérifiez que `https://<votre-domaine>/robots.txt` répond et contient la même URL de sitemap.
4. Après un changement de domaine, reconstruisez avec le nouveau `SITE_URL`, redéployez, puis soumettez la nouvelle sitemap. Les anciennes URL canoniques ne doivent plus être conservées.

La sitemap ne remplace pas la vérification de propriété et ne force pas l’indexation : elle indique les URL à explorer.

## Déploiement sur Cloudflare Pages

Dans le tableau de bord Cloudflare Pages :

- **Framework preset** : Astro (ou None) ;
- **Build command** : `npm run build` ;
- **Build output directory** : `dist` ;
- **Node version** : 22 ou plus récent ;
- **Environment variable** : `SITE_URL` = domaine final, sans slash, pour **Production** et **Preview**.

Aucun adaptateur Cloudflare n’est installé : c’est un site statique. `public/_headers` est copié dans `dist/_headers` et applique :

- `X-Content-Type-Options: nosniff` ;
- `Referrer-Policy: strict-origin-when-cross-origin` ;
- `Permissions-Policy` restrictif ;
- `X-Frame-Options: DENY` ;
- un cache long et immuable sur `/_astro/*` ;
- le bon type MIME sur les sitemaps.

Cloudflare Pages sert `dist/404.html` pour les URL inconnues. Les routes avec slash final sont servies depuis les dossiers générés.

## Typographies

Les deux familles sont auto-hébergées avec Fontsource : aucune requête n’est faite vers Google Fonts ou un autre domaine au chargement de la page.

- **Inter Variable** (textes et interface) : The Inter Project Authors, licence [SIL Open Font License 1.1](https://openfontlicense.org/). Source : [rsms.me/inter](https://rsms.me/inter/).
- **IBM Plex Mono** (code, empreintes et métadonnées) : IBM, licence SIL Open Font License 1.1. Source : [ibm.com/plex](https://www.ibm.com/plex/).

Les paquets `@fontsource-variable/inter` et `@fontsource/ibm-plex-mono` sont importés dans `src/layouts/BaseLayout.astro`, et les fichiers sont copiés dans `dist/_astro/` au build. Le crédit visible figure dans le pied de page.

## Accessibilité et qualité

Le site inclut :

- une langue `fr`, des titres hiérarchisés et des landmarks ;
- un lien d’évitement vers le contenu ;
- des états de focus visibles, y compris sur fond sombre ;
- un comparateur utilisable au clavier avec une valeur `aria-valuetext` ;
- un menu mobile natif `<details>`, fermable avec Échap ;
- des textes alternatifs et des crédits pour chaque image ;
- le respect de `prefers-reduced-motion` et de `prefers-contrast: more` ;
- des cibles interactives d’au moins 24 px, et 44 px pour les boutons ;
- une palette vérifiée pour le contraste AA sur les textes courants.

Vérification avant mise en ligne :

```bash
npm run validate
```

Le seul diagnostic restant est un **hint** TypeScript sur `document.execCommand`, utilisé uniquement comme repli de copie pour les navigateurs sans Clipboard API.

## Licence et limites

Le dépôt produit **n’a pas de licence globale**. Le site dit donc « code public » et non « open source ». Si le code doit être réutilisé ou redistribué, ajoutez une licence explicite au dépôt et vérifiez les licences des composants tiers.

Les modèles ONNX, FFmpeg, RIFE, YuNet et les noms de presets cités gardent leurs conditions d’origine. Aucun fichier propriétaire Topaz ou After Effects n’est distribué.

Le rendu GPU est livré dans les versions 1.5.x ; la revalidation complète sur la RTX 4070 de référence reste ouverte. Les textes du site reflètent cet état.
