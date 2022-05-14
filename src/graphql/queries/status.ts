import { readable } from 'svelte/store';
import { gql } from 'graphql-request';
import graphQLClient from '../client';
import type QueryResType from '../types';

const getStatus = async () => {
  const { status } = await graphQLClient.request(
    gql`
      query {
        status
      }
    `
  )

  return status;
}

export const status = readable<QueryResType>(
  {
    status: 'loading',
    data: null,
  },
  set => {
    set({
      status: 'loading',
      data: null,
    });

    getStatus()
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
