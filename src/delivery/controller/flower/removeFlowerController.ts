import { Controller, HttpRequest, HttpResponse } from "../index";
import { IFlowerGateway } from "@src/data/gateway";
import { RemoveFlower } from "@domain/usercase/flower";
import { badRequest, okay, noContent } from "@src/helper/http";
import { Flower } from "@domain/entity"
import { HttpRequestToFlowerFactory } from "@src/main/factory"

export class RemoveFlowerController implements Controller {

    flowerGateway: IFlowerGateway;

    constructor(flowerGateway: IFlowerGateway) {
        this.flowerGateway = flowerGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const removeFlower = new RemoveFlower(this.flowerGateway);

        if (httpRequest.params.id) {
            return removeFlower.removeById(httpRequest.params.id).then(flower => {
                return okay(flower);
            }).catch(error => {
                return noContent();
            });

        } else {
            const flower: Flower = new HttpRequestToFlowerFactory(httpRequest).make();
            return removeFlower.remove(flower).then(flower => {
                return okay(flower);
            }).catch(error => {
                return noContent();
            });

        }

    }
}