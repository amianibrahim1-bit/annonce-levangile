# Annonce l’Évangile

Boutique en ligne (en français) pour des bandanas mariaux, des chapelets et des t-shirts chrétiens,
avec au centre le concept **Pain de Vie** : le visiteur « rompt le pain », reçoit une parole tirée au
sort, et cette parole s'imprime sur son t-shirt.

Site entièrement statique : du HTML, du CSS et du JavaScript, sans base de données ni serveur.
Il se met en ligne n'importe où (Netlify, Vercel, OVH, un simple hébergement mutualisé).

---

## Les pages

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : héros, présentation du Pain de Vie, catégories, sélection, avis |
| `pain-de-vie.html` | **Le cœur du site** : le rituel du tirage et la mise en vente du t-shirt |
| `boutique.html` | Tous les articles, avec filtres par catégorie (`?cat=bandana`, `chapelet`, `tshirt`) |
| `produit.html?id=…` | Fiche d'un article : couleurs, tailles, détails, ajout au panier |
| `panier.html` | Panier + formulaire de commande |
| `a-propos.html` | L'histoire de la maison |
| `faq.html` | Tailles, livraison, retours, entretien, commandes de groupe |
| `contact.html` | Formulaire de contact |
| `mentions.html` | Mentions légales et CGV — **à compléter avant la mise en ligne** |

Fichiers communs : `assets/config.js` (réglages), `assets/data.js` (paroles + catalogue),
`assets/liturgie.js` (temps liturgique), `assets/mockup.js` (visuels), `assets/site.js` (en-tête,
pied de page, panier), `assets/style.css`.

> Le dossier s'appelle encore `bandanas-de-marie` : c'était le premier nom de la maison.
> Vous pouvez le renommer `annonce-levangile` sans rien casser — aucun fichier ne s'y réfère.

---

## Ce qu'il faut faire avant d'ouvrir la boutique

1. **`assets/config.js`** — remplacer l'adresse e-mail, le téléphone, le WhatsApp, les liens Instagram
   et Facebook, les frais de port et le seuil de livraison offerte. C'est le seul fichier à toucher
   pour ces réglages : tout le site (bandeau, panier, FAQ, mentions) se met à jour tout seul.
2. **`mentions.html`** — remplir les éléments entre crochets : statut, SIRET, adresse, hébergeur,
   médiateur de la consommation. Ces mentions sont obligatoires pour un site marchand en France.
3. **Le paiement** — voir plus bas.
4. **`robots.txt` et `sitemap.xml`** — y remplacer `annonce-levangile.fr` par le vrai domaine.

---

## Comment le panier et la commande fonctionnent aujourd'hui

