#API Reference

##**Error handling rules**

MConnect Events REST APIs can return the following status codes in case of errors:

<table>
  <thead>
    <tr>
      <th>HTTP Status Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>400 Bad Request</strong></td>
      <td>Returned when something is wrong with your request. For example, the request does not include the client certificate or an intermediary, some header is missing, the format is not a valid JSON, etc.
      <br>For more details, review the content of the response.</td>
    </tr>
    <tr>
      <td><strong>401 Unauthorized</strong></td>
      <td>Returned on any authorization error. Either the system is not registered as producer or consumer, has wrong authorization configuration, does not have the rights to publish events of the provided event type, or cannot use the indicated source, etc.<br>For more details, review the content of the response.</td>
    </tr>
    <tr>
      <td><strong>404 Not Found </strong></td>
      <td>The request URL wrong or consumer instance is not found (expired or not on the provided bridge).
      <br>For more details, review the content of the response.</td>
    </tr>
    <tr>
      <td><strong>413 Content Too Large</strong></td>
      <td>Returned when the entire HTTP request is larger than specified in Limits.</td>
    </tr>
    <tr>
      <td><strong>422 Unprocessable Entity</strong></td>
      <td>Returned when the event payload is not valid against the configured event schema.
      <br>For more details, review the content of the response.</td>
    </tr>
    <tr>
      <td><strong>500 Internal Server Error</strong></td>
      <td>Unexpected error. Contact the service owner and report the error.</td>
    </tr>
  </tbody>
</table>

!!! note "Succes HTTP status codes"

    On success, the returned status code is 200, 201, 202 or 204.

##**Producer APIs**

Producers can produce events using one of the following APIs.

<colspan class="red-bold-text">Important!</colspan> For production scenarios, is recommended to produce events in batches, using the last
endpoint. See also Limits.

###**Produce event in raw form**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">POST /ce/produce/raw</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Produce a single event in raw form in the body of HTTP request.
      <br>Set the standard Content-Type header to one of the following:
      <ul>
        <li>application/json – the payload is in JSON format (this is most probably the format you intend to use);</li>
        <li>application/octet-stream – the payload is binary (only for special cases);</li>
        <li>text/plain – the payload is plain text (only for special cases);</li>
      </ul></td>
    </tr>
    <tr>
      <td colspan="4"><strong>Request Parameters</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-specversion</td>
      <td>string*</td>
      <td>The version of the CloudEvents specification which the event uses. This enables the interpretation of the context. This MUST always be set to ”1.0”.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-source</td>
      <td>uri*</td>
      <td>Identifies the context in which an event happened. This MUST be set to the value (or one of the values) allowed in Producer configuration.
      <br>Producers MUST ensure that source + id is unique for each distinct event.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-id</td>
      <td>string*</td>
      <td>Identifies the event.
      <br>Producers MUST ensure that source + id is unique for each distinct event.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-type</td>
      <td>string*</td>
      <td>Contains a value describing the type of event related to the originating occurrence. This attribute is used for authorization, routing, observability, etc.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-subject</td>
      <td>string*</td>
      <td>This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure. Optional.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-time</td>
      <td>date-time</td>
      <td>Timestamp of when the occurrence happened. Cannot be set to a future time. Formatted according to RFC 3339. If the time of the occurrence cannot be determined then this attribute MAY be set to some other time (such as the current time) by the CloudEvents producer, however all producers for the same source MUST be consistent in this respect. In other words, either they all use the actual time of the occurrence, or they all use the same algorithm to determine the value used. Optional, defaults to current time.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-partitionkey</td>
      <td>string</td>
      <td>A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional.</td>
    </tr>
    <tr>
      <td colspan="4">Response: 202 Accepted – returned when the event persisted successfully for all authorized consumers.</td>
    </tr>
  </tbody>
</table>


