/* =========================================================
   Annonce l'Évangile — le temps liturgique
   ---------------------------------------------------------
   Calcule le temps liturgique du jour (rite romain) et la
   couleur qui lui correspond. Sert au bandeau du site, à la
   page Pain de Vie et à la section « Les couleurs du temps ».

   Aucune donnée à mettre à jour : la date de Pâques est
   recalculée chaque année.
   ========================================================= */

(function (w) {

  /* --- les six couleurs de la liturgie --- */
  const COULEURS = {
    blanc : { nom:"Blanc & or", hex:"#F2E9D2", sens:"La joie et la lumière : Noël, Pâques, les fêtes du Seigneur et de Marie." },
    violet: { nom:"Violet",     hex:"#563A76", sens:"L'attente et la conversion : l'Avent et le Carême." },
    vert  : { nom:"Vert",       hex:"#2E6B4F", sens:"L'espérance des jours ordinaires, qui sont la plus grande part de l'année." },
    rouge : { nom:"Rouge",      hex:"#8E2431", sens:"Le feu de l'Esprit et le sang des martyrs : Pentecôte, Rameaux, Vendredi saint." },
    rose  : { nom:"Rose",       hex:"#C1798D", sens:"Deux dimanches par an, la joie perce au milieu de l'attente : Gaudete et Lætare." },
    bleu  : { nom:"Bleu",       hex:"#2A3F66", sens:"La couleur mariale, portée en plusieurs lieux pour les fêtes de la Vierge." }
  };

  const j = (a, m, d) => new Date(a, m - 1, d);
  /* on compte en jours de calendrier, jamais en millisecondes :
     sinon le passage à l'heure d'été décale les dates d'une heure
     et les jours de fête ne tombent plus juste. */
  const plus = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
  const sansHeure = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  /* --- dimanche de Pâques (algorithme de Meeus/Jones/Butcher) --- */
  function paques(an){
    const a = an % 19,
          b = Math.floor(an / 100), c = an % 100,
          d = Math.floor(b / 4), e = b % 4,
          f = Math.floor((b + 8) / 25),
          g = Math.floor((b - f + 1) / 3),
          h = (19 * a + b - d - g + 15) % 30,
          i = Math.floor(c / 4), k = c % 4,
          l = (32 + 2 * e + 2 * i - h - k) % 7,
          m = Math.floor((a + 11 * h + 22 * l) / 451),
          mois = Math.floor((h + l - 7 * m + 114) / 31),
          jour = ((h + l - 7 * m + 114) % 31) + 1;
    return j(an, mois, jour);
  }

  /* --- premier dimanche de l'Avent d'une année --- */
  function avent(an){
    const noel = j(an, 12, 25);
    /* quatre dimanches avant Noël */
    return plus(noel, -(noel.getDay() === 0 ? 7 : noel.getDay()) - 21);
  }

  /* --- baptême du Seigneur : dimanche après l'Épiphanie --- */
  function bapteme(an){
    const epi = j(an, 1, 6);
    const d = epi.getDay();
    return plus(epi, d === 0 ? 7 : 7 - d);
  }

  /* =========================================================
     Temps liturgique d'une date
     ========================================================= */
  function temps(date){
    const d  = sansHeure(date || new Date());
    const an = d.getFullYear();

    const P    = paques(an);
    const cend = plus(P, -46);          // mercredi des Cendres
    const rame = plus(P, -7);           // dimanche des Rameaux
    const vend = plus(P, -2);           // vendredi saint
    const pent = plus(P, 49);           // Pentecôte
    const av   = avent(an);
    const bapt = bapteme(an);

    const meme = (a, b) => a.getTime() === b.getTime();
    const entre = (a, b) => d >= a && d <= b;

    /* --- jours à couleur propre --- */
    if(meme(d, rame) || meme(d, vend) || meme(d, pent))
      return fiche("rouge", meme(d, pent) ? "Pentecôte" : (meme(d, rame) ? "Dimanche des Rameaux" : "Vendredi saint"));

    /* Gaudete : 3e dimanche de l'Avent — Lætare : 4e dimanche de Carême */
    if(meme(d, plus(av, 14)))  return fiche("rose", "Dimanche de Gaudete");
    if(meme(d, dimancheDeCareme(cend, 4))) return fiche("rose", "Dimanche de Lætare");

    /* --- temps --- */
    if(d >= j(an,12,25))             return fiche("blanc",  "Temps de Noël");
    if(d >= av)                      return fiche("violet", "Temps de l'Avent");
    if(entre(j(an,1,1), bapt))       return fiche("blanc",  "Temps de Noël");
    if(d < cend)                     return fiche("vert",   "Temps ordinaire");
    if(d < P)                        return fiche("violet", "Temps du Carême");
    if(d <= pent)                    return fiche("blanc",  "Temps pascal");
    return fiche("vert", "Temps ordinaire");
  }

  /* n-ième dimanche de Carême */
  function dimancheDeCareme(cendres, n){
    const d = cendres.getDay();
    const premier = plus(cendres, d === 0 ? 7 : 7 - d);   // dimanche suivant les Cendres
    return plus(premier, (n - 1) * 7);
  }

  function fiche(cle, nom){
    const c = COULEURS[cle];
    return { cle:cle, temps:nom, couleur:c.nom, hex:c.hex, sens:c.sens };
  }

  w.LITURGIE = { temps, couleurs:COULEURS, paques, avent };

})(window);
