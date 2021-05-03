inputForZoomId = document.createElement('input');
buttonForZoomId = document.createElement('button');

inputForZoomId.placeholder = 'Besprechungs-ID';
inputForZoomId.style.width = '200px';
inputForZoomId.style.marginBottom = '5px';
inputForZoomId.onkeyup = function(event) {
    if (event.keyCode === 13) {
        buttonForZoomId.click();
    }
}


buttonForZoomId.textContent = 'Zoom öffnen';
buttonForZoomId.style.width = '118.562px';
buttonForZoomId.onclick = function() {
    window.open('https://zoom.us/wc/join/' + inputForZoomId.value, '_blank');
}

linkGenerator = document.getElementById('link-generator');
linkGenerator.style.textAlign = 'center';
linkGenerator.appendChild(inputForZoomId);
linkGenerator.appendChild(buttonForZoomId);
