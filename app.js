/* =========================================================
   JGU CAMPUS LAGEPLAN — APP-LOGIK
   Datenstruktur, Rendering, Karten-Zoom, Modal, LocalStorage
   ========================================================= */

/* ---------------------------------------------------------
   1) DATENSTRUKTUR
   Jeder Ort hat:
   - id: Nummer wie auf der Karte (1–7)
   - name, building: Anzeigetext
   - x, y: Position des Pins auf der Karte in PROZENT
     (bezogen auf die Bildgröße – so bleibt es bei jeder
     Fenstergröße responsiv)
   - infoText: Kurzbeschreibung fürs Detail-Modal
   - profile: Steckbrief-Daten (hours, lighting, surface, equipment)
   - mapsUrl: Fertiger Google-Maps-Link für diesen Ort (Platzhalter-Link,
     pro Ort einzeln hinterlegt – hier einfach die eigene URL eintragen,
     wenn später die echte Adresse/Koordinate feststeht)
   - images: Array mit genau 3 Bild-URLs für den Galerie-Slider im Modal.
     Leerer String ("") = graue Dummy-Kachel mit Platzhalter-Nummer (1–3).
     Später einfach durch eine echte Bild-URL ersetzen (z. B. "bilder/ort1-1.jpg"),
     schon fügt sich das echte Bild automatisch in den Slider ein.
   - avgRating, voteCount: Beispiel-Ausgangswerte
   - comments: 2 Beispiel-Kommentare
   --------------------------------------------------------- */
const LOCATIONS = [
  {
    id: 1, name: "Tischtennisplatten Jakob-Welder-Weg", building: "Tischtennis",
    x: 60, y: 37,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=49.99336096909562,8.238930548070405",
    images: ["Bilder/TischtennisJakob-Welder-Weg.webp", "", ""],
    infoText: "",
    profile: {
      hours: "Durchgehend geöffnet, kostenlos",
      lighting: "Ja",
      surface: "Asphalt",
      equipment: "Platte mit Metallnetz"
    },
    avgRating: 0, voteCount: 0,
    comments: []
  },
  {
    id: 2, name: "Tischtennisplatten Mensa", building: "Tischtennis",
    x: 39, y: 38,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=49.99203547101614,8.2348631722973",
    images: ["Bilder/TischtennisMensa.webp", "", ""],
    infoText: "",
    profile: {
      hours: "Durchgehend geöffnet, kostenlos",
      lighting: "Ja",
      surface: "Kies",
      equipment: "Platte mit Metallnetz"
    },
    avgRating: 0, voteCount: 0,
    comments: []
  },
  {
    id: 3, name: "Beachvolleyballplätze", building: "Beachvolleyball",
    x: 68, y: 31,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=49.99318649622809,8.241086501211935",
    images: ["Bilder/Beachvolleyball.webp", "", ""],
    infoText: "",
    profile: {
      hours: "Durchgehend geöffnet, kostenlos",
      lighting: "Nein",
      surface: "Sand",
      equipment: "Netz & Pfosten"
    },
    avgRating: 0, voteCount: 0,
    comments: []
  },
  {
    id: 4, name: "Große Wiese am Natfak", building: "",
    x: 69.5, y: 40,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=49.992653530235785,8.241559831174214",
    images: ["Bilder/WieseNatFak.webp", "", ""],
    infoText: "",
    profile: {
      hours: "Durchgehend geöffnet, kostenlos",
      lighting: "Nein",
      surface: "Gras",
      equipment: "-"
    },
    avgRating: 0, voteCount: 0,
    comments: []
  },
  {
    id: 5, name: "Calisthenics Park", building: "Calisthenics",
    x: 77, y: 63,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=49.990990104886514,8.24343638799395",
    images: ["Bilder/CalisthenicsPark.webp", "", ""],
    infoText: "",
    profile: {
      hours: "Durchgehend geöffnet, kostenlos",
      lighting: "Nein",
      surface: "Gummiboden",
      equipment: "Calisthenics-Station"
    },
    avgRating: 0, voteCount: 0,
    comments: []
  },
  {
    id: 6, name: "Stadion", building: "Laufen / Laufbahn",
    x: 77, y: 71,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=49.9901307235412,8.243008295002966",
    images: ["Bilder/Stadion.webp", "", ""],
    infoText: "",
    profile: {
      hours: "Durchgehend geöffnet, kostenlos",
      lighting: "Ja",
      surface: "Tartan (Kunststoff)",
      equipment: "Laufbahnen"
    },
    avgRating: 0, voteCount: 0,
    comments: []
  },
  {
    id: 7, name: "Wiese Sport Fachschaft", building: "",
    x: 84, y: 52,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=49.99189068543014,8.244754996156434",
    images: ["Bilder/WieseSportFachschaft .webp", "", ""],
    infoText: "",
    profile: {
      hours: "Durchgehend geöffnet, kostenlos",
      lighting: "Nein",
      surface: "Gras",
      equipment: "-"
    },
    avgRating: 0, voteCount: 0,
    comments: []
  },
  {
    id: 8, name: "Station Motorikpfad an der Spielhalle", building: "Motorik / Bewegung",
    x: 81, y: 52,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=49.991807415373195,8.24442252051401",
    images: ["Bilder/MotorikpfadSpielhalle.webp", "", ""],
    infoText: "",
    profile: {
      hours: "Durchgehend geöffnet, kostenlos",
      lighting: "Nein",
      surface: "Holzhackschnitzel",
      equipment: "Kletter- & Balancierelemente"
    },
    avgRating: 0, voteCount: 0,
    comments: []
  },
  {
    id: 9, name: "Beachhandball", building: "Beachhandball",
    x: 74, y: 67,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=49.990578338869504,8.242880360466499",
    images: ["Bilder/Beachhandball.webp", "", ""],
    infoText: "",
    profile: {
      hours: "Durchgehend geöffnet, kostenlos",
      lighting: "Ja",
      surface: "Sand",
      equipment: "-"
    },
    avgRating: 0, voteCount: 0,
    comments: []
  }
];

