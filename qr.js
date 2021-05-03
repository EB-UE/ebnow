var color = "&color=90-40-115"
var user = we.authMgr.getUser();

var firstName = user.firstName;
var lastName = user.lastName;
var phone = user.phoneNumber;

//replace all umlauts in firstName and lastName
firstName = firstName.replace(/\u00e4/g, "ae");
firstName = firstName.replace(/\u00c4/g, "Ae");
firstName = firstName.replace(/\u00d6/g, "Oe");
firstName = firstName.replace(/\u00f6/g, "oe");
firstName = firstName.replace(/\u00dc/g, "Ue");
firstName = firstName.replace(/\u00fc/g, "ue");
firstName = firstName.replace(/\u00df/g, "ss");

lastName = lastName.replace(/\u00e4/g, "ae");
lastName = lastName.replace(/\u00c4/g, "Ae");
lastName = lastName.replace(/\u00d6/g, "Oe");
lastName = lastName.replace(/\u00f6/g, "oe");
lastName = lastName.replace(/\u00dc/g, "Ue");
lastName = lastName.replace(/\u00fc/g, "ue");
lastName = lastName.replace(/\u00df/g, "ss");
//


if (phone === null) {
    phone = "";
} else {
    phone = "%0ATEL%3BWORK%3BVOICE%3A" + encodeURIComponent(phone);
}
var mobile = user.profile.mobilnummer;

if (mobile === undefined) {
    mobile = "";
} else {
    mobile = "%0ATEL%3BCELL%3A" + encodeURIComponent(mobile)
}
var userfirma = user.profile.firma
var company = "%0AORG%3A" + encodeURIComponent(userfirma);

var userEmail = user.profile.publicEmailAddress.toLowerCase()
var email = "%0AEMAIL%3BWORK%3BINTERNET%3A" + encodeURIComponent(userEmail);

var size = "&size=220x220&margin=0";

var url = "https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A2.1%0AFN%3A" + firstName + "+" + lastName + "%0AN%3A" + lastName + "%3B" + firstName + phone + email + mobile + company + "%0AEND%3AVCARD%0A" + size + color;

var qrSelector = document.querySelector('.external-script-widget[data-widget-id="qrcode"]');

if (qrSelector) {
    //console.log(url);
    qrSelector.innerHTML = "<img src ='" + url + "'>";
} else {
    console.log("This didn't work. Try again");
};
