import { Controller, HttpRequest, HttpResponse } from "../index";
import { ITagGateway } from "@src/data/gateway";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";
import { AddTag } from "@domain/usercase/tag";
import { Tag } from "@domain/entity"
import { HttpRequestToTagFactory } from "@src/main/factory"
import { badRequest, okay } from "@src/helper/http";

export class AddTagController implements Controller {

    tagGateway: ITagGateway;

    constructor(tagGateway: ITagGateway) {
        this.tagGateway = tagGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const tag: Tag = new HttpRequestToTagFactory(httpRequest).make();

        const validations: IValidation[] = [
            new RequiredFieldValidation('title'),
            new RequiredFieldValidation('tag'),
            new RequiredFieldValidation('image'),
        ];

        const addTag = new AddTag(this.tagGateway, new ValidationComposite(validations));

        return addTag.add(tag).then(result => {
            return okay(tag);
        }).catch(error => {
            return badRequest(error);
        });


    }
}