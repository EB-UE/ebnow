var __loadJs = function(url, cb) {
    var scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = url;
    if (cb) {
        scriptTag.onload = cb;
    }
    document.head.appendChild(scriptTag);
}, __arrayFrom = Array.from || function(tmp) {
    var temp_array = [],
    length = tmp.length;

    for (var i = 0; i < length; i++) {
        temp_array.push(tmp[i]);
    }
    return temp_array;
}, __initConnection = function (){
    if(typeof SABIO !== 'undefined'){
        SABIO.setApiConfiguration('https://eb.sabio.de/sabio/services', 'eb', 'rnw08jcorhqyiyf5wr3ofd6643klglnbsn77of0v4esraspnpzgw');
        __loadJs = undefined;
        var loader = __arrayFrom(document.querySelectorAll('script[src*="loader"]')).filter(function(s){
            return s && s.src.indexOf('id=sw-knowledge-loader') > 0;
        })[0];
        if (loader && loader.parentNode) {
            var params = function (url) {
                try {
                  return JSON.parse('{"' + decodeURI(url ? url.match(/(?:[^?]*)\??([^#]*)/)[1] : window.location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
                } catch(error) { return {}; }
            } (loader.src);
            if (params && params.lang) {
               SABIO.setLanguage(params.lang);
            }
            loader.parentNode.removeChild(loader);
        }
    }
    else{
        setTimeout(__initConnection, 250);
    }
};

__loadJs('https://eb.sabio.de/sabio/services/widget/bundle.js', function() {
    __initConnection();
});

var countdownSelector = document.querySelector('.external-script-widget[data-widget-id="sabio"]');
    
if(countdownSelector) {
  countdownSelector.innerHTML = countdownMessage;
}
