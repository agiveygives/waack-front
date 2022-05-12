import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://fruits-api.netlify.app/graphql'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {},
});

export default graphQLClient;
