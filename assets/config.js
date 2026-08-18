/* =========================================================
   Annonce l’Évangile — configuration de la boutique
   ---------------------------------------------------------
   👉 C'EST LE SEUL FICHIER À MODIFIER pour vos coordonnées,
      vos frais de port et vos liens de paiement.
   ========================================================= */

window.CFG = {
  /* --- Identité --- */
  nom: "Annonce l’Évangile",
  baseline: "ALE · Vêtements & objets de foi",

  /* --- Contact (remplacez par les vraies coordonnées) --- */
  email: "contact@annonce-levangile.fr",
  telephone: "",                     // ex : "+33 6 12 34 56 78" (laisser vide pour masquer)
  whatsapp: "",                      // ex : "33612345678" (sans + ni espaces) — active le bouton WhatsApp
  instagram: "",                     // ex : "https://instagram.com/annonce.levangile"
  facebook: "",
  ville: "France",

  /* --- Livraison --- */
  livraison: {
    prix: 4.9,                       // frais de port standard (€)
    gratuiteDes: 60,                 // franco de port à partir de ce montant (€) — 0 pour désactiver
    delai: "3 à 6 jours ouvrés",
    zones: "France, Belgique, Suisse, Luxembourg, Canada"
  },

  /* --- Paiement ---
     Tant que `paiementActif` est false, le panier génère une commande
     par e-mail (aucun paiement en ligne). Quand vous aurez ouvert un
     compte Stripe / SumUp / PayPal, mettez `true` et collez le lien.  */
  paiementActif: false,
  lienPaiement: "",                  // ex : "https://buy.stripe.com/xxxxx"

  /* --- Devise --- */
  devise: "€"
};
