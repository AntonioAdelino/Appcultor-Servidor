import { IFlowerGateway } from "@src/data/gateway/flowerGateway";
import { flowerModel, IFlowerModel } from "@src/main/model";
import { Model } from "mongoose";
import { Flower } from "@domain/entity";

export class FlowerGateway implements IFlowerGateway {

    private _model: Model<IFlowerModel>;

    constructor() {
        this._model = flowerModel;
    }

    getAll(query: any = {}): Promise<Flower[]> {
        const { tags, ...rest } = query;
        const options = tags ? { tags: { $in: tags.split(",") }, ...rest } : rest;
        return this._model.find(options).then(docs => {
            const flowers: Flower[] = docs;
            return flowers;
        });
    }

    getById(id: number): Promise<Flower> {
        return this._model.findById(id).then(doc => {
            const flower: Flower = doc;
            return flower;
        });
    }

    getByText(text: string, query: object): Promise<Flower[]> {
        return this._model.find({ ...query, $text: { $search: text, $language: "pt" } }, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } })
            .limit(20)
            .then(docs => {
                const flowers: Flower[] = docs;
                return flowers;
            });
    }

    add(flower: Flower): Promise<Flower> {
        return this._model.create(flower).then(doc => {
            const flower: Flower = doc;
            return flower;
        });
    }

    update(id: number, flower: Flower): Promise<Flower> {
        return this._model.findByIdAndUpdate(id, flower).then(doc => {
            const flower: Flower = doc;
            return flower;
        });

    }

    removeById(id: number): Promise<Flower> {
        return this._model.findByIdAndRemove(id).then(doc => {
            const flower: Flower = doc;
            return flower;
        });
    }

    remove(flower: Flower): Promise<Flower> {
        return this._model.findOneAndRemove(flower).then(doc => {
            const flower: Flower = doc;
            return flower;
        });
    }

}