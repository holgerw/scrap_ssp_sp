function getListaMunicipios(){
  var municipios = [];
  $('#ContentPlaceHolder1_ddlMunicipios > option:not(:first-child)').each(
    function(index, element){ 
      municipios.push($(element).text());
    }
  );
  return municipios;
}

function goToPageOcorrenciasMensais(){
  __doPostBack('ctl00$ContentPlaceHolder1$btnMensal','');
}

function loadPageForMunicipio(municipio){
  // TODO implementar o select do municipio, via Jquery
  __doPostBack('ctl00$ContentPlaceHolder1$ddlMunicipios','');
}

function pageIsOcorrenciasPorMes(){
  var pageTitle = $('#ContentPlaceHolder1_lbInfo').text();
  return pageTitle === 'Ocorrências policiais registradas por mês';
}

function scrapMunicipio(municipio){
  return [].concat(seriePorMunicipioAno(municipio, 2015))
          .concat(seriePorMunicipioAno(municipio, 2014))
          .concat(seriePorMunicipioAno(municipio, 2015));
}

function scrapMunicipioAno(municipio, ano){
  var serie = [];
  var selectorCode;
  if(ano == 2015){ selectorCode = 0; }
  if(ano == 2014){ selectorCode = 1; }
  if(ano == 2013){ selectorCode = 2; }
  $('#ContentPlaceHolder1_repAnos_gridDados_' + selectorCode + ' > tbody > tr:not(:first-child)').each(function() {
      var natureza = $(this).children(':first-child').text();
      var totalAno = $(this).children(':last-child').text();
      $(this).children(":not(:first-child,:last-child)").each(function(index){
          var ocorrencias = $(this).text();
          var mensal = {
              ano: ano,
              mes: index + 1,
              natureza: natureza,
              ocorrencias: ocorrencias
          }
          serie.push(mensal);
      })
  }); 
  return serie;
}
