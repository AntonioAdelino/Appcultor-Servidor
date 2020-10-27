import { Flower } from "@domain/entity";
import { IFlowerGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class GetFlowerByText {

    flowerGateway: IFlowerGateway;
    flowerValidation: IValidation

    constructor(flowerGateway: IFlowerGateway, flowerValidation: IValidation) {
        this.flowerGateway = flowerGateway;
        this.flowerValidation = flowerValidation;
    }

    async getByDistance(text: string, query: object): Promise<Flower[]> {
        console.log("param", { text, ...query })
        const error = this.flowerValidation.validate({ text, ...query });
        if (error) {
            throw error;
        }
        return this.flowerGateway.getByText(text, query);
    }
}