import express from 'express';
import bodyParser from "body-parser";
//import { AddFlowerController, GetFlowerController, getFlowerByTextController, UpdateFlowerFlowerController, RemoveFlowerController } from "@src/delivery/controller/flower";
import { AddFlowerController, GetFlowerController, getFlowerByTextController, RemoveFlowerController } from "@src/delivery/controller/flower";
import { FlowerGateway } from "@src/infrastructure/db/mongoose";
import { adaptRoute } from "../../adapter";

const jsonParser = bodyParser.json();

const router = express.Router();

/* pesquisa flores dado um texto como filtro */
router.get('/searchFlower', jsonParser, adaptRoute(new getFlowerByTextController(new FlowerGateway())));

/* pega todos as flores ou uma flor especifica caso venha com o id parametro*/
router.get('/:id?', jsonParser, adaptRoute(new GetFlowerController(new FlowerGateway())));

/* adiciona nova flor */
router.post('/', jsonParser, adaptRoute(new AddFlowerController(new FlowerGateway())));

/* atualiza uma flor especificando o id */
//router.put('/:id', jsonParser, adaptRoute(new UpdateFlowerController(new FlowerGateway())));

/* remove um artigo especificando um id */
router.delete('/:id?', jsonParser, adaptRoute(new RemoveFlowerController(new FlowerGateway())));


export const flowerRoute = router;
