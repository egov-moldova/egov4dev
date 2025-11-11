## Scope and target audience

This document describes the technical interfaces exposed by MNotify for Senders' information systems that will use MNotify for notification purposes

This guide is addressed to developers interested in integrating various systems with the MNotify API to send notifications via (emails, SMS, web push, Telegram, citizen portal, etc.) using the government electronic notification service.

## Document structure

This document contains the relevant information required for a complete understanding of MNotify from the integration point of view. It includes samples of integration scenarios for different technologies.

## General system capabilities

MNotify is a government electronic notification service designed to send notifications to recipients through different notification channels, to inform about events related to public services, or other relevant notices.

Currently, MNotify supports e-mail, web push notifications, Viber, Telegram and MCabinet as a delivery channel. IDNP property is required when specifying a notification identity.

Note! Channels under development: sms, WhatsApp.

In addition, MNotify provides the following extended capabilities:

Contact management – The system offers tools to add new user contacts and list existing ones. It also allows setting a preferred language for the user. Furthermore, MNotify can verify whether a user exists in the system and whether they have at least one active channel, excluding the personal cabinet.

Notification history access – MNotify provides tools to retrieve the list of notifications sent by the sender's information system. It also supports extracting the list of notifications delivered to a specific user based on their IDNP.

Template management (CRUD operations) – The system supports create, read, update, and delete operations for notification templates. This offloads complexity from the integrated system and ensures lower latency when sending notification calls. Templates support attributes that allow insertion of dynamic values depending on the recipient user.

## Service dependencies

MNotify depends on the following services:
- MPass – for client authorization.
- IDR – for recipient resolution.
- Notification channels – for transmitting messages to recipients.

## Protocols and standards

MNotify exposes a RESTful service over HTTPS, ensuring secure and standards-based communication. Each HTTP request must include a valid client certificate for authentication and authorization.

Client certificate validation is performed through the government authentication and authorization service MPass. It is mandatory that the information system is registered in MPass and that the public key of the client certificate is added to its configuration.

Error reporting is handled through standard HTTP status codes (e.g., 400 Bad Request, 401 Unauthorized, 500 Internal Server Error) along with structured JSON error messages that provide additional diagnostic details.

## Communication format

MNotify uses a generic JSON format for the specification of notification identities, i.e. recipients.

```json
"recipients": [
 {
 "value": "2222222222222",
 "type": "Idnp"
 }
 ]
```

```json
"recipients": [
 {
 "value": "artur.reaboi@egov.md",
 "type": "email"
 }
 ]
```
