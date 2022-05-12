import { readable } from 'svelte/store';
import { gql } from 'graphql-request';
import graphQLClient from '../client';
import type QueryResType from './types';

const getFruits = async () => {
  const { fruits } = await graphQLClient.request(
    gql`
      query {
        fruits {
          scientific_name,
          tree_name,
          fruit_name
        }
      }
    `
  )

  return fruits;
}

export const fruits = readable<QueryResType>(
  {
    status: 'loading',
    data: null,
  },
  set => {
    set({
      status: 'loading',
      data: null,
    });

    getFruits()
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
