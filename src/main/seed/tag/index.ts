import 'module-alias/register';
import config from "@src/main/config";
import mongoose from "mongoose";
import { AddTag } from "@domain/usercase/tag/addTag";
import { HttpRequestToTagFactory } from "@src/main/factory"
import { TagGateway } from "@src/infrastructure/db/mongoose";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";
import { Tag } from "@domain/entity"
import { exit } from "process";
import { tagSeed } from "./tagSeed";

export * from "./tagSeed";

export type TagSeeds = {
    name: string,
    seed: object[]
}

export class TagSeeder {

    private mongoose: any;
    private addTag: AddTag;
    seeds: TagSeeds[] = [];

    constructor(mongoose: any, addTag: AddTag) {
        this.mongoose = mongoose;
        this.addTag = addTag;
        try {
            this.mongoose.connect(config.DATABASE_ADDR, {
                useNewUrlParser: true,
            });
        } catch (error) {
            console.log('erro: '.concat(error));
        }
    }

    addSeed(name: string, seed: object[]) {
        this.seeds.push({
            name,
            seed
        })
    }

    async populate() {
        console.log("seed", this.seeds[0].seed)
        for (const seed of this.seeds) {
            console.log('\x1b[36m%s\x1b[0m', `Adding ${seed.name}...`);

            const seedSize = seed.seed.length;
            let count = 1;
            try {
                for (const obj of seed.seed) {
                    try {
                        const tag: Tag = new HttpRequestToTagFactory({ body: obj }).make();
                        await this.addTag.add(tag);
                        console.log(`add ${seed.name} ${count}...${seedSize}`);
                        count += 1;
                    } catch (err) {
                        throw err
                    }

                }
            } catch (err) {
                if (err.name === 'MongoError') {
                    if (err.message.split(" ").includes("E11000")) {
                        console.warn('\x1b[33m%s\x1b[0m', `Database already populated with ${seed.name}!`);
                    }
                } else {
                    throw err;
                }
            }

        };
    }
}

export const tagInit = async () => {

    const validations: IValidation[] = [
        new RequiredFieldValidation('title'),
        new RequiredFieldValidation('tag'),
        new RequiredFieldValidation('image')
    ];

    const tagSeeder = new TagSeeder(mongoose, new AddTag(new TagGateway(), new ValidationComposite(validations)));


    tagSeeder.addSeed('TagSeed', tagSeed);

    try {
        await tagSeeder.populate();
        /* process.exit(); */
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', err);
        /* process.exit(); */
    }

}


