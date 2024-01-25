(function() {
    let suchWidget = '<sw-knowledge-search react-on-events="false" show-suggestions="false" limit="5" placeholder="Bitte gib hier deinen Suchbegriff ein" view-mode="bordered"> </sw-knowledge-search>';
    let automatischesSuchWidget = '<sw-knowledge-auto-search></sw-knowledge-auto-search>';
    let filterWidget = '<sw-knowledge-filter></sw-knowledge-filter>';
    let ergebnislistenWidget = '<sw-knowledge-result-list view-mode="card" show-header="false" show-flat="true" empty-text="Bitte versuche es noch einmal..." columns="title;excerpt;treePath"> </sw-knowledge-result-list>';
    let detailansichtWidget = '<sw-knowledge-detail auto-dialog="true" dialog-title="EB-Wissensartikel" dialog-message=" " auto-expand-foldouts="true" show-path="false" view-mode="simple"> </sw-knowledge-detail>';
    let baumWidget = '<sw-knowledge-tree view-mode="list" bordered-grid="true" load-navigation-url="false"> </sw-knowledge-tree>';


    


    let sabiosucheintegrationSelector = document.querySelector('.external-script-widget[data-widget-id="sabiosucheintegration"]');
    sabiosucheintegrationSelector.innerHTML = `${baumWidget}${detailansichtWidget}
    <br>
    <span>Alternativ kannst du hier alle Artikel durchsuchen.</span>
    <br>${suchWidget}${ergebnislistenWidget}`;


    let sabiostyle = '<style>.button,button{ width:unset; }</style>'
    let sabiosucheintegrationstyleSelector = document.querySelector('.external-script-widget[data-widget-id="sabiosucheintegrationstyle"]');
    sabiosucheintegrationstyleSelector.innerHTML = `${sabiostyle}`;


    // https://stackoverflow.com/a/707580
    {
        ebnowhiddenCls = 'ebnowhidden'
        var style = document.createElement('style');
        style.innerHTML = `.${ebnowhiddenCls} { display: none !important; }`;
        document.head.appendChild(style);
    }




    waitForElm('sw-knowledge-detail mat-accordion').then((elm) => {
        const targetNode = elm;

        // https://stackoverflow.com/a/35385518
        {
            var template = document.createElement('template');
            template.innerHTML = `<p id="keineTreffer" class="${ebnowhiddenCls}">Oops... nichts gefunden 🤷‍ – bitte den Fachbereich den Inhalt zu erstellen.</p>`;
            keineTrefferElement = template.content.firstChild;
        }

        targetNode.parentNode.insertBefore(keineTrefferElement, targetNode.nextSibling)


        // override open of XHR, so we intercept the response
        const origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener('load', function() {
                if (istSabioSuchanfrage(this.responseURL)) {
                    if (istKeineSabioSternSuchanfrage(this.responseURL)) {
                        const jsonResponse = JSON.parse(this.responseText)
                        if (jsonResponse?.success === true) {
                            document.getElementById('keineTreffer')?.addCls(ebnowhiddenCls);
                            if (jsonResponse?.data?.total === 0) {
                                document.getElementById('keineTreffer')?.removeCls(ebnowhiddenCls);
                            }
                        }
                    }
                }
            });
            origOpen.apply(this, arguments);
        };
    });

    function istSabioSuchanfrage(responseURL) {
        return responseURL.startsWith('https://eb.sabio.de/sabio/services/text?')
    }

    function istKeineSabioSternSuchanfrage(responseURL) {
        return responseURL.includes('q=*') == false
    }

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
