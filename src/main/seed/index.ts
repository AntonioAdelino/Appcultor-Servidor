import {userInit} from ".";
export * from "./flower";
export * from "./article";
export * from "./tag"
export * from "./user"
import { articleInit, flowerInit, tagInit } from "."

const init = async () => {
    await flowerInit();
    await articleInit();
    await userInit()
    await tagInit();
    process.exit();
}

init();