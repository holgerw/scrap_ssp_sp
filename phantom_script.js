//
// script a ser executado pelo phantom.js
// permite carregar uma página web e executar ações no contexto desta página.
// elementos chave deste script:
// 1) page.injectJs( file ); // injetar um arquivo javascript na página
// 2) page.evaluate( function() {}); // executar javascript no contexto da página
// com 1) e 2) é possível injetar funções javascript na página e em seguida
// invocar-las no contexto da página. 
//

var scrappginUrl = 'http://www.ssp.sp.gov.br/novaestatistica/Pesquisa.aspx';
var fixScript = './onpage_fix.js';
var scrapperScript = './onpage_scrapper.js';

var municipios = [];
var nextMunicipio = null;
var serie = [];

var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  console.log('[console] ' + msg);
};


// -----------------------------------------------------------------------------
//  START - Script exit point
// -----------------------------------------------------------------------------
function saveResult(){
  // TODO implementar salvar os dados em arquivo:
  // Salvar: http://phantomjs.org/api/fs/method/write.html
  // Converter JSON array para CSV
  console.log(JSON.stringify(serie));
  phantom.exit();
}
// -----------------------------------------------------------------------------
//  END - Script exit point
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
//  START - Process each page after load
// -----------------------------------------------------------------------------
page.onLoadFinished = function() {
  var pageIsOcorrenciasPorMes = page.evaluate(function() {
    var pageTitle = $('#ContentPlaceHolder1_lbInfo').text();
    return pageTitle === 'Ocorrências policiais registradas por mês';
  });
  
  if(!pageIsOcorrenciasPorMes){
    return;
  }

  if(nextMunicipio){
    var result = page.evaluate(function(municipio) {
      return scrapMunicipio(municipio);
    }, nextMunicipio);
    serie = serie.concat(result);
  }

  var lastIndex = municipios.indexOf(nextMunicipio);
  if( lastIndex < municipios.length - 1 ){
    nextMunicipio = municipios[lastIndex + 1]; 
    page.evaluate(function(municipio) { 
      // TODO Bug estranho:
      // a função loadPageForMunicipio() foi injetada na página scrapped (onpage_scrapper.js)
      // logo a função deveria ser conhecida no contexto da página
      loadPageForMunicipio(municipio);
    }, nextMunicipio);
  } else {
    saveResult();
  }
};
// -----------------------------------------------------------------------------
//  END - Process each page after load
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
//  START - Script entry point (initial page load)
// -----------------------------------------------------------------------------
page.open(scrappginUrl, function(pageStatus) {
  // inject javascript to be invoced on the web page
  page.injectJs(fixScript);
  page.injectJs(scrapperScript);

  // inicializar lista de municipios
  municipios = page.evaluate(function() { return getListaMunicipios(); });

  // navegar para página "Ocorrências policiais registradas por mês"
  page.evaluate(function() { goToPageOcorrenciasMensais(); });
});
