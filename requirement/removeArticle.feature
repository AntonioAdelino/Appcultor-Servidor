#language:pt

Funcionalidade: Remover artigos

Cenário: Remover um artigo
    Dado que eu queira remover um artigo em minha base de dados de artigos.
    Quando eu fizer uma requisição http do tipo delete no endpoint base do article + / + id do artigo alvo.
    Então devo receber os artigo recém removido e um statuscode 200 como resposta.