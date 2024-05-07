const slotSymbols = [
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

    symbols.style.transitionDelay = `${transitionDelay * index}ms`;
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
      symbols.style.top = `${randomOffset}px`;

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

generate();