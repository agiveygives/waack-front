import { readable } from 'svelte/store';
import { gql } from 'graphql-request';
import graphQLClient from '../client';
import type QueryResType from './types';

const getAccomplishments = async () => {
    const { accomplishmentsByCurrentUser } = await graphQLClient.request(
        gql`
            query {
                accomplishmentsByCurrentUser {
                    edges {
                        node {
                            name
                            description
                            tags
                            created
                        }
                    }
                }
            }
        `
    )

    return accomplishmentsByCurrentUser.edges;
}

export const accomplishments = readable<QueryResType>(
    {
        status: 'loading',
        data: null,
    },
    set => {
        set({
            status: 'loading',
            data: null,
        });

        getAccomplishments()
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
