import { Controller, HttpRequest, HttpResponse } from "../index";
import { ITagGateway } from "@src/data/gateway";
import { GetTagByText } from "@domain/usercase/tag";
import { okay, noContent, badRequest } from "@src/helper/http";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";

export class getTagByTextController implements Controller {

    tagGateway: ITagGateway;

    constructor(tagGateway: ITagGateway) {
        this.tagGateway = tagGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        const validations: IValidation[] = [
            new RequiredFieldValidation('text'),
        ];
        const getTag = new GetTagByText(this.tagGateway, new ValidationComposite(validations));

        const { text, ...query } = httpRequest.query;

        return getTag.getByDistance(text ?? null, query ?? {}).then(tags => {
            return okay(tags);
        }).catch(error => {
            return badRequest(error);
        });

    }
}