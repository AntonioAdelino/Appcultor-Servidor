import { Flower } from "@domain/entity";
import { IFlowerGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class RemoveFlower {

    flowerGateway: IFlowerGateway;

    constructor(flowerGateway: IFlowerGateway) {
        this.flowerGateway = flowerGateway;
    }

    async removeById(id: number): Promise<Flower> {
        return this.flowerGateway.removeById(id);
    }

    async remove(flower: Flower): Promise<Flower> {
        return this.flowerGateway.remove(flower);
    }
}