const html = `
<div class="Weihnachtspächenaktion">
  <div class="tree-container">
    <div class="tree-container-inner">
    </div>
  </div>
  <div class="progress-counter"><span class="progress-count">0</span> <span class="progress-label">Geschenke</span>
    <br>
    <a href="https://ebnow.eb.de/content/news/article/690b7b848ab25b65b040ae66">Weihnachtspächenaktion 2025</a>
  </div>
</div>
`;

const css = `
.Weihnachtspächenaktion {
  font-family: Roboto, sans-serif;

  .progress-counter {
    text-align: center;
    font-weight: 600;
    line-height: 1;
    span.progress-count {
      font-size: 4em;
      color: #bf2235;
    }
    span.progress-label {
      display: block;
    }
  }

  .tree-container {
    width: 100%;
    max-width: 500px;
    position: relative;
    margin: 0 auto;
  }

  .tree-container-inner {
    height: 0;
    padding-top: 100%;
    position: relative;
  }

  .item {
    position: absolute;
    filter: grayscale(100%);
  }

  .item.on {
    filter: grayscale(0);
  }
  .star {
    transform: scale(3);
  }
}
`;
const js = `
var total = $("#currentPresents").data("aktuelle-anzahl-der-geschenke");

var emojis = [
  {
    emoji: "🟣",
    postions: [
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
      120,
      130,
      140,
      150,
      160,
      170,
      180,
      190,
      200,
      210,
      220,
      230,
      240,
      250,
      260,
      270,
      280,
      290
    ],
    scale: 3
  }
];

// Define the starting column and length of each row of dots
var tree = [
  { start: 9, length: 9 },
  { start: 5, length: 17 },
  { start: 3, length: 21 },
  { start: 1, length: 25 },
  { start: 2, length: 23 },
  { start: 3, length: 21 },
  { start: 4, length: 19 },
  { start: 5, length: 17 },
  { start: 6, length: 15 },
  { start: 4, length: 19 },
  { start: 5, length: 17 },
  { start: 6, length: 15 },
  { start: 7, length: 13 },
  { start: 8, length: 11 },
  { start: 9, length: 9 },
  { start: 7, length: 13 },
  { start: 8, length: 11 },
  { start: 9, length: 9 },
  { start: 10, length: 7 },
  { start: 11, length: 5 },
  { start: 12, length: 3 },
  { start: 13, length: 1 },
  { start: 0, length: 0 }, // leere Zeile, damit der Stern mehr platz hat :D
  { start: 13, length: 1 }
];

var column = 0;
var row = 0;
var totalItems = 300;

// Create and append all of the circles to the tree container
var markedItems = 0;
for (i = 0; i < tree.length; i++) {
  column = tree[i].start - 1;
  for (j = 0; j < tree[i].length; j++) {
    var item;
    var foundEmoji = emojis.find((x) => x.postions.includes(markedItems));
    item = $('<div class="item"></div>');

    item.css("transform", "scale(" + (Math.random() * (1.2 - 0.8) + 0.8) + ")");
    item.css("left", column * 4 + "%");
    item.css("bottom", row + "%");
    if (foundEmoji) {
      item.text(foundEmoji.emoji);
    } else if (markedItems === totalItems) {
      item.text("⭐");
      item.css("transform", "scale(3)");
    } else {
      item.text("🟢");
    }

    item.appendTo(".tree-container-inner");

    column++;
    markedItems++;
  }
  row += 4;
}

var lit = $(".tree-circle.on").length;
var i = lit;
function myLoop() {
  var loop = setTimeout(function () {
    if (i - 1 >= 0) {
      $(".item")
        .eq(i - 1)
        .addClass("on");
      $(".progress-count").text(i); // Update the progress counter
    }
    if (i == totalItems) {
      $(".star").addClass("on"); // Light star when goal is met
    }
    i++;
    if (i <= total) {
      myLoop(); // go to next circle
    }
  }, 1);
}
myLoop(); // light first circle

`;

// document.addEventListener("DOMContentLoaded", (event) => {
 var Weihnachtspächenaktion = document.querySelector('#Weihnachtspächenaktion-entry');
Weihnachtspächenaktion.innerHTML = html;

var styleSheet = document.createElement("style");
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

var scripts = document.createElement("script");
const newtext = document.createTextNode(js);
scripts.appendChild(newtext);
document.body.appendChild(scripts);
// });