###**Produce event (CloudEvents standard)**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">POST /ce/produce/event</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Produce a single event according to CloudEvents standard, meaning the request body must be a valid JSON object. The standard <strong>HTTP Content-Type</strong> header must be set to <strong>application/cloudevents+json</strong>.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Request Parameters</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Body</td>
      <td>specversion</td>
      <td>string*</td>
      <td>The version of the CloudEvents specification which the event uses. This enables the interpretation of the context. This must always be set to ”1.0”.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>source</td>
      <td>uri*</td>
      <td>Identifies the context in which an event happened. This MUST be set to the value (or one of the values) allowed in Producer configuration.
      <br>Producers MUST ensure that source + id is unique for each distinct event.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>id</td>
      <td>string*</td>
      <td>Identifies the event.
      <br>Producers MUST ensure that source + id is unique for each distinct event.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>type</td>
      <td>string*</td>
      <td>Contains a value describing the type of event related to the originating occurrence. This attribute is used for authorization, routing, observability, etc.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>datacontenttype</td>
      <td>string</td>
      <td>Content type of data value. This attribute enables data to carry any type of content, whereby format and encoding might differ from that of the chosen event format. Optional, defaults to <strong>application/json</strong>.
      <br>Currently only JSON data is supported by MConnect Events for this endpoint.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>subject</td>
      <td>string</td>
      <td>This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure. Optional.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>time</td>
      <td>date-time</td>
      <td>Timestamp of when the occurrence happened. Cannot be set to a future time. Formatted according to RFC 3339. If the time of the occurrence cannot be determined then this attribute MAY be set to some other time (such as the current time) by the CloudEvents producer, however all producers for the same source MUST be consistent in this respect. In other words, either they all use the actual time of the occurrence, or they all use the same algorithm to determine the value used. Optional, defaults to current time.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>partitionkey</td>
      <td>string</td>
      <td>A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>data</td>
      <td>JSON*</td>
      <td>The payload of the event in JSON format.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 202 Accepted</strong> – returned when the event(s) persisted successfully for all authorized consumers.</td>
    </tr>
  </tbody>
</table>

###**Produce a batch of events (CloudEvents standard)**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">POST /ce/produce/events</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Produce a batch of events according to CloudEvents standard, meaning the request body must be a valid JSON array of JSON objects. The standard <strong>HTTP Content-Type</strong> header must be set to <strong>application/cloudevents-batch+json</strong>.
      <br>
      <br>Each element of the array has the structure described in the previous endpoint.
      <br><strong>This is the recommended way to produce events</strong> if you implement the outbox pattern (which is also recommended), in which case you accumulate of list of events to be produced anyway.
      <br>
      <br>MConnect Events persists either all events to one or more destination consumers or none, in a transactional manner. This means that it is safe for a Producer to retry producing the batch of events on errors.
      </td>
    </tr>
  </tbody>
</table>

##**Consumer APIs using WebSocket**

There are two protocols for event consumption. WebSocket is the recommended one for efficiency and performance reasons.

The WebSocket endpoint is accessible via the standard HTTP 1.1 Protocol upgrade mechanism and the standard HTTP 2 CONNECT method.

The WebSocket sub-protocol to be used is:
<br>**cloudevents.json**

The established WebSocket connection is a simultaneous two-way communication channel. The protocol is quite simple.

###**Messages sent to Consumer**

MConnect Events is streaming the events to be consumed to the client as separate messages in JSON format, looking like the following.


=== "Message_1"

    ```json
    {
      "specversion": "1.0",
      "source": "urn:source",
      "id": "sample-id-1001",
      "type": "Organization.Event.Occurred",
      "time": "2025...",
      "offset": "1",
      "data": { json-object-defined-as-current-type }
    }
    ```

=== "Message_2"

    ```json
    {
      "specversion": "1.0",
      "source": "urn:source",
      "id": "sample-id-1002",
      "type": "Organization.Event.Occurred",
      "time": "2025...",
      "offset": "2",
      "data": { json-object-defined-as-current-type }
    }
    ```
