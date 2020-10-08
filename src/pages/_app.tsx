import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";
import theme from "../theme";
import "../styles/tailwind.css";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthProvider } from "../Hocs/withAuth";
const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps }: any) {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <ColorModeProvider>
                        <CSSReset />
                        <Component {...pageProps} />
                    </ColorModeProvider>
                </ThemeProvider>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default MyApp;
