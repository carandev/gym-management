import { createTRPCReact, httpBatchLink } from "@trpc/react-query"
import type { AppRouter } from '../../server/src/trpc/router.ts'

export const trpc = createTRPCReact<AppRouter>()

export const getTrpcClient = (getToken: () => Promise<string | null>) =>
    trpc.createClient({
        links: [
            httpBatchLink({
                url: 'http://192.168.101.20:3000/trpc',
                async headers() {
                    const token = await getToken()
                    return token ? {Authorization: `Bearer ${token}`} : {}
                }
            })
        ]
    })
