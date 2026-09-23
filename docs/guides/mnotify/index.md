MNotify is a government electronic notification service designed to send notifications to recipients through different notification channels, to inform about events related to public services, or other relevant notices.

Currently, MNotify supports e-mail, EVO push notifications (by the end of 2026), Viber, Telegram and MCabinet as a delivery channel. IDNP property is required when specifying a notification identity. 

## At a glance

**What it is.** The government notification service: institutions use it to send official notices to natural persons and legal entities over the channels the recipient has active (e-mail, web push, Viber, Telegram, personal cabinet). The integrating system sends a single request, identifying the recipient by IDNP or another accepted identifier; channel selection and actual delivery are handled by MNotify. The service also offers contact management, template management and access to the history of notifications sent.

**Legal basis.** HG nr. 376/2020 cu privire la serviciul guvernamental de notificări electronice (MNotify) — pct. 3 — desemnarea posesorului și deținătorului.

Related acts: Legea nr. 133/2011 privind protecția datelor cu caracter personal; HG nr. 1090/2013 (MPass).

**Who is accountable.**

| Role | Entity |
|---|---|
| Holder (posesor) | AGE |
| Keeper (deținător) | AGE |
| Technical operator (operator tehnico-tehnologic) | STISC |

**Roles in an integration.**

- EGA (AGE) — holder/keeper of the platform; signs the integration agreement and registers the integrating system.
- STISC — issues the system certificate required for staging and production; operates the hosting infrastructure.
- Holder of the integrating system — decides the purpose and legal basis of use, the access rights, and is accountable for compliance.
- Development/integration team — implements and tests the technical integration.
- End user — the natural person or legal entity benefiting from the service.

**Access conditions.**

Gratuit. Obligatoriu: înregistrarea sistemului în MPass și certificat de client validat prin MPass.

**Who this guide is for.**

Primary: development and integration teams of the holders of information systems, public and private.
Secondary: project managers and compliance officers preparing the agreement with EGA and the STISC certificate.

## Jump right in

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="process/" class="quick-link-card">
      <div class="quick-link-icon">⚡</div>
      <h3 class="quick-link-title">Connection steps</h3>
      <p class="quick-link-description">Get started with integration</p>
    </a>
    <a href="integration-development/" class="quick-link-card">
      <div class="quick-link-icon">📘</div>
      <h3 class="quick-link-title">Integration guide</h3>
      <p class="quick-link-description">Step-by-step documentation</p>
    </a>
  </div>
      <div class="quick-links-container">
    <a href="api-reference/" class="quick-link-card">
      <div class="quick-link-icon">🌐</div>
      <h3 class="quick-link-title">API reference</h3>
      <p class="quick-link-description">Explore endpoints and callbacks</p>
    </a>
    <a href="https://www.nuget.org/profiles/egov-moldova" class="quick-link-card">
      <div class="quick-link-icon">📦</div>
      <h3 class="quick-link-title">NuGet packages</h3>
      <p class="quick-link-description">.NET packages for your application.</p>
    </a>
  </div>
</div>

In addition, MNotify provides the following extended capabilities:

* **Contact management** – The system offers tools to add new user contacts and list existing ones. It also allows setting a preferred language for the user. Furthermore, MNotify can verify whether a user exists in the system and whether they have at least one active channel, excluding the personal cabinet.

* **Notification history access** – MNotify provides tools to retrieve the list of notifications sent by the sender's information system. It also supports extracting the list of notifications delivered to a specific user based on their IDNP.

* **Template management (CRUD operations)** – The system supports create, read, update, and delete operations for notification templates. This offloads complexity from the integrated system and ensures lower latency when sending notification calls. Templates support attributes that allow insertion of dynamic values depending on the recipient user.

## Scope and target audience

This document describes the technical interfaces exposed by MNotify for Senders' information systems that will use MNotify for notification purposes

This guide is addressed to developers interested in integrating various systems with the MNotify API to send notifications via (emails, SMS, web push, Telegram, citizen portal, etc.) using the government electronic notification service.

This document contains the relevant information required for a complete understanding of MNotify from the integration point of view. It includes samples of integration scenarios for different technologies.

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