=== "Message_N"

    ```json
    {
      "specversion": "1.0",
      "source": "urn:source",
      "id": "sample-id-N",
      "type": "Organization.Event.Occurred",
      "time": "2025...",
      "offset": "N",
      "data": { json-object-defined-as-current-type }
    }
    ```
The meaning of the properties is the following:

<table>
  <thead>
    <tr>
      <th><strong>Property</strong></th>
      <th><strong>Type</strong></th>
      <th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>specversion</td>
      <td>string*</td>
      <td>The version of the CloudEvents specification which the event uses, currently always returned as ”1.0”.</td>
    </tr>
    <tr>
      <td>source</td>
      <td>uri*</td>
      <td>Identifies the context in which an event happened.
      <br>Producers MUST ensure that source + id is unique for each distinct event.</td>
    </tr>
    <tr>
      <td>id</td>
      <td>string*</td>
      <td>Identifies the event.
      <br>Producers MUST ensure that source + id is unique for each distinct event.</td>
    </tr>
    <tr>
      <td>type</td>
      <td>string*</td>
      <td>Contains a value describing the type of event related to the originating occurrence.</td>
    </tr>
    <tr>
      <td>subject</td>
      <td>string</td>
      <td>This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure. Optional.</td>
    </tr>
    <tr>
      <td>time</td>
      <td>date-time*</td>
      <td>Timestamp of when the event happened or when the event was produced. Formatted according to RFC 3339.</td>
    </tr>
    <tr>
      <td>partitionkey</td>
      <td>string</td>
      <td>A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional.</td>
    </tr>
    <tr>
      <td>offset</td>
      <td>string*</td>
      <td>Event offset for current consumer instance. Used for explicit confirmations.</td>
    </tr>
    <tr>
      <td>data</td>
      <td>JSON*</td>
      <td>The payload of the event in JSON format.</td>
    </tr>


  </tbody>
</table>

###**Messages sent to MConnect Events**

The client streams back consumption confirmations or dead events.
=== "consumption confirmation"
```txt
confirm:<<offset>>
```
=== "report dead event"
```json
{
    "specversion": "1.0",
    "source": "urn:source",
    "id": "sample-id-1002",
    "type": "Organization.Event.Occurred",
    "time": "2025...",
    "offset": "2",
    "data": { json-object-defined-as-current-type }
}
```


* **consumption confirmation** - meaning “confirm:” prefix followed by offset, where offset is string (an always increasing integer formatted as string) found from the incoming event. This results in all events up to the specified offset acknowledged as consumed.
* **report dead event** - meaning “dead:” prefix followed by the dead event JSON, which the consumer might modify if required for later special handling of dead events.

Any other message prefix will result in MConnect Events closing the WebSocket connection.

##**Consumer APIs using long polling**

There are two protocols for event consumption. WebSocket is the recommended one. However, if you use a framework that doesn’t include a WebSocket client (which is highly doubtful) or if you just want to try event consumption using Swagger UI (or some local HTTP client tool), MConnect Events also implements the well-known long polling protocol.

Long polling requires creating a consumer, polling for events to consume (including sending consumption confirmations) and deleting consumers before closing. Consumers that are not actively polling for events are deleted automatically after some expiration time.

