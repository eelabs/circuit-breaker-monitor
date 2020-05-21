import gql from 'graphql-tag';

export const LOAD_BREAKERS = gql`
    query {
        circuitBreakers {
            ... on PercentageCircuitBreaker {
                service
                status
                type
                config {
                    minimumFailures
                    percentFailed
                    ttl
                    reEnableAfterSeconds
                }
                values {
                    failedCount
                    successCount
                    lastTripped
                }
                events(limit: 1000) {
                    items {
                        event_type
                        timestamp
                    }
                }
            }
        }
    }
`;