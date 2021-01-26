allFirma = 'alle';

function fetchAllUser() {
  we.api.getUsers('limit=1')
    .then(response => we.api.getUsers(`limit=${response.total}`)
      .then(response => {
        allUsers = response.data
        insertButtonAndSelect()
      }
      )
    );
}

function createAndDownloadVcards() {
  const VCard = window.vcardcreator.default;

  firma = document.getElementById('select-firma').selectedOptions[0].textContent
  firmafilter = x => x
  if (firma !== allFirma) {
    firmafilter = user => user.profile.firma == firma;
  }

  const vcsString = allUsers.filter(user => user.enabled)
    .filter(user => user.status == 'activated')
    .filter(user => user.phoneNumber)
    .filter(firmafilter)
    //.slice(8, 10)
    .map(user => {
      var myVCard = new VCard();
      myVCard.addName(user.lastName || '', user.firstName || '');
      const firma = user.profile.firma || '';
      if (firma) {
        myVCard.addCompany(firma, user.profile.department || '');
      }
      const phoneNumber = user.phoneNumber || '';
      if (phoneNumber) {
        myVCard.addPhoneNumber(phoneNumber, 'EB Telefon');
      }
      const mobilnummer = user.profile.mobilnummer || '';
      if (mobilnummer) {
        myVCard.addPhoneNumber(mobilnummer, 'EB Diensthandy');
      }
      const email = user.publicEmailAddress || '';
      if (email) {
        // hack to set e-mail-address
        myVCard.setProperty('email', 'EMAIL;EB E-Mail', email);
      }
      const weiteretelefonnummer = user.profile.weiteretelefonnummer || '';
      if (weiteretelefonnummer) {
        myVCard.addPhoneNumber(weiteretelefonnummer, 'EB interne Telefonnummer');
      }
      myVCard.setProperty('UID', 'UID', `urn:uuid:${stringToUuid(user.id)}`);
      return myVCard.toString();
    })
    .join('');
  downloadVCF(`data:text/plain;charset=utf-8,${encodeURIComponent(vcsString)}`)
}

function downloadVCF(base64VCard) {
  const downloadLink = document.createElement("a");
  const fileName = "EBnowNutzer.vcf";

  downloadLink.href = base64VCard;
  downloadLink.download = fileName;
  downloadLink.click();
}

function insertButtonAndSelect() {
  select = document.createElement('select');
  select.id = 'select-firma'
  select.style.appearance = 'auto'

  firmen = allUsers.filter(x => x.profile !== undefined)
    .filter(x => x.profile.firma !== undefined)
    .map(y => y.profile.firma)
  options = new Set([allFirma].concat(firmen));
  options.forEach(opt => {
    const option = document.createElement("option");
    option.textContent = opt;
    option.value = opt;
    select.appendChild(option);
  })


  downloadButton = document.createElement('button')
  downloadButton.textContent = "download"
  downloadButton.onclick = createAndDownloadVcards

  container = document.getElementById('downloaduser-container')
  container.appendChild(select)
  container.appendChild(downloadButton)
}

function importVCardLib() {
  const vCardLibScript = document.createElement('script');
  // vCardLibScript.onload = fetchAllUser
  vCardLibScript.src = 'https://cdn.jsdelivr.net/npm/vcard-creator@0.3.0/dist/vcard-creator.min.js';
  document.body.appendChild(vCardLibScript);
}

function stringToUuid(string) {
  string = string.replace('-', '');
  return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c, p) {
    return string[p % string.length];
  });
}

importVCardLib();
fetchAllUser()
