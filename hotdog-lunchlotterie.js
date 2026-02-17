var html = `
<div class="hotdog-lunchlotterie" style="display:none">
  <h2>Verbleibende Zeit bis zur Auslosung der Lunch Lotterie </h2>
   <svg id="hotdogSVG" viewBox="0 0 800 280">
    <defs>
      <!-- Brötchen -->
      <linearGradient id="bunGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#d8a96b"/>
        <stop offset="100%" stop-color="#b37a3d"/>
      </linearGradient>
      <!-- Wurst -->
      <linearGradient id="sausageGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#b33a3a"/>
        <stop offset="100%" stop-color="#8a2c2c"/>
      </linearGradient>
      <!-- Biss-Maske -->
      <mask id="biteMask">
        <rect x="0" y="0" width="100%" height="100%" fill="black"/>
        <rect id="remainRect" x="80" y="90" width="560" height="100" rx="50" fill="white"/>
        <g id="biteG" fill="black"></g>
      </mask>
    </defs>

    <!-- Schatten -->
    <ellipse cx="360" cy="210" rx="240" ry="16" fill="rgba(0,0,0,.10)"/>

    <!-- Hotdog unter Maske -->
    <g mask="url(#biteMask)">
      <!-- Unteres Brötchen -->
      <rect x="80" y="150" width="560" height="40" rx="20" fill="url(#bunGrad)"/>
      <!-- Wurst -->
      <rect x="80" y="120" width="560" height="30" rx="15" fill="url(#sausageGrad)"/>
      <!-- Senf -->
      <path d="M90,130 C150,140 210,120 270,130 S390,140 450,130 S570,140 620,130"
            stroke="#f6d365" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Ketchup -->
      <path d="M90,140 C150,150 210,130 270,140 S390,150 450,140 S570,150 620,140"
            stroke="#d43f3f" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Zwiebelringe -->
      <g stroke="#d8a6d8" stroke-width="3" fill="none" opacity="0.8">
        <ellipse cx="160" cy="135" rx="10" ry="6"/>
        <ellipse cx="240" cy="135" rx="10" ry="6"/>
        <ellipse cx="320" cy="135" rx="10" ry="6"/>
        <ellipse cx="400" cy="135" rx="10" ry="6"/>
        <ellipse cx="480" cy="135" rx="10" ry="6"/>
        <ellipse cx="560" cy="135" rx="10" ry="6"/>
      </g>
      <!-- Oberes Brötchen -->
      <rect x="80" y="80" width="560" height="40" rx="20" fill="url(#bunGrad)"/>
    </g>

    <!-- Dynamische Krümel -->
    <g id="crumbs"></g>
    <!-- Boden-Krümel -->
    <g id="groundCrumbs"></g>

    <!-- Prozentanzeige -->
    <text id="pctLabel" class="pct" x="86" y="64"></text>
  </svg>
  
  <a id="lunchlotterieBeitragLink" target="_blank" href="">
   Zum EBnow Beitrag
</a>

  <div style="margin-top:10px;">
    <input id="progress" type="range" min="0" max="100" value="0" />
    <button id="auto">Play</button>
  </div>
  <div id="triggers-eating-when-visible"></div>

</div>
`;

