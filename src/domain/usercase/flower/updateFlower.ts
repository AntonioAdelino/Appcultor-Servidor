import { Flower } from "@domain/entity";
import { IFlowerGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class UpdateFlower {

    flowerGateway: IFlowerGateway;

    constructor(flowerGateway: IFlowerGateway) {
        this.flowerGateway = flowerGateway;
    }

    async update(id: number, flower: Flower): Promise<Flower> {
        return this.flowerGateway.update(id, flower);
    }
}