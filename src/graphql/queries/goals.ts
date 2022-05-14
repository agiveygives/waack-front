import { writable } from 'svelte/store';
import { gql } from 'graphql-request';
import graphQLClient from '../client';
import type QueryResType from '../types';

const getGoals = async () => {
  const { goals } = await graphQLClient.request(
    gql`
      query {
        goals {
          id,
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

function userGoals() {
	const { subscribe, update } = writable<QueryResType>({
    status: 'loading',
    data: null,
  });

  const subscribeToStore =  () => {
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
        status: 'loading'
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
