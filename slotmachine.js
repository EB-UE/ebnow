const html = `<div id="slotbuddy">
  <div class="container">
    <div class="slotcontainer">
      <div class="text-slot" id="text0">Wie können wir</div>
      <div class="slot">
        <div class="symbols" id="slot1Symbols"></div>
      </div>

      <div class="text-slot" id="text1">auf digitalem Weg von der</div>

      <div class="slot">
        <div class="symbols" id="slot3Symbols"></div>
      </div>

      <div class="text-slot" id="text2">der EB überzeugen, um nachfolgendes Ziel zu erreichen:</div>

      <div class="slot">
        <div class="symbols" id="slot5Symbols"></div>
      </div>
      <div class="last-slot">
        <div class="last-slot" id="lastSlot"></div>
      </div>
      <div class="levercontainer">
        <div class="levertip"></div>
        <div class="lever"></div>
      </div>
    </div>
  </div>`;

const css = `

#slotbuddy {
    background: white;
    margin: 0;
    padding: 0;
    font-family: Arial;
    color: #023F46;
    font-weight: bold;
}
.text-slot {
  width: 70px;
  height: 80px;
  /*border-radius: 10px;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background: #007f8c;
  padding: 10px; /* Padding to prevent text from touching the edges */
  box-sizing: border-box; /* Include padding in width/height calculations */
  font-size: 9px; /* Adjust font size as necessary */
  color: white;
  text-align: center; /* Center text horizontally */
  word-wrap: break-word; /* Ensure long words do not overflow */
}

.last-slot {
  width: 30px;
  height: 80px;
  /*border-radius: 10px;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background: #008081; 
  padding: 10px; /* Padding to prevent text from touching the edges */
  box-sizing: border-box; /* Include padding in width/height calculations */
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.slotcontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0px;
}

.slot {
    width: 100px;
    height: 240px;
    border: 5px solid #023F46;
    border-radius: 15px;
    display: inline-block;
    overflow: hidden;
    position: relative;
    background: #023F46;
    /*box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.4) inset;*/
}

.slot .symbols {
    position: absolute;
    top: 0;
    left: 0;
    transition: top 4s;
}

.slot .symbol {
  width: 100px;
  height: 65px; /* Adjust height if necessary */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10%;
  box-sizing: border-box; /* Include padding in width/height calculations */
  font-size: 9px;
  text-align: center; /* Center text horizontally */
  word-wrap: break-word; /* Ensure long words do not overflow */
  overflow: hidden; /* Hide overflow text to maintain slot aesthetics */  
  border: 1px solid #023F46;
  border-radius: 15px;
  background-color: white;
}

.levercontainer {
    position: relative;
    margin-left: 0px;
}

.lever {
    background: grey;
    height: 200px;
    width: 25px;
    border-radius: 10px;
    margin-top: -40px;
    margin-left: 15px;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.4) inset;
}

.levertip {
    background: #d83d87;
    height: 55px;
    width: 55px;
    border-radius: 50%;
    position: relative;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.4) inset;
}

.dividerhr {
    margin: 2px 10px;
}

.spinAmount {
    width: 60px;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
}

`;
const js = `const slotSymbols = [
  ['Neukunden', 'Bestandskunden', '(potentielle) Mitarbeitende'],
  ['Corporate Story', 'NH-Expertise', 'Arbeitgebermarke'],
  ['Nutzung von Ertragspotentialen', 'Effektivitätssteigerung & Kostensenkung', 'Stärkung der Nachhaltigkeit als Basis des Geschäftsmodells', 'Förderung der Zusammenarbeit mit der EB']
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createSymbolElement(symbol) {
  const div = document.createElement('div');
  div.classList.add('symbol');
  div.textContent = symbol;
  return div;
}

let spun = false;
const slots = document.querySelectorAll('.slot');

const transitionDelay = 300;

const repeat = (arr, n) => [].concat(...Array(n).fill(arr));

function generate() {
  slots.forEach((slot, index) => {

    for (let i = 0; i < slotSymbols.length; i++) {
      shuffleArray(slotSymbols[i]);
    }
    let repetitions = 5;
    if (index === 2) {
      repetitions = 4  
    }
    slotSymbolsRepeated = repeat(slotSymbols[index], repetitions);
    //console.log(slotSymbolsRepeated);
    
    const symbols = slot.querySelector('.symbols');
    const symbolHeight = symbols.querySelector('.symbol')?.clientHeight;
    const symbolCount = symbols.childElementCount;

    symbols.innerHTML = '';

    slotSymbolsRepeated.forEach(symbol => {
      symbols.appendChild(createSymbolElement(symbol));
    });

    symbols.style.transitionDelay = \`\${transitionDelay * index}ms\`;
  });
}

function spin() {
  return new Promise(resolve => {
    if (spun) {
      reset();
    }
    let completedSlots = 0;

    slots.forEach((slot, index) => {
      const symbols = slot.querySelector('.symbols');
      const symbolHeight = symbols.querySelector('.symbol')?.clientHeight;
      const symbolCount = symbols.childElementCount;

      const totalDistance = symbolCount * symbolHeight;
      const randomOffset = -(symbolCount - 3) * symbolHeight;
      symbols.style.top = \`\${randomOffset}px\`;

      symbols.addEventListener('transitionend', () => {
        completedSlots++;
        if (completedSlots === slots.length) {
          spun = true;
          resolve();
        }
      }, { once: true });
    });
  });
}

const spinAmountInput = document.querySelector('.spinAmount');

async function autoSpin() {
  let spinAmount = spinAmountInput.value;
  if (spinAmount) {
    spinAmountInput.style.border = 'none';
    for (let i = 0; i < spinAmount; i++) {
      await spin();
      await new Promise(resolve => setTimeout(resolve, transitionDelay * slots.length)); // Wait for a delay before starting the next spin
    }
  } else {
    spinAmountInput.style.border = '2px solid red';
  }
}

function reset() {
  const slots = document.querySelectorAll('.slot');

  slots.forEach(slot => {
    const symbols = slot.querySelector('.symbols');
    symbols.style.transition = 'none';
    symbols.style.top = '0';
    symbols.offsetHeight;
    symbols.style.transition = '';
  });

  generate();
}

document.querySelector('.levertip').addEventListener('click', function () {
  spin();
})

generate();`;

document.addEventListener("DOMContentLoaded", (event) => {
 var slotmachine = document.querySelector('#slotmachine');
slotmachine.innerHTML = html;

var styleSheet = document.createElement("style");
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

var scripts = document.createElement("script");
scripts.innerText = js;
document.body.appendChild(scripts);
});


