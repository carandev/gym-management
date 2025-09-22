import express from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './trpc/router'
import { createContext } from './trpc/context'
import {clerkMiddleware} from "@clerk/express";

const app = express()
app.use(express.json())
app.use(clerkMiddleware())

// mount tRPC en /trpc
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

export default app