###**Creates a stateful consumer instance**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">POST /ce/consumers</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3"> Creates a stateful consumer instance on one of the bridges that can be used to consume events in a long polling manner. It is normal for this endpoint to take some time (usually up to 30 seconds), as creating consumers requires some internal coordination.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Request Parameters</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Query</td>
      <td>events</td>
      <td>boolean</td>
      <td>Specifies whether to consume standard events produced by producers. Optional, defaults to true.</td>
    </tr>
    <tr>
      <td>Query</td>
      <td>test</td>
      <td>boolean</td>
      <td>Specifies whether to consume test events produced by the calling consumer for testing purposes (see Tool APIs). Optional, defaults to true.</td>
    </tr>
    <tr>
      <td>Query</td>
      <td>dead</td>
      <td>boolean</td>
      <td>Specifies whether to consume dead events produced by the calling consumer. Optional, defaults to false.</td>
    </tr>
    <tr>
      <td>Query</td>
      <td>group</td>
      <td>string</td>
      <td>Specifies consumer group name. Set by systems that need to consume the events twice in two subcomponents. Do not set this parameter when consuming events in parallel from multiple instances of the same consumer, meaning you don’t need to consume the same events multiple times. Optional, defaults to "~default".</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 201 Created</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Header</td>
      <td>Location</td>
      <td>uri*</td>
      <td>An absolute URL that is the <span class="red-bold-text">consumer instance base address</span> for the created consumer instance.
      <br>Currently it has the following form: https://{mconnect-events-baseaddress}/{bridge}/ce/consumers/{group}/instances/{instance}
      <br>having the following path parameters:
      <br><i>bridge</i> – the instance of the bridge that the consumer was created on;
      <br><i>group</i> – the name of group for the created consumer;
      <br><i>instance</i> – consumer instance identifier.
      <br>
      <br>Note that the form might be changed in the future, so you MUST use it just as the base address for the other calls related to this instance.</td>
    </tr>
  </tbody>
</table>

###**Consume the next event (raw)**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">GET /{bridge}/ce/consumers/{group}/instances/{instance}/raw</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Consume the next event as raw, if any. Event payload is returned in the HTTP body.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Request Parameters</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Path</td>
      <td>bridge</td>
      <td>string*</td>
      <td>The instance of the bridge that the consumer was created on.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>group</td>
      <td>string*</td>
      <td>The name of the consumer group.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>instance</td>
      <td>string*</td>
      <td>Consumer instance identifier.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Query</td>
      <td>confirm</td>
      <td>boolean</td>
      <td>Specifies whether to confirm previously consumed events. Optional, defaults to false.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 200 OK</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Header</td>
      <td>Content-Type</td>
      <td>string*</td>
      <td>The type of the event payload returned in the body. Can be:
      <br>
      <ul>
        <li><i>application/json</i> – the payload is in JSON format (most used format);</li>
        <li><i>application/octet-stream</i> – the payload is binary (only for special cases);</li>
        <li><i>text/plain</i> – the payload is plain text (only for special cases);</li>
      </ul></td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-specversion</td>
      <td>string*</td>
      <td>The version of the CloudEvents specification which the event uses. This enables the interpretation of the context. Always set to “1.0”.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-source</td>
      <td>uri*</td>
      <td>Identifies the context in which an event happened.
      <br>Producers MUST ensure that source + id is unique for each distinct event.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-id</td>
      <td>string*</td>
      <td>Identifies the event.
      <br> Producers MUST ensure that source + id is unique for each distinct event.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-type </td>
      <td>string*</td>
      <td>Contains a value describing the type of event related to the originating occurrence.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-subject</td>
      <td>string</td>
      <td>This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure.  Optional.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-time </td>
      <td>datetime*</td>
      <td>Timestamp of when the event happened or when the event was produced. Formatted according to RFC 3339.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-partitionkey</td>
      <td>string</td>
      <td>A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-offset</td>
      <td>string*</td>
      <td>Event offset for current consumer instance. Used for explicit confirmations.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 204 No Content</strong> – returned when there are no events to consume. Returned after poll timeout, during which no producers produced events for the calling consumer.</td>
    </tr>
  </tbody>
</table>

