import { gql } from 'graphql-request';
import graphQLClient from '../client';

export const getUser = async (sessionId: string) => {
    graphQLClient.setHeader('session_id', sessionId)
    const { user } = await graphQLClient.request(
        gql`
      query {
        user {
          name,
          email,
          id,
          manager,
          title
        }
      }
    `
    )

    return user;
}
