import { writable } from 'svelte/store';
import { gql } from 'graphql-request';
import graphQLClient from '../client';
import type QueryResType from '../types';

const createGoal = async (name: string, tags: string[] = []) => {
  const { goal } = await graphQLClient.request(
    gql`
      mutation(
        $name: String!,
        $tags: [String],
      ) {
        createGoal(goalData: {
          name: $name,
          tags: $tags,
        }) {
          goal {
            name,
            created,
            started,
            complete,
            tags,
            owner {
              name
            }
          }
        }
      }
    `,
    {
      name,
      tags
    }
  )

  return goal;
}


function newGoal() {
	const { subscribe, update } = writable<QueryResType>({
    status: 'noop',
    data: null,
  });

	return {
		subscribe,
		create: (name: string, tags: string[], callback: () => unknown) => {
      update(() => ({
        status: 'loading',
      }));

      createGoal(name, tags)
        .then((response) => {
          update(() => ({
            status: 'success',
            data: response
          }));

          callback();
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

export const goal = newGoal();
