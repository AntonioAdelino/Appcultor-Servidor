#language:pt

Funcionalidade: Adicionar artigos

Cenário: Adicionar um ou mais artigos
    Dado que eu queira adicionar um ou mais artigos em minha base de dados de artigos.
    Quando eu fizer uma requisição http do tipo post no endpoint base do article
    E incluir no corpo(body) da requisição um artigo ou um array de artigos em formato json. 
    Então devo receber os artigos recém adicionados e um statuscode 200 como resposta.