var css = `
.hotdog-lunchlotterie #auto, .hotdog-lunchlotterie #progress {
	 display: none;
}
 .hotdog-lunchlotterie .wrap {
	 background: #fff;
	 border-radius: 14px;
	 box-shadow: 0 10px 30px rgba(0, 0, 0, .08);
	 padding: 16px;
	 width: 820px;
}
 .hotdog-lunchlotterie svg {
	 width: 100%;
	 height: auto;
}
 .hotdog-lunchlotterie input[type="range"] {
	 width: 100%;
	 margin-top: 12px;
	 accent-color: #b36a2e;
}
 .hotdog-lunchlotterie a {
	 border: none;
	 background: #b36a2e;
	 color: #fff;
	 padding: 8px 12px;
	 border-radius: 8px;
	 cursor: pointer;
	 margin-left: 8px;
	 text-decoration: none;
}
 .hotdog-lunchlotterie .crumb {
	 fill: #f1d3a2;
	 stroke: #ddb47a;
	 stroke-width: 0.6;
	 opacity: 0.98;
	 transform-box: fill-box;
	 transform-origin: center;
	 animation: crumbFall var(--dur, 900ms) cubic-bezier(0.21, 0.9, 0.31, 1) forwards;
}
 @keyframes crumbFall {
	 to {
		 transform: translate(var(--dx, 60px), var(--dy, 140px)) rotate(var(--rot, 20deg));
		 opacity: 0;
	}
}
 .hotdog-lunchlotterie .ground-crumb {
	 fill: #e8c590;
	 stroke: #d2aa6e;
	 stroke-width: 0.6;
	 opacity: 0.95;
}
 .hotdog-lunchlotterie .pct {
	 font: 600 24px system-ui, Segoe UI, Roboto, Arial, sans-serif;
	 fill: #5c3a19;
	 opacity: 0.9;
}

  `;

