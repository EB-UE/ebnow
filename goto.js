inputForGoToId = document.createElement('input');
buttonForGoToId = document.createElement('button');

inputForGoToId.placeholder = 'Besprechungs-ID';
inputForGoToId.style.width = '200px';
inputForGoToId.style.marginBottom = '5px';
inputForGoToId.onkeyup = function(event) {
    if (event.keyCode === 13) {
        buttonForGoToId.click();
    }
}


buttonForGoToId.textContent = 'GoToMeeting öffnen';
buttonForGoToId.style.width = '118.562px';
buttonForGoToId.onclick = function() {
    window.open('https://app.gotomeeting.com/?meetingId=' + inputForGoToId.value, '_blank');
}

linkGenerator = document.getElementById('goto-link-generator');
linkGenerator.style.textAlign = 'center';
linkGenerator.appendChild(inputForGoToId);
linkGenerator.appendChild(buttonForGoToId);
