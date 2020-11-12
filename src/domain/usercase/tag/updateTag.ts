import { Tag } from "@domain/entity";
import { ITagGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class UpdateTag {

    tagGateway: ITagGateway;

    constructor(tagGateway: ITagGateway) {
        this.tagGateway = tagGateway;
    }

    async update(id: number, tag: Tag): Promise<Tag> {
        return this.tagGateway.update(id, tag);
    }
}