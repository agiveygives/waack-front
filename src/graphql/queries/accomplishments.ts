import { writable } from 'svelte/store';
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

function userAccomplishments() {
    const { subscribe, update } = writable<QueryResType>({
        status: 'loading',
        data: null,
    });

    const subscribeToStore = () => {
        getAccomplishments()
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

            getAccomplishments()
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

export const accomplishments = userAccomplishments();
