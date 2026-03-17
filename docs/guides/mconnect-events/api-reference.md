## Error handling rules

MConnect Events REST APIs can return the following status codes in case of errors:

| HTTP Status Code | Description |
|-----------------|-------------|
| **400 Bad Request** | Returned when something is wrong with your request. For example, the request does not include the client certificate or an intermediary, some header is missing, the format is not a valid JSON, etc.<br><br>For more details, review the content of the response. |
| **401 Unauthorized** | Returned on any authorization error. Either the system is not registered as producer or consumer, has wrong authorization configuration, does not have the rights to publish events of the provided event type, or cannot use the indicated source, etc.<br><br>For more details, review the content of the response. |
| **404 Not Found** | The request URL wrong or consumer instance is not found (expired or not on the provided bridge).<br><br>For more details, review the content of the response. |
| **413 Content Too Large** | Returned when the entire HTTP request is larger than specified in Limits. |
| **422 Unprocessable Entity** | Returned when the event payload is not valid against the configured event schema.<br><br>For more details, review the content of the response. |
| **500 Internal Server Error** | Unexpected error. Contact the service owner and report the error. |

On success, the returned status code is 200, 201, 202 or 204.

## Producer APIs

Producers can produce events using one of the following APIs.

**Important!** For production scenarios, is recommended to produce events in batches, using the last endpoint. See also Limits.

### Endpoint: POST /ce/produce/raw

**Description:** Produce a single event in raw form in the body of HTTP request.

Set the standard Content-Type header to one of the following:
- `application/json` – the payload is in JSON format (this is most probably the format you intend to use);
- `application/octet-stream` – the payload is binary (only for special cases);
- `text/plain` – the payload is plain text (only for special cases).

**Request Parameters:**

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Header | ce-specversion | string* | The version of the CloudEvents specification which the event uses. This enables the interpretation of the context. This MUST always be set to "1.0". |
| Header | ce-source | uri* | Identifies the context in which an event happened. This MUST be set to the value (or one of the values) allowed in Producer configuration.<br><br>Producers MUST ensure that source + id is unique for each distinct event. |
| Header | ce-id | string* | Identifies the event.<br><br>Producers MUST ensure that source + id is unique for each distinct event. |
| Header | ce-type | string* | Contains a value describing the type of event related to the originating occurrence. This attribute is used for authorization, routing, observability, etc. |
| Header | ce-subject | string | This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure. Optional. |
| Header | ce-time | datetime | Timestamp of when the occurrence happened. Cannot be set to a future time. Formatted according to RFC 3339. If the time of the occurrence cannot be determined then this attribute MAY be set to some other time (such as the current time) by the CloudEvents producer, however all producers for the same source MUST be consistent in this respect. In other words, either they all use the actual time of the occurrence, or they all use the same algorithm to determine the value used. Optional, defaults to current time. |
| Header | ce-partitionkey | string | A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional. |

**Response:** 202 Accepted – returned when the event persisted successfully for all authorized consumers.

### Endpoint: POST /ce/produce/event

**Description:** Produce a single event according to CloudEvents standard, meaning the request body must be a valid JSON object. The standard HTTP Content-Type header must be set to `application/cloudevents+json`.

**Request Parameters:**

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Body | specversion | string* | The version of the CloudEvents specification which the event uses. This enables the interpretation of the context. This must always be set to "1.0". |
| Body | source | uri* | Identifies the context in which an event happened. This MUST be set to the value (or one of the values) allowed in Producer configuration.<br><br>Producers MUST ensure that source + id is unique for each distinct event. |
| Body | id | string* | Identifies the event.<br><br>Producers MUST ensure that source + id is unique for each distinct event. |
| Body | type | string* | Contains a value describing the type of event related to the originating occurrence. This attribute is used for authorization, routing, observability, etc. |
| Body | datacontenttype | string | Content type of data value. This attribute enables data to carry any type of content, whereby format and encoding might differ from that of the chosen event format. Optional, defaults to application/json. Currently only JSON data is supported by MConnect Events for this endpoint. |
| Body | subject | string | This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure. Optional. |
| Body | time | date-time | Timestamp of when the occurrence happened. Cannot be set to a future time. Formatted according to RFC 3339. If the time of the occurrence cannot be determined then this attribute MAY be set to some other time (such as the current time) by the CloudEvents producer, however all producers for the same source MUST be consistent in this respect. In other words, either they all use the actual time of the occurrence, or they all use the same algorithm to determine the value used. Optional, defaults to current time. |
| Body | partitionkey | string | A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional. |
| Body | data | JSON* | The payload of the event in JSON format. |

