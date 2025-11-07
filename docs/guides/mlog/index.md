MLog is a service the main scope of which is to facilitate the registration of legal events received from various official sources and allow an easy access to the history of these events.

This document describes the technical interfaces exposed by MLog for information systems that will use MLog as a legal events registrar. Its target audience is the development teams for those information systems.

The document contains all of the relevant information required for a complete understanding of MLog from the integration point of view. It contains integrations development details, security considerations and an API reference.

This document is also accompanied by Java samples that exemplify the main interaction scenario.

## Scope and target audience

This document describes the technical interfaces exposed by MLog for information systems that will use MLog as a registrar for legal or important events. Its target audience is the development teams for those information systems.

The details related to deciding what events are important for an information system are out of scope of this document.

## Structure of this guide

This guide contains the relevant information required for a complete understanding of MLog from the integration point of view. It is also accompanied by samples that exemplify some integration scenarios using certain technologies.

The recommended reading sequence are the following chapters:
- System context
- Interaction scenarios
- Integration development
- Security considerations

The remaining chapters are for reference purpose.

## General system capabilities

MLog is a reusable and shared platform-level service the main scope of which is to be a registrar of events and allow for their later querying and analysis. Note that complex analysis capabilities are only available to MLog administrators, while simple querying for events is available to all clients for events they previously logged.

Events logged into MLog can be signed and for certain systems unsigned events might not be allowed for registration.

By default, MLog exposes a simple querying interface for events logged by client systems themselves, either by returned registered ID or by a time range.

## Protocols and standards

MLog exposes HTTP REST interface and uses JOSE protocol for signing JSON objects.
