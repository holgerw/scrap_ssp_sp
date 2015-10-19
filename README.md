# Dependencias

- PhantomJS: navegador sem interface gráfica, pode ser controlado por scripts.
- Instalar phantomjs na versão 1.8.2 (versão 1.9 contem um bug, versão 2.0 não foi testado)
- http://phantomjs.org/

# Execução
```
%> phantomjs phantom_script
%> <CTRL>+C   // para terminar, caso o script não termina
```


# Funcionamento

## phantom_script.js
- script principal, controla o processo de scrapping, via API phantomjs
- delega passos de manipulação da página para funções javascript definidas em onpage_scrapper.js
- Processo
    - 1) carregar página inicial
    - 2) injetar scripts JS na página
    - 3) obter a lista de municipios e salvar-la no contexto phantomjs (manter-la fora do contexto da página, pois este é zerado a cada navegação)
    - 4) navegar para "Ocorrências por mês"
    - 5) ao carregar uma página, efetuar o scrapping, acumular estes dados no contexto phantomjs e navegar para o próximo municipio.

## onpage_scrapper.js
- script a ser injetado na página carregada
- funções para navegação e scrapping
- usa Jquery para selecionar e manipular a página
- o site alvo do scrapping já possui o Jquery, caso fosse o contrário, o Jquery poderia ser injetado na página.

## onpage_fix.js
- script a ser injetado na página carregada
- funções que corrigem um bug do site alvo, no phantomjs

# TODO
Para finalizar o scrapping falta implementar
- onpage_scrapper.js : loadPageForMunicipio()
- phantom_script.js  : saveResult()
Corrigir um bug em
- phantom_script.js  : linha 61