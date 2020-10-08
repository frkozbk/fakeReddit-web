import { withApollo } from "./withApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

const createClient = (ctx: NextPageContext) =>
    new ApolloClient({
        uri: "http://localhost:4000",
        credentials: "include",
        headers: {
            cookie:
                (typeof window === "undefined"
                    ? ctx.req?.headers.cookie
                    : undefined) || "",
        },
        cache: new InMemoryCache(),
    });

export default withApollo(createClient);
