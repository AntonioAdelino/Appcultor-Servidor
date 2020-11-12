import { Tag } from "@domain/entity";
import { HttpRequest } from "@src/delivery/controller/http"

export class HttpRequestToTagFactory {
    private _httpRequest: HttpRequest;

    constructor(httpRequest: HttpRequest) {
        this._httpRequest = httpRequest;
    }

    make(): Tag {
        const body = this._httpRequest.body;
        const Tag: Tag = {
            title: body.title,
            tag: body.tag,
            image: body.image,
        }
        return Tag;
    }
}