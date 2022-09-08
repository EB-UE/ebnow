(function() {
    let suchWidget = '<sw-knowledge-search></sw-knowledge-search>';
    let automatischesSuchWidget = '<sw-knowledge-auto-search></sw-knowledge-auto-search>';
    let filterWidget = '<sw-knowledge-filter></sw-knowledge-filter>';
    let ergebnislistenWidget = '<sw-knowledge-result-list view-mode="card" show-top-border="false" header="Ergebnisliste" auto-open-result="false" empty-text="Ooops...kein Treffer vorhanden" highlight="false"> </sw-knowledge-result-list>';
    let detailansichtWidget = '<sw-knowledge-detail expanded="false" show-path="false" single-expand="true"></sw-knowledge-detail>';
    let baumWidget = '<sw-knowledge-tree></sw-knowledge-tree>';


    let sabiosucheintegrationSelector = document.querySelector('.external-script-widget[data-widget-id="sabiosucheintegration"]');
    sabiosucheintegrationSelector.innerHTML = `${suchWidget}${detailansichtWidget}`;


    let sabiostyle = '<style>.button,button{ width:unset; }</style>'
    let sabiosucheintegrationstyleSelector = document.querySelector('.external-script-widget[data-widget-id="sabiosucheintegrationstyle"]');
    sabiosucheintegrationstyleSelector.innerHTML = `${sabiostyle}`;




    waitForElm('sw-knowledge-detail mat-accordion').then((elm) => {
        const targetNode = elm;


        const origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener('load', function() {
                if (this.responseURL.startsWith('https://eb.sabio.de/sabio/services/text?')) {
                    if (this.responseURL.includes('q=*') == false) {
                        const jsonResponse = JSON.parse(this.responseText)
                        if (jsonResponse?.success === true) {
                            document.getElementById('keineTreffer')?.remove();
                            if (jsonResponse?.data?.total === 0) {
                                targetNode.insertAdjacentHTML("afterend", '<p id="keineTreffer">Oops... dieser Inhalt existiert noch nicht – bitte einen Redakteur diesen zu erstellen.</p>');
                            }
                        }
                    }
                }
            });
            origOpen.apply(this, arguments);
        };
    });

    // https://stackoverflow.com/a/61511955
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }


})();
