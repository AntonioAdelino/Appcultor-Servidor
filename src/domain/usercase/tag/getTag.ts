import { Tag } from "@domain/entity";
import { ITagGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class GetTag {

    tagGateway: ITagGateway;

    constructor(tagGateway: ITagGateway) {
        this.tagGateway = tagGateway;
    }

    async getAll(query: any = {}): Promise<Tag[]> {
        return this.tagGateway.getAll(query);
    }

    async getById(id: number): Promise<Tag> {
        return this.tagGateway.getById(id);
    }
}