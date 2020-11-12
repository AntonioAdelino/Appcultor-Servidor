import { ITagGateway } from "@src/data/gateway/tagGateway";
import { tagModel, ITagModel } from "@src/main/model";
import { Model } from "mongoose";
import { Tag } from "@domain/entity";

export class TagGateway implements ITagGateway {

    private _model: Model<ITagModel>;

    constructor() {
        this._model = tagModel;
    }

    getAll(query: any = {}): Promise<Tag[]> {
        const { tags, ...rest } = query;
        const options = tags ? { tags: { $in: tags.split(",") }, ...rest } : rest;
        return this._model.find(options).then(docs => {
            const tags: Tag[] = docs;
            return tags;
        });
    }

    getById(id: number): Promise<Tag> {
        return this._model.findById(id).then(doc => {
            const tag: Tag = doc;
            return tag;
        });
    }

    getByText(text: string, query: object): Promise<Tag[]> {
        return this._model.find({ ...query, $text: { $search: text } }, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } })
            .limit(20)
            .then(docs => {
                const tags: Tag[] = docs;
                return tags;
            });
    }

    add(tag: Tag): Promise<Tag> {
        return this._model.create(tag).then(doc => {
            const tag: Tag = doc;
            return tag;
        });
    }

    update(id: number, tag: Tag): Promise<Tag> {
        return this._model.findByIdAndUpdate(id, tag).then(doc => {
            const tag: Tag = doc;
            return tag;
        });

    }

    removeById(id: number): Promise<Tag> {
        return this._model.findByIdAndRemove(id).then(doc => {
            const tag: Tag = doc;
            return tag;
        });
    }

    remove(tag: Tag): Promise<Tag> {
        return this._model.findOneAndRemove(tag).then(doc => {
            const tag: Tag = doc;
            return tag;
        });
    }
}