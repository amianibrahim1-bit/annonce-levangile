/* =========================================================
   Annonce l’Évangile — données du site
   • PAROLES : versets (Louis Segond 1910, domaine public)
     et paroles de saints (domaine public).
   • PRODUITS : catalogue de la boutique.
   Pour ajouter une parole ou un produit : copiez une ligne
   existante et modifiez-la. Rien d'autre à toucher.
   ========================================================= */

/* ---------------------------------------------------------
   1) LES PAROLES DU PAIN DE VIE
   t  = texte      r = référence
   m  = petit mot (s’affiche sous la parole, pas sur le vêtement)
   --------------------------------------------------------- */
window.PAROLES = [
  { t:"Je suis le pain de vie.", r:"Jean 6, 35", m:"Celui qui vient à lui n'aura plus jamais faim." },
  { t:"Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.", r:"Psaume 119, 105", m:"Un pas éclairé suffit pour avancer." },
  { t:"L'Éternel est mon berger : je ne manquerai de rien.", r:"Psaume 23, 1", m:"Ce qui vous manque aujourd'hui, il le connaît déjà." },
  { t:"Fortifie-toi et prends courage, ne t'effraie point.", r:"Josué 1, 9", m:"Le courage n'est pas l'absence de peur, mais la présence de Dieu." },
  { t:"Tout est possible à celui qui croit.", r:"Marc 9, 23", m:"Commencez petit. Dieu fera grand." },
  { t:"L'amour est patient, il est plein de bonté.", r:"1 Corinthiens 13, 4", m:"À porter les jours où la patience s'use." },
  { t:"Je puis tout par celui qui me fortifie.", r:"Philippiens 4, 13", m:"Non pas seul : par lui." },
  { t:"Demandez, et l'on vous donnera.", r:"Matthieu 7, 7", m:"Osez demander ce que vous n'osez plus espérer." },
  { t:"Vous êtes la lumière du monde.", r:"Matthieu 5, 14", m:"Quelqu'un, aujourd'hui, marchera à votre lumière." },
  { t:"Heureux ceux qui ont le cœur pur, car ils verront Dieu !", r:"Matthieu 5, 8", m:"La pureté du cœur est une manière de regarder." },
  { t:"Ne crains rien, car je suis avec toi.", r:"Ésaïe 41, 10", m:"Six mots à relire quand la nuit est longue." },
  { t:"Ceux qui se confient en l'Éternel renouvellent leur force.", r:"Ésaïe 40, 31", m:"Se confier, c'est déjà se reposer." },
  { t:"L'Éternel est ma lumière et mon salut : de qui aurais-je crainte ?", r:"Psaume 27, 1", m:"La lumière ne discute pas avec l'ombre : elle entre." },
  { t:"Voici, je fais toutes choses nouvelles.", r:"Apocalypse 21, 5", m:"Rien chez vous n'est trop abîmé pour être refait." },
  { t:"Dieu est amour.", r:"1 Jean 4, 8", m:"Trois mots qui tiennent tout l'Évangile." },
  { t:"Ma grâce te suffit.", r:"2 Corinthiens 12, 9", m:"Votre faiblesse est le lieu de sa force." },
  { t:"Venez à moi, vous tous qui êtes fatigués et chargés.", r:"Matthieu 11, 28", m:"L'invitation est pour aujourd'hui, pas pour plus tard." },
  { t:"Je t'aime d'un amour éternel.", r:"Jérémie 31, 3", m:"Aimée avant d'avoir rien fait pour le mériter." },
  { t:"Mon âme exalte le Seigneur.", r:"Luc 1, 46 (Magnificat)", m:"Le premier chant de Marie, et le nôtre." },
  { t:"Faites tout ce qu'il vous dira.", r:"Jean 2, 5", m:"Les dernières paroles de Marie dans l'Évangile." },
  { t:"Je suis la servante du Seigneur.", r:"Luc 1, 38", m:"Un oui simple a changé le monde." },
  { t:"Rien n'est impossible à Dieu.", r:"Luc 1, 37", m:"Pas même ce que vous avez cessé de demander." },
  { t:"Que ta volonté soit faite.", r:"Matthieu 6, 10", m:"La prière la plus courte, et la plus difficile." },
  { t:"La paix soit avec vous !", r:"Jean 20, 19", m:"Sa première parole aux siens après la Résurrection." },
  { t:"Aimez-vous les uns les autres.", r:"Jean 13, 34", m:"Le commandement nouveau, toujours neuf." },
  { t:"L'Éternel combattra pour vous ; gardez le silence.", r:"Exode 14, 14", m:"Il y a des combats qu'on gagne en se taisant." },
  { t:"Bénis l'Éternel, mon âme !", r:"Psaume 103, 1", m:"Comptez vos grâces avant vos soucis." },
  { t:"Goûtez et voyez combien l'Éternel est bon !", r:"Psaume 34, 8", m:"La foi se goûte avant de se comprendre." },
  { t:"Il essuiera toute larme de leurs yeux.", r:"Apocalypse 21, 4", m:"Aucune de vos larmes n'est perdue." },
  { t:"Cherchez premièrement le royaume de Dieu.", r:"Matthieu 6, 33", m:"Le reste trouve sa place ensuite." },
  { t:"Veillez et priez.", r:"Matthieu 26, 41", m:"Deux verbes pour traverser n'importe quelle semaine." },
  { t:"Je suis le chemin, la vérité et la vie.", r:"Jean 14, 6", m:"Quand la route est incertaine, il est la route." },
  { t:"Le fruit de l'Esprit, c'est l'amour, la joie, la paix.", r:"Galates 5, 22", m:"On ne fabrique pas un fruit : on le laisse mûrir." },
  { t:"Rendez grâces en toutes choses.", r:"1 Thessaloniciens 5, 18", m:"Même les jours ordinaires. Surtout eux." },
  { t:"Sa miséricorde s'étend d'âge en âge.", r:"Luc 1, 50", m:"Ce que Dieu a fait pour vos parents, il le fera pour vos enfants." },
  { t:"Espère en l'Éternel ! Fortifie-toi et que ton cœur s'affermisse.", r:"Psaume 27, 14", m:"Espérer est un travail, et il porte du fruit." },
  { t:"Comme une biche soupire après des courants d'eau, ainsi mon âme soupire après toi.", r:"Psaume 42, 2", m:"Votre soif est déjà une prière." },
  { t:"Que votre cœur ne se trouble point.", r:"Jean 14, 1", m:"À relire lentement, deux fois." },
  { t:"Le Seigneur est près de ceux qui ont le cœur brisé.", r:"Psaume 34, 18", m:"Il ne s'éloigne jamais du chagrin." },
  { t:"Confie-toi en l'Éternel de tout ton cœur.", r:"Proverbes 3, 5", m:"De tout, pas d'une partie." },

  /* --- Paroles d'encouragement, pour les jours ordinaires --- */
  { t:"Si Dieu est pour nous, qui sera contre nous ?", r:"Romains 8, 31", m:"À relire avant d'entrer quelque part." },
  { t:"Je connais les projets que j'ai formés sur vous, projets de paix et non de malheur.", r:"Jérémie 29, 11", m:"Votre avenir est déjà pensé par quelqu'un." },
  { t:"La joie de l'Éternel sera votre force.", r:"Néhémie 8, 10", m:"La joie n'est pas la récompense de la force : elle en est la source." },
  { t:"Ne nous lassons pas de faire le bien.", r:"Galates 6, 9", m:"La moisson vient au temps convenable, pas au nôtre." },
  { t:"Ils courent et ne se lassent point, ils marchent et ne se fatiguent point.", r:"Ésaïe 40, 31", m:"Pour ceux qui recommencent lundi matin." },
  { t:"Recommande à l'Éternel tes œuvres, et tes projets réussiront.", r:"Proverbes 16, 3", m:"Confier son travail, ce n'est pas s'en décharger." },
  { t:"Dieu ne nous a pas donné un esprit de timidité, mais un esprit de force, d'amour et de sagesse.", r:"2 Timothée 1, 7", m:"Trois mots à emporter dans une salle d'examen." },
  { t:"Ne crains pas, crois seulement.", r:"Marc 5, 36", m:"Quatre mots, et rien à ajouter." },
  { t:"Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.", r:"1 Pierre 5, 7", m:"Vous n'avez pas à tout porter." },
  { t:"Reconnais-le dans toutes tes voies, et il aplanira tes sentiers.", r:"Proverbes 3, 6", m:"Le chemin s'ouvre en marchant." },
  { t:"Toutes choses concourent au bien de ceux qui aiment Dieu.", r:"Romains 8, 28", m:"Même ce que vous ne comprenez pas encore." },
  { t:"Veillez, demeurez fermes dans la foi, fortifiez-vous.", r:"1 Corinthiens 16, 13", m:"Tenir bon est déjà une victoire." },
  { t:"Courons avec persévérance dans la carrière qui nous est ouverte.", r:"Hébreux 12, 1", m:"Ce n'est pas une course de vitesse." },
  { t:"Oubliant ce qui est en arrière, je cours vers le but.", r:"Philippiens 3, 13", m:"Votre passé n'a pas le dernier mot." },
  { t:"Voici, je vais faire une chose nouvelle.", r:"Ésaïe 43, 19", m:"Elle est peut-être déjà commencée." },
  { t:"Il y a un temps pour tout, un temps pour toute chose sous les cieux.", r:"Ecclésiaste 3, 1", m:"Y compris pour attendre." },
  { t:"C'est ici la journée que l'Éternel a faite : qu'elle soit pour nous un sujet de joie !", r:"Psaume 118, 24", m:"Celle-ci, pas une autre." },
  { t:"Le soir arrivent les pleurs, et le matin l'allégresse.", r:"Psaume 30, 6", m:"Aucune nuit n'a jamais duré toujours." },
  { t:"Notre homme intérieur se renouvelle de jour en jour.", r:"2 Corinthiens 4, 16", m:"Ce qui s'use dehors se refait dedans." },
  { t:"Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais.", r:"Psaume 46, 2", m:"Un abri, pas une échappatoire." },
  { t:"Ce n'est ni par la puissance ni par la force, mais par mon esprit.", r:"Zacharie 4, 6", m:"Quand vos moyens ne suffisent pas." },
  { t:"Quand je marche dans la vallée de l'ombre, je ne crains aucun mal.", r:"Psaume 23, 4", m:"On traverse la vallée, on n'y habite pas." },
  { t:"Le secours me vient de l'Éternel, qui a fait les cieux et la terre.", r:"Psaume 121, 2", m:"Levez les yeux plus haut que le problème." },
  { t:"Que tout ce que vous faites, vous le fassiez de bon cœur, comme pour le Seigneur.", r:"Colossiens 3, 23", m:"Même le travail que personne ne voit." },
  { t:"Pratiquer la justice, aimer la miséricorde, marcher humblement avec ton Dieu.", r:"Michée 6, 8", m:"Tout le programme d'une vie, en une ligne." },
  { t:"Heureux l'homme qui supporte patiemment l'épreuve.", r:"Jacques 1, 12", m:"La patience n'est pas de la résignation." },
  /* --- Paroles de saints (domaine public) --- */
  { t:"Notre cœur est sans repos tant qu'il ne repose en toi.", r:"Saint Augustin", m:"L'inquiétude est un appel, pas un défaut." },
  { t:"Aime, et fais ce que tu veux.", r:"Saint Augustin", m:"Tout part de là, et tout y revient." },
  { t:"Que rien ne te trouble, que rien ne t'effraie : Dieu seul suffit.", r:"Sainte Thérèse d'Avila", m:"À garder dans la poche des jours difficiles." },
  { t:"Ma vocation, c'est l'amour.", r:"Sainte Thérèse de Lisieux", m:"La petite voie : de petites choses, faites avec un grand amour." },
  { t:"Tout est grâce.", r:"Sainte Thérèse de Lisieux", m:"Même ce que vous n'aviez pas choisi." },
  { t:"Ne désirez rien, ne refusez rien.", r:"Saint François de Sales", m:"La liberté du cœur tient en cinq mots." },
  { t:"Totus tuus, tout à toi, Marie.", r:"Saint Louis-Marie Grignion de Montfort", m:"Se confier à la Mère pour aller au Fils." }
];