var js = `
var config = document.querySelector("#config");

var hotdogWidget = hotdog_lunchlotterie;

var startDatumString = config.dataset.startDatum;
var endeDatumString = config.dataset.endeDatum;
var testDatumString = config.dataset.testDatum;
var ebnowBeitragLink = config.dataset.beitragLink;
var hotdogAnzeigenData = config.dataset.hotdogAnzeigen;

function parseGermanDate(datumAlsString) {
    var [day, month, year] = datumAlsString.split(".").map(Number);
    return new Date(year, month - 1, day);
}

function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

var startDatum = parseGermanDate(startDatumString);
var endeDatum = parseGermanDate(endeDatumString);

var totaleDifferenz = datediff(startDatum, endeDatum);
var aktuelleDifferenz = datediff(startDatum, new Date());
var tageÜbrig = (totaleDifferenz - aktuelleDifferenz) + 1;

console.log(tageÜbrig + "tage");

var fortschritt = (aktuelleDifferenz / totaleDifferenz) * 100;

document.getElementById("lunchlotterieBeitragLink").href = ebnowBeitragLink

// alter Shit

var remainRect = document.getElementById("remainRect");
var biteG = document.getElementById("biteG");
var crumbsLayer = document.getElementById("crumbs");
var groundLayer = document.getElementById("groundCrumbs");
var pctLabel = document.getElementById("pctLabel");
var slider = document.getElementById("progress");
var btnAuto = document.getElementById("auto");
var btnReset = document.getElementById("reset");

var LEFT_X = 80;
var WIDTH = 560;
var MID_Y = 140;
var FLOOR_Y = 210;

var Y_OFFSETS = [-30, -18, -6, 6, 18, 30];
var BASE_R = [20, 18, 16, 16, 18, 20];

var biteCircles = Y_OFFSETS.map(() => {
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("r", 0);
    biteG.appendChild(c);
    return c;
});

var lastProgress = 0;
var autoplay = true;
var rafId = null;
var groundCrumbsCount = 0;
var MAX_GROUND_CRUMBS = 8;

function update(progress) {
    var p = Math.max(0, Math.min(100, progress)) / 100;
    var remainingW = WIDTH * (1 - p);
    var rightX = LEFT_X + remainingW;

    remainRect.setAttribute("width", remainingW);
    pctLabel.textContent = \`\$\{tageÜbrig\} Tage übrig\`;

    var depthScale = 0.7 + 0.5 * p;
    biteCircles.forEach((c, i) => {
        var cx = rightX - BASE_R[i] * 0.3;
        var cy = MID_Y + Y_OFFSETS[i];
        var r = BASE_R[i] * depthScale;
        c.setAttribute("cx", cx);
        c.setAttribute("cy", cy);
        c.setAttribute("r", p === 0 ? 0 : r);
    });

    if (progress > lastProgress) spawnFallingCrumbs(rightX);
    accumulateGroundCrumbs(p, rightX);
    lastProgress = progress;
}

function spawnFallingCrumbs(edgeX) {
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var y = MID_Y + (Math.random() * 20 - 10);
    var r = 1.8 + Math.random() * 2.6;
    c.setAttribute("cx", edgeX - (6 + Math.random() * 12));
    c.setAttribute("cy", y);
    c.setAttribute("r", r);
    c.setAttribute("class", "crumb");
    var dx = 40 + Math.random() * 120;
    var dy = 70 + Math.random() * 170;
    var rot = Math.random() * 160 - 80 + "deg";
    var dur = 700 + Math.random() * 1000 + "ms";
    c.style.setProperty("--dx", dx + "px");
    c.style.setProperty("--dy", dy + "px");
    c.style.setProperty("--rot", rot);
    c.style.setProperty("--dur", dur);
    c.addEventListener("animationend", () => c.remove());
    crumbsLayer.appendChild(c);
}

function accumulateGroundCrumbs(p, edgeX) {
    var targetCount = Math.round(p * MAX_GROUND_CRUMBS);
    var toAdd = targetCount - groundCrumbsCount;
    if (toAdd <= 0) return;
    for (var i = 0; i < toAdd; i++) {
        var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var x = edgeX - 40 + Math.random() * 160;
        var y = FLOOR_Y + 6 + Math.random() * 10;
        var r = 1.3 + Math.random() * 2.3;
        c.setAttribute("cx", x);
        c.setAttribute("cy", y);
        c.setAttribute("r", r);
        c.setAttribute("class", "ground-crumb");
        groundLayer.appendChild(c);
        groundCrumbsCount++;
    }
}

slider.addEventListener('input', e => {
    if (autoplay) { autoplay = false; btnAuto.textContent = 'Play'; if (rafId) cancelAnimationFrame(rafId); }
    update(parseFloat(e.target.value));
});

function tick() {
    var v = parseFloat(slider.value);
    var next = v + 0.6;
    slider.value = next >= 100 ? 100 : next;
    update(parseFloat(slider.value));
    if (autoplay && next < 100 && next <= fortschritt) rafId = requestAnimationFrame(tick);
    else { autoplay = false; btnAuto.textContent = 'Play'; }
}

update(0);


var el = document.getElementById("triggers-eating-when-visible");

// Wird aufgerufen, wenn sich die Schnittmenge ändert
var observer = new IntersectionObserver(
    (entries, obs) => {
        for (var entry of entries) {
            if (entry.isIntersecting) {
                // -> Hier deine Methode aufrufen:
                tick();
                // Falls nur einmal ausführen:
                obs.unobserve(entry.target);
            }
        }
    },
    {
        root: null, // null = Viewport
        rootMargin: "0px", // z. B. '100px 0px' um früher zu triggern
        threshold: 0.1 // ab 10% Sichtbarkeit
    }
);

observer.observe(el);

function parentElementAusblenden(element) {

    let el = element;

    // Nach oben traversieren, bis wir den passenden Wrapper finden
    while (el && el.tagName !== "STATIC-CONTENT-BLOCK") {
        el = el.parentElement;
    }

    // Wenn gefunden: komplett ausblenden
    if (el) {
        el.style.display = "none";
    }
}

function hotdogEinOderAusblenden(dataEinblenden, widget) {

    let einblenden = dataEinblenden === "true";

    if (einblenden) {
        widget.style.display = "block";
    } else {
        parentElementAusblenden(widget)
    }
}

hotdogEinOderAusblenden(hotdogAnzeigenData, hotdogWidget)
`;


var hotdog_lunchlotterie = document.querySelector('#hotdog-lunchlotterie-entry');
hotdog_lunchlotterie.innerHTML = html;

var styleSheet = document.createElement("style");
styleSheet.innerText = css;
document.head.appendChild(styleSheet);
var scripts = document.createElement("script");
var newtext = document.createTextNode(js);
scripts.appendChild(newtext);
document.body.appendChild(scripts);
