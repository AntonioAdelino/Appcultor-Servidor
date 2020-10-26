import express from 'express';
import bodyParser from "body-parser";
//import { AddArticleController, GetArticleController, getArticleByTextController, UpdateFlowerArticleController, RemoveArticleController } from "@src/delivery/controller/article";
import { AddFlowerController } from "@src/delivery/controller/flower";

import { FlowerGateway } from "@src/infrastructure/db/mongoose";
import { adaptRoute } from "../../adapter";

const jsonParser = bodyParser.json();

const router = express.Router();

/* pesquisa artigos dado um texto como filtro */
//router.get('/searchArticle', jsonParser, adaptRoute(new getArticleByTextController(new ArticleGateway())));

/* pega todos os artigos ou um artigo especifico caso venha com o id parametro*/
//router.get('/:id?', jsonParser, adaptRoute(new GetArticleController(new ArticleGateway())));

/* adiciona novo artigo */
router.post('/', jsonParser, adaptRoute(new AddFlowerController(new FlowerGateway())));

/* atualiza um artigo especificando o id */
//router.put('/:id', jsonParser, adaptRoute(new UpdateFlowerController(new FlowerGateway())));

/* remove um artigo especificando um id */
//router.delete('/:id?', jsonParser, adaptRoute(new RemoveArticleController(new ArticleGateway())));

export const flowerRoute = router;