Le panier est enregistré dans le navigateur du client (rien n'est envoyé nulle part).
Au moment de commander, le formulaire ouvre le logiciel de messagerie du client avec une commande
déjà rédigée — articles, tailles, couleurs, **parole à imprimer**, adresse et total — adressée à
l'e-mail indiqué dans `config.js`. Vous répondez ensuite avec le moyen de paiement.

C'est volontairement simple : aucun frais, aucun abonnement, et cela fonctionne dès le premier jour.

**Pour passer au paiement en ligne plus tard** (Stripe, SumUp, PayPal, Lemon Squeezy) :
ouvrez `assets/config.js`, mettez `paiementActif: true` et collez votre lien dans `lienPaiement`.
Un bouton « Payer en ligne » apparaît alors dans le panier, et la FAQ change de texte automatiquement.

---

## Ajouter une parole au Pain de Vie

Dans `assets/data.js`, dans la liste `window.PAROLES`, copiez une ligne et modifiez-la :

```js
{ t:"Le texte de la parole.", r:"Jean 3, 16", m:"Un petit mot, facultatif." },
```

- `t` : le texte imprimé sur le t-shirt
- `r` : la référence (livre, chapitre, verset — ou le nom du saint)
- `m` : le petit mot affiché sous la parole sur le site (pas sur le vêtement)

La couleur du t-shirt n’est pas à préciser : il est proposé dans la couleur du temps liturgique
en cours (voir plus bas), et le visiteur peut en changer.

Le tirage évite de redonner une parole reçue récemment (les quatorze dernières sont mémorisées),
et la parole du jour reste enregistrée jusqu'au lendemain sur l'appareil du visiteur.

> Les versets sont donnés dans la traduction **Louis Segond**, qui appartient au domaine public :
> vous pouvez les imprimer et les vendre librement. Attention si vous ajoutez des versets tirés
> d'une traduction récente (BJ, TOB, Semeur…) : celles-là sont protégées par le droit d'auteur.

---

## Ajouter ou modifier un article

Toujours dans `assets/data.js`, dans `window.PRODUITS`. Copiez un bloc existant et changez :

- `id` : un identifiant sans espace ni accent (il sert dans l'adresse de la fiche produit)
- `nom`, `prix`, `resume` (une ligne), `desc` (le paragraphe de la fiche)
- `cat` : `bandana`, `chapelet`, `tshirt` ou `pdv`
- `mockup` : quel visuel dessiner —
  `{type:"tshirt", design:"ave"}`, `{type:"bandana", motif:"rose", couleur:"rouge"}`,
  `{type:"chapelet", couleur:"nacre"}`
- `couleurs`, `tailles`, `details` (le tableau de caractéristiques)

Motifs de bandana disponibles : `ave`, `epis`, `rose`, `lys`.
Motifs de t-shirt disponibles : `ave`, `coeur`, `alpha`, `ichthys`, `vierge`, et `verset`
(le t-shirt du Pain de Vie).

---

## Les couleurs liturgiques

Toute la boutique est bâtie sur les couleurs de la liturgie, et sur elles seules :

| Clé | Couleur | Temps |
|---|---|---|
| `violet` | Violet | Avent et Carême |
| `blanc` | Blanc & or | Noël, Pâques et les fêtes |
| `vert` | Vert | Temps ordinaire |
| `rouge` | Rouge | Pentecôte, Rameaux, martyrs |
| `rose` | Rose | Gaudete et Lætare |
| `bleu` | Bleu marial | Fêtes de la Vierge |
| `noir` / `nacre` | Noir, nacré ivoire | Mémoire des défunts, chapelets |

`assets/liturgie.js` calcule **tout seul** le temps liturgique du jour (la date de Pâques est
recalculée chaque année, l'Avent et le Carême en découlent). Il n'y a donc rien à mettre à jour
d'une année sur l'autre. Ce calcul alimente :

- le bandeau en haut de chaque page (« Temps ordinaire · couleur du temps : vert ») ;
- la section « Les couleurs du temps » de l'accueil, qui met en avant la couleur du jour ;
- le t-shirt du Pain de Vie, proposé d'emblée dans la couleur du temps ;
- la réponse « Quelle est la couleur du temps aujourd'hui ? » de la FAQ.

Pour changer une teinte, modifiez-la à deux endroits : `assets/style.css` (les variables `--violet`,
`--rouge`… en haut du fichier) et `assets/mockup.js` (les palettes `TISSU`, `TOILE`, `PERLE`, qui
servent aux visuels des articles).

---

## Les visuels

Les **dessins des t-shirts et des bandanas sont de vraies images**, rangées dans `assets/img/`.
Le reste (la forme du t-shirt, le losange du bandana, les chapelets, le pain) est dessiné en direct
par `assets/mockup.js`.

Pour changer un dessin : déposez votre fichier dans `assets/img/`, puis, dans `assets/data.js`,
indiquez son nom dans la ligne `mockup` de l'article —
`mockup:{ type:"tshirt", image:"assets/img/mon-dessin.jpg" }`.

- Le fond clair du fichier (papier ou blanc) est **rendu transparent automatiquement** : le dessin se
  pose sur le tissu comme une impression, sans rectangle autour. Fournissez donc vos dessins sur fond
  blanc ou crème, jamais sur fond sombre.
- Les t-shirts à dessin sont proposés en tissus clairs (blanc, rose) : une illustration à traits noirs
  disparaîtrait sur un tissu foncé.
- Compressez vos images avant de les déposer (environ 900 px de large, 150 Ko) :
  `sips -Z 900 -s format jpeg -s formatOptions 72 photo.jpeg --out assets/img/photo.jpg`

L'ancien système de dessins vectoriels (`design:"ave"`, `"coeur"`, `"alpha"`…) reste disponible dans
`mockup.js` si vous voulez y revenir pour un article.

### Le t-shirt lui-même

Le vêtement est dessiné (tombé du tissu, plis, ourlets piqués, col côtelé, ombre portée), pas
photographié. C'est ce qui permet de le teindre dans n'importe quelle couleur et d'y poser la parole
tirée au sort, en une fraction de seconde et sans photo à préparer.

**Si vous préférez de vraies photos de t-shirts**, c'est possible : demandez à votre atelier ses
photos de t-shirts vierges (une par couleur, vue de face, fond uni) et envoyez-les-moi. Le dessin
peut alors être posé sur la photo au lieu du t-shirt dessiné. Comptez une photo par coloris. C'est ce qui permet d'imprimer la parole tirée sur le t-shirt à
l'écran, tout de suite, sans photo à préparer.

**Le jour où vous aurez de vraies photos** (les visuels fournis par votre atelier, ou vos propres photos) :
dans `assets/site.js`, la fonction `carteProduit` et, dans `produit.html`, la fonction `dessiner`
sont les deux seuls endroits où le visuel est posé. Remplacez `MOCK.produit(p, couleur)` par
`<img src="assets/img/…">`. Gardez le dessin pour le t-shirt Pain de Vie : c'est lui qui donne au
client l'aperçu de *sa* parole.

---

## Mettre le site en ligne

Le plus simple, gratuit et sans compétence technique : **Netlify Drop** (`app.netlify.com/drop`).
Glissez-y le dossier du site entier, le site est en ligne en une minute.
Vous pourrez ensuite y brancher un nom de domaine (`annonce-levangile.fr`, environ 10 € par an).

Pour travailler dessus en local, ouvrez simplement `index.html` dans le navigateur.

---

## Détails techniques

- Aucun cookie, aucun traceur, aucune donnée envoyée à des tiers. Seul le stockage local du
  navigateur est utilisé (`bdm_panier`, `bdm_pdv`, `bdm_pdv_hist`).
- Polices Google Fonts (Cormorant Garamond, Lora, Inter) avec repli sur des polices système.
- Compatible mobile, tablette et ordinateur ; navigation au clavier ; contrastes lisibles pour
  un public qui ne veut pas plisser les yeux.
- Le site fonctionne aussi sans JavaScript pour la lecture des textes, mais le panier et le tirage
  demandent JavaScript (activé chez plus de 99 % des visiteurs).
