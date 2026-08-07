This guide defines how REST APIs should be designed for government information systems in the eGov Moldova ecosystem. Its goal is a consistent consumer experience across APIs built by different institutions and teams: a developer who has integrated one government API should feel at home in the next one.

The guide applies to **new REST APIs** built by or for the eGovernance Agency and public institutions. The shared platforms document their actual contracts in their [integration guides](../platforms/index.md) — some of them (MSign, MPay, MDelivery) expose SOAP interfaces for historical and legal-signature reasons, and those contracts remain authoritative for integrators.

!!! note
    REST is the default API style for new synchronous interfaces. Alternative styles (GraphQL, gRPC) require an explicit architectural justification recorded as an [architecture decision record](adr.md) — a preference is not a justification.

* * *

## Design principles

### Resource-oriented design

Model your API around **resources** (the data) rather than operations. A resource-oriented API exposes a hierarchy of resources manipulated through a small set of standard methods:

- A **collection** contains a list of resources of the same type — `certificates`, `applications`, `payments`.
- A **resource** has state and zero or more sub-resources.

When designing an API, follow this flow:

1. Determine what types of resources the API provides.
2. Determine the relationships between resources.
3. Decide the resource naming scheme based on types and relationships.
4. Decide the resource schemas.
5. Attach a minimum set of methods to resources, preferring the standard methods.

### Once-only and authentic sources

