(function() {
  let suchWidget='<sw-knowledge-search expanded="false" show-path="false"></sw-knowledge-search>'
  let automatischesSuchWidget='<sw-knowledge-auto-search></sw-knowledge-auto-search>'
  let filterWidget='<sw-knowledge-filter></sw-knowledge-filter>'
  let ergebnislistenWidget='<sw-knowledge-result-list view-mode="card" columns="title"></sw-knowledge-result-list>'
  let detailansichtWidget='<sw-knowledge-detail single-expand="true"></sw-knowledge-detail>'
  let baumWidget='<sw-knowledge-tree></sw-knowledge-tree>'


  let sabiosucheintegrationSelector = document.querySelector('.external-script-widget[data-widget-id="sabiosucheintegration"]');
  sabiosucheintegrationSelector.innerHTML = `${suchWidget}${detailansichtWidget}`

  
  let sabiostyle = '<style>.button,button{ width:unset; }</style>'
  let sabiosucheintegrationstyleSelector = document.querySelector('.external-script-widget[data-widget-id="sabiosucheintegrationstyle"]');
  sabiosucheintegrationstyleSelector.innerHTML = `${sabiostyle}`

})();
