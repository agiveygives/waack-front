import { writable } from 'svelte/store';
import { gql } from 'graphql-request';
import graphQLClient from '../client';
import type QueryResType from '../types';

type goalData = {
  uuid: string,
  name?: string,
  tags?: string[],
  complete?: Date,
  started?: Date,
}

const updateGoal = async (goalData: goalData) => {
  const { goal } = await graphQLClient.request(
    gql`
      mutation(
        $uuid: String!,
        $name: String,
        $tags: [String],
        $complete: DateTime,
        $started: DateTime
      ) {
        updateGoal(goalData: {
          uuid: $uuid,
          name: $name,
          tags: $tags,
          complete: $complete,
          started: $started
        }) {
          goal {
            uuid,
            name,
            tags,
            created,
            started,
            created
          }

        }
      }
    `,
    goalData
  )

  return goal;
}


function updatedGoal() {
	const { subscribe, update } = writable<QueryResType>({
    status: 'noop',
    data: null,
  });

	return {
		subscribe,
		update: (goalData: goalData, callback: () => unknown) => {
      update(() => ({
        status: 'loading',
      }));

      updateGoal(goalData)
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

export const goal = updatedGoal();
