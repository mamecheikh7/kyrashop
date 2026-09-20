# KyraShop — configuration Supabase ajoutée

La configuration publique Supabase a été renseignée dans `supabase-config.js`.

- L'URL du projet est configurée.
- La publishable key est configurée.
- Aucune secret key n'est incluse dans le site.

À faire dans le tableau de bord Supabase avant la mise en ligne :
1. Vérifier Authentication > Providers > Email.
2. Configurer les URLs autorisées dans Authentication > URL Configuration.
3. Tester inscription, confirmation d'email et connexion sur un hébergement HTTPS.
4. Activer et vérifier les politiques RLS avant de stocker des données client.
