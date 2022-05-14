import { writable } from 'svelte/store';
import { gql } from 'graphql-request';
import graphQLClient from '../client';
import type QueryResType from '../types';

const createAccomplishment = async (name: string, description: string, tags: string[] = []) => {
    const { accomplishment } = await graphQLClient.request(
        gql`
      mutation(
        $name: String!,
        $description: String!,
        $tags: [String],
      ) {
        createAccomplishment(accomplishmentData: {
          name: $name,
          description: $description,
          tags: $tags,
        }) {
          accomplishment {
            name,
            created,
            description,
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
            description,
            tags
        }
    )

    return accomplishment;
}


function newAccomplishment() {
    const { subscribe, update } = writable<QueryResType>({
        status: 'noop',
        data: null,
    });

    return {
        subscribe,
        create: (name: string, description: string, tags: string[], callback: () => unknown) => {
            update(() => ({
                status: 'loading',
            }));

            createAccomplishment(name, description, tags)
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

export const accomplishment = newAccomplishment();
