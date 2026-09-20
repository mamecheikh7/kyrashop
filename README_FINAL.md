# KyraShop — version finale prête à publier

Cette version est une boutique statique mobile-first, sans dépendance externe.

## Fonctionnalités
- Accueil, catalogue, collections et section livraison
- Recherche, filtres et tri
- 13 produits et prix en FCFA
- Favoris et panier sauvegardés sur l'appareil
- Fiche produit et partage
- Formulaire de commande
- Génération d'une commande WhatsApp avec référence, date, produits, quantités et total
- PWA / service worker
- Responsive iPhone / Android / ordinateur

## Important avant publication
1. Vérifier le numéro WhatsApp dans `script.js` : `SHOP.whatsapp`.
2. Remplacer les visuels CSS par les vraies photos dans `assets/products/1.jpg` à `13.jpg` lorsque disponibles.
3. Vérifier les prix et noms des produits avant d'accepter des commandes réelles.
4. Le site ne traite pas les paiements en ligne : le paiement et la livraison sont confirmés avec KyraShop.

## Publication
Mettre le contenu du dossier sur n'importe quel hébergeur de site statique. Le fichier d'entrée est `index.html`.


## FINAL — Photos réelles intégrées
La photo `assets/catalogue-client.jpg` correspond au montage photo fourni pour KyraShop.
Elle est affichée dans la page d'accueil et dans une section Photos dédiée.
Les noms/prix du catalogue V7 sont conservés. Les photos individuelles peuvent être remplacées
plus tard si des fichiers séparés par produit sont fournis.
