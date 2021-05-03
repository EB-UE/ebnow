var d = new Date();
var time = d.getHours();
var date = d.getDate() + "." + (d.getMonth() + 1) + ".";

if (time < 12) {
    var greeting = "Guten Morgen";
    var emoji = "🌞";
}
if (time >= 12) {
    var greeting = "Hallo";
    var emoji = "☀";
}
if (time >= 18) {
    var greeting = "Guten Abend";
    var emoji = "🌛";
}
if (date === "6.12.") {
    var greeting = "Ho, ho, ho";
    var emoji = "🎅";
}
if (date === "24.12." || date === "25.12." || date === "26.12.") {
    var greeting = "Frohe Weihnachten";
    var emoji = "🎅🎄";
}
if (date === "1.1.") {
    var greeting = "Frohes neues Jahr";
    var emoji = "🎉";
}

var user = we.authMgr.getUser()

var greetingSelector = document.querySelector('.external-script-widget[data-widget-id="greeting"]');
var firstName = user.firstName;
var profileLink = "/profile/" + user.id;
var greetingMessage = greeting + ',&nbsp;' + firstName + '!<br> Schön, dass Du hier bist! ' + emoji;

if (greetingSelector) {
    greetingSelector.innerHTML = greetingMessage.link(profileLink);
} else {
    console.log("This didn't work. Try again");
};