/* ---------------------------------------------------------
   2) STATE
   --------------------------------------------------------- */
let activeLocationId = null;   // aktuell ausgewählter Ort (für Karte + Sidebar)
let searchQuery = "";
let galleryImages = [];        // die 3 Bild-URLs (oder "") des aktuell geöffneten Orts
let galleryIndex = 0;          // aktuell sichtbares Bild im Slider

/* localStorage-Keys */
const LS_RATINGS_KEY = "jguCampus_userRatings";   // { [id]: sterneZahl }
const LS_COMMENTS_KEY = "jguCampus_userComments"; // { [id]: [ {author, text}, ... ] }

/* ---------------------------------------------------------
   3) DOM-REFERENZEN
   --------------------------------------------------------- */
const pinLayer      = document.getElementById("pinLayer");
const mapStage       = document.getElementById("mapStage");
const mapViewport    = document.getElementById("mapViewport");
const mapImage       = document.getElementById("mapImage"); 
const infoBox        = document.getElementById("infoBox");
const infoBoxNumber  = document.getElementById("infoBoxNumber");
const infoBoxBuilding= document.getElementById("infoBoxBuilding");
const infoBoxTitle   = document.getElementById("infoBoxTitle");
const infoBoxDetails = document.getElementById("infoBoxDetails");
const infoBoxMaps    = document.getElementById("infoBoxMaps");
const zoomOutBtn      = document.getElementById("zoomOutBtn");

const locationList   = document.getElementById("locationList");
const resultCount    = document.getElementById("resultCount");
const noResults       = document.getElementById("noResults");

const searchInput    = document.getElementById("searchInput");
const searchClear    = document.getElementById("searchClear");

const modalOverlay   = document.getElementById("modalOverlay");
const modalClose      = document.getElementById("modalClose");
const modalNumber     = document.getElementById("modalNumber");
const modalTitle      = document.getElementById("modalTitle");
const modalBuilding   = document.getElementById("modalBuilding");
const modalInfoText   = document.getElementById("modalInfoText");
const galleryViewport = document.getElementById("galleryViewport");
const galleryDots     = document.getElementById("galleryDots");
const galleryPrevBtn  = document.getElementById("galleryPrevBtn");
const galleryNextBtn  = document.getElementById("galleryNextBtn");
const modalHours      = document.getElementById("modalHours");
const modalLighting   = document.getElementById("modalLighting");
const modalSurface    = document.getElementById("modalSurface");
const modalEquipment  = document.getElementById("modalEquipment");
const modalAvgRating  = document.getElementById("modalAvgRating");
const modalAvgStars   = document.getElementById("modalAvgStars");
const modalVoteCount  = document.getElementById("modalVoteCount");
const userStars        = document.getElementById("userStars");
const modalMapsLink   = document.getElementById("modalMapsLink");
const commentList     = document.getElementById("commentList");
const commentForm     = document.getElementById("commentForm");
const commentInput    = document.getElementById("commentInput");

