import { Controller, HttpRequest, HttpResponse } from "../index";
import { IFlowerGateway } from "@src/data/gateway";
import { GetFlowerByText } from "@domain/usercase/flower";
import { okay, noContent, badRequest } from "@src/helper/http";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";

export class getFlowerByTextController implements Controller {

    flowerGateway: IFlowerGateway;

    constructor(flowerGateway: IFlowerGateway) {
        this.flowerGateway = flowerGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        const validations: IValidation[] = [
            new RequiredFieldValidation('text'),
        ];
        const getFlower = new GetFlowerByText(this.flowerGateway, new ValidationComposite(validations));

        const { text, ...query } = httpRequest.query;

        return getFlower.getByDistance(text ?? null, query ?? {}).then(flowers => {
            return okay(flowers);
        }).catch(error => {
            return badRequest(error);
        });

    }
}