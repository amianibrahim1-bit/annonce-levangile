/* =========================================================
   Annonce l’Évangile — script commun
   En-tête, pied de page, panier, notifications.
   ========================================================= */

(function (w, d) {

  const CLE_PANIER = "bdm_panier";
  const CFG = w.CFG || {};

  /* ---------------------------------------------------------
     Utilitaires
     --------------------------------------------------------- */
  const $  = (s, r) => (r || d).querySelector(s);
  const $$ = (s, r) => Array.from((r || d).querySelectorAll(s));

  const prix = n => {
    const v = Math.round(n * 100) / 100;
    return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(2).replace(".", ",")) + " " + (CFG.devise || "€");
  };

  const libCouleur = c => (w.LIBELLES && w.LIBELLES.couleurs[c]) || c || "";

  function toast(msg){
    let t = $(".toast");
    if(!t){ t = d.createElement("div"); t.className = "toast"; d.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(t._to);
    t._to = setTimeout(()=>t.classList.remove("on"), 2600);
  }

  /* ---------------------------------------------------------
     Panier
     --------------------------------------------------------- */
  const Panier = {
    lire(){
      try { return JSON.parse(localStorage.getItem(CLE_PANIER)) || []; }
      catch(e){ return []; }
    },
    ecrire(items){
      try { localStorage.setItem(CLE_PANIER, JSON.stringify(items)); } catch(e){}
      majPastille();
      d.dispatchEvent(new CustomEvent("panier:maj"));
    },
    ajouter(article){
      const items = Panier.lire();
      const cle = a => [a.id, a.couleur, a.taille, (a.verset && a.verset.r) || ""].join("|");
      const trouve = items.find(i => cle(i) === cle(article));
      if(trouve){ trouve.qte += (article.qte || 1); }
      else { items.push(Object.assign({ qte:1 }, article)); }
      Panier.ecrire(items);
      toast("Ajouté au panier : " + article.nom);
    },
    retirer(i){ const it = Panier.lire(); it.splice(i,1); Panier.ecrire(it); },
    modifier(i, delta){
      const it = Panier.lire();
      if(!it[i]) return;
      it[i].qte = Math.max(1, Math.min(20, it[i].qte + delta));
      Panier.ecrire(it);
    },
    vider(){ Panier.ecrire([]); },
    nombre(){ return Panier.lire().reduce((s,i)=>s + i.qte, 0); },
    sousTotal(){ return Panier.lire().reduce((s,i)=>s + i.prix * i.qte, 0); },
    fraisPort(){
      const l = CFG.livraison || {};
      const st = Panier.sousTotal();
      if(!st) return 0;
      if(l.gratuiteDes && st >= l.gratuiteDes) return 0;
      return l.prix || 0;
    },
    total(){ return Panier.sousTotal() + Panier.fraisPort(); }
  };

  function majPastille(){
    const n = Panier.nombre();
    $$(".pastille").forEach(p=>{
      p.textContent = n;
      p.classList.toggle("on", n > 0);
    });
  }

  /* ---------------------------------------------------------
     Logo
     --------------------------------------------------------- */
  /* Emblème : le losange des quatre couleurs liturgiques,
     traversé de la croix d'or. */
  function logoSVG(taille){
    const s = taille || 40;
    return `<svg width="${s}" height="${s}" viewBox="0 0 48 48" aria-hidden="true">
      <g transform="rotate(45 24 24)">
        <path d="M8,8 L40,8 L24,24 Z"  fill="#563A76"/>
        <path d="M40,8 L40,40 L24,24 Z" fill="#8E2431"/>
        <path d="M8,40 L40,40 L24,24 Z" fill="#2E6B4F"/>
        <path d="M8,8 L8,40 L24,24 Z"   fill="#EBDDBC"/>
        <rect x="8" y="8" width="32" height="32" rx="2" fill="none" stroke="#B08A3E" stroke-width="2"/>
      </g>
      <g stroke="#B08A3E" stroke-width="3.2" stroke-linecap="round">
        <line x1="24" y1="13" x2="24" y2="35"/>
        <line x1="15" y1="20" x2="33" y2="20"/>
      </g>
      <g stroke="#FBF7F0" stroke-width="1.1" stroke-linecap="round">
        <line x1="24" y1="13" x2="24" y2="35"/>
        <line x1="15" y1="20" x2="33" y2="20"/>
      </g>
    </svg>`;
  }

  /* ---------------------------------------------------------
     En-tête
     --------------------------------------------------------- */
  const LIENS = [
    { h:"pain-de-vie.html", t:"Pain de Vie", classe:"nav-pdv" },
    { h:"boutique.html", t:"La boutique", sous:[
      { h:"boutique.html", t:"Tout voir" },
      { h:"boutique.html?cat=bandana", t:"Bandanas" },
      { h:"boutique.html?cat=chapelet", t:"Chapelets" },
      { h:"boutique.html?cat=tshirt", t:"T-shirts" }
    ]},
    { h:"a-propos.html", t:"La maison" },
    { h:"contact.html", t:"Contact" }
  ];

  function entete(){
    const page = (location.pathname.split("/").pop() || "index.html");
    const q = new URLSearchParams(location.search);
    const cat = q.get("cat");

    const estActif = h => {
      const [fic, req] = h.split("?");
      if(fic !== page) return false;
      if(fic !== "boutique.html") return true;
      const lc = req ? new URLSearchParams(req).get("cat") : null;
      return (lc || null) === (cat || null);
    };

    const liens = LIENS.map(l=>{
      if(!l.sous)
        return `<a href="${l.h}" class="${l.classe||""}${estActif(l.h)?" actif":""}">${l.t}</a>`;

      const ouvert = page === "boutique.html" || page === "produit.html";
      const sous = l.sous.map(s=>
        `<a href="${s.h}" class="${estActif(s.h)?" actif":""}">${s.t}</a>`).join("");
      return `<div class="nav-groupe">
        <a href="${l.h}" class="nav-parent${ouvert?" actif":""}">${l.t}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </a>
        <div class="sous-menu">${sous}</div>
      </div>`;
    }).join("");

    const t = w.LITURGIE ? w.LITURGIE.temps() : null;
    const chip = t
      ? `<span class="temps-chip"><i class="temps-pastille" style="background:${t.hex}"></i>
           ${t.temps} · couleur du temps : ${t.couleur.toLowerCase()}</span>
         <span class="sep">·</span>`
      : "";

    return `
    <div class="bandeau"><div class="bandeau-in">
      ${chip}
      <span class="promo">Livraison offerte dès ${prix(CFG.livraison && CFG.livraison.gratuiteDes || 60)}</span>
    </div></div>
    <header class="entete">
      <div class="entete-in">
        <a class="logo" href="index.html">
          ${logoSVG(42)}
          <span class="logo-txt"><b>Annonce l'Évangile</b><span>ALE · Vêtements &amp; objets de foi</span></span>
        </a>
        <nav class="nav" id="nav">${liens}</nav>
        <div class="entete-actions">
          <a class="panier-lien" href="panier.html" aria-label="Voir mon panier">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span class="pastille">0</span>
          </a>
          <button class="burger" id="burger" aria-label="Ouvrir le menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>`;
  }

  /* ---------------------------------------------------------
     Pied de page
     --------------------------------------------------------- */
  function pied(){
    const an = new Date().getFullYear();
    const l = CFG.livraison || {};
    const res = [];
    if(CFG.instagram) res.push(`<a href="${CFG.instagram}" aria-label="Instagram" target="_blank" rel="noopener">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg></a>`);
    if(CFG.facebook) res.push(`<a href="${CFG.facebook}" aria-label="Facebook" target="_blank" rel="noopener">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.3 0-1.3-.1-2.45-.1-2.4 0-4.05 1.5-4.05 4.2v2.2H7.5V14h2.7v8z"/>
      </svg></a>`);

    return `
    <footer class="pied">
      <div class="wrap">
        <div class="pied-grille">
          <div>
            <a class="logo" href="index.html" style="color:#fff">
              ${logoSVG(40)}
              <span class="logo-txt"><b>Annonce l'Évangile</b><span>ALE · Vêtements &amp; objets de foi</span></span>
            </a>
            <p style="margin-top:16px;max-width:34ch">Une petite maison familiale, née d'une conviction simple : ce que l'on porte peut annoncer ce que l'on croit.</p>
            <div class="reseaux">${res.join("")}</div>
          </div>
          <div>
            <h4>La boutique</h4>
            <ul>
              <li><a href="pain-de-vie.html">Pain de Vie</a></li>
              <li><a href="boutique.html?cat=bandana">Bandanas</a></li>
              <li><a href="boutique.html?cat=chapelet">Chapelets</a></li>
              <li><a href="boutique.html?cat=tshirt">T-shirts</a></li>
              <li><a href="boutique.html">Tout voir</a></li>
            </ul>
          </div>
          <div>
            <h4>Aide</h4>
            <ul>
              <li><a href="faq.html">Questions fréquentes</a></li>
              <li><a href="faq.html#tailles">Guide des tailles</a></li>
              <li><a href="faq.html#livraison">Livraison &amp; retours</a></li>
              <li><a href="contact.html">Nous écrire</a></li>
              <li><a href="mentions.html">Mentions légales</a></li>
            </ul>
          </div>
          <div>
            <h4>Rester en lien</h4>
            <p>Une parole, une nouveauté, rien de plus. Deux courriers par mois, jamais davantage.</p>
            <form class="champ" onsubmit="return Site.inscription(event)">
              <input type="email" name="email" placeholder="Votre adresse e-mail" required
                     style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.18);color:#fff">
              <button class="btn btn-petit" type="submit" style="margin-top:10px;background:var(--or);border-color:var(--or)">S'inscrire</button>
            </form>
          </div>
        </div>
        <div class="pied-bas">
          <span>© ${an} ${CFG.nom || "Annonce l’Évangile"} . Tous droits réservés.</span>
          <span>Livraison ${l.zones || ""} · ${l.delai || ""}</span>
        </div>
      </div>
    </footer>`;
  }

  function inscription(e){
    e.preventDefault();
    const f = e.target;
    toast("Merci ! Votre inscription est bien notée.");
    f.reset();
    return false;
  }

  /* ---------------------------------------------------------
     Mise en place
     --------------------------------------------------------- */
  function init(){
    const he = $("#entete-site"); if(he) he.innerHTML = entete();
    const pi = $("#pied-site");   if(pi) pi.innerHTML = pied();

    const b = $("#burger"), n = $("#nav");
    if(b && n){
      b.addEventListener("click", ()=>{
        n.classList.toggle("ouvert");
        const h = $(".entete");
        if(h) d.documentElement.style.setProperty("--h-entete", h.offsetHeight + "px");
      });
    }
    majPastille();

    /* liens d'ancre en douceur */
    $$('a[href^="#"]').forEach(a=>{
      a.addEventListener("click", ev=>{
        const el = d.querySelector(a.getAttribute("href"));
        if(el){ ev.preventDefault(); el.scrollIntoView({behavior:"smooth", block:"start"}); }
      });
    });
  }

  /* ---------------------------------------------------------
     Fabrication d'une carte produit
     --------------------------------------------------------- */
  function carteProduit(p){
    const cat = (w.LIBELLES && w.LIBELLES.cats[p.cat]) || "";
    const lien = p.cat === "pdv" ? "pain-de-vie.html" : ("produit.html?id=" + encodeURIComponent(p.id));
    return `<a class="carte" href="${lien}" data-cat="${p.cat}">
      <div class="carte-visuel">${w.MOCK.produit(p)}</div>
      <div class="carte-corps">
        <div class="carte-cat">${cat}</div>
        <h3>${p.nom}</h3>
        <p class="carte-desc">${p.resume}</p>
        <div class="carte-bas">
          <span class="prix">${prix(p.prix)}</span>
          <span class="lien-fleche">${p.cat === "pdv" ? "Recevoir ma parole →" : "Découvrir →"}</span>
        </div>
      </div>
    </a>`;
  }

  function produitParId(id){ return (w.PRODUITS || []).find(p => p.id === id); }

  w.Site = { $, $$, prix, libCouleur, toast, Panier, carteProduit, produitParId, logoSVG, inscription, init };

  if(d.readyState === "loading") d.addEventListener("DOMContentLoaded", init);
  else init();

})(window, document);