/* ---------------------------------------------------------
   4) HILFSFUNKTIONEN — LocalStorage
   --------------------------------------------------------- */

function getUserRatings() {
  try { return JSON.parse(localStorage.getItem(LS_RATINGS_KEY)) || {}; }
  catch { return {}; }
}
function setUserRating(id, stars) {
  const ratings = getUserRatings();
  ratings[id] = stars;
  localStorage.setItem(LS_RATINGS_KEY, JSON.stringify(ratings));
}

function getUserComments() {
  try { return JSON.parse(localStorage.getItem(LS_COMMENTS_KEY)) || {}; }
  catch { return {}; }
}
function addUserComment(id, comment) {
  const all = getUserComments();
  if (!all[id]) all[id] = [];
  all[id].push(comment);
  localStorage.setItem(LS_COMMENTS_KEY, JSON.stringify(all));
}

/* Findet einen Ort anhand seiner ID */
function getLocationById(id) {
  return LOCATIONS.find(loc => loc.id === Number(id));
}

/* Baut das Sterne-Markup (statisch, gerundet auf halbe Sterne per Breite) */
function buildStaticStars(container, rating) {
  container.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const span = document.createElement("span");
    span.className = "star" + (i <= Math.round(rating) ? " filled" : "");
    span.textContent = "★";
    container.appendChild(span);
  }
}


/* ---------------------------------------------------------
   4b) KARTEN-GEOMETRIE
   Berechnet, wo das Bild wirklich innerhalb von #mapImage liegt
   (object-fit: contain/cover können Ränder erzeugen oder Teile
   abschneiden). Pins & Zoom nutzen das Ergebnis, damit sie immer
   exakt auf der sichtbaren Karte sitzen.
   --------------------------------------------------------- */
const MOBILE_CROP_BREAKPOINT = 720; // muss zum CSS-Breakpoint passen

function computeMapGeometry() {
  const cw = mapViewport.clientWidth;
  const ch = mapViewport.clientHeight;
  const iw = mapImage.naturalWidth;
  const ih = mapImage.naturalHeight;
  if (!cw || !ch || !iw || !ih) return null;

  const isMobileCrop = window.matchMedia(`(max-width: ${MOBILE_CROP_BREAKPOINT}px)`).matches;
  // Desktop/Tablet: ganzes Bild sichtbar (contain). Smartphone: rechts
  // abgeschnitten sichtbar (cover, siehe CSS object-position: right).
  const scale = isMobileCrop ? Math.max(cw / iw, ch / ih) : Math.min(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const offsetX = isMobileCrop ? (cw - dw) : (cw - dw) / 2;
  const offsetY = (ch - dh) / 2;

  return { cw, ch, dw, dh, offsetX, offsetY };
}

/* Positioniert das <img>-Element selbst exakt anhand der berechneten
   Geometrie (Pixelwerte statt CSS object-fit). Dadurch entsteht die
   sichtbare Bildposition aus DENSELBEN Zahlen wie die Pin-Positionen –
   Bild und Pins können nicht mehr auseinanderlaufen, egal bei welcher
   Fenstergröße oder welchem Breakpoint. */
function applyMapImageLayout(geo) {
  if (!geo) return;
  mapImage.style.position = "absolute";
  mapImage.style.left = geo.offsetX + "px";
  mapImage.style.top = geo.offsetY + "px";
  mapImage.style.width = geo.dw + "px";
  mapImage.style.height = geo.dh + "px";
}

/* ---------------------------------------------------------
   5) PINS AUF DER KARTE RENDERN
   --------------------------------------------------------- */
function renderPins() {
  pinLayer.innerHTML = "";
  const geo = computeMapGeometry(); // NEU: nur einmal berechnen
  applyMapImageLayout(geo); // NEU: Bild exakt nach denselben Zahlen positionieren wie die Pins
  LOCATIONS.forEach(loc => {
    const pos = toDisplayPercent(loc, geo); // geo wird übergeben statt neu berechnet
    const pin = document.createElement("button");
    pin.className = "pin";
    pin.type = "button";
    pin.style.left = pos.x + "%";
    pin.style.top = pos.y + "%";
    pin.textContent = loc.id;
    pin.setAttribute("aria-label", `${loc.id}: ${loc.name}`);
    pin.dataset.id = loc.id;
    pin.addEventListener("click", () => toggleLocation(loc.id));
    pinLayer.appendChild(pin);
  });
}

function toDisplayPercent(loc, geo) {
  geo = geo || computeMapGeometry(); // Fallback, falls einzeln aufgerufen (z. B. in zoomToLocation)
  if (!geo) return { x: loc.x, y: loc.y };
  const px = geo.offsetX + (loc.x / 100) * geo.dw;
  const py = geo.offsetY + (loc.y / 100) * geo.dh;
  return { x: (px / geo.cw) * 100, y: (py / geo.ch) * 100 };
}

/* ---------------------------------------------------------
   6) SIDEBAR-LISTE RENDERN (mit Suchfilter)
   --------------------------------------------------------- */
function highlightMatch(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    text.slice(0, idx) +
    "<mark>" + text.slice(idx, idx + query.length) + "</mark>" +
    text.slice(idx + query.length)
  );
}