###**Consume the next event (CloudEvents standard)**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">GET /{bridge}/ce/consumers/{group}/instances/{instance}/event</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Consume the next event using CloudEvents JSON format.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Request Parameters</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Path</td>
      <td>bridge</td>
      <td>string*</td>
      <td>The instance of the bridge that the consumer was created on.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>group</td>
      <td>string*</td>
      <td>The name of the consumer group.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>instance</td>
      <td>string*</td>
      <td>Consumer instance identifier.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Query</td>
      <td>confirm</td>
      <td>boolean</td>
      <td>Specifies whether to confirm previously consumed events. Optional, defaults to false.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 200 OK</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Header</td>
      <td>Content-Type</td>
      <td>string*</td>
      <td>The type of the HTTP response content: <i>application/cloudevents+json</i></td>
    </tr>
    <tr>
      <td>Body</td>
      <td>specversion</td>
      <td>string*</td>
      <td>The version of the CloudEvents specification which the event uses, currently always returned as ”1.0”.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>source</td>
      <td>uri*</td>
      <td>Identifies the context in which an event happened.
      <br>Producers MUST ensure that source + id is unique for each distinct event.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>id</td>
      <td>string*</td>
      <td>Identifies the event.
      <br>Producers MUST ensure that source + id is unique for each distinct event.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>type </td>
      <td>string*</td>
      <td>Contains a value describing the type of event related to the originating occurrence.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>subject</td>
      <td>string</td>
      <td>This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure. Optional.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>time </td>
      <td>datetime*</td>
      <td>Timestamp of when the event happened or when the event was produced. Formatted according to RFC 3339.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>partitionkey</td>
      <td>string</td>
      <td>A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>offset</td>
      <td>string*</td>
      <td>Event offset for current consumer instance. Used for explicit confirmations.</td>
    </tr>
    <tr>
      <td>Body</td>
      <td>data</td>
      <td>JSON*</td>
      <td>The payload of the event in JSON format.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 204 No Content</strong> – returned when there are no events to consume. Returned after poll timeout, during which no producers produced events for the calling consumer.</td>
    </tr>
  </tbody>
</table>

###**Consume the next batch (CloudEvents standard)**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">GET /{bridge}/ce/consumers/{group}/instances/{instance}/events</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Consume the next batch of events using CloudEvents JSON format. This method collects a batch of events before returning.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Request Parameters</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Path</td>
      <td>bridge</td>
      <td>string*</td>
      <td>The instance of the bridge that the consumer was created on.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>group</td>
      <td>string*</td>
      <td>The name of the consumer group.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>instance</td>
      <td>string*</td>
      <td>Consumer instance identifier.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Query</td>
      <td>confirm</td>
      <td>boolean</td>
      <td>Specifies whether to confirm previously consumed events. Optional, defaults to false.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 200 OK</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Header</td>
      <td>Content-Type</td>
      <td>string*</td>
      <td>The type of the HTTP response content: <i>application/cloudevents+json</i></td>
    </tr>
    <tr>
      <td>Body</td>
      <td>N/A</td>
      <td>JSON array</td>
      <td>Each element of the array has the structure described in the previous endpoint.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 204 No Content</strong> – returned when there are no events to consume. Returned after poll timeout, during which no producers produced events for the calling consumer.</td>
    </tr>
  </tbody>
</table>

###**Confirm consumption**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">POST /{bridge}/ce/consumers/{group}/instances/{instance}/confirm</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Confirm the successful consumption of all read events or up to the specified offset.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Request Parameters</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Path</td>
      <td>bridge</td>
      <td>string*</td>
      <td>The instance of the bridge that the consumer was created on.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>group</td>
      <td>string*</td>
      <td>The name of the consumer group.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>instance</td>
      <td>string*</td>
      <td>Consumer instance identifier.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Query</td>
      <td>offset</td>
      <td>string</td>
      <td>Specifies the offset of the last event up to which the consumption of events is confirmed. Optional. When not set, all events read by this consumer instance are confirmed as consumed.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 204 No Content</strong> – returned upon successful confirmation.</td>
    </tr>
  </tbody>
</table>

