import { writable } from 'svelte/store';
import { gql } from 'graphql-request';
import graphQLClient from '../client';
import type QueryResType from '../types';
import cookies from '../../helpers/cookies';

const getGoals = async () => {
  graphQLClient.setHeader('session_id', cookies.get('token'))
  const { goalsByCurrentUser: { edges } } = await graphQLClient.request(
    gql`
      query {
        goalsByCurrentUser {
          edges {
            node {
              uuid,
              name,
              created,
              started,
              complete,
              tags,
              owner {
                id,
                name
              }
            }
          }
        }
      }
    `
  )

  const goals = edges.map((edge: { node: unknown }) => edge.node)

  return goals;
}

function userGoals() {
  const { subscribe, update } = writable<QueryResType>({
    status: 'loading',
    data: null,
  });

  const subscribeToStore = () => {
    getGoals()
      .then((response) => {
        update(() => ({
          status: 'success',
          data: response
        }))
      })
      .catch((err) => {
        update(() => ({
          status: 'error',
          error: err
        }))
      })

    return subscribe;
  }

  return {
    subscribe: subscribeToStore(),
    refetch: () => {
      update(() => ({
        status: 'refresh'
      }));

      getGoals()
        .then((response) => {
          update(() => ({
            status: 'success',
            data: response
          }))
        })
        .catch((err) => {
          update(() => ({
            status: 'error',
            error: err
          }))
        })
    }
  };
}

export const goals = userGoals();
