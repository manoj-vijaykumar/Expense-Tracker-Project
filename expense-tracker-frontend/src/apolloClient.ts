import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient(
    {
        link: new HttpLink({
            uri:"http://expense-tracker-env.eba-zttamq2h.eu-north-1.elasticbeanstalk.com/graphql"
        }),
        cache: new InMemoryCache()
        
    }
);

export default client;