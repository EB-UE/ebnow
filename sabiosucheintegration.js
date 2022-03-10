(function() {
  let suchWidget='<sw-knowledge-search></sw-knowledge-search>'
  let automatischesSuchWidget='<sw-knowledge-auto-search></sw-knowledge-auto-search>'
  let filterWidget='<sw-knowledge-filter></sw-knowledge-filter>'
  let ergebnislistenWidget='<sw-knowledge-result-list></sw-knowledge-result-list>'
  let detailansichtWidget='<sw-knowledge-detail></sw-knowledge-detail>'
  let baumWidget='<sw-knowledge-tree></sw-knowledge-tree>'


  let sabiosucheintegrationSelector = document.querySelector('.external-script-widget[data-widget-id="sabiosucheintegration"]');
  sabiosucheintegrationSelector.innerHTML = `${suchWidget}${detailansichtWidget}${baumWidget}`

  
  let sabiostyle = '<style>.button,button{ width:80%; }</style>'
  let sabiosucheintegrationSelector = document.querySelector('.external-script-widget[data-widget-id="sabiosucheintegrationstyle"]');
  sabiosucheintegrationSelector.innerHTML = `${sabiostyle}`

})();
