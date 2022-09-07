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




    // für detailansicht die Fehlermeldung anzeigen
    const targetNode = document.querySelector('sw-knowledge-detail mat-accordion');

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        document.getElementById('keineTreffer')?.remove();
        if (targetNode.childElementCount === 0) {
            targetNode.insertAdjacentHTML("afterend", '<p id="keineTreffer">Oops... dieser Inhalt existiert noch nicht – bitte einen Redakteur diesen zu erstellen.</p>');
        }
    };

    const observer = new MutationObserver(callback);

    // Options for the observer (which mutations to observe)
    const config = {
        attributes: false,
        childList: true,
        subtree: false
    };

    observer.observe(targetNode, config);

})();