/* ---------------------------------------------------------
   2) LE CATALOGUE
   cat : "bandana" | "chapelet" | "tshirt" | "pdv"
   --------------------------------------------------------- */
window.PRODUITS = [

  /* ===== LE T-SHIRT PAIN DE VIE ===== */
  {
    id:"pain-de-vie",
    nom:"T-shirt Pain de Vie",
    cat:"pdv",
    prix:29,
    resume:"Votre parole, imprimée rien que pour vous.",
    desc:"Le t-shirt du <strong>Pain de Vie</strong> : vous recevez une parole tirée au sort, un verset ou une parole de saint, et elle devient l'impression de votre t-shirt. Chaque pièce est unique. Personne ne portera exactement le vôtre.",
    mockup:{ type:"tshirt", design:"verset" },
    couleurs:["blanc","rouge"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Sérigraphie numérique (DTG), encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  },

  /* ===== BANDANAS ===== */
  {
    id:"bandana-losanges-ale",
    nom:"Bandana Losanges",
    cat:"bandana",
    prix:21,
    resume:"Le losange de la maison, répété à l'infini.",
    desc:"Notre emblème repris en semis : losanges violet, vert et bordeaux, croix d'or, semés de fleurs de lys. Le bandana signature d'Annonce l'Évangile.",
    mockup:{ type:"bandana", image:"assets/img/bandana-losanges-ale.jpg" },
    couleurs:["imprime"],
    tailles:["55 × 55 cm"],
    details:[
      ["Matière","100 % coton doux, bord roulotté"],
      ["Dimensions","55 × 55 cm"],
      ["Impression","Impression numérique, couleurs tenues au lavage"],
      ["Entretien","Lavage 30°, repassage doux"]
    ]
  },

  {
    id:"bandana-guadalupe-rose",
    nom:"Bandana Guadalupe",
    cat:"bandana",
    prix:21,
    resume:"Notre-Dame de Guadalupe, camaïeu de rose.",
    desc:"Notre-Dame de Guadalupe au centre, entourée de son image répétée et d'une bordure paisley. Tout le dessin est en camaïeu de rose et framboise. Le plus porté en bandeau.",
    mockup:{ type:"bandana", image:"assets/img/bandana-guadalupe-rose.jpg" },
    couleurs:["imprime"],
    tailles:["55 × 55 cm"],
    details:[
      ["Matière","100 % coton doux, bord roulotté"],
      ["Dimensions","55 × 55 cm"],
      ["Impression","Impression numérique, couleurs tenues au lavage"],
      ["Entretien","Lavage 30°, repassage doux"]
    ]
  },

  {
    id:"bandana-jean-xxiii",
    nom:"Bandana Saint Jean XXIII",
    cat:"bandana",
    prix:21,
    resume:"Le bon pape Jean, en médaillons.",
    desc:"Le portrait de saint Jean XXIII en médaillons, sur un damier bleu et jaune aux clés de saint Pierre. Un hommage franc et joyeux au pape du Concile.",
    mockup:{ type:"bandana", image:"assets/img/bandana-jean-xxiii.jpg" },
    couleurs:["imprime"],
    tailles:["55 × 55 cm"],
    details:[
      ["Matière","100 % coton doux, bord roulotté"],
      ["Dimensions","55 × 55 cm"],
      ["Impression","Impression numérique, couleurs tenues au lavage"],
      ["Entretien","Lavage 30°, repassage doux"]
    ]
  },

  {
    id:"bandana-annonce-kente",
    nom:"Bandana Annonce l'Évangile",
    cat:"bandana",
    prix:23,
    resume:"Motif kenté bleu et or, colombe au centre.",
    desc:"Un bandana inspiré des tissus kenté : bleu roi, or et vert, la colombe de l'Esprit au centre et le nom de la maison répété tout autour. Le plus voyant, et le plus demandé en paroisse.",
    mockup:{ type:"bandana", image:"assets/img/bandana-annonce-kente.jpg" },
    couleurs:["imprime"],
    tailles:["55 × 55 cm"],
    details:[
      ["Matière","100 % coton doux, bord roulotté"],
      ["Dimensions","55 × 55 cm"],
      ["Impression","Impression numérique, couleurs tenues au lavage"],
      ["Entretien","Lavage 30°, repassage doux"]
    ]
  },


  /* ===== CHAPELETS ===== */
  {
    id:"chapelet-nacre",
    nom:"Chapelet perles nacrées",
    cat:"chapelet",
    prix:34,
    resume:"Perles nacrées ivoire, croix et médaille argentées.",
    desc:"Notre chapelet classique : cinquante-neuf perles nacrées ivoire, montées une à une sur chaîne argentée, croix ciselée et médaille miraculeuse au centre. Livré dans une pochette de velours : c'est le cadeau de baptême, de communion ou de confirmation par excellence.",
    mockup:{ type:"chapelet", couleur:"nacre" },
    couleurs:["nacre","violet","vert","rouge","bleu","noir"],
    tailles:["Chapelet complet (5 dizaines)"],
    details:[
      ["Perles","Verre nacré, 6 mm"],
      ["Monture","Chaîne et apprêts argentés, montage à l'œillet"],
      ["Médaille","Médaille miraculeuse, Ø 12 mm"],
      ["Longueur","Environ 52 cm, croix comprise"],
      ["Livré avec","Pochette de velours + prière du Rosaire imprimée"]
    ]
  },
  {
    id:"chapelet-bleu-marial",
    nom:"Chapelet bleu marial",
    cat:"chapelet",
    prix:34,
    resume:"Le bleu de Marie, monté sur chaîne argentée.",
    desc:"Le même montage soigné que notre chapelet nacré, dans le bleu profond de la Vierge. Un chapelet qui se voit peu et se tient bien en main.",
    mockup:{ type:"chapelet", couleur:"bleu" },
    couleurs:["bleu","nacre","violet","vert","rouge","noir"],
    tailles:["Chapelet complet (5 dizaines)"],
    details:[
      ["Perles","Verre nacré bleu, 6 mm"],
      ["Monture","Chaîne et apprêts argentés"],
      ["Médaille","Médaille miraculeuse, Ø 12 mm"],
      ["Longueur","Environ 52 cm, croix comprise"],
      ["Livré avec","Pochette de velours + prière du Rosaire imprimée"]
    ]
  },
  {
    id:"chapelet-noir-homme",
    nom:"Chapelet noir",
    cat:"chapelet",
    prix:36,
    resume:"Perles noires mates, croix de Saint-Benoît.",
    desc:"Un chapelet sobre et solide, pensé pour être porté tous les jours : perles noires mates de 8 mm et croix de Saint-Benoît. Le préféré des hommes et des pèlerins.",
    mockup:{ type:"chapelet", couleur:"noir" },
    couleurs:["noir","nacre","violet","rouge","bleu"],
    tailles:["Chapelet complet (5 dizaines)"],
    details:[
      ["Perles","Verre noir mat, 8 mm"],
      ["Monture","Chaîne renforcée, apprêts couleur bronze"],
      ["Croix","Croix de Saint-Benoît"],
      ["Longueur","Environ 56 cm, croix comprise"],
      ["Livré avec","Pochette de velours"]
    ]
  },
  {
    id:"dizainier-poche",
    nom:"Dizainier de poche",
    cat:"chapelet",
    prix:16,
    resume:"Une dizaine à emporter partout.",
    desc:"Dix perles et une croix : le chapelet de ceux qui prient dans le train, à l'hôpital, en marchant. Assez petit pour tenir au fond d'une poche, assez beau pour être offert.",
    mockup:{ type:"chapelet", couleur:"nacre", dizainier:true },
    couleurs:["nacre","violet","vert","rouge","bleu","noir"],
    tailles:["Dizainier (1 dizaine)"],
    details:[
      ["Perles","Verre nacré, 6 mm"],
      ["Monture","Chaîne argentée"],
      ["Longueur","Environ 14 cm"],
      ["Livré avec","Petite pochette en coton"]
    ]
  },

  /* ===== T-SHIRTS À THÈME ===== */
  {
    id:"tshirt-vierge-neon-vert",
    nom:"T-shirt Vierge à l'Enfant, néon vert",
    cat:"tshirt",
    prix:32,
    resume:"Trait noir, auréole et cheveux en vert fluo.",
    desc:"La Vierge et l'Enfant tracés d'un trait continu, la chevelure et l'auréole rehaussées de vert fluorescent. Un dessin contemporain qui se remarque sans crier.",
    mockup:{ type:"tshirt", image:"assets/img/tshirt-vierge-neon-vert.jpg" },
    couleurs:["blanc"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Impression numérique pleine couleur, encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  },

  {
    id:"tshirt-vierge-neon-bleu",
    nom:"T-shirt Vierge à l'Enfant, néon bleu",
    cat:"tshirt",
    prix:32,
    resume:"Le même dessin, en bleu électrique.",
    desc:"La Vierge et l'Enfant au trait, chevelure et auréole en bleu électrique. Même dessin que la version verte, pour ceux qui préfèrent le bleu de Marie.",
    mockup:{ type:"tshirt", image:"assets/img/tshirt-vierge-neon-bleu.jpg" },
    couleurs:["blanc"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Impression numérique pleine couleur, encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  },

  {
    id:"tshirt-guadalupe-pop",
    nom:"T-shirt Guadalupe pop",
    cat:"tshirt",
    prix:32,
    resume:"Notre-Dame de Guadalupe en pleines couleurs.",
    desc:"Notre-Dame de Guadalupe dans une mandorle rayonnante, en violet, turquoise, vert et rose. Une image de dévotion traitée comme une affiche.",
    mockup:{ type:"tshirt", image:"assets/img/tshirt-guadalupe-pop.jpg" },
    couleurs:["blanc"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Impression numérique pleine couleur, encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  },

  {
    id:"tshirt-guadalupe-rose",
    nom:"T-shirt Guadalupe rose",
    cat:"tshirt",
    prix:32,
    resume:"La même, en camaïeu de rose et framboise.",
    desc:"Notre-Dame de Guadalupe en camaïeu de rose et framboise, rayons et mandorle compris. Assorti au bandana du même nom.",
    mockup:{ type:"tshirt", image:"assets/img/tshirt-guadalupe-rose.jpg" },
    couleurs:["blanc"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Impression numérique pleine couleur, encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  },

  {
    id:"tshirt-notre-dame-rosaire",
    nom:"T-shirt Notre-Dame du Rosaire",
    cat:"tshirt",
    prix:29,
    resume:"La Vierge debout, chapelet à la main.",
    desc:"La Vierge debout, les mains jointes et le chapelet entre les doigts, dessinée d'un trait fin. Le plus sobre de la collection.",
    mockup:{ type:"tshirt", image:"assets/img/tshirt-notre-dame-rosaire.jpg" },
    couleurs:["blanc"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Impression numérique pleine couleur, encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  },

  {
    id:"tshirt-vierge-priere",
    nom:"T-shirt Vierge en prière",
    cat:"tshirt",
    prix:29,
    resume:"Un seul trait, et le chapelet en dessous.",
    desc:"Le visage de la Vierge en prière, tracé d'une ligne continue, et le chapelet qui descend en dessous jusqu'à la croix. Très beau porté seul.",
    mockup:{ type:"tshirt", image:"assets/img/tshirt-vierge-priere.jpg" },
    couleurs:["blanc"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Impression numérique pleine couleur, encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  },

  {
    id:"tshirt-vierge-bleu-or",
    nom:"T-shirt Vierge à l'Enfant, bleu et or",
    cat:"tshirt",
    prix:32,
    resume:"Manteau bleu, voile d'or, l'Enfant endormi.",
    desc:"La Vierge tenant l'Enfant endormi, manteau bleu et voile d'or, deux auréoles dorées. Une illustration douce, à porter tous les jours.",
    mockup:{ type:"tshirt", image:"assets/img/tshirt-vierge-bleu-or.jpg" },
    couleurs:["blanc"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Impression numérique pleine couleur, encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  },

  {
    id:"tshirt-paix-et-bien",
    nom:"T-shirt Paix et Bien",
    cat:"tshirt",
    prix:29,
    resume:"La salutation de saint François, en lettres d'or.",
    desc:"« Paix et Bien », la salutation de saint François d'Assise, calligraphiée en lettres d'or avec la colombe et les nuages. Le cadeau tout trouvé pour un franciscain.",
    mockup:{ type:"tshirt", image:"assets/img/tshirt-paix-et-bien.jpg" },
    couleurs:["blanc"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Impression numérique pleine couleur, encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  },

  {
    id:"tshirt-paix-du-christ-or",
    nom:"T-shirt La paix du Christ",
    cat:"tshirt",
    prix:29,
    resume:"Deux mains serrées, en trait d'or.",
    desc:"Deux mains qui se serrent, tracées d'un trait d'or, et la parole que l'on se donne à la messe : la paix du Christ.",
    mockup:{ type:"tshirt", image:"assets/img/tshirt-paix-du-christ-or.jpg" },
    couleurs:["blanc"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Impression numérique pleine couleur, encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  },

  {
    id:"tshirt-paix-du-christ-aquarelle",
    nom:"T-shirt La paix du Christ, aquarelle",
    cat:"tshirt",
    prix:29,
    resume:"La même poignée de main, fond aquarelle.",
    desc:"La même poignée de main, posée sur un lavis d'aquarelle doré. Plus vivant que la version au trait seul.",
    mockup:{ type:"tshirt", image:"assets/img/tshirt-paix-du-christ-aquarelle.jpg" },
    couleurs:["blanc"],
    tailles:["S","M","L","XL","2XL"],
    details:[
      ["Matière","100 % coton peigné bio, 180 g/m²"],
      ["Coupe","Unisexe, droite, col rond côtelé"],
      ["Impression","Impression numérique pleine couleur, encres à l'eau"],
      ["Fabrication","Imprimé en Europe"],
      ["Entretien","Lavage 30°, à l'envers, sans sèche-linge"]
    ]
  }
];

/* ---------------------------------------------------------
   3) LIBELLÉS
   Les couleurs de la boutique sont celles de la liturgie.
   `couleurs` = le nom court (panier, vignettes)
   `saisons`  = le temps liturgique correspondant (fiche produit)
   --------------------------------------------------------- */
window.LIBELLES = {
  couleurs:{
    blanc:"Blanc", violet:"Violet", rouge:"Rouge", vert:"Vert",
    bleu:"Bleu marial", rose:"Rose", noir:"Noir", nacre:"Nacré ivoire",
    imprime:"Imprimé"
  },
  saisons:{
    blanc:"Noël, Pâques et les fêtes",
    violet:"Avent et Carême",
    rouge:"Pentecôte, Rameaux et martyrs",
    vert:"Temps ordinaire",
    bleu:"Fêtes de la Vierge",
    rose:"Gaudete et Lætare",
    noir:"Mémoire des défunts",
    nacre:"Toutes saisons",
    imprime:""
  },
  cats:{
    pdv:"Pain de Vie", bandana:"Bandanas", chapelet:"Chapelets", tshirt:"T-shirts"
  }
};