function renderLocationList() {
  const query = searchQuery.trim().toLowerCase();
  const filtered = LOCATIONS.filter(loc =>
    !query ||
    loc.name.toLowerCase().includes(query) ||
    loc.building.toLowerCase().includes(query) ||
    loc.infoText.toLowerCase().includes(query)
  );

  locationList.innerHTML = "";

  filtered.forEach(loc => {
    const li = document.createElement("li");
    li.className = "location-item" + (loc.id === activeLocationId ? " active" : "");
    li.tabIndex = 0;
    li.dataset.id = loc.id;

    li.innerHTML = `
      <span class="location-badge">${loc.id}</span>
      <span class="location-copy">
        <span class="name">${highlightMatch(loc.name, query)}</span>
        <span class="building">${loc.building}</span>
        <span class="mini-rating">★ ${loc.avgRating.toFixed(1)}</span>
      </span>
    `;

    li.addEventListener("click", () => toggleLocation(loc.id));
    li.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleLocation(loc.id);
      }
    });

    locationList.appendChild(li);
  });

  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "Ort" : "Orte"}`;
  noResults.hidden = filtered.length !== 0;
}

/* ---------------------------------------------------------
   7) KARTEN-ZOOM-LOGIK
   Zoomt/zentriert die Karte sanft auf den gewählten Pin,
   indem die .map-stage per CSS-Transform verschoben & skaliert wird.
   --------------------------------------------------------- */
const ZOOM_FACTOR = 2.1;

function zoomToLocation(loc) {
  // Trick: Wir setzen den Transformations-Ursprung (transform-origin) genau
  // auf die Position des Pins (in Prozent der Bildgröße) und skalieren dann.
  // So "wächst" die Karte optisch von genau diesem Punkt aus nach außen,
  // wodurch der gewählte Ort automatisch im Zentrum des sichtbaren Bereichs landet.
  const pos = toDisplayPercent(loc); 
  mapStage.style.transformOrigin = `${pos.x}% ${pos.y}%`; 
  mapStage.style.transform = `scale(${ZOOM_FACTOR})`;
}

function resetZoom() {
  mapStage.style.transformOrigin = "50% 50%";
  mapStage.style.transform = "scale(1)";
}

/* ---------------------------------------------------------
   8) AUSWAHL EINES ORTES (Karte + Sidebar synchron)
   --------------------------------------------------------- */
function selectLocation(id) {
  activeLocationId = Number(id);
  const loc = getLocationById(activeLocationId);
  if (!loc) return;

  // Pins aktualisieren
  document.querySelectorAll(".pin").forEach(p => {
    p.classList.toggle("active", Number(p.dataset.id) === activeLocationId);
  });

  // Sidebar aktualisieren
  document.querySelectorAll(".location-item").forEach(li => {
    li.classList.toggle("active", Number(li.dataset.id) === activeLocationId);
  });

  // Karte zoomen
  zoomToLocation(loc);

  // Info-Box füllen & einblenden
  infoBoxNumber.textContent = loc.id;
  infoBoxBuilding.textContent = loc.building;
  infoBoxTitle.textContent = loc.name;
  infoBox.hidden = false;

  // Absicherung: Falls die Info-Box (z. B. auf sehr kleinen Bildschirmen)
  // trotz der Höhenbegrenzung des Karten-Panels knapp aus dem sichtbaren
  // Bereich ragt, sanft dorthin scrollen, ohne die ganze Seite zu verschieben.
  infoBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* Setzt Zoom + Auswahl zurück (gleiche Aktion wie der "Ansicht
   zurücksetzen"-Button in der Toolbar) */
function deselectLocation() {
  resetZoom();
  infoBox.hidden = true;
  activeLocationId = null;
  document.querySelectorAll(".pin").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".location-item").forEach(li => li.classList.remove("active"));
}

/* Wird von Pin- und Sidebar-Klicks aufgerufen: Klickt man auf den
   bereits herangezoomten Ort erneut, zoomt man wieder heraus –
   ansonsten wird ganz normal auf den neuen Ort gezoomt. */
function toggleLocation(id) {
  if (activeLocationId === Number(id)) {
    deselectLocation();
  } else {
    selectLocation(id);
  }
}

/* ---------------------------------------------------------
   9) DETAIL-MODAL
   --------------------------------------------------------- */
function openModal(id) {
  const loc = getLocationById(id);
  if (!loc) return;

  modalNumber.textContent = loc.id;
  modalTitle.textContent = loc.name;
  modalBuilding.textContent = loc.building;
  modalInfoText.textContent = loc.infoText;

  // Bild-Galerie (3 Dummy-/Echtbilder) aufbauen
  renderGallery(loc);

  // Steckbrief füllen
  modalHours.textContent = loc.profile.hours;
  modalLighting.textContent = loc.profile.lighting;
  modalSurface.textContent = loc.profile.surface;
  modalEquipment.textContent = loc.profile.equipment;

  // Bewertung: Basiswert + lokal gespeicherte Nutzerstimmen einrechnen
  const userRatings = getUserRatings();
  const localVotes = Object.keys(userRatings).filter(k => Number(k) === loc.id).length;
  // Für die Anzeige kombinieren wir Ausgangsdaten mit ggf. eigener Stimme:
  const ownRating = userRatings[loc.id];
  let displayAvg = loc.avgRating;
  let displayCount = loc.voteCount;
  if (ownRating) {
    displayAvg = ((loc.avgRating * loc.voteCount) + ownRating) / (loc.voteCount + 1);
    displayCount = loc.voteCount + 1;
  }

  modalAvgRating.textContent = displayAvg.toFixed(1) + " ★";
  buildStaticStars(modalAvgStars, displayAvg);
  modalVoteCount.textContent = `(${displayCount} Bewertungen)`;

  // Interaktive Sterne für eigene Bewertung aufbauen
  renderUserStars(loc.id, ownRating || 0);

  // Google-Maps-Link (pro Ort einzeln in loc.mapsUrl hinterlegt)
  modalMapsLink.href = loc.mapsUrl;

  // Kommentare rendern (Beispiel + lokal gespeicherte)
  renderComments(loc.id);

  commentForm.dataset.id = loc.id;
  commentInput.value = "";

  modalOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = "";
}

function renderUserStars(id, selected) {
  userStars.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const span = document.createElement("span");
    span.className = "star" + (i <= selected ? " filled" : "");
    span.textContent = "★";
    span.tabIndex = 0;
    span.setAttribute("role", "radio");
    span.setAttribute("aria-checked", i === selected ? "true" : "false");
    span.setAttribute("aria-label", `${i} von 5 Sternen`);

    const rate = () => {
      setUserRating(id, i);
      renderUserStars(id, i);
      // Anzeige oben im Modal + Sidebar-Miniwert live aktualisieren
      openModal(id);
    };

    span.addEventListener("click", rate);
    span.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); rate(); }
    });

    userStars.appendChild(span);
  }
}

function renderComments(id) {
  const loc = getLocationById(id);
  const userComments = getUserComments()[id] || [];
  const allComments = [...loc.comments, ...userComments];

  commentList.innerHTML = "";
  allComments.forEach(c => {
    const li = document.createElement("li");
    li.className = "comment";
    li.innerHTML = `
      <span class="comment-author">${escapeHtml(c.author)}</span>
      <p class="comment-text">${escapeHtml(c.text)}</p>
    `;
    commentList.appendChild(li);
  });
}

/* ---------------------------------------------------------
   9b) BILD-GALERIE IM MODAL
   Baut den Slider aus loc.images (immer genau 3 Einträge) auf.
   Ein leerer String an einer Stelle im Array zeigt eine graue
   Dummy-Kachel mit der jeweiligen Nummer (1–3) statt eines Bildes.
   --------------------------------------------------------- */
function renderGallery(loc) {
  galleryImages = (loc.images && loc.images.length === 3) ? loc.images : ["", "", ""];
  galleryIndex = 0;

  // Slides
  galleryViewport.innerHTML = "";
  galleryImages.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "gallery-slide" + (i === 0 ? " active" : "");
    if (src) {
      slide.innerHTML = `<img src="${escapeHtml(src)}" alt="${escapeHtml(loc.name)} – Bild ${i + 1}">`;
    } else {
      slide.innerHTML = `<span class="gallery-slide-number">${i + 1}</span>`;
    }
    galleryViewport.appendChild(slide);
  });

  // Punkte (Dots)
  galleryDots.innerHTML = "";
  galleryImages.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Bild ${i + 1} von ${galleryImages.length} anzeigen`);
    dot.addEventListener("click", () => showGallerySlide(i));
    galleryDots.appendChild(dot);
  });
}

