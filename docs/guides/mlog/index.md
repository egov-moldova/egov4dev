MLog is a service the main scope of which is to facilitate the registration of legal events received from various official sources and allow an easy access to the history of these events.

This document describes the technical interfaces exposed by MLog for information systems that will use MLog as a legal events registrar. Its target audience is the development teams for those information systems.

The document contains all of the relevant information required for a complete understanding of MLog from the integration point of view. It contains integrations development details, security considerations and an API reference.

This document is also accompanied by Java samples that exemplify the main interaction scenario.

## At a glance

**What it is.** The government logging service: the centralised register in which information systems record significant events — who accessed which data, when, through which operation and with what result. The integrating system no longer develops its own logging functionality nor keeps these records separately. Events may be signed; for certain systems, registering unsigned events may be disallowed. Integration is an obligation for the authorities and institutions holding information systems, at their own expense, while use of the service is free of charge.

**Legal basis.** HG nr. 708 din 28 august 2014 privind serviciul electronic guvernamental de jurnalizare (MLog) — DE CONFIRMAT — pct. 3 sbp. 1) — desemnarea posesorului; pct. 4 — obligația de integrare și gratuitatea utilizării.

Related acts: Legea nr. 133/2011; HG nr. 128/2014 (MCloud); Regulile privind modul de administrare a serviciului MLog.

**Who is accountable.**

| Role | Entity |
|---|---|
| Holder (posesor) | AGE (succesor al Centrului de Guvernare Electronică, desemnat prin HG) |
| Keeper (deținător) | De confirmat — tabelul AGE indică doar calitatea de posesor |
| Technical operator (operator tehnico-tehnologic) | Î.S. „Centrul de telecomunicații speciale”, desemnată prin HG în calitate de operator tehnico-tehnologic — actualmente STISC (de confirmat succesiunea) |

**Roles in an integration.**

• EGA (AGE) — holder/keeper of the platform; signs the integration agreement and registers the integrating system.
• STISC — issues the system certificate required for staging and production; operates the hosting infrastructure.
• Holder of the integrating system — decides the purpose and legal basis of use, the access rights, and is accountable for compliance.
• Development/integration team — implements and tests the technical integration.
• End user — the natural person or legal entity benefiting from the service.

**Access conditions.**

Gratuit, în limitele competențelor prevăzute de lege. Integrarea se realizează din contul mijloacelor proprii ale instituției.

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
