import { Controller, HttpRequest, HttpResponse } from "../index";
import { ITagGateway } from "@src/data/gateway";
import { GetTag } from "@domain/usercase/tag";
import { okay, noContent } from "@src/helper/http";

export class GetTagController implements Controller {

    tagGateway: ITagGateway;

    constructor(tagGateway: ITagGateway) {
        this.tagGateway = tagGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const getTag = new GetTag(this.tagGateway);
        if (httpRequest.params.id) {
            return getTag.getById(httpRequest.params.id).then(tag => {
                return okay(tag);
            }).catch(error => {
                return noContent();
            });

        } else {
            const tag = await getTag.getAll(httpRequest.query);
            return okay(tag);
        }

    }
}