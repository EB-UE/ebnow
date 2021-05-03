
function birthdays() {
const url = "https://de.eyo.net/api/users";
const id = we.authMgr.getSessionID();
const USER_ENTITY = "user"
let birthdaySelector = document.querySelector('.external-script-widget[data-widget-id="birthdays"]');
birthdaySelector.innerHTML=""

function loadDoc() {
  load(-7);
}
  
function load(offset) {
  if(offset > 30) {
    return;
  }
  
  const birthdayRequest = new XMLHttpRequest();
  birthdayRequest.onreadystatechange = function() { afterFirst(birthdayRequest, offset); };
  birthdayRequest.open("GET",url + ";wesessid=" + id + "?query=" + dateWithOffset(offset) + "&limit=10&extended=false");
  birthdayRequest.send();
}

function afterFirst(x, offset) {
  if (x.readyState == 4 && x.status == 200) {
    myAwesomeBirthdayStuff(offset, x.responseText);
    load(offset + 1);
  }
}
  
function myAwesomeBirthdayStuff(offset, responseText) {
  let partyPopper = "";
  if(offset == 0){
    partyPopper = " 🎉🎉🎉 ";
  }
  birthdaySelector.innerHTML += dateWithOffset(offset) + ": " + partyPopper + birthdayMessage(responseText)  + "<br>";
}
 
function dateWithOffset(offset) {
  const today = new Date();
  today.setDate(today.getDate() + offset);
  let currentDate = (today.getDate() <= 9 ? "0" : "" ) + today.getDate() + "." + ((today.getMonth() + 1) <= 9 ? "0" : "" ) + (today.getMonth() + 1);
  return currentDate;
}

function birthdayMessage(responseText) {
    const data = JSON.parse(responseText).data;
    if (typeof data === 'undefined') {
       return "Keine Geburtstage 😔";
    }
     return data
       .filter(user => user.entityType === USER_ENTITY)
       //.filter(user => user.profile.geburtsdatum.substring(0, 6) == dateWithOffset(offset))
       .map(user => '<a href="/profile/' + user.id + '">' + user.firstName + ' ' + user.lastName + '</a>')
       .join(', ');
 }
 
loadDoc();
}
birthdays()
