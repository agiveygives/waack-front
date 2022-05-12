import { readable } from 'svelte/store';
import { request, gql } from 'graphql-request';
import type QueryResType from './types';

const getStatus = async () => {
  const { status } = await request(
    'https://rhcuw3hgpc.us-east-1.awsapprunner.com/graphql',
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
