import {trpc} from "@/utils/trpc";
import {Button, Text, View} from "react-native";
import {SignedIn, SignedOut} from "@clerk/clerk-expo";
import {Link} from "expo-router";

export default function Index() {
    const {data: tenants, isLoading } = trpc.tenant.list.useQuery();

    const utils = trpc.useUtils()
    const createTenant = trpc.tenant.create.useMutation({
        onSuccess: () => {
            utils.tenant.list.invalidate()
        }
    })

    if (isLoading) return <Text>Cargando...</Text>

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SignedIn>
                <Text>Gimnasios</Text>
                {
                    tenants?.map(t => <Text key={t.id}>{t.name}</Text>)
                }

                <Button title="Crear gimnasio" onPress={() => createTenant.mutate({name: "Nuevo Gym 3"})}/>
            </SignedIn>
            <SignedOut>
                <Link href="/(auth)/sign-in">
                    <Text>Sign in</Text>
                </Link>
                <Link href="/(auth)/sign-up">
                    <Text>Sign up</Text>
                </Link>
            </SignedOut>
        </View>
    );
}
