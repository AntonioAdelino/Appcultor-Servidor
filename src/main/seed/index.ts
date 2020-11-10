import 'module-alias/register';
import config from "@src/main/config";
import mongoose from "mongoose";
import { AddArticle } from "@domain/usercase/article/addArticle";
import { HttpRequestToArticleFactory } from "@src/main/factory"
import { ArticleGateway } from "@src/infrastructure/db/mongoose";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";
import { Article } from "@domain/entity"
import { exit } from "process";
import { articleSeed } from "./articleSeed";

export * from "./articleSeed";

export type Seeds = {
    name: string,
    seed: object[]
}

export class ArticleSeeder {

    private mongoose: any;
    private addArticle: AddArticle;
    seeds: Seeds[] = [];

    constructor(mongoose: any, addArticle: AddArticle) {
        this.mongoose = mongoose;
        this.addArticle = addArticle;
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
        for (const seed of this.seeds) {
            console.log('\x1b[36m%s\x1b[0m', `Adding ${seed.name}...`);
            const seedSize = seed.seed.length;
            let count = 1;
            try {
                for (const obj of seed.seed) {
                    try {
                        const article: Article = new HttpRequestToArticleFactory({ body: obj }).make();
                        await this.addArticle.add(article);
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

const init = async () => {

    const validations: IValidation[] = [
        new RequiredFieldValidation('title'),
        new RequiredFieldValidation('content'),
        new RequiredFieldValidation('tags'),
    ];

    const articleSeeder = new ArticleSeeder(mongoose, new AddArticle(new ArticleGateway(), new ValidationComposite(validations)));


    articleSeeder.addSeed('ArticleSeed', articleSeed);

    try {
        await articleSeeder.populate();
        process.exit();
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', err);
        process.exit();
    }

}

init();

