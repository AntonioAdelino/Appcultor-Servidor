#language:pt

Funcionalidade: Pegar artigos

Cenário: Pegar todos os artigos salvos 
    Dado que eu queira listar todos os artigos da minha base de dados.
    Quando eu fizer uma requisição http do tipo get no endpoint base do article.
    Então devo receber um array em formato json contendo toda coleção de artigos.

Cenário: Filtrar artigos
    Dado que eu queira listar artigos compativeis com um filtro.
    Quando eu fizer uma requisição http do tipo get no endpoint base do article.
    E incluir junto uma query de busca com os filtros desejados.
    Então devo receber apenas os artigos que casarem com meu filtro em um array em formato json.

Cenário: Pegar um artigo pelo id
    Dado que eu tenha um id de um artigo especifico
    Quando eu fizer uma requisição http do tipo get no endpoint base do article + /
    E especificar o id de um artigo
    Então devo receber o artigo do id especificado como resposta 

Cenário: Pesquisar Artigos
    Dado que eu queira pesquisar um artigo por um texto especifico
    Quando eu fizer uma requisição http do tipo get no endpoint searchAticle
    E incluir junto uma query text com o texto a ser pesquisado
    Então devo receber um array json com todos os artigos que continham o texto em seu conteúdo

Cenário: Pesquisar Artigos por Tags
    Dado que queira pesquisar artigos que correspondam a um conjunto de tags
    Quando eu fizer uma requisição http do tipo get no endpoint base de aticle
    E incluir junto uma query tags contendo as tags que pretendo filtrar sepradas por vírgula
    Então devo receber um array json com todos os artigos correspondente ao conjunto de tags
