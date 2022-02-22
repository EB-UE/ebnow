// date1 = Zieldatum
var date1 = new Date('03/01/2022');
var date2 = new Date();
var difference = date1.getTime() - date2.getTime();
var days = Math.ceil(difference / (1000 * 3600 * 24));
console.log(days + ' days to Christmas');
  // Display the result in the element with id="countdown"
  var countdownSelector = document.querySelector('.external-script-widget[data-widget-id="countdown"]');
  var countdownMessage = "Noch " + days + " Tage<br> Gemeinsam für Morgen";
    
  if(countdownSelector) {
    countdownSelector.innerHTML = countdownMessage;
  }
  
  // If the count down is finished, write some text
  if (distance <= 0) {
    clearInterval(x);
    countdownSelector.innerHTML = "Heute findet die Mitarbeiterveranstaltung statt!";
  }
}, 1000);
