import { Tag } from "@domain/entity";
import { ITagGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class AddTag {

    tagGateway: ITagGateway;
    tagValidation: IValidation

    constructor(tagGateway: ITagGateway, tagValidation: IValidation) {
        this.tagGateway = tagGateway;
        this.tagValidation = tagValidation;
    }

    async add(tag: Tag): Promise<Tag> {
        const error = this.tagValidation.validate(tag);
        if(error){
            throw error;
        }
        return this.tagGateway.add(tag);
    }
}