import { Flower } from "@src/domain/entity/Flower"

export interface IFlowerGateway {
    getAll(query: any): Promise<Flower[]>;
    getById(id: number): Promise<Flower>;
    getByText(text: string, query: object): Promise<Flower[]>;
    add(flower: Flower): Promise<Flower>;
    update(id: number, flower: Flower): Promise<Flower>;
    removeById(id: number): Promise<Flower>;
    remove(flower: Flower): Promise<Flower>;
}