#language:pt

Funcionalidade: Atualizar artigos

Cenário: Atualizar um artigo
    Dado que eu queira atualizar um artigo em minha base de dados de artigos.
    Quando eu fizer uma requisição http do tipo put no endpoint base do article + / + id do artigo alvo.
    E incluir no corpo(body) da requisição o novo artigo em formato json. 
    Então devo receber os artigo recém atualizado e um statuscode 200 como resposta.