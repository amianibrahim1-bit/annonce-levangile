# Mettre le site en ligne (GitHub Pages + domaine Namecheap)

Hébergement gratuit, HTTPS compris. Le dossier du site est déjà un dépôt Git prêt à être envoyé.

> Deux informations à remplacer partout dans ce document :
> `annoncelevangile.com` (le nom acheté chez Namecheap) et `amianibrahim1-bit` (votre identifiant GitHub).

---

## 1. Créer le dépôt sur GitHub

1. Aller sur **github.com**, se connecter (ou créer un compte, c'est gratuit).
2. Cliquer sur **+** en haut à droite, puis **New repository**.
3. Nom du dépôt : `annonce-levangile`.
4. Visibilité : **Public**.
   GitHub Pages n'est gratuit que sur les dépôts publics. Le code du site devient donc visible ;
   il n'y a rien de confidentiel dedans (aucun mot de passe, aucune clé).
5. **Ne cocher ni README, ni .gitignore, ni licence** : le dossier en contient déjà.
6. **Create repository**.

## 2. Envoyer le site

Depuis le dossier du site, dans le Terminal :

```bash
cd ~/Documents/"App autres"/bandanas-de-marie
git remote add origin https://github.com/amianibrahim1-bit/annonce-levangile.git
git push -u origin main
```

GitHub demandera votre identifiant et un mot de passe : le mot de passe n'est plus accepté,
il faut un **jeton d'accès personnel** (Settings → Developer settings → Personal access tokens →
Tokens (classic) → Generate new token → cocher `repo`). Collez le jeton à la place du mot de passe.
macOS le retiendra pour les prochaines fois.

*Plus simple, sans jeton :* installer **GitHub Desktop** (desktop.github.com), se connecter,
`File → Add local repository` → choisir le dossier du site → `Publish repository`.

## 3. Activer GitHub Pages

Dans le dépôt sur GitHub : **Settings → Pages**.

- **Source** : `Deploy from a branch`
- **Branch** : `main`, dossier `/ (root)` → **Save**

Au bout d'une minute, le site est visible sur `https://amianibrahim1-bit.github.io/annonce-levangile/`.

## 4. Brancher le nom de domaine

### a) Côté GitHub

**Settings → Pages → Custom domain** : taper `annoncelevangile.com` puis **Save**.
GitHub crée alors un fichier `CNAME` dans le dépôt : c'est normal, il faut le garder.

### b) Côté Namecheap

Tableau de bord → **Domain List** → bouton **Manage** du domaine → onglet **Advanced DNS**.

**Supprimer** la ligne déjà présente `CNAME Record` / `@` / `parkingpage.namecheap.com`
(la page de parking de Namecheap), sinon elle entre en conflit.

Puis **Add New Record**, sept lignes en tout :

| Type | Host | Value | TTL |
|---|---|---|---|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |
| CNAME Record | www | amianibrahim1-bit.github.io. | Automatic |

Les quatre adresses A sont celles de GitHub Pages, elles sont identiques pour tout le monde.
Le point final après `.github.io.` est voulu.

*Facultatif, pour l'IPv6 :* ajouter aussi quatre `AAAA Record` sur `@` avec
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

### c) Attendre, puis forcer le HTTPS

La propagation DNS prend de quelques minutes à quelques heures. Revenir ensuite dans
**Settings → Pages** : quand GitHub affiche « DNS check successful », cocher **Enforce HTTPS**.
Le certificat est gratuit et se renouvelle tout seul.

## 5. Une fois en ligne, à faire dans le site

- `assets/config.js` : l'adresse e-mail et les réseaux sociaux.
- `mentions.html` : SIRET, adresse, hébergeur (**GitHub, Inc., 88 Colin P. Kelly Jr. Street,
  San Francisco, CA 94107, USA**), médiateur.
- `robots.txt` et `sitemap.xml` : remplacer `annoncelevangile.com` par le vrai domaine.

## 6. Publier une modification, plus tard

```bash
cd ~/Documents/"App autres"/bandanas-de-marie
git add -A
git commit -m "ce que j'ai changé"
git push
```

Le site en ligne se met à jour tout seul en une minute environ.
