import { Flower } from "@domain/entity";
import { HttpRequest } from "@src/delivery/controller/http"

export class HttpRequestToFlowerFactory {
    private _httpRequest: HttpRequest;

    constructor(httpRequest: HttpRequest) {
        this._httpRequest = httpRequest;
    }

    make(): Flower {
        const body = this._httpRequest.body;
        const Flower: Flower = {
            
            scientificName: body.scientificName,
            names: body.names,
            family: body.family,
            flowerResources: body.flowerResources,
            images: body.images,
            reference: body.reference
            
        }
        return Flower;
    }
}