import 'module-alias/register';
import config from "@src/main/config";
import mongoose from "mongoose";
import { AddFlower } from "@domain/usercase/flower/addFlower";
import { HttpRequestToFlowerFactory } from "@src/main/factory"
import { FlowerGateway } from "@src/infrastructure/db/mongoose";
import { IValidation, RequiredFieldValidation, ValidationComposite, } from "@src/helper/validations";
import { Flower } from "@domain/entity"
import { exit } from "process";
import { flowerSeed } from "./flowerSeed";

export * from "./flowerSeed";

export type FlowerSeeds = {
    name: string,
    seed: object[]
}

export class FlowerSeeder {

    private mongoose: any;
    private addFlower: AddFlower;
    seeds: FlowerSeeds[] = [];

    constructor(mongoose: any, addFlower: AddFlower) {
        this.mongoose = mongoose;
        this.addFlower = addFlower;
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
                        const flower: Flower = new HttpRequestToFlowerFactory({ body: obj }).make();
                        await this.addFlower.add(flower);
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

export const flowerInit = async () => {

    const validations: IValidation[] = [
        new RequiredFieldValidation('scientificName'),
        new RequiredFieldValidation('names')
    ];

    const flowerSeeder = new FlowerSeeder(mongoose, new AddFlower(new FlowerGateway(), new ValidationComposite(validations)));


    flowerSeeder.addSeed('FlowerSeed', flowerSeed);

    try {
        await flowerSeeder.populate();
        /* process.exit(); */
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', err);
        /* process.exit(); */
    }

}


