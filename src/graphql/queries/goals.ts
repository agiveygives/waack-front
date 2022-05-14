import { readable } from 'svelte/store';
import { gql } from 'graphql-request';
import graphQLClient from '../client';
import type QueryResType from './types';

const getGoals = async () => {
  const { goals } = await graphQLClient.request(
    gql`
      query {
        goals {
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
    `
  )

  return goals;
}

export const goals = readable<QueryResType>(
  {
    status: 'loading',
    data: null,
  },
  set => {
    set({
      status: 'loading',
      data: null,
    });

    getGoals()
      .then((response) => {
        set({
          status: 'success',
          data: response
        })
      })
      .catch((err) => {
        set({
          status: 'error',
          error: err,
        })
      })
  }
);
