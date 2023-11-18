import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.hygraph.com/v2/clp2mx1k60vf101uc88vu8atp/master',
    cache: new InMemoryCache()
})