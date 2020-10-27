import { Controller, HttpRequest, HttpResponse } from "../index";
import { IFlowerGateway } from "@src/data/gateway";
import { GetFlower } from "@domain/usercase/flower";
import { okay, noContent } from "@src/helper/http";

export class GetFlowerController implements Controller {

    flowerGateway: IFlowerGateway;

    constructor(flowerGateway: IFlowerGateway) {
        this.flowerGateway = flowerGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const getFlower = new GetFlower(this.flowerGateway);
        if (httpRequest.params.id) {
            return getFlower.getById(httpRequest.params.id).then(flower => {
                return okay(flower);
            }).catch(error => {
                return noContent();
            });

        } else {
            const flower = await getFlower.getAll(httpRequest.query);
            return okay(flower);
        }

    }
}