export * from "./flower";
export * from "./article";
import { articleInit, flowerInit } from "."

const init = async () => {
    await flowerInit();
    await articleInit();
    process.exit();
}

init();