###**Produce a dead event**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">POST /{bridge}/ce/consumers/{group}/instances/{instance}/dead</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Produce a dead event for the calling consumer in raw format.
      <br>Set the standard Content-Type header to one of the following:
      <br>
      <ul>
        <li><i>application/json</i> – the payload is in JSON format (this is most probably the format you intend to use);</li>
        <li><i>application/octet-stream</i> – the payload is binary (only for special cases);</li>
        <li><i>text/plain</i> – the payload is plain text (only for special cases);</li>
      </ul></td>
    </tr>
    <tr>
      <td colspan="4"><strong>Request Parameters</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Path</td>
      <td>bridge</td>
      <td>string*</td>
      <td>The instance of the bridge that the consumer was created on.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>group</td>
      <td>string*</td>
      <td>The name of the consumer group.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>instance</td>
      <td>string*</td>
      <td>Consumer instance identifier.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-specversion</td>
      <td>string*</td>
      <td>The version of the CloudEvents specification which the event uses. This enables the interpretation of the context. Always set to “1.0”.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-source</td>
      <td>uri*</td>
      <td>Identifies the context in which an event happened.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-id</td>
      <td>string*</td>
      <td>Identifies the event.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-type </td>
      <td>string*</td>
      <td>Contains a value describing the type of event related to the originating occurrence.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-subject</td>
      <td>string</td>
      <td>This describes the subject of the event in the context of the event producer (identified by source). A consumer will typically consume events emitted by a source, but the source identifier alone might not be sufficient as a qualifier for any specific event if the source context has an internal sub-structure.  Optional.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-time </td>
      <td>datetime</td>
      <td>Timestamp of when the event happened or when the event was produced. Formatted according to RFC 3339.</td>
    </tr>
    <tr>
      <td>Header</td>
      <td>ce-partitionkey</td>
      <td>string</td>
      <td>A partition key for the event, specified to ensure consumption ordering between multiple events for the same partitionkey. Optional.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 202 Accepted</strong> – returned when the dead event persisted successfully.</td>
    </tr>
  </tbody>
</table>

###**Delete consumer instance**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">DELETE /{bridge}/ce/consumers/{group}/instances/{instance}</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Delete (i.e. close) consumer instance. Shall be called before the consumer is shut down. Calling this explicitly ensures efficient resources usage and faster reconnection of consumer.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Request Parameters</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Path</td>
      <td>bridge</td>
      <td>string*</td>
      <td>The instance of the bridge that the consumer was created on.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>group</td>
      <td>string*</td>
      <td>The name of the consumer group.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td>Path</td>
      <td>instance</td>
      <td>string*</td>
      <td>Consumer instance identifier.
      <br>Part of consumer instance base address.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 204 No Content</strong> – returned upon successful deletion of consumer instance.</td>
    </tr>
  </tbody>
</table>

##**Tool APIs**

!!! danger "Using API tool"

    Tool APIs are intended for human users (meaning developers) for additional information and testing.

    **Do not call them from your systems.**


###**Get calling client settings**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">GET /ce/tools/my-settings</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Returns the settings configured for the calling client.</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Response: 200 OK</strong></td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td><strong>Parameter</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
    <tr>
      <td>Body</td>
      <td>N/A</td>
      <td>JSON*</td>
      <td>Settings configured for the calling client, according to the internal format that might be changed at any time without prior notice. This is useful for developers to review the configuration for reference and to spot any potential issues.</td>
    </tr>
  </tbody>
</table>

###**Produce a test event**

<table>
  <tbody>
    <tr>
      <td><strong>Endpoint</strong></td>
      <td colspan="3">POST /ce/tools/consumer/test</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Enables Consumer developers to produce a test event. Note that, in the case of first call to this endpoint, it is normal for the consumer that is already connected using WebSocket to consume test events after some time (up to 30 minutes), as consumer settings are cached.
      <br>
      <br>The structure of the request, response and behavior is similar produce raw event endpoint (see above: POST /ce/produce/raw).</td>
    </tr>
  </tbody>
</table>