function showGallerySlide(index) {
  const total = galleryImages.length;
  if (!total) return;
  galleryIndex = (index + total) % total; // zyklisch: nach dem letzten Bild wieder zum ersten

  galleryViewport.querySelectorAll(".gallery-slide").forEach((el, i) => {
    el.classList.toggle("active", i === galleryIndex);
  });
  galleryDots.querySelectorAll(".gallery-dot").forEach((el, i) => {
    el.classList.toggle("active", i === galleryIndex);
  });
}

galleryPrevBtn.addEventListener("click", () => showGallerySlide(galleryIndex - 1));
galleryNextBtn.addEventListener("click", () => showGallerySlide(galleryIndex + 1));

/* Verhindert das Einschleusen von HTML über Eingabefelder */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------------------------------------------------
   10) EVENT LISTENER
   --------------------------------------------------------- */

// Suche
searchInput.addEventListener("input", e => {
  searchQuery = e.target.value;
  searchClear.hidden = searchQuery.length === 0;
  renderLocationList();
});
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  searchClear.hidden = true;
  renderLocationList();
  searchInput.focus();
});

// Zoom zurücksetzen
zoomOutBtn.addEventListener("click", deselectLocation);

// Info-Box Aktionen
infoBoxDetails.addEventListener("click", () => {
  if (activeLocationId) openModal(activeLocationId);
});
infoBoxMaps.addEventListener("click", () => {
  const loc = getLocationById(activeLocationId);
  if (loc) window.open(loc.mapsUrl, "_blank");
});

