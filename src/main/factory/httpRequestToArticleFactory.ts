import { Article } from "@domain/entity";
import { HttpRequest } from "@src/delivery/controller/http"

export class HttpRequestToArticleFactory {
    private _httpRequest: HttpRequest;

    constructor(httpRequest: HttpRequest) {
        this._httpRequest = httpRequest;
    }

    make(): Article {
        const body = this._httpRequest.body;
        const Article: Article = {
            title: body.title,
            content: body.content,
            tags: body.tags,
            language: body.language,
            author: body.author
        }
        return Article;
    }
}