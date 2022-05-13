import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://d703-76-105-101-89.ngrok.io/graphql';

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {},
});

export default graphQLClient;
