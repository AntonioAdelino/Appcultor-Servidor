import express from 'express';
import bodyParser from "body-parser";
import { AddTagController, GetTagController, getTagByTextController, UpdateTagController, RemoveTagController } from "@src/delivery/controller/tag";
import { TagGateway } from "@src/infrastructure/db/mongoose";
import { adaptRoute } from "../../adapter";
import { tokenValidation } from "@src/main/middleware";

const jsonParser = bodyParser.json();

const router = express.Router();

/* pesquisa artigos dado um texto como filtro */
router.get('/searchTag', jsonParser, adaptRoute(new getTagByTextController(new TagGateway())));
/* pega todos os artigos ou um artigo especifico caso venha com o id parametro*/
router.get('/:id?', jsonParser, adaptRoute(new GetTagController(new TagGateway())));
/* adiciona novo artigo */
router.post('/', jsonParser, tokenValidation, adaptRoute(new AddTagController(new TagGateway())));
/* atualiza um artigo especificando o id */
router.put('/:id', jsonParser, tokenValidation, adaptRoute(new UpdateTagController(new TagGateway())));
/* remove um artigo especificando um id */
router.delete('/:id?', jsonParser, tokenValidation, adaptRoute(new RemoveTagController(new TagGateway())));

export const tagRoute = router;
