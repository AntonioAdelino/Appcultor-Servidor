import { Flower } from "@domain/entity";
import { IFlowerGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class GetFlower {

    flowerGateway: IFlowerGateway;

    constructor(flowerGateway: IFlowerGateway) {
        this.flowerGateway = flowerGateway;
    }

    async getAll(query: any = {}): Promise<Flower[]> {
        return this.flowerGateway.getAll(query);
    }

    async getById(id: number): Promise<Flower> {
        return this.flowerGateway.getById(id);
    }
}