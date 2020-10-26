import { Flower } from "@domain/entity";
import { IFlowerGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class AddFlower {

    flowerGateway: IFlowerGateway;
    flowerValidation: IValidation

    constructor(flowerGateway: IFlowerGateway, flowerValidation: IValidation) {
        this.flowerGateway = flowerGateway;
        this.flowerValidation = flowerValidation;
    }

    async add(flower: Flower): Promise<Flower> {
        const error = this.flowerValidation.validate(flower);
        if(error){
            throw error;
        }
        return this.flowerGateway.add(flower);
    }
}