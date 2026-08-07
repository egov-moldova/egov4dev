Logging in government systems is not debugging output — it is a **system of record** used for audit and traceability, incident investigation, security analysis, and operational observability. Logs must describe facts about what happened in the system, not how the code works.

Two distinct logging obligations apply to systems in the ecosystem, and they must not be confused:

| Kind | Where | Purpose |
| --- | --- | --- |
| **Legal event logging** | [MLog](../guides/mlog/index.md) | Registration of legally significant events — mandatory for all systems processing personal data and critical government information, per Government Decision no. 708/2014. Records who accessed or changed what, with legal evidentiary value. |
| **Technical logging** | Centralized log platform (Elasticsearch-based) | Operational telemetry for running, monitoring, and debugging the system. |

An action can require both: a citizen record update produces an MLog legal event *and* technical log entries. Registering an event in MLog never replaces the technical log, and vice versa.

* * *

## Structured logging

All services emit **structured logs** through `ILogger<T>` with a structured provider — never `Console.WriteLine`, never string-concatenated messages. Every entry carries at minimum:

```json
{
  "timestamp": "2026-08-07T14:30:00.000Z",
  "level": "Information",
  "service": "certificate-service",
  "correlationId": "00-4bf92f3577b34da6...",
  "message": "Certificate issued",
  "environment": "production"
}
```

**Correlation identifiers are propagated end-to-end** — from the incoming request, through internal calls, to calls into the shared platforms and messages published to MConnect Events — so one identifier reconstructs a whole flow across systems. The same identifier is returned to API consumers in [error responses](api-design-guide.md#errors) as `traceId`.

## The actor model: who did what

Every meaningful business log entry answers: **who** did **what**, on **which object**, in relation to **which subject**. These are independent, structured dimensions — not prose to bury inside the message text:

| Field | Meaning | Required |
| --- | --- | --- |
| `user` | The **actor** — authenticated operator, or `system` for background jobs | Always, for business actions |
| `subject` | The **person** the action concerns — citizen, employee, beneficiary | When a person is involved |
| `object` | The **record** — declaration, document, application, payment | When a record is involved |
| `legalEntity` | The **organization** context of the action | When acting in an organizational context |

The fields are orthogonal and never substitute for each other — a person is never an `object`, a document is never a `subject`:

| Scenario | user | subject | object |
| --- | --- | --- | --- |
| Operator logs in | ✅ | – | – |
| Operator edits a citizen's application | ✅ | ✅ | ✅ |
| Operator views a document | ✅ | – | ✅ |
| Nightly synchronization job | `system` | – | job name |

* * *

## What to log

1. **Business events — always**: create/update/delete, status transitions, submissions, approvals and rejections, signatures, imports and exports.
2. **Security-relevant actions**: login/logout, failed authentication, access denied, permission and role changes.
3. **Errors that affect outcomes**: failed operations, possible data consistency impact, retries and fallbacks — with the exception, the affected object/subject, and the high-level reason.
4. **Integration boundaries**: calls to the shared platforms and external APIs, message publishing and consumption, payment initiation and results — log **intent and result, not payloads**.
5. **Background jobs**: start, end, processed counts, failures.

## What not to log

- **Personal and sensitive data** — no IDNP, names, addresses, tokens, passwords, or card numbers in technical logs. Log your own record identifiers instead; the identifier lets an investigator find the data in the system of record, which is exactly the right level of indirection.
- **Raw SQL and ORM diagnostics** — no generated queries, parameters, or change-tracker output in production. Log the intent ("loading declaration by number"), not the mechanics. In EF Core, keep `EnableSensitiveDataLogging` and `EnableDetailedErrors` off in production.
- **Payload dumps** — no serialized DTOs, request/response bodies, or JSON blobs. Prefer identifiers, counts, and state summaries.
- **Repetitive noise** — no logging inside tight loops, per-row saves, or cache hits; noisy logs are how real signals get missed.
- The same error, multiple times, at multiple layers — log it where it is handled.

## Levels

| Level | Use |
| --- | --- |
| `Critical` | The service cannot continue or data is at risk |
| `Error` | An operation failed |
| `Warning` | Unexpected but handled — degraded dependencies, retries, suspicious input |
| `Information` | Business events and important state changes — this is the production narrative |
| `Debug` | Developer intent and diagnostics — development environments only |

Production ships `Information` and above to the central store. Avoid `Information` inside unbounded loops; if a level below `Information` is needed in production to diagnose an incident, it is enabled temporarily and deliberately, not left on.

* * *

## Monitoring and retention

- Technical logs are centralized (Elasticsearch + Kibana) with alerting on error-rate anomalies; services also expose health and metrics endpoints consumed by the monitoring stack (Prometheus + Grafana) — see [Tools and technologies](../tools/technologies.md).
- Log structure is a contract: dashboards, alerts, and audits depend on it, so field names stay stable and changes are reviewed like API changes.
- Retention periods follow the applicable regulatory framework: MLog retention for legal events is governed by its regulation; technical log retention is defined per system in agreement with the Agency's operational requirements.

## Checklist before you commit

1. Who performed the action? → `user`
2. Is a person involved? → `subject`
3. Is a record involved? → `object`
4. Would this entry help an auditor or an incident responder?
5. Does it leak personal data, secrets, or payloads? → remove them

If an entry helps nobody and leaks something — it is not a log line, it is a liability.
