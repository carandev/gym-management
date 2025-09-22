import * as SecureStore from 'expo-secure-store'
import {ClerkProvider, TokenCache} from "@clerk/clerk-expo";
import Main from "@/components/Main";

const tokenCache: TokenCache = {
    getToken: (key: string) => SecureStore.getItemAsync(key),
    saveToken: (key: string, value: string) => SecureStore.setItemAsync(key, value)
}

export default function RootLayout() {
    return (
        <ClerkProvider
            publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
            tokenCache={tokenCache}
        >
            <Main/>
        </ClerkProvider>
    )
}
