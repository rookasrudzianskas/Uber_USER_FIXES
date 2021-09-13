/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onOrderUpdated = /* GraphQL */ `
    subscription OnOrderUpdated($id: ID!) {
        onOrderUpdated(id: $id) {
            id
            createdAt
            type
            status
            originLatitude
            originLongitude
            destLatitude
            destLongitude
            userId
            carId
            updatedAt
        }
    }
`;
export const onCarUpdated = /* GraphQL */ `
    subscription OnCarUpdated($id: ID!) {
        onCarUpdated(id: $id) {

        }
    }
`;
