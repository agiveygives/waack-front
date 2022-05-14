import { readable } from 'svelte/store';
import { gql } from 'graphql-request';
import graphQLClient from '../client';
import type QueryResType from '../types';
import type { Accomplishment } from '../../types/accomplishment';

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

    const accomplishments = accomplishmentsByCurrentUser.edges.map((item: { node: Accomplishment }) => item.node)
    return accomplishments;
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