// Modal schließen
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modalOverlay.hidden) closeModal();
});

// Kommentar absenden
commentForm.addEventListener("submit", e => {
  e.preventDefault();
  const id = Number(commentForm.dataset.id);
  const text = commentInput.value.trim();
  if (!text) return;

  addUserComment(id, { author: "Du", text });
  commentInput.value = "";
  renderComments(id);
});

/* ---------------------------------------------------------
   11) INITIALISIERUNG
   --------------------------------------------------------- */
/* ---------------------------------------------------------
   12) MOBILE NAVIGATION (Hamburger-Menü)
   --------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  mainNav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
  // Menü schließen, wenn außerhalb geklickt wird
  document.addEventListener("click", e => {
    if (!mainNav.classList.contains("nav-open")) return;
    if (mainNav.contains(e.target) || navToggle.contains(e.target)) return;
    mainNav.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
}



function init() {
  renderPins();
  renderLocationList();

  const refreshMapLayout = () => {
    renderPins();
    if (activeLocationId) {
      const loc = getLocationById(activeLocationId);
      if (loc) zoomToLocation(loc);
    }
  };

  if (mapImage.complete) refreshMapLayout();
  mapImage.addEventListener("load", refreshMapLayout);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshMapLayout, 150);
  });
  window.addEventListener("orientationchange", refreshMapLayout);
}





init();
