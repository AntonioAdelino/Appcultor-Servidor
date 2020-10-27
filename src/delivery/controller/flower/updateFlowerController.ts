import { Controller, HttpRequest, HttpResponse } from "../index";
import { IFlowerGateway } from "@src/data/gateway";
import { UpdateFlower } from "@domain/usercase/flower";
import { okay, noContent } from "@src/helper/http";
import { Flower } from "@domain/entity"
import { HttpRequestToFlowerFactory } from "@src/main/factory"

export class UpdateFlowerController implements Controller {

    flowerGateway: IFlowerGateway;

    constructor(flowerGateway: IFlowerGateway) {
        this.flowerGateway = flowerGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const updateFlower = new UpdateFlower(this.flowerGateway);

        if (httpRequest.params.id) {
            const flower: Flower = new HttpRequestToFlowerFactory(httpRequest).make();
            return updateFlower.update(httpRequest.params.id, flower).then(flower => {
                return okay(flower);
            }).catch(error => {
                return noContent();
            });

        } else {
            return noContent();
        }

    }
}