**Response:** 202 Accepted – returned when the event(s) persisted successfully for all authorized consumers.

### Endpoint: POST /ce/produce/events

**Description:** Produce a batch of events according to CloudEvents standard, meaning the request body must be a valid JSON array of JSON objects. The standard HTTP Content-Type header must be set to `application/cloudevents-batch+json`.

Each element of the array has the structure described in the previous endpoint.

This is the recommended way to produce events if you implement the outbox pattern (which is also recommended), in which case you accumulate of list of events to be produced anyway.

MConnect Events persists either all events to one or more destination consumers or none, in a transactional manner. This means that it is safe for a Producer to retry producing the batch of events on errors.

## Consumer APIs using WebSocket

There are two protocols for event consumption. WebSocket is the recommended one for efficiency and performance reasons.

The WebSocket endpoint is accessible via the standard HTTP 1.1 Protocol upgrade mechanism and the standard HTTP 2 CONNECT method using the following endpoints:

| Environment | Full Endpoint URL |
|-------------|-------------------|
| Staging | wss://mconnect-events.staging.egov.md:8443/ce/consume/ws |
| Production | wss://mconnect-events.gov.md:8443/ce/consume/ws |

The WebSocket sub-protocol to be used is:
```
cloudevents.json
```

The established WebSocket connection is a simultaneous two-way communication channel. The protocol is quite simple.

### Messages sent to Consumer

MConnect Events is streaming the events to be consumed to the client as separate messages in JSON format, looking like the following.

**First Sample Message:**
```json
{
  "specversion": "1.0",
  "source": "urn:source",
  "id": "sample-id-1001",
  "type": "Organization.Event.Occurred",
  "time": "2025...",
  "offset": "1",
  "data": { event-payload-inline-json }
}
```

**Second Sample Message:**
```json
{
  "specversion": "1.0",
  "source": "urn:source",
  "id": "sample-id-1002",
  "type": "Organization.Event.Occurred",
  "time": "2025...",
  "offset": "2",
  "data": { event-payload-inline-json }
}
```

And so on.

The meaning of the properties is the following:

| Property | Type | Description |
|----------|------|-------------|
| specversion | string* | The version of the CloudEvents specification which the event uses, currently always returned as "1.0". |
| source | uri* | Identifies the context in which an event happened.<br><br>Producers MUST ensure that source + id is unique for each distinct event. |
| id | string* | Identifies the event.<br><br>Producers MUST ensure that source + id is unique for each distinct event. |
| type | string* | Contains a value describing the type of event related to the originating occurrence. |
| subject | string | This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure. Optional. |
| time | date-time* | Timestamp of when the event happened or when the event was produced. Formatted according to RFC 3339. |
| partitionkey | string | A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional. |
| offset | string* | Event offset for current consumer instance. Used for explicit confirmations. |
| data | JSON* | The payload of the event in JSON format. |

### Messages sent to MConnect Events

The client streams back consumption confirmations or dead events.

A confirmation looks like the following:
```
confirm:<<offset>>
```

meaning "confirm:" prefix followed by offset, where offset is string (an always increasing integer formatted as string) found from the incoming event. This results in all events up to the specified offset acknowledged as consumed.

Reporting a dead event looks like the following:
```
dead:{ "specversion": "1.0", "source": "urn:source", "id": "sample-id-1002", "type": "Organization.Event.Occurred", "time": "2025…", "offset": "2", "data": { event-payload-inline-json } }
```

meaning "dead:" prefix followed by the dead event JSON, which the consumer might modify if required for later special handling of dead events.

Any other message prefix will result in MConnect Events closing the WebSocket connection.

## Consumer APIs using long polling

There are two protocols for event consumption. WebSocket is the recommended one. However, if you use a framework that doesn't include a WebSocket client (which is highly doubtful) or if you just want to try event consumption using Swagger UI (or some local HTTP client tool), MConnect Events also implements the well-known long polling protocol.

Long polling requires creating a consumer, polling for events to consume (including sending consumption confirmations) and deleting consumers before closing. Consumers that are not actively polling for events are deleted automatically after some expiration time.

### Endpoint: POST /ce/consumers

**Description:** Creates a stateful consumer instance on one of the bridges that can be used to consume events in a long polling manner. It is normal for this endpoint to take some time (usually up to 30 seconds), as creating consumers requires some internal coordination.

**Request Parameters:**

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Query | events | boolean | Specifies whether to consume standard events produced by producers. Optional, defaults to true. |
| Query | test | boolean | Specifies whether to consume test events produced by the calling consumer for testing purposes (see Tool APIs). Optional, defaults to true. |
| Query | dead | boolean | Specifies whether to consume dead events produced by the calling consumer. Optional, defaults to false. |
| Query | group | string | Specifies consumer group name. Set by systems that need to consume the events twice in two subcomponents. Do not set this parameter when consuming events in parallel from multiple instances of the same consumer, meaning you don't need to consume the same events multiple times. Optional, defaults to "~default". |

**Response:** 201 Created

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Header | Location | uri* | An absolute URL that is the consumer instance base address for the created consumer instance.<br><br>Currently it has the following form:<br>`https://{mconnect-events-base-address}/{bridge}/ce/consumers/{group}/instances/{instance}`<br><br>having the following path parameters:<br>- bridge – the instance of the bridge that the consumer was created on;<br>- group – the name of group for the created consumer;<br>- instance – consumer instance identifier.<br><br>Note that the form might be changed in the future, so you MUST use it just as the base address for the other calls related to this instance. |

### Endpoint: GET /{bridge}/ce/consumers/{group}/instances/{instance}/raw

**Description:** Consume the next event as raw, if any. Event payload is returned in the HTTP body.

**Request Parameters:**

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Path | bridge | string* | The instance of the bridge that the consumer was created on.<br><br>Part of consumer instance base address. |
| Path | group | string* | The name of the consumer group.<br><br>Part of consumer instance base address. |
| Path | instance | string* | Consumer instance identifier.<br><br>Part of consumer instance base address. |
| Query | confirm | boolean | Specifies whether to confirm previously consumed events. Optional, defaults to false. |

**Response:** 200 OK

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Header | Content-Type | string* | The type of the event payload returned in the body. Can be:<br>- `application/json` – the payload is in JSON format (most used format);<br>- `application/octet-stream` – the payload is binary (only for special cases);<br>- `text/plain` – the payload is plain text (only for special cases). |
| Header | ce-specversion | string* | The version of the CloudEvents specification which the event uses. This enables the interpretation of the context. Always set to "1.0". |
| Header | ce-source | uri* | Identifies the context in which an event happened.<br><br>Producers MUST ensure that source + id is unique for each distinct event. |
| Header | ce-id | string* | Identifies the event.<br><br>Producers MUST ensure that source + id is unique for each distinct event. |
| Header | ce-type | string* | Contains a value describing the type of event related to the originating occurrence. |
| Header | ce-subject | string | This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure. Optional. |
| Header | ce-time | datetime* | Timestamp of when the event happened or when the event was produced. Formatted according to RFC 3339. |
| Header | ce-partitionkey | string | A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional. |
| Header | ce-offset | string* | Event offset for current consumer instance. Used for explicit confirmations. |

**Response:** 204 No Content – returned when there are no events to consume. Returned after poll timeout, during which no producers produced events for the calling consumer.

### Endpoint: GET /{bridge}/ce/consumers/{group}/instances/{instance}/event

**Description:** Consume the next event using CloudEvents JSON format.

**Request Parameters:**

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Path | bridge | string* | The instance of the bridge that the consumer was created on.<br><br>Part of consumer instance base address. |
| Path | group | string* | The name of the consumer group.<br><br>Part of consumer instance base address. |
| Path | instance | string* | Consumer instance identifier.<br><br>Part of consumer instance base address. |
| Query | confirm | boolean | Specifies whether to confirm previously consumed events. Optional, defaults to false. |

**Response:** 200 OK

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Header | Content-Type | string | The type of the HTTP response content: `application/cloudevents+json` |
| Body | specversion | string* | The version of the CloudEvents specification which the event uses, currently always returned as "1.0". |
| Body | source | uri* | Identifies the context in which an event happened.<br><br>Producers MUST ensure that source + id is unique for each distinct event. |
| Body | id | string* | Identifies the event.<br><br>Producers MUST ensure that source + id is unique for each distinct event. |
| Body | type | string* | Contains a value describing the type of event related to the originating occurrence. |
| Body | subject | string | This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure. Optional. |
| Body | time | datetime* | Timestamp of when the event happened or when the event was produced. Formatted according to RFC 3339. |
| Body | partitionkey | string | A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional. |
| Body | offset | string* | Event offset for current consumer instance. Used for explicit confirmations. |
| Body | data | JSON* | The payload of the event in JSON format. |

**Response:** 204 No Content – returned when there are no events to consume. Returned after poll timeout, during which no producers produced events for the calling consumer.

