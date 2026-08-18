/* =========================================================
   Annonce l’Évangile — générateur de visuels (SVG)
   ---------------------------------------------------------
   Tous les visuels du site sont dessinés par ce fichier :
   t-shirts, bandanas et chapelets. Aucun fichier image n'est
   nécessaire, et le verset tiré au sort s'imprime en direct
   sur le t-shirt.

   ➜ Le jour où vous aurez de vraies photos de vos articles,
     remplacez simplement les appels MOCK.xxx() par des
     balises <img>. Voir README.md.
   ========================================================= */

(function (global) {

  /* ---------- palettes : les couleurs de la liturgie ---------- */
  const TISSU = {
    blanc : { clair:"#FEFCF6", base:"#F6F1E4", ombre:"#E2D9C4", encre:"#2A2420", or:"#A9822F" },
    violet: { clair:"#6B4A8E", base:"#563A76", ombre:"#3B2755", encre:"#F2EAF7", or:"#DCC28A" },
    rouge : { clair:"#A9313E", base:"#8E2431", ombre:"#65161F", encre:"#F9EDE7", or:"#E7C98F" },
    vert  : { clair:"#3B8362", base:"#2E6B4F", ombre:"#1E4A36", encre:"#EEF4EC", or:"#DCC28A" },
    bleu  : { clair:"#37507E", base:"#2A3F66", ombre:"#1B2B46", encre:"#EFE9DE", or:"#DCC28A" },
    rose  : { clair:"#E5C0C9", base:"#D8A7B4", ombre:"#B98695", encre:"#4A2833", or:"#8E5F49" },
    noir  : { clair:"#2C2A27", base:"#211F1D", ombre:"#131211", encre:"#EFE9DE", or:"#C6A24E" }
  };
  const TOILE = {
    violet : { base:"#563A76", clair:"#6B4A8E", ombre:"#3B2755", encre:"#F2EAF7", or:"#DCC28A" },
    rouge  : { base:"#8E2431", clair:"#A9313E", ombre:"#65161F", encre:"#F9EDE7", or:"#E7C98F" },
    vert   : { base:"#2E6B4F", clair:"#3B8362", ombre:"#1E4A36", encre:"#EEF4EC", or:"#DCC28A" },
    bleu   : { base:"#2A3F66", clair:"#37507E", ombre:"#1B2B46", encre:"#F1E9D8", or:"#DCC28A" },
    blanc  : { base:"#F2ECDF", clair:"#FCF9F1", ombre:"#DED3BD", encre:"#2A2420", or:"#A9822F" },
    noir   : { base:"#211F1D", clair:"#2E2B28", ombre:"#121110", encre:"#EFE9DE", or:"#C6A24E" }
  };
  const PERLE = {
    nacre : { base:"#EFE7D8", clair:"#FFFDF7", ombre:"#CFC3AC", metal:"#B9BCC2", metalO:"#8A8D93" },
    violet: { base:"#6B4A8E", clair:"#A489C0", ombre:"#412C5C", metal:"#B9BCC2", metalO:"#8A8D93" },
    rouge : { base:"#8E2431", clair:"#BE5460", ombre:"#5A141C", metal:"#B9BCC2", metalO:"#8A8D93" },
    vert  : { base:"#2E6B4F", clair:"#5F9C7E", ombre:"#1C452F", metal:"#B9BCC2", metalO:"#8A8D93" },
    bleu  : { base:"#33508A", clair:"#7C93C4", ombre:"#23345C", metal:"#B9BCC2", metalO:"#8A8D93" },
    noir  : { base:"#2A2825", clair:"#5A554E", ombre:"#141312", metal:"#9E8A62", metalO:"#6E5E3F" }
  };

  const esc = s => String(s == null ? "" : s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

  /* ---------- découpe d'un texte en lignes (lignes équilibrées) ---------- */
  function lignes(txt, maxCar){
    const t = String(txt).trim();
    /* on vise le même nombre de lignes, mais de longueur égale :
       cela évite les lignes orphelines d'un seul mot. La cible ne
       dépasse jamais maxCar, sinon le texte sortirait du vêtement. */
    const n = Math.max(1, Math.ceil(t.length / maxCar));
    return couper(t, Math.min(maxCar, Math.ceil(t.length / n) + 2));
  }

  function couper(txt, maxCar){
    const mots = String(txt).split(/\s+/);
    const out = []; let cur = "";
    mots.forEach(m=>{
      if(!cur.length){ cur = m; }
      else if((cur+" "+m).length <= maxCar){ cur += " " + m; }
      else { out.push(cur); cur = m; }
    });
    if(cur) out.push(cur);
    return out;
  }

  /* =========================================================
     ORNEMENTS RÉUTILISABLES
     ========================================================= */

  /* petite croix fleurdelisée */
  function croix(x, y, h, c, ep){
    ep = ep || Math.max(2, h*0.085);
    const b = h*0.34;                     // demi-largeur du bras
    const ty = y - h/2, by = y + h/2, cy = y - h*0.10;
    return `<g stroke="${c}" stroke-width="${ep}" stroke-linecap="round" fill="none">
      <line x1="${x}" y1="${ty}" x2="${x}" y2="${by}"/>
      <line x1="${x-b}" y1="${cy}" x2="${x+b}" y2="${cy}"/>
    </g>`;
  }

  /* étoile à 5 branches */
  function etoile(cx, cy, r, c, op){
    let d = "";
    for(let i=0;i<5;i++){
      const a1 = -Math.PI/2 + i*2*Math.PI/5;
      const a2 = a1 + Math.PI/5;
      d += (i? "L":"M") + (cx+Math.cos(a1)*r) + "," + (cy+Math.sin(a1)*r);
      d += "L" + (cx+Math.cos(a2)*r*0.42) + "," + (cy+Math.sin(a2)*r*0.42);
    }
    return `<path d="${d}Z" fill="${c}" opacity="${op==null?1:op}"/>`;
  }

  /* épi de blé */
  function epi(x, y, h, c){
    let g = `<line x1="${x}" y1="${y}" x2="${x}" y2="${y-h}" stroke="${c}" stroke-width="${h*0.05}" stroke-linecap="round"/>`;
    for(let i=0;i<5;i++){
      const yy = y - h*0.28 - i*(h*0.145);
      const l  = h*0.22*(1-i*0.10);
      g += `<path d="M${x} ${yy} q ${-l} ${-l*0.5} ${-l*0.9} ${-l*1.05}" stroke="${c}" stroke-width="${h*0.045}" fill="none" stroke-linecap="round"/>`;
      g += `<path d="M${x} ${yy} q ${l} ${-l*0.5} ${l*0.9} ${-l*1.05}" stroke="${c}" stroke-width="${h*0.045}" fill="none" stroke-linecap="round"/>`;
    }
    return g;
  }

  /* fleur de lys */
  function lys(x, y, h, c, op){
    const s = h/100;
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${op==null?1:op}">
      <path d="M0,-54 C 7,-38 12,-26 12,-14 C 12,-5 6,1 0,1 C -6,1 -12,-5 -12,-14 C -12,-26 -7,-38 0,-54 Z"/>
      <path d="M-7,-2 C -13,-16 -24,-27 -33,-22 C -41,-17 -41,-3 -33,4 C -26,10 -15,9 -7,-2 Z"/>
      <path d="M7,-2 C 13,-16 24,-27 33,-22 C 41,-17 41,-3 33,4 C 26,10 15,9 7,-2 Z"/>
      <rect x="-21" y="6" width="42" height="7" rx="3"/>
      <path d="M-4,15 L4,15 L7,44 C 4,37 -4,37 -7,44 Z"/>
    </g>`;
  }

  /* rose héraldique à cinq pétales */
  function rose(x, y, h, c, op){
    const s = h/100;
    let ext = "", int = "";
    for(let i=0;i<5;i++){
      ext += `<ellipse cx="0" cy="-30" rx="17" ry="25" transform="rotate(${i*72})"/>`;
      int += `<ellipse cx="0" cy="-17" rx="10" ry="15" transform="rotate(${i*72+36})" opacity=".55"/>`;
    }
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${op==null?1:op}">
      ${ext}${int}<circle r="9"/><circle r="9" fill="none" stroke="#fff" stroke-width="2.5" opacity=".35"/>
    </g>`;
  }

  /* monogramme marial : M couronné */
  function monogramme(x, y, h, c, or){
    const s = h/100;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-42,36 L-42,-22 L-20,-22 L0,12 L20,-22 L42,-22 L42,36 L28,36 L28,-4 L4,34 L-4,34 L-28,-4 L-28,36 Z"
            fill="${c}"/>
      <path d="M-22,-30 L-22,-46 L-11,-36 L0,-50 L11,-36 L22,-46 L22,-30 Z" fill="${or}"/>
      <circle cx="-22" cy="-49" r="3.2" fill="${or}"/>
      <circle cx="22" cy="-49" r="3.2" fill="${or}"/>
      ${croix(0,-64,20,or,4.2)}
    </g>`;
  }

  /* couronne de 12 étoiles (arc) */
  function couronneEtoiles(cx, cy, r, c, taille, op){
    let g = "";
    for(let i=0;i<12;i++){
      const a = -Math.PI + (i+0.5)*(Math.PI/12);   // demi-cercle supérieur
      g += etoile(cx + Math.cos(a)*r, cy + Math.sin(a)*r, taille, c, op);
    }
    return g;
  }

  /* =========================================================
     1) T-SHIRT
     opts = { couleur, design, verset:{t,r}, vue:"grand"|"vignette" }
     ========================================================= */
  /* Les gabarits photo. Pour chacun : le centre de la zone d'impression
     et l'échelle du dessin, exprimés en fraction de la largeur de l'image,
     mesurés sur les exemples imprimés fournis. */
  const GABARITS = {
    "blanc" : { img:"assets/img/tee-blanc.jpg", cx:0.4998, cy:0.4360, ech:0.001150,
                pal:{ encre:"#2A2420", or:"#A9822F" }, fusion:"multiply", nom:"Blanc" },
    "rouge" : { img:"assets/img/tee-rouge.jpg", cx:0.5000, cy:0.4597, ech:0.001150,
                pal:{ encre:"#F7F3EA", or:"#E7C98F" }, fusion:"normal", nom:"Rouge" },
    "porte" : { img:"assets/img/tee-porte.jpg", cx:0.5046, cy:0.5090, ech:0.001020,
                pal:{ encre:"#2A2420", or:"#A9822F" }, fusion:"multiply", nom:"Porté" }
  };
  const COTE = 2048;   /* les gabarits sont carrés */

  function tshirt(opts){
    opts = opts || {};
    const vue = opts.vue === "porte" ? "porte" : null;
    const cle = vue || (GABARITS[opts.couleur] ? opts.couleur : "blanc");
    const g   = GABARITS[cle];
    const uid = "t" + Math.random().toString(36).slice(2,8);

    /* le dessin à poser : un verset composé, ou une illustration */
    let dessin = "", bbox = null;
    if(opts.image){
      dessin = `<image href="${esc(opts.image)}" x="-95" y="-105" width="190" height="210"
                  preserveAspectRatio="xMidYMid meet" filter="url(#${uid}ko)"/>`;
    } else {
      const v = (opts.design === "verset" || !opts.design) && opts.verset
              ? opts.verset : null;
      dessin = v ? imprimeVerset(v, g.pal) : imprimeDesign(opts.design, g.pal);
      bbox = "mesurer";
    }

    const s = g.ech * COTE;

    /* Le groupe est centré sur la zone d'impression. Pour un verset, on
       recentre d'abord la composition sur son propre milieu (elle est
       dessinée dans le repère du t-shirt d'origine, autour de 300;336). */
    const recentre = bbox ? `translate(-300 -336)` : ``;

    return `<svg viewBox="0 0 ${COTE} ${COTE}" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="T-shirt ${esc(g.nom)}">
      <defs>
        <filter id="${uid}ko" x="-2%" y="-2%" width="104%" height="104%"
                color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0
                                               0 1 0 0 0
                                               0 0 1 0 0
                                               -1.33 -1.33 -1.33 3.62 0"/>
        </filter>
      </defs>
      <image href="${g.img}" x="0" y="0" width="${COTE}" height="${COTE}"/>
      <g transform="translate(${g.cx*COTE} ${g.cy*COTE}) scale(${s}) ${recentre}"
         style="mix-blend-mode:${g.fusion}">${dessin}</g>
    </svg>`;
  }

  /* nom lisible d'un gabarit */
  function gabarits(){ return GABARITS; }

  /* --- impression d'un verset au centre de la poitrine ---
     Tout est calé sur LARGEUR : le corps du texte diminue jusqu'à ce
     que la ligne la plus longue tienne sur la poitrine, et la référence
     passe sur deux lignes quand elle est longue. --- */
  function imprimeVerset(v, p){
    const txt = String(v.t || "");
    const LARGEUR = 200;
    const FACT = 0.50;                  // largeur d'une lettre / corps du texte

    let fs = 27;
    if(txt.length > 34)  fs = 24;
    if(txt.length > 62)  fs = 21;
    if(txt.length > 92)  fs = 18.5;
    if(txt.length > 130) fs = 16.5;

    let L = [], maxCar = 0;
    while(true){
      maxCar = Math.max(10, Math.floor(LARGEUR / (fs * FACT)));
      L = lignes(txt, maxCar);
      const plusLongue = L.reduce((m, l) => Math.max(m, l.length), 0);
      if(plusLongue * fs * FACT <= LARGEUR || fs <= 13.5) break;
      fs -= 1;
    }

    /* référence : petites capitales espacées, sur deux lignes si besoin */
    const ref  = String(v.r || "").toUpperCase();
    const fsr  = ref.length > 30 ? 9.5 : 11;
    const lsr  = ref.length > 30 ? 2 : 2.6;
    const R    = couper(ref, Math.max(8, Math.floor(LARGEUR / (fsr * 0.62 + lsr))));

    const ih   = fs * 1.30;
    const ihr  = fsr * 1.5;
    const haut = 46 + L.length * ih + 30 + R.length * ihr;
    let y = 336 - haut / 2;

    let g = `<g text-anchor="middle" fill="${p.encre}">`;
    g += `<g opacity=".9">${epi(272, y - 4, 30, p.or)}${epi(328, y - 4, 30, p.or)}${croix(300, y - 16, 26, p.or, 3)}</g>`;
    y += 40;
    L.forEach((l, i) => {
      g += `<text x="300" y="${y + i * ih}" font-family="Cormorant Garamond, Garamond, Georgia, serif"
             font-size="${fs}" font-style="italic" letter-spacing=".2">${esc(l)}</text>`;
    });
    y += (L.length - 1) * ih + 26;
    g += `<line x1="262" y1="${y}" x2="338" y2="${y}" stroke="${p.or}" stroke-width="1"/>`;
    R.forEach((l, i) => {
      g += `<text x="300" y="${y + 20 + i * ihr}" font-family="Inter, Helvetica, Arial, sans-serif"
             font-size="${fsr}" letter-spacing="${lsr}" fill="${p.or}">${esc(l)}</text>`;
    });
    g += `</g>`;
    return g;
  }

  /* --- impressions à motif --- */
  function imprimeDesign(d, p){
    if(d === "ave"){
      return `<g text-anchor="middle">
        ${couronneEtoiles(300, 292, 84, p.or, 7, .95)}
        ${monogramme(300, 320, 108, p.encre, p.or)}
        <text x="300" y="424" font-family="Cormorant Garamond, Garamond, Georgia, serif"
              font-size="27" letter-spacing="7" fill="${p.encre}">AVE MARIA</text>
        <text x="300" y="448" font-family="Inter, Helvetica, Arial, sans-serif"
              font-size="10.5" letter-spacing="3.4" fill="${p.or}">GRATIA PLENA</text>
      </g>`;
    }
    if(d === "coeur"){
      const coeur = "M300,406 C258,372 214,344 214,300 C214,272 236,254 260,254 "+
                    "C278,254 292,264 300,278 C308,264 322,254 340,254 "+
                    "C364,254 386,272 386,300 C386,344 342,372 300,406 Z";
      return `<g text-anchor="middle">
        <path d="${coeur}" fill="none" stroke="${p.encre}" stroke-width="5"/>
        <path d="M300,254 C296,238 302,228 300,214 C312,226 316,238 310,252" fill="none"
              stroke="${p.or}" stroke-width="4.5" stroke-linecap="round"/>
        ${croix(300,208,40,p.or,5)}
        <ellipse cx="300" cy="322" rx="80" ry="72" fill="none" stroke="${p.or}"
                 stroke-width="3.4" stroke-dasharray="2 12" stroke-linecap="round" opacity=".95"/>
        <path d="M300,300 L300,352 M282,338 L318,338" stroke="${p.encre}" stroke-width="4.5"
              stroke-linecap="round" opacity=".55"/>
        <text x="300" y="452" font-family="Cormorant Garamond, Garamond, Georgia, serif"
              font-size="24" letter-spacing="5" fill="${p.encre}">SACRÉ-CŒUR</text>
      </g>`;
    }
    if(d === "alpha"){
      return `<g text-anchor="middle">
        <path id="arcAO" d="M198,300 A 102,102 0 0 1 402,300" fill="none"/>
        <path d="M198,300 A 102,102 0 0 1 402,300" fill="none" stroke="${p.or}" stroke-width="1.2" opacity=".6"/>
        ${croix(300,318,96,p.encre,7)}
        <text x="222" y="352" font-family="Cormorant Garamond, Garamond, Georgia, serif"
              font-size="54" fill="${p.encre}">Α</text>
        <text x="378" y="352" font-family="Cormorant Garamond, Garamond, Georgia, serif"
              font-size="54" fill="${p.encre}">Ω</text>
        <line x1="234" y1="396" x2="366" y2="396" stroke="${p.or}" stroke-width="1"/>
        <text x="300" y="422" font-family="Inter, Helvetica, Arial, sans-serif"
              font-size="11" letter-spacing="3" fill="${p.or}">JE SUIS L'ALPHA ET L'OMÉGA</text>
        <text x="300" y="444" font-family="Inter, Helvetica, Arial, sans-serif"
              font-size="9.5" letter-spacing="2.6" fill="${p.encre}" opacity=".7">APOCALYPSE 22, 13</text>
      </g>`;
    }
    if(d === "ichthys"){
      return `<g>
        <g transform="translate(368 272) scale(1.25)">
          <path d="M-46,0 C -28,-24 12,-24 34,0 C 12,24 -28,24 -46,0 Z" fill="none"
                stroke="${p.encre}" stroke-width="4" stroke-linecap="round"/>
          <path d="M28,-16 L52,-24 M28,16 L52,24" stroke="${p.encre}" stroke-width="4" stroke-linecap="round"/>
          <circle cx="-30" cy="-5" r="2.6" fill="${p.encre}"/>
          <text x="0" y="44" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif"
                font-size="10.5" letter-spacing="4" fill="${p.or}">ΙΧΘΥΣ</text>
        </g>
      </g>`;
    }
    if(d === "vierge"){
      return `<g text-anchor="middle">
        <g opacity=".85">${Array.from({length:24},(_,i)=>{
          const a = i*Math.PI/12;
          const x1 = 300+Math.cos(a)*96, y1 = 322+Math.sin(a)*118;
          const x2 = 300+Math.cos(a)*118, y2 = 322+Math.sin(a)*144;
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${p.or}" stroke-width="${i%2?1:2}" stroke-linecap="round"/>`;
        }).join("")}</g>
        <path d="M300,196 C356,222 380,272 380,322 C380,382 348,432 300,452
                 C252,432 220,382 220,322 C220,272 244,222 300,196 Z"
              fill="none" stroke="${p.or}" stroke-width="2"/>
        <!-- emblème marial : douze étoiles, lys, croissant de lune -->
        ${couronneEtoiles(300, 296, 60, p.or, 6, .95)}
        ${lys(300, 330, 116, p.encre, .95)}
        <path d="M262,390 a38,38 0 0 1 76,0 a46,46 0 0 0 -76,0 Z" fill="${p.or}" opacity=".95"/>
        ${croix(300,214,26,p.or,4)}
        <text x="300" y="486" font-family="Cormorant Garamond, Garamond, Georgia, serif"
              font-size="17" letter-spacing="3" fill="${p.encre}">NOTRE-DAME DE GRÂCE</text>
      </g>`;
    }
    return "";
  }

  /* =========================================================
     2) BANDANA
     opts = { motif:"ave|epis|rose|lys", couleur }
     ========================================================= */
  function bandana(opts){
    opts = opts || {};
    const p = TOILE[opts.couleur] || TOILE.violet;
    const m = opts.motif || "ave";
    const uid = "b" + Math.random().toString(36).slice(2,8);
    const S = 400, O = 100;                    // carré 400 centré dans 600

    /* --- bandana dessiné d'après une vraie illustration --- */
    if(opts.image){
      return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" role="img"
        aria-label="Bandana ${esc(opts.alt || "")}">
        <defs>
          <clipPath id="${uid}k"><rect x="${O}" y="${O}" width="${S}" height="${S}" rx="4"/></clipPath>
          <linearGradient id="${uid}f" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stop-color="#000" stop-opacity=".14"/>
            <stop offset="24%"  stop-color="#fff" stop-opacity=".10"/>
            <stop offset="50%"  stop-color="#000" stop-opacity=".10"/>
            <stop offset="76%"  stop-color="#fff" stop-opacity=".08"/>
            <stop offset="100%" stop-color="#000" stop-opacity=".12"/>
          </linearGradient>
        </defs>
        <g transform="rotate(45 300 300)">
          <rect x="${O+6}" y="${O+8}" width="${S}" height="${S}" rx="4" fill="#2A2420" opacity=".13"/>
          <g clip-path="url(#${uid}k)">
            <image href="${esc(opts.image)}" x="${O}" y="${O}" width="${S}" height="${S}"
                   preserveAspectRatio="xMidYMid slice"/>
            <rect x="${O}" y="${O}" width="${S}" height="${S}" fill="url(#${uid}f)"/>
          </g>
          <rect x="${O}" y="${O}" width="${S}" height="${S}" rx="4" fill="none"
                stroke="#2A2420" stroke-width="1.5" opacity=".22"/>
        </g>
      </svg>`;
    }

    /* motif répété du champ */
    let tuile = "";
    if(m === "lys")  tuile = lys(25, 26, 34, p.or, .38) + lys(25, 26, 0, p.or, 0);
    if(m === "ave")  tuile = etoile(25, 25, 8, p.or, .42) + `<circle cx="25" cy="25" r="15" fill="none" stroke="${p.or}" stroke-width="1" opacity=".22"/>`;
    if(m === "epis") tuile = epi(25, 40, 30, p.or) + `<g opacity=".35"></g>`;
    if(m === "rose") tuile = rose(25, 24, 30, p.or, .34);

    /* médaillon central */
    let centre = "";
    if(m === "ave"){
      centre = `${couronneEtoiles(300, 288, 66, p.or, 6, .95)}
                ${monogramme(300, 308, 76, p.encre, p.or)}
                <text x="300" y="358" text-anchor="middle" font-family="Cormorant Garamond, Garamond, Georgia, serif"
                      font-size="19" letter-spacing="5.5" fill="${p.encre}">AVE MARIA</text>`;
    } else if(m === "epis"){
      centre = `${croix(300,286,86,p.encre,7)}
                ${epi(250,326,54,p.or)}${epi(350,326,54,p.or)}
                <text x="300" y="366" text-anchor="middle" font-family="Cormorant Garamond, Garamond, Georgia, serif"
                      font-size="17" letter-spacing="5" fill="${p.encre}">PANIS VITAE</text>`;
    } else if(m === "rose"){
      centre = `<circle cx="300" cy="300" r="62" fill="none" stroke="${p.or}" stroke-width="2"
                        stroke-dasharray="3 10" stroke-linecap="round"/>
                ${rose(300,286,74,p.encre,.95)}
                <text x="300" y="372" text-anchor="middle" font-family="Cormorant Garamond, Garamond, Georgia, serif"
                      font-size="17" letter-spacing="5" fill="${p.encre}">ROSA MYSTICA</text>`;
    } else {
      centre = `${lys(300,296,96,p.encre,.95)}
                <circle cx="300" cy="300" r="70" fill="none" stroke="${p.or}" stroke-width="1.4"/>
                <text x="300" y="384" text-anchor="middle" font-family="Cormorant Garamond, Garamond, Georgia, serif"
                      font-size="17" letter-spacing="5" fill="${p.encre}">TOTA PULCHRA</text>`;
    }

    return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Bandana ${esc(m)} ${esc(LIB(opts.couleur))}">
      <defs>
        <pattern id="${uid}p" width="50" height="50" patternUnits="userSpaceOnUse">${tuile}</pattern>
        <linearGradient id="${uid}g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stop-color="${p.clair}"/>
          <stop offset="46%"  stop-color="${p.base}"/>
          <stop offset="100%" stop-color="${p.ombre}"/>
        </linearGradient>
        <linearGradient id="${uid}f" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="#000" stop-opacity=".16"/>
          <stop offset="22%"  stop-color="#fff" stop-opacity=".10"/>
          <stop offset="48%"  stop-color="#000" stop-opacity=".12"/>
          <stop offset="72%"  stop-color="#fff" stop-opacity=".08"/>
          <stop offset="100%" stop-color="#000" stop-opacity=".14"/>
        </linearGradient>
        <clipPath id="${uid}k"><rect x="${O}" y="${O}" width="${S}" height="${S}" rx="4"/></clipPath>
      </defs>

      <g transform="rotate(45 300 300)">
        <rect x="${O+6}" y="${O+8}" width="${S}" height="${S}" rx="4" fill="#2A2420" opacity=".13"/>
        <rect x="${O}" y="${O}" width="${S}" height="${S}" rx="4" fill="url(#${uid}g)"/>
        <g clip-path="url(#${uid}k)">
          <rect x="${O}" y="${O}" width="${S}" height="${S}" fill="url(#${uid}p)"/>
          <rect x="${O}" y="${O}" width="${S}" height="${S}" fill="url(#${uid}f)"/>
        </g>
        <!-- galons -->
        <rect x="${O+13}" y="${O+13}" width="${S-26}" height="${S-26}" fill="none" stroke="${p.or}" stroke-width="3"/>
        <rect x="${O+22}" y="${O+22}" width="${S-44}" height="${S-44}" fill="none" stroke="${p.or}" stroke-width="1" opacity=".8"/>
        <rect x="${O+34}" y="${O+34}" width="${S-68}" height="${S-68}" fill="none" stroke="${p.encre}"
              stroke-width="1.4" stroke-dasharray="2 8" stroke-linecap="round" opacity=".55"/>
        <rect x="${O}" y="${O}" width="${S}" height="${S}" rx="4" fill="none" stroke="${p.ombre}" stroke-width="2"/>
        <!-- ornements d'angle -->
        ${[[O+52,O+52],[O+S-52,O+52],[O+52,O+S-52],[O+S-52,O+S-52]]
            .map(c=>`<g>${croix(c[0],c[1],26,p.or,3)}<circle cx="${c[0]}" cy="${c[1]}" r="17" fill="none" stroke="${p.or}" stroke-width="1" opacity=".55"/></g>`).join("")}
      </g>

      <!-- médaillon (non tourné) -->
      <circle cx="300" cy="300" r="122" fill="${p.base}" opacity=".35"/>
      <circle cx="300" cy="300" r="122" fill="none" stroke="${p.or}" stroke-width="1.2" opacity=".55"/>
      ${centre}
    </svg>`;
  }

  /* =========================================================
     3) CHAPELET
     opts = { couleur, dizainier:bool }
     ========================================================= */
  function chapelet(opts){
    opts = opts || {};
    const p = PERLE[opts.couleur] || PERLE.nacre;
    const uid = "c" + Math.random().toString(36).slice(2,8);
    const petit = !!opts.dizainier;

    const cx = 230, cy = petit ? 210 : 240;
    const R  = petit ? 96 : 138;
    const N  = petit ? 11 : 55;                       // perles de la boucle
    const rA = petit ? 9 : 8.4, rP = petit ? 11 : 11.5;

    let perles = "";
    for(let i=0;i<N;i++){
      const a = -Math.PI/2 + (i/N)*Math.PI*2 + Math.PI;  // départ en bas
      const x = cx + Math.cos(a)*R, y = cy + Math.sin(a)*R;
      const pater = !petit && (i % 11 === 0);
      perles += bille(x, y, pater ? rP : rA, p, uid, pater);
    }

    /* médaille + pendentif */
    const my = cy + R + 26;
    let bas = `
      <line x1="${cx}" y1="${cy+R}" x2="${cx}" y2="${my-14}" stroke="${p.metal}" stroke-width="2"/>
      <ellipse cx="${cx}" cy="${my}" rx="17" ry="21" fill="url(#${uid}m)" stroke="${p.metalO}" stroke-width="1.4"/>
      ${monogramme(cx, my+3, 26, p.metalO, p.metalO)}
    `;
    let y = my + 21;
    const chaine = (y1,y2)=>`<line x1="${cx}" y1="${y1}" x2="${cx}" y2="${y2}" stroke="${p.metal}" stroke-width="2"/>`;
    if(!petit){
      bas += chaine(y, y+16); y += 16 + rP; bas += bille(cx, y, rP, p, uid, true); y += rP;
      for(let i=0;i<3;i++){ bas += chaine(y, y+11); y += 11 + rA; bas += bille(cx, y, rA, p, uid, false); y += rA; }
      bas += chaine(y, y+14); y += 14 + rP; bas += bille(cx, y, rP, p, uid, true); y += rP;
    } else {
      bas += chaine(y, y+14); y += 14;
    }
    bas += chaine(y, y+18); y += 18;
    bas += crucifix(cx, y, petit ? 90 : 96, p, uid);

    return `<svg viewBox="0 0 460 ${petit ? 500 : 700}" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Chapelet ${esc(LIB(opts.couleur))}">
      <defs>
        <radialGradient id="${uid}b" cx="34%" cy="30%" r="72%">
          <stop offset="0%"   stop-color="${p.clair}"/>
          <stop offset="58%"  stop-color="${p.base}"/>
          <stop offset="100%" stop-color="${p.ombre}"/>
        </radialGradient>
        <linearGradient id="${uid}m" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stop-color="#F2F3F5"/>
          <stop offset="45%"  stop-color="${p.metal}"/>
          <stop offset="100%" stop-color="${p.metalO}"/>
        </linearGradient>
      </defs>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${p.metal}" stroke-width="2" opacity=".9"/>
      ${perles}
      ${bas}
    </svg>`;
  }

  function bille(x, y, r, p, uid, pater){
    return `<g>
      <circle cx="${x}" cy="${y+1.5}" r="${r}" fill="#2A2420" opacity=".14"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="url(#${uid}b)" stroke="${p.ombre}" stroke-width=".8"/>
      <ellipse cx="${x-r*0.30}" cy="${y-r*0.34}" rx="${r*0.30}" ry="${r*0.22}" fill="#fff" opacity="${pater?.55:.45}"
               transform="rotate(-30 ${x-r*0.30} ${y-r*0.34})"/>
      ${pater?`<circle cx="${x}" cy="${y}" r="${r+2.4}" fill="none" stroke="${p.metal}" stroke-width="1.1" opacity=".85"/>`:""}
    </g>`;
  }

  function crucifix(x, yTop, h, p, uid){
    const w = h*0.60, ep = h*0.115;
    const cy = yTop + h*0.34;
    return `<g>
      <rect x="${x-ep/2}" y="${yTop}" width="${ep}" height="${h}" rx="${ep*0.28}" fill="url(#${uid}m)" stroke="${p.metalO}" stroke-width="1"/>
      <rect x="${x-w/2}" y="${cy-ep/2}" width="${w}" height="${ep}" rx="${ep*0.28}" fill="url(#${uid}m)" stroke="${p.metalO}" stroke-width="1"/>
      <g stroke="${p.metalO}" stroke-width="${h*0.026}" fill="none" stroke-linecap="round" opacity=".95">
        <circle cx="${x}" cy="${cy-h*0.10}" r="${h*0.045}" fill="${p.metalO}" stroke="none"/>
        <path d="M${x} ${cy-h*0.055} L${x} ${cy+h*0.16}"/>
        <path d="M${x} ${cy-h*0.02} L${x-w*0.30} ${cy-h*0.055} M${x} ${cy-h*0.02} L${x+w*0.30} ${cy-h*0.055}"/>
        <path d="M${x} ${cy+h*0.16} L${x-h*0.05} ${cy+h*0.30} M${x} ${cy+h*0.16} L${x+h*0.05} ${cy+h*0.30}"/>
      </g>
      <rect x="${x-w*0.16}" y="${yTop+h*0.16}" width="${w*0.32}" height="${h*0.055}" rx="2" fill="${p.metalO}" opacity=".8"/>
    </g>`;
  }

  /* ---------- libellé couleur ---------- */
  function LIB(c){
    return (global.LIBELLES && global.LIBELLES.couleurs[c]) || c || "";
  }

  /* =========================================================
     Aiguillage : visuel d'un produit du catalogue
     ========================================================= */
  function produit(p, couleur, verset){
    if(!p) return "";
    const c = couleur || (p.couleurs && p.couleurs[0]);
    const m = p.mockup || {};
    if(m.type === "bandana")  return bandana({ motif:m.motif, couleur:c, image:m.image, alt:p.nom });
    if(m.type === "chapelet") return chapelet({ couleur:c, dizainier:m.dizainier });
    return tshirt({ couleur:c, design:m.design, image:m.image, verset: verset || m.versetDemo || {
      t:"Je suis le pain de vie.", r:"Jean 6, 35"
    }});
  }

  /* =========================================================
     ILLUSTRATIONS DES TROIS GESTES
     1 : la flamme de l'Esprit sur le pain
     2 : le pain rompu, la parole qui se donne
     3 : la parole devenue vêtement
     ========================================================= */
  function etape(n){
    const or = "#B08A3E", clair = "#DCC28A", encre = "#2A2420",
          croute = "#F0E3C6", mie = "#FBF5E6";

    const rayons = (cx, cy, r1, r2, nb, ouv) => Array.from({length:nb},(_,i)=>{
      const a = -Math.PI/2 + (i - (nb-1)/2) * (ouv || .34);
      return `<line x1="${cx+Math.cos(a)*r1}" y1="${cy+Math.sin(a)*r1}"
                    x2="${cx+Math.cos(a)*r2}" y2="${cy+Math.sin(a)*r2}"
                    stroke="${clair}" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>`;
    }).join("");

    /* une miche : entière, ou rompue en deux */
    function miche(x, y, s, ouvert){
      const demi = (cote) => {
        const sens = cote === "g" ? -1 : 1;
        const d = cote === "g"
          ? "M0,-42 C-28,-42 -56,-24 -56,4 C-56,22 -40,32 0,32 Z"
          : "M0,-42 C28,-42 56,-24 56,4 C56,22 40,32 0,32 Z";
        const dep = ouvert ? sens * 16 : 0, rot = ouvert ? sens * 12 : 0;
        return `<g transform="translate(${dep} 0) rotate(${rot})">
          <path d="${d}" fill="${croute}" stroke="${or}" stroke-width="4" stroke-linejoin="round"/>
          ${ouvert ? `<path d="M0,-42 L0,32" stroke="${mie}" stroke-width="9" stroke-linecap="round"/>
                      <path d="M0,-42 L0,32" stroke="${or}" stroke-width="3"/>` : ""}
        </g>`;
      };
      const entailles = ouvert ? "" : `
        <g stroke="${or}" stroke-width="3" stroke-linecap="round" opacity=".7">
          <line x1="-22" y1="-18" x2="-6" y2="-30"/>
          <line x1="-4"  y1="-10" x2="12" y2="-22"/>
          <line x1="14"  y1="-2"  x2="30" y2="-14"/>
        </g>`;
      return `<g transform="translate(${x} ${y}) scale(${s})">${demi("g")}${demi("d")}${entailles}</g>`;
    }

    /* 1 — la flamme de l'Esprit au-dessus du pain */
    if(n === 1) return `<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${rayons(110, 26, 20, 32, 5)}
      <path d="M112,20 C124,40 134,48 134,64 C134,80 124,90 110,90 C96,90 86,80 86,64
               C86,52 94,46 100,38 C102,50 106,54 112,54 C116,44 110,32 112,20 Z"
            fill="none" stroke="${or}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M110,54 C117,64 121,70 121,76 C121,83 116,88 110,88 C104,88 99,83 99,76
               C99,70 103,64 110,54 Z" fill="${clair}" opacity=".5"/>
      ${miche(110, 122, 0.44, false)}
    </svg>`;

    /* 2 — le pain rompu, la lumière au milieu */
    if(n === 2) return `<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${rayons(110, 66, 26, 44, 7, .30)}
      <circle cx="110" cy="82" r="18" fill="${clair}" opacity=".35"/>
      ${miche(110, 96, 0.52, true)}
    </svg>`;

    /* 3 — la parole devenue vêtement */
    return `<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M84,20 C74,23 63,30 57,38 L50,64 C56,69 64,73 72,74 L70,140 L150,140 L148,74
               C156,73 164,69 170,64 L163,38 C157,30 146,23 136,20
               C132,32 122,38 110,38 C98,38 88,32 84,20 Z"
            fill="#FFFDF8" stroke="${or}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M84,20 C88,32 98,38 110,38 C122,38 132,32 136,20"
            fill="none" stroke="${or}" stroke-width="3" opacity=".5"/>
      ${croix(110, 66, 20, or, 3)}
      <g stroke="${encre}" stroke-width="3.4" stroke-linecap="round" opacity=".75">
        <line x1="88" y1="90" x2="132" y2="90"/>
        <line x1="95" y1="102" x2="125" y2="102"/>
      </g>
      <line x1="99" y1="116" x2="121" y2="116" stroke="${or}" stroke-width="2.4" stroke-linecap="round"/>
    </svg>`;
  }

  /* pain rompu (page Pain de Vie) */
  function pain(){
    return `<svg class="pain-svg" viewBox="0 0 420 260" width="290" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="pnl" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF6DE" stop-opacity=".95"/>
          <stop offset="45%" stop-color="#DCC28A" stop-opacity=".45"/>
          <stop offset="100%" stop-color="#DCC28A" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="pnc" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stop-color="#E4B770"/>
          <stop offset="55%" stop-color="#C9964C"/>
          <stop offset="100%" stop-color="#A97833"/>
        </linearGradient>
      </defs>
      <ellipse class="lueur" cx="210" cy="132" rx="190" ry="120" fill="url(#pnl)"/>
      <g class="moitie moitie-g">
        <path d="M210,42 C150,42 96,66 84,110 C74,148 96,196 138,208 C166,216 190,214 210,212 Z"
              fill="url(#pnc)" stroke="#8E6428" stroke-width="2"/>
        <path d="M150,74 C142,96 140,120 148,142" fill="none" stroke="#8E6428" stroke-width="3" opacity=".55" stroke-linecap="round"/>
        <path d="M120,96 C112,116 112,140 120,158" fill="none" stroke="#8E6428" stroke-width="3" opacity=".4" stroke-linecap="round"/>
        <path d="M210,42 C150,42 96,66 84,110" fill="none" stroke="#F0D9A6" stroke-width="3" opacity=".5"/>
      </g>
      <g class="moitie moitie-d">
        <path d="M210,42 C270,42 324,66 336,110 C346,148 324,196 282,208 C254,216 230,214 210,212 Z"
              fill="url(#pnc)" stroke="#8E6428" stroke-width="2"/>
        <path d="M270,74 C278,96 280,120 272,142" fill="none" stroke="#8E6428" stroke-width="3" opacity=".55" stroke-linecap="round"/>
        <path d="M300,96 C308,116 308,140 300,158" fill="none" stroke="#8E6428" stroke-width="3" opacity=".4" stroke-linecap="round"/>
        <path d="M210,42 C270,42 324,66 336,110" fill="none" stroke="#F0D9A6" stroke-width="3" opacity=".5"/>
      </g>
    </svg>`;
  }

  global.MOCK = { tshirt, bandana, chapelet, produit, pain, etape, imprimeVerset, gabarits, croix, lys, etoile, epi, monogramme };

})(window);
