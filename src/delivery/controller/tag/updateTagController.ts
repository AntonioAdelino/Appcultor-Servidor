import { Controller, HttpRequest, HttpResponse } from "../index";
import { ITagGateway } from "@src/data/gateway";
import { UpdateTag } from "@domain/usercase/tag";
import { okay, noContent } from "@src/helper/http";
import { Tag } from "@domain/entity"
import { HttpRequestToTagFactory } from "@src/main/factory"

export class UpdateTagController implements Controller {

    tagGateway: ITagGateway;

    constructor(tagGateway: ITagGateway) {
        this.tagGateway = tagGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const updateTag = new UpdateTag(this.tagGateway);

        if (httpRequest.params.id) {
            const tag: Tag = new HttpRequestToTagFactory(httpRequest).make();
            return updateTag.update(httpRequest.params.id, tag).then(tag => {
                return okay(tag);
            }).catch(error => {
                return noContent();
            });

        } else {
            return noContent();
        }

    }
}