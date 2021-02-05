export * from "./flower";
export * from "./article";
export * from "./tag"
import { articleInit, flowerInit, tagInit } from "."

const init = async () => {
    await flowerInit();
    await articleInit();
    await tagInit();
    process.exit();
}

init();