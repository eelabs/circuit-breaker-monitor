
export interface Breaker {
    service: string
    status: string
    type: string
    events: EventConnection
}

export interface PercentageCircuitBreaker extends Breaker {
    config: {
        ttl: number
        percentFailed: number
        reEnableAfterSeconds: number
        minimumFailures: number
    },
    values: {
        successCount: number
        failedCount: number
        lastTripped: number
    }
}

export interface EventConnection {
    items: Event[],
    cursor: String
}

export interface Event {
    eventType: string,
    timestamp: number,
    request?: {
        body: string,
        headers: {
            key: string,
            value: string
        }
    },
    response?: {
        body: string,
        headers: {
            key: string,
            value: string
        },
        status: number
    },

}