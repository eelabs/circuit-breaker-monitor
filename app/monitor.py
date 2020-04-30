import os
import json
from redis import Redis
from time import time

client = Redis(host=os.getenv('REDIS_HOST', 'localhost'))


def handle(event, context):
    print("In lambda, got event " + json.dumps(event))
    breaker_keys = client.smembers("all_breakers")
    print("in lambda, got list of circuit breakers")
    all_breakers = [_lookup_breaker_details(str(key, 'utf-8')) for key in breaker_keys]
    return [breaker for breaker in all_breakers if breaker]


def _lookup_breaker_details(key):
    print("Looking up key " + str(key, "UTF-8"))
    p = client.pipeline(transaction=False)
    p.hgetall("{0}-{1}".format(key, "config"))
    p.get(key)
    p.scard("{0}-{1}".format(key, "count"))
    p.scard("{0}-{1}".format(key, "error"))
    result = p.execute()
    error_count = result.pop()
    all_count = result.pop()
    last_open = int(result.pop() or 0)
    config = result.pop()
    print("Looked up, outputting json structure")
    if config:
        return {
            "__typename": "PercentageCircuitBreaker",
            "service": key,
            "type": str(config[b'type'], 'utf-8'),
            "status": "TRIPPED" if last_open > time() - int(config.get(b'ttl', 0)) else "CLOSED",
            "config": {
                "ttl": int(config.get(b'ttl', 0)),
                "percentFailed": int(config.get(b'percent_failed', 0)),
                "reEnableAfterSeconds": int(config.get(b're_enable_after_seconds', 0)),
                "minimumFailures": int(config.get(b'minimum_failures', 0)),
            },
            "values": {
                "successCount": all_count - error_count,
                "errorCount": error_count,
                "lastTripped": last_open
            }
        }
    else:
        return {}

