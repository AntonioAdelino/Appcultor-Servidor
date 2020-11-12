import { Tag } from "@src/domain/entity/Tag"

export interface ITagGateway {
    getAll(query: any): Promise<Tag[]>;
    getById(id: number): Promise<Tag>;
    getByText(text: string, query: object): Promise<Tag[]>;
    add(tag: Tag): Promise<Tag>;
    update(id: number, tag: Tag): Promise<Tag>;
    removeById(id: number): Promise<Tag>;
    remove(tag: Tag): Promise<Tag>;
}