# KyraShop — authentification réelle

Cette version contient l’intégration Supabase pour créer des comptes et se connecter avec email ou téléphone + mot de passe.

## Activation obligatoire
1. Crée un projet sur Supabase.
2. Dans Project Settings → API, récupère l’URL du projet et la clé publique `publishable` (ou `anon` si ton tableau de bord affiche encore ce nom).
3. Ouvre `supabase-config.js`.
4. Remplace `TON-PROJET` et `TA_CLE_PUBLIQUE` par les valeurs de ton projet.
5. Dans Supabase → Authentication → URL Configuration, ajoute l’adresse exacte du site dans les URLs autorisées.
6. Active la confirmation email si tu veux vérifier les adresses avant connexion.

## Important
- Ne mets jamais une clé `service_role` dans le site.
- Cette intégration gère l’authentification. Le suivi des commandes, les profils complets et les commandes enregistrées dans une base devront être ajoutés ensuite avec des tables sécurisées et des règles RLS.
- Sans URL et clé publiques de ton projet, aucun site statique ne peut créer de vrais comptes en ligne.