### Endpoint: GET /{bridge}/ce/consumers/{group}/instances/{instance}/events

**Description:** Consume the next batch of events using CloudEvents JSON format. This method collects a batch of events before returning.

**Request Parameters:**

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Path | bridge | string* | The instance of the bridge that the consumer was created on.<br><br>Part of consumer instance base address. |
| Path | group | string* | The name of the consumer group.<br><br>Part of consumer instance base address. |
| Path | instance | string* | Consumer instance identifier.<br><br>Part of consumer instance base address. |
| Query | confirm | boolean | Specifies whether to confirm previously consumed events. Optional, defaults to false. |

**Response:** 200 OK

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Header | Content-Type | string | The type of the HTTP response content: `application/cloudevents-batch+json` |
| Body | N/A | JSON array | Each element of the array has the structure described in the previous endpoint. |

**Response:** 204 No Content – returned when there are no events to consume. Returned after poll timeout, during which no producers produced events for the calling consumer.

### Endpoint: POST /{bridge}/ce/consumers/{group}/instances/{instance}/confirm

**Description:** Confirm the successful consumption of all read events or up to the specified offset.

**Request Parameters:**

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Path | bridge | string* | The instance of the bridge that the consumer was created on.<br><br>Part of consumer instance base address. |
| Path | group | string* | The name of the consumer group.<br><br>Part of consumer instance base address. |
| Path | instance | string* | Consumer instance identifier.<br><br>Part of consumer instance base address. |
| Query | offset | string | Specifies the offset of the last event up to which the consumption of events is confirmed. Optional. When not set, all events read by this consumer instance are confirmed as consumed. |

**Response:** 204 No Content – returned upon successful confirmation.

### Endpoint: POST /{bridge}/ce/consumers/{group}/instances/{instance}/dead

**Description:** Produce a dead event for the calling consumer in raw format.

Set the standard Content-Type header to one of the following:
- `application/json` – the payload is in JSON format (this is most probably the format you intend to use);
- `application/octet-stream` – the payload is binary (only for special cases);
- `text/plain` – the payload is plain text (only for special cases).

**Request Parameters:**

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Path | bridge | string* | The instance of the bridge that the consumer was created on.<br><br>Part of consumer instance base address. |
| Path | group | string* | The name of the consumer group.<br><br>Part of consumer instance base address. |
| Path | instance | string* | Consumer instance identifier.<br><br>Part of consumer instance base address. |
| Header | ce-specversion | string* | The version of the CloudEvents specification which the event uses. This enables the interpretation of the context. This MUST always be set to "1.0". |
| Header | ce-source | uri* | Identifies the context in which an event happened. |
| Header | ce-id | string* | Identifies the event. |
| Header | ce-type | string* | Contains a value describing the type of event related to the originating occurrence. |
| Header | ce-subject | string | This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure. Optional. |
| Header | ce-time | date-time | Timestamp of when the occurrence happened. Formatted according to RFC 3339. Optional, defaults to current time. |
| Header | ce-partitionkey | string | A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional. |

**Response:** 202 Accepted – returned when the dead event persisted successfully.

### Endpoint: DELETE /{bridge}/ce/consumers/{group}/instances/{instance}

**Description:** Delete (i.e. close) consumer instance. Shall be called before the consumer is shut down. Calling this explicitly ensures efficient resources usage and faster reconnection of consumer.

**Request Parameters:**

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Path | bridge | string* | The instance of the bridge that the consumer was created on.<br><br>Part of consumer instance base address. |
| Path | group | string* | The name of the consumer group.<br><br>Part of consumer instance base address. |
| Path | instance | string* | Consumer instance identifier.<br><br>Part of consumer instance base address. |

**Response:** 204 No Content – returned upon successful deletion of consumer instance.

## Tool APIs

Tool APIs are intended for human users (meaning developers) for additional information and testing. Do not call them from your systems.

### Endpoint: GET /ce/tools/my-settings

**Description:** Returns the settings configured for the calling client.

**Response:** 200 OK

| Location | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Body | N/A | JSON* | Settings configured for the calling client, according to the internal format that might be changed at any time without prior notice. This is useful for developers to review the configuration for reference and to spot any potential issues. |

### Endpoint: POST /ce/tools/consumer/test

**Description:** Enables Consumer developers to produce a test event. Note that, in the case of first call to this endpoint, it is normal for the consumer that is already connected using WebSocket to consume test events after some time (up to 30 minutes), as consumer settings are cached.

The structure of the request, response and behavior is similar produce raw event endpoint (see above: POST /ce/produce/raw).
