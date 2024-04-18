import { PrismaClient } from "@prisma/client";

const divisionsMap = new Map<string, InitType>();
divisionsMap.set("it", InitType.IT)

export declare global {
    declare module globalThis{
        var prisma: PrismaClient;
        var divisionsMap: Map;
    }
    
}