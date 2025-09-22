import prisma from '../db';
import {getAuth} from "@clerk/express";

export async function createContext({ req, res } : any) {
    const auth = getAuth(req)

    return {
        prisma,
        auth
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>
