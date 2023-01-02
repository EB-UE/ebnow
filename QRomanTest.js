// Create a new script element
const scriptElement = document.createElement('script');

// Set the src attribute to point to the library file
scriptElement.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js';

// Append the script element to the body of the page
document.body.appendChild(scriptElement);

// Set the vCard data
const firstName = 'John';
const lastName = 'Doe';
const phoneNumber = '123-456-7890';
const email = 'john.doe@example.com';

// Create the vCard string
const vCard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
TEL;TYPE=CELL:${phoneNumber}
EMAIL:${email}
END:VCARD`;

// Create a container element for the QR code
const qrCodeElement = document.getElementById("fuchscard");

// Generate the QR code
new QRCode(qrCodeElement, vCard);

// Append the QR code to the body of the page
document.body.appendChild(qrCodeElement);

