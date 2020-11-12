import { Tag } from "@domain/entity";
import { ITagGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class RemoveTag {

    tagGateway: ITagGateway;

    constructor(tagGateway: ITagGateway) {
        this.tagGateway = tagGateway;
    }

    async removeById(id: number): Promise<Tag> {
        return this.tagGateway.removeById(id);
    }

    async remove(tag: Tag): Promise<Tag> {
        return this.tagGateway.remove(tag);
    }
}