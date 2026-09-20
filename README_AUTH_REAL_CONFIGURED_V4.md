# KyraShop — Authentification Supabase V4

Cette version utilise la clé publique Supabase configurée et ajoute :
- inscription par email + mot de passe ;
- connexion par email + mot de passe ;
- réinitialisation du mot de passe par email ;
- affichage de la session connectée ;
- déconnexion.

## À configurer dans Supabase
1. Authentication > Providers > Email : vérifier que l'inscription email est autorisée.
2. Authentication > URL Configuration : ajouter l'URL réelle du site dans Site URL et Redirect URLs.
3. Tester avec une adresse email réelle.

Ne jamais mettre de clé `secret` ou `service_role` dans le site public.