The [once-only principle](../principles/architecture.md#once-only-principle) shapes API design directly:

- Do not ask consumers (or citizens, through them) for data that already exists in an authentic government register — consume it through **MConnect**.
- Your API is the authoritative source for the data your institution has a mandate over. Keep that data accurate and expose it for reuse — [contribute, not just consume](../principles/architecture.md#contribute-not-just-consume).
- Store only the data your system is authoritative for, plus linkable identifiers to data owned by other registers.
- Emit events on significant state changes ([events by default](../principles/architecture.md#events-by-default)) through MConnect Events instead of forcing consumers to poll.

* * *

## Naming conventions

All names used by an API should be **simple**, **intuitive**, and **consistent**.

- All API identifiers — resources, fields, parameters, operations — are written in **English**. Romanian is used only in user-facing display text produced by applications, never in contract names. Use the [glossary](../glossary/glossary.md) when translating Moldovan government domain terms, and extend it when a term is missing.
- Use the same term for the same concept everywhere; avoid name overloading and vague names.

**Bad**

```
Info        // info about what?
Service     // service for what?
Cerere      // Romanian in the contract
```

**Good**

```
OrderStatus          // status of an Order
CertificateRequest   // a request for a certificate
```

### Resources and schemas

- Resource types are **singular nouns** in `PascalCase`: `Certificate`, `PaymentOrder`.
- Field names are `camelCase`: `firstName`, `issuedAt`. Arrays and lists are plural nouns.

### URIs

- Collection segments are the **plural form** of the resource noun: `/certificates`, `/payment-orders`.
- Use **lowercase** letters in paths; use hyphens (`-`) to separate words, never underscores.
- Use `/` to express hierarchy; do not end paths with a trailing slash.
- Query parameters use `camelCase`.
- Never place personal data (IDNP, names, addresses) in URIs or query strings — identifiers of your own resources are fine, personal identifiers of citizens are not. Pass personal data in the request body of an authenticated request.

```
https://my-service.gov.md/api/v1/certificates/1024/attachments/7
                           |  |       |         |       |      |
                           |  |       |         |       |      Resource ID
                           |  |       |         |       Collection ID
                           |  |       |         Resource ID
                           |  |       Collection ID
                           |  Major version
                           API base path
```

* * *

## Standard methods

Prefer the five **standard methods** over custom operations. A typical resource-oriented API exposes many resources with few methods:

| Method | HTTP verb | Operates on | Example |
| --- | --- | --- | --- |
| `LIST` | `GET` | a collection | `GET /api/v1/certificates` |
| `GET` | `GET` | a single resource | `GET /api/v1/certificates/{id}` |
| `CREATE` | `POST` | a collection | `POST /api/v1/certificates` |
| `UPDATE` | `PUT` / `PATCH` | a single resource | `PATCH /api/v1/certificates/{id}` |
| `DELETE` | `DELETE` | a single resource | `DELETE /api/v1/certificates/{id}` |

Use HTTP verbs semantically — `GET` never modifies state, `PUT`/`PATCH` never create side effects beyond the addressed resource, and reads are safe to retry.

### Custom methods

When an action does not map cleanly to a standard method (submit, approve, archive), **nounify the action** and model it as a sub-resource rather than inventing RPC-style endpoints:

```
POST   /api/v1/applications/{id}/submissions     // submit an application
POST   /api/v1/documents/{id}/signatures         // request signing
DELETE /api/v1/messages/{id}/archives            // unarchive a message
```

* * *

## HTTP status codes

Keep the set of status codes an API returns small and predictable:

| Code | Meaning | Typical use |
| --- | --- | --- |
| 200 | OK | Successful `GET`, or successful `PUT`/`PATCH`/`DELETE` returning content |
| 201 | Created | Successful `POST`; the response contains the new resource identifier |
| 204 | No Content | Successful `PUT`/`PATCH`/`DELETE` with nothing to return |
| 400 | Bad Request | Validation failure; details in the error object |
| 401 | Unauthorized | Client failed to authenticate |
| 403 | Forbidden | Authenticated, but not permitted to perform the operation |
| 404 | Not Found | The addressed resource does not exist |
| 409 | Conflict | The request conflicts with current resource state |
| 429 | Too Many Requests | Client exceeded rate limits; the response includes a `Retry-After` header |
| 500 | Server Error | Unexpected failure; details logged server-side, generic message returned |

Rules that prevent the most common integration pain:

- **Never return `200 OK` with an error body.** The status code is the contract.
- An empty collection is a successful `200` with an empty list — not a `404`.
- Deleting an already-deleted resource returns `204`, not `404` — clients rarely care that it was already gone.
- Throttled clients receive `429` with a `Retry-After` header; consumers are expected to implement backoff instead of hammering the endpoint.

* * *

## Errors

Error responses follow **[RFC 7807 — Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)** (`application/problem+json`). Custom error shapes are prohibited in new APIs.

```json
{
  "type": "https://my-service.gov.md/errors/validation",
  "title": "Request validation failed",
  "status": 400,
  "detail": "The field 'idnp' must contain exactly 13 digits.",
  "instance": "/api/v1/certificates",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-00",
  "errors": {
    "idnp": ["The field 'idnp' must contain exactly 13 digits."]
  }
}
```

- `type`, `title`, `status` — machine-readable classification of the problem.
- `detail` — a human-readable explanation oriented to the API consumer. Write it for the integrating developer, not for your own team.
- `traceId` — correlation identifier that lets the provider find the failure in its [logs](log-management.md).
- Never expose internal details in error responses: stack traces, connection strings, SQL, server paths, or framework default messages.

* * *

## Data definitions

| Concern | Standard |
| --- | --- |
| Text encoding | UTF-8 everywhere ([RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)) |
| Date and time | [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) / ISO 8601 strings — `2026-08-07T14:30:00Z`. Store and exchange in UTC (or with an explicit offset); local presentation is the client's concern. Moldova local time is UTC+2 (UTC+3 in summer), so "date without timezone" is a guaranteed bug. |
| Individuals | `idnp` — the 13-digit state identification number of a natural person. Exchange it as a 13-character string, never as a number (leading zeros). |
| Legal entities | `idno` — the 13-digit state identification number of an organization; same string rule. |
| Languages | ISO 639-1 two-letter codes: `ro`, `ru`, `en`. |
| Currency | ISO 4217 codes (`MDL`); amounts as decimal strings or numbers in a separate field from the currency code. |

### Response bodies

Return a JSON **object** (not a bare array) as the top-level structure, so the contract can be extended without breaking clients:

```json
{
  "certificates": [
    { "id": "1001", "status": "Issued" },
    { "id": "1002", "status": "Pending" }
  ],
  "nextCursor": "aWQ6MTAwMw=="
}
```

### Pagination

Support pagination on collections **from the first version** — adding it later is a breaking change. Accept `cursor` and `limit` query parameters (with a sensible default and maximum for `limit`) and return a `nextCursor` field, empty when there are no further results. Cursor-based pagination avoids the duplicated-and-skipped-rows problems of offset paging on changing datasets; `totalCount` may be provided when it is cheap to compute.

* * *

## Versioning

- The **major** version appears in the URI path, prefixed with `v`: `/api/v1/certificates`. Minor and patch versions never appear in URLs.
- Follow [semantic versioning](https://semver.org/) for the service itself; strive to make changes backwards compatible.
- A breaking change — removing or renaming a field, changing semantics — requires a **new major version running alongside the old one**. Never silently break an existing contract.
- When decommissioning an old version, notify all registered consumers with a migration guide and a switch-off date at least **6 months** ahead (unless logs show the version has no remaining callers), and publish release notes with every version bump.

* * *

## Documentation

- Every REST API publishes an **OpenAPI specification generated from code** (in ASP.NET Core, via Swashbuckle) — not written by hand, so the contract cannot drift from the implementation.
- Interactive documentation (Swagger UI) is exposed in **staging** for integrators. In **production**, interactive documentation is disabled by default — it advertises attack surface and internals to anyone who finds it. Enable it in production only for a deliberate, approved need; otherwise distribute the specification file through the documentation channel.
- Document every operation, parameter, and schema property with descriptions; document error `type`s; provide at least one worked example per main scenario.
- Maintain a change log for the API, as the platform [integration guides](../platforms/index.md) do.

* * *

## Security

- **TLS is mandatory** on all endpoints in all environments. System-to-system calls authenticate with **client certificates issued by STISC**, per the [connection procedure](../platforms/procedure.md).
- User-facing authentication and authorization goes through **MPass** — services must not implement their own credential storage.
- Validate all input server-side regardless of client-side validation; use allow-lists over deny-lists.
- Apply authorization on every request at the resource level — object-level authorization failures (IDOR) are among the most common API vulnerabilities.
- Never place secrets, tokens, or personal data in URLs; they end up in access logs and browser history.
- Apply **rate limiting** on all exposed endpoints to protect availability, returning [`429 Too Many Requests`](#http-status-codes) when limits are exceeded.
- Applications processing personal data must register legal events in [MLog](../guides/mlog/index.md) — see [log management](log-management.md).
- The security baseline for applications in the ecosystem is **OWASP ASVS Level 2**; design APIs against it from the start rather than retrofitting.

* * *

## Environments

Provide the same environments the shared platforms provide, with the same URL convention:

| Environment | Purpose |
| --- | --- |
| Development | Internal development and automated checks; synthetic data only. |
| Staging (`*.staging.egov.md`) | Integration environment for API consumers — functionally equivalent to production, with **synthetic or masked data, never real production data**. |
| Production (`*.gov.md`) | Live operation with real data and live authentication. |

Consumers develop and certify their integration against staging before being granted production access.
