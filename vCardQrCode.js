function generateAndDisplayContactQrCode() {
    const user = we.authMgr.getUser();
    const VCard = window.vcardcreator.default;
    const myVCard = new VCard();
    myVCard.addName(user.lastName || '', user.firstName || '');
    const firma = user.profile.firma || '';
    if (firma) {
      myVCard.addCompany(firma, user.profile.department || '');
    }
    const phoneNumber = user.phoneNumber || '';
    if (phoneNumber) {
      myVCard.addPhoneNumber(phoneNumber, 'WORK');
    }
    const mobilnummer = user.profile.mobilnummer || '';
    if (mobilnummer) {
      myVCard.addPhoneNumber(mobilnummer, 'CELL');
    }
    const email = user.publicEmailAddress || '';
    if (email) {
      // hack to set e-mail-address
      myVCard.setProperty('email', 'EMAIL;WORK', email);
    }
    myVCard.setProperty('UID', 'UID', `urn:uuid:${stringToUuid(user.id)}`);

    const options = {
        text:  myVCard.toString(),
        width: 400,
        height: 400,
        correctLevel: QRCode.CorrectLevel.H,
        PO: '#5a2873',
        PI: '#5a2873',
        AO: '#5a2873',
        AI: '#5a2873',
        quietZone: 5,
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAYFBMVEX////49vnw6/Lw7PL39fj28/e+qsi0nb+0nsDd0+Pe1OPd0+Lt6PDq5O1vQ4RXJHFZJnLe0+NwRIVaKHNwRIbq4+1uQoRWI3BYJXH18/f08PWxmr2lirOmi7OlibOmirPj32u9AAAA8UlEQVRYw+3Y2QqEMAwF0Fj3vVZb19H//8tB6Dwl6DB0UDD3NdzzVEgowCPjCR9HBABhFCcocRQCBGTFs6BIM5y8ACirWqLUVQlQ5EQlFRb0iWHW7KCSLYpUO9hQHf8U7CiwY5BBBhlk8CpQ5A3OvlO06QeU3uh9p1CVz04JCiojwDQvL5RlngBGshJcvb+/TlgS0dNRZdJUJ7TTqFIdipmPwNnghqoiO42J+0D26xG49kSlju00IV5bO2xH4DYQFZkwyCCDDDL4X9D5CnC+pJyv0fvH+bHk/Jy7/wXLIIMMMsjgGfjjp67zb2fnH+MPyxvBVPJppv4sYwAAAABJRU5ErkJggg==',
    };
    
	new QRCode(document.getElementById("vCardGiroCode"), options);
}

function importVCardLib() {
    const vCardLibScript = document.createElement('script');
    vCardLibScript.onload = importEasyQrCodeLib
    vCardLibScript.src = 'https://cdn.jsdelivr.net/npm/vcard-creator@0.3.0/dist/vcard-creator.min.js';
    document.body.appendChild(vCardLibScript);
}

function importEasyQrCodeLib() {
    const easyQrCodeLibScript = document.createElement('script');
    easyQrCodeLibScript.onload = generateAndDisplayContactQrCode
    easyQrCodeLibScript.src = 'https://cdn.jsdelivr.net/npm/easyqrcodejs@4.0.0/dist/easy.qrcode.min.js';
    document.body.appendChild(easyQrCodeLibScript);
}

function stringToUuid(string) {
    string = string.replace('-', '');
    return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c, p) {
      return string[p % string.length];
    });
  }

importVCardLib()