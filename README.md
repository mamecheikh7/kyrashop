# KyraShop

Boutique mobile-first de parfums et coffrets. Site statique (HTML/CSS/JS), sans framework.
Commande finalisée via un message WhatsApp pré-rempli (pas de paiement en ligne intégré).

## Structure
- `index.html` — structure de la page
- `style.css` — styles (thème rose/bordeaux, responsive)
- `script.js` — catalogue produits (codé en dur), panier, favoris, recherche/filtres/tri, compte client
- `supabase-config.js` — URL + clé publique Supabase (authentification uniquement)
- `manifest.json` / `sw.js` — PWA (installation + mode hors-ligne basique)
- `assets/` — logo, visuels catalogue, photos produits

## Fonctionnement du compte client
L'authentification (inscription / connexion / mot de passe oublié) est branchée sur Supabase Auth.
Aucune autre donnée (commandes, favoris, profils) n'est actuellement stockée côté serveur : le
panier et les favoris restent uniquement dans le navigateur du client (`localStorage`).

## Avant mise en ligne
1. Vérifier le numéro WhatsApp dans `script.js` (`SHOP.whatsapp`).
2. Remplacer le logo et les photos produits par de vrais visuels KyraShop.
3. Dans le dashboard Supabase : configurer Site URL / Redirect URLs sur le domaine réel de
   production (pas localhost), vérifier le provider Email.
4. Vérifier prix et noms des produits avant d'accepter des commandes réelles.
5. Ne jamais ajouter de clé `service_role` dans ce projet (site public).

## Publication
Déposer le contenu du dossier sur n'importe quel hébergeur de site statique en HTTPS.
Le fichier d'entrée est `index.html`.
