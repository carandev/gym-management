import {useAuth} from "@clerk/clerk-expo";
import React from "react";
import {getTrpcClient, trpc} from "@/utils/trpc";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Stack} from "expo-router";

export default function Main() {
    const queryClient = new QueryClient()
    const {getToken} = useAuth()

    const trpcClient = React
        .useMemo(() =>
        getTrpcClient(getToken), [getToken])

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Stack/>
            </QueryClientProvider>
        </trpc.Provider>
    )
}