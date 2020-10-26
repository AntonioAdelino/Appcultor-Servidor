import { Controller, HttpRequest, HttpResponse } from "../index";
import { IFlowerGateway } from "@src/data/gateway";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";
import { AddFlower } from "@domain/usercase/flower";
import { Flower } from "@domain/entity"
import { HttpRequestToFlowerFactory } from "@src/main/factory"
import { badRequest, okay } from "@src/helper/http";

export class AddFlowerController implements Controller {

    flowerGateway: IFlowerGateway;

    constructor(flowerGateway: IFlowerGateway) {
        this.flowerGateway = flowerGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const flower: Flower = new HttpRequestToFlowerFactory(httpRequest).make();

        const validations: IValidation[] = [
            new RequiredFieldValidation('scientificName'),
            new RequiredFieldValidation('names'),
        ];

        const addFlower = new AddFlower(this.flowerGateway, new ValidationComposite(validations));

        return addFlower.add(flower).then(result => {
            return okay(flower);
        }).catch(error => {
            return badRequest(error);
        });


    }
}