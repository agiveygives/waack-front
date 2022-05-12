import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://rhcuw3hgpc.us-east-1.awsapprunner.com/graphql'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {},
});

export default graphQLClient;
