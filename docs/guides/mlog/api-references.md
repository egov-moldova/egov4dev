## API Reference

### Error handling rules

For errors resulting from REST interface invocations, MLog returns HTTP faults with fault codes and fault reasons describing the fault in plain English.

Clients using programming languages that support try...catch blocks should handle service invocation errors using HTTP error responses.
### Predefined event fields

#### HTTP fault codes

| Fault Code | Description |
| --- | --- |
| 400 Bad Request | The input request is not a valid JSON. Any other error which cannot be bypassed – please note the detailed explanation in the response. |
| 401 Unauthorized | Triggered if the input event cannot be identified to be part of any IS. |
| 404 Not Found | The URL you have reached is not in service at this time (404). No data found for provided parameters. |
| 413 Payload Too Large | The maximum allowed message size is exceeded. Current limit for the whole message size is 256 KB. |
| 500 Internal Server Error | Error triggered by a defective work of the MLog system. Please contact MLog administrators in case you receive such an error. |

#### Predefined fields

| Field | Type | Mandatory | Description |
| --- | --- | :---: | --- |
| event_time | datetime | Y | The moment when the event happened at the source system (not the logging time). |
| event_type | string | Y | The type of the event according to IS definition (e.g., Created, Authenticated, Deleted). |
| event_id | string | N | Internal identifier or correlation ID unique in the logger system. |
| event_correlation | string | N | Identifier used to correlate events logged by different systems in a context (usually a user action). |
| event_level | string | N | Event classifier (e.g., high/medium/low or warning/critical/fatal). |
| event_source | string | N | Where the event was generated (class name, IS sub-component, server name, etc.). |
| event_message | string | N | Free text describing the event; indexed for full‑text search. |
| event_details | string | N | Event details such as stack traces or excerpts; not indexed. |
| legal_entity | string | N | The organization on whose behalf the action was performed (usually the organization’s IDNO). |
| legal_basis | string | N | Legal basis for the action. |
| legal_reason | string | N | Reason why the event was created (e.g., application number, called phone number). |
| user | string | N | The user involved (usually the user’s IDNP). |
| user_session | string | N | Session identifier in which the action happened; helps separate steps of a flow. |
| user_address | string | N | User’s IP/location or other origin identifier. |
| subject | string | N | Identifier of the thing/person impacted by this event (usually an IDNP). Different from object. |
| subject_type | string | N | Type of the subject. |
| subject_name | string | N | Name of the subject. |
| object | string | N | Identifier of the thing/person toward which the action is directed. |
| object_type | string | N | Type of the object. |
| object_name | string | N | Name of the object. |

Note on event_type naming: use the pattern System.X.Y (for example, MPass.User.Authenticated).

Date and time format for event_time: use the following syntax (square brackets denote optional parts):

YYYY-MM-dd[THH:mm:ss[.SSS][Z|±HH[mm]]]

Where: yyyy – year; MM – month (01–12); dd – day (01–31); HH – hour (00–23); mm – minutes (00–59); ss – seconds (00–59); SSS – milliseconds (000–999); ±HH[mm] – optional time zone offset (minutes optional).

Constraints and notes:

- Mandatory fields: event_time, event_type.
- Any field may have multiple values; use JSON arrays in that case.
- Custom fields are allowed and will be registered as strings. Names starting with “_” or “@” are reserved.
- All strings have a maximum length of 32,766 bytes (32 KB – 2 bytes). Because limits are in bytes, UTF‑8 strings may allow fewer characters (worst case ~8,191 chars).
- Nested objects can be logged; they become complex objects queryable by field names. Test this in staging for side effects. If a JSON object must be stored as STRING in the backend, agree a special schema with MLog administrators.

### Special events

MLog defines a subset of event types common to all information systems (IS) to identify events that require special processing. These events are projected into special indices and can later be accessed by other institutions/systems.

MLog usually identifies special events by analyzing the event_type field. Currently the only defined special category covers personal data access. When event_type contains "PersonalData" MLog will consider the event as a personal data event. By convention, use the following format:

YourSystemPrefix.PersonalData.Action

Recommended Action values:

| Action | Description |
| --- | --- |
| Access | Electronic access of personal data. |
| Export | Export or printing of personal data, not just access. |
| Validate | Validation where the request contains personal data and the response confirms correctness. |
| Search | Inexact search of personal data; the result might include multiple persons/entities. |
| Transfer | Transfer or synchronization of personal data to another system for later processing. |

Required fields for PersonalData events:

- event_time
- event_type (use the convention above)
- event_correlation
- legal_entity — the legal entity accessing the personal data
- legal_basis — legal basis for access
- legal_reason — legal reason for access
- user — IDNP of the user who accessed personal data
- user_address — user’s address (usually IP address)
- subject — personal data subject IDNP
- subject_type — subject type (usually Person)
- subject_name — subject name
- object — object related to the subject that is accessed (e.g., car number)
- object_type — type of the accessed object (e.g., CarNumber)
### Allowed parameters for search operations

MLog accepts the following input parameters for search operations.

#### Search by UID

| Field | Type | Mandatory | Description |
| --- | --- | :---: | --- |
| legal_entity | string | N | Legal entity performing the search. By default, this is the MLog client owner. |
| legal_basis | string | N | Legal basis for the search. |
| legal_reason | string | N | Legal reason for the search. |
| user | string | N | IDNP of the user who searches for events. |
| user_address | string | N | User address (usually IP address). |

#### Search by time range

| Field | Type | Mandatory | Description |
| --- | --- | :---: | --- |
| legal_entity | string | N | Legal entity performing the search. By default, this is the MLog client owner. |
| legal_basis | string | Y | Legal basis for the search. |
| legal_reason | string | N | Legal reason for the search. |
| user | string | N | IDNP of the user who searches for events. |
| user_address | string | N | User address (usually IP address). |
| event_time_from | datetime | Y | Start time for the period to search (inclusive). |
| event_time_to | datetime | Y | End time for the period to search (exclusive). |
| filter | string (comma-separated) | N | Comma-separated key=value pairs for known fields to filter, e.g., field1=value1,field2=value2. |
| page | number (>= 0) | N | Page number to return; default is 0 (first page). |
| page_size | number (> 0) | N | Page size; default is 50. |

Notes:

- event_time_from and event_time_to accept the same format as the event_time field.
- Maximum number of returned events is constrained such that page * page_size <= 10,000.
