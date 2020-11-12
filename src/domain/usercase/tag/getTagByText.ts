import { Tag } from "@domain/entity";
import { ITagGateway } from "@src/data/gateway";
import { IValidation } from "@src/helper/validations"


export class GetTagByText {

    tagGateway: ITagGateway;
    tagValidation: IValidation

    constructor(tagGateway: ITagGateway, tagValidation: IValidation) {
        this.tagGateway = tagGateway;
        this.tagValidation = tagValidation;
    }

    async getByDistance(text: string, query: object): Promise<Tag[]> {
        console.log("param", { text, ...query })
        const error = this.tagValidation.validate({ text, ...query });
        if (error) {
            throw error;
        }
        return this.tagGateway.getByText(text, query);
    }
}