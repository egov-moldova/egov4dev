MLog is the centralized logging and audit service for public sector information systems operated by the Moldovan eGovernance Agency (MEGA).

It enables systems to:

- Send application and security logs in a standardized way
- Search, analyze and correlate events
- Build dashboards and alerts for observability and compliance
- Ensure traceability and auditability of critical operations

Note: This page provides a short overview. For full integration details, see the PDF guide below.

## Getting started

1. Request access and credentials from MEGA support.
2. Configure your application to send logs using the supported protocol (e.g., HTTP/JSON or syslog).
3. Use correlation IDs in your services for end-to-end tracing across MPay, MPass, MSign, MPower, etc.
4. Define retention and access policies according to your organization’s needs.

## Best practices

- Structure logs as JSON with consistent fields (timestamp, level, service, action, user, correlationId, details)
- Do not log secrets (passwords, tokens, private keys)
- Mask personal data where not strictly necessary
- Use INFO for business events, WARN for recoverable issues, ERROR for failures, and DEBUG for diagnostics in non‑production

If you need a more detailed set of examples, reach out to the platform team or consult the PDF guide.

---

## Executive summary

MLog facilitates the registration of legal events received from official sources and provides easy access to their history. This guide describes the technical interfaces exposed by MLog for information systems that use MLog as a legal events registrar. It targets development teams of those systems.

It includes integration development details, security considerations, and an API reference. The guide is accompanied by samples that exemplify the main interaction scenarios.

### Scope and target audience

This document describes the technical interfaces exposed by MLog for information systems that will use MLog as a registrar for legal or important events. Its target audience is the development teams for those information systems. The details related to deciding what events are important for an information system are out of scope of this document.

### Structure of this document

This document contains the relevant information required for a complete understanding of MLog from the integration point of view. It is also accompanied by samples that exemplify some integration scenarios using certain technologies.

The recommended reading sequence is:

- System context
- Interaction scenarios
- Integration development
- Security considerations

The remaining chapters are for reference purpose.

## Organizational context

### Service owner

- Organization: e-Governance Agency of Moldova
- General point of contact: office@egov.md
- Technical point of contact: MLog Support — support.mlog@egov.md

## System context

### General system capabilities

MLog is a reusable and shared platform-level service whose main purpose is to register events and allow for their later querying and analysis. Complex analysis capabilities are available to MLog administrators, while simple querying for events is available to all clients for events they previously logged.

Events logged into MLog can be signed, and for certain systems unsigned events might not be allowed for registration.

By default, MLog exposes a simple querying interface for events logged by client systems themselves, either by returned registered ID or by a time range.

### Protocols and standards

MLog exposes an HTTP REST interface and uses the JOSE family of standards for signing JSON objects.
