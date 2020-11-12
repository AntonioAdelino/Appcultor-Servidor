import { Controller, HttpRequest, HttpResponse } from "../index";
import { ITagGateway } from "@src/data/gateway";
import { RemoveTag } from "@domain/usercase/tag";
import { badRequest, okay, noContent } from "@src/helper/http";
import { Tag } from "@domain/entity"
import { HttpRequestToTagFactory } from "@src/main/factory"

export class RemoveTagController implements Controller {

    tagGateway: ITagGateway;

    constructor(tagGateway: ITagGateway) {
        this.tagGateway = tagGateway;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const removeTag = new RemoveTag(this.tagGateway);

        if (httpRequest.params.id) {
            return removeTag.removeById(httpRequest.params.id).then(tag => {
                return okay(tag);
            }).catch(error => {
                return noContent();
            });

        } else {
            const tag: Tag = new HttpRequestToTagFactory(httpRequest).make();
            return removeTag.remove(tag).then(tag => {
                return okay(tag);
            }).catch(error => {
                return noContent();
            });

        }

    }
}