# Overview

MPass is a government-wide authentication and identity management service in the Republic of Moldova that provides secure Single Sign-On (SSO) and Single Logout (SLO) across public digital services, enabling users to access multiple systems with one set of credentials while offering integrating systems standardized identity data for authorization purposes

## At a glance

**What it is.** The government service that lets a user authenticate once and then reach multiple public systems without a separate account in each. It passes the integrating system a standardised set of identity attributes (IDNP, name, organisational affiliation, declared roles), on which that system decides what rights to grant. MPass does not define access rights inside an integrating system — that remains the responsibility of the system's holder. Authentication can be performed with mobile signature, electronic ID card, cryptographic token or EVOSign.

**Legal basis.** HG nr. 1090/2013 privind serviciul electronic guvernamental de autentificare și control al accesului (MPass) — pct. 3 sbp. 1) — desemnarea posesorului.

Related acts: Legea nr. 467/2003; Legea nr. 91/2014 (semnătura electronică); HG nr. 128/2014 (MCloud).

**Who is accountable.**

| Role | Entity |
|---|---|
| Holder | eGov Moldova |
| Keeper |  |
| Technical operator (operator tehnico-tehnologic) | STISC |

**Roles in an integration.**

- eGov Moldova — holder/keeper of the platform; signs the integration agreement and registers the integrating system.
- STISC — issues the system certificate required for staging and production; operates the hosting infrastructure.
- Holder of the integrating system — decides the purpose and legal basis of use, the access rights, and is accountable for compliance.
- Development/integration team — implements and tests the technical integration.
- End user — the natural person or legal entity benefiting from the service.

**Access conditions.**

Instituții publice: în baza contractului, fără tarif.
Persoane juridice de drept privat și persoane fizice: în baza contractului — 10.800 lei/an per sistem integrat.
Obligatoriu: certificat de sistem emis de STISC, înregistrat în MPass.

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

## Quick start for integrators

1. Before being able to interact with MPass, a Service must be registered accordingly in MPass. To perform such a registration, please generate a self-signed or provide any existing certificate file (in .cer file format) to Service owner";
2. Identify the set of required attributes (including custom attribute names and values) to be returned by MPass during the design phase of the Service and specify them as part of Service registration.
3. Review the SSO/SLO flows to understand user and system interactions.
4. Prepare your SP endpoints (Assertion Consumer Service, Single Logout Service) and generate SP metadata.
5. Register your SP with MPass and exchange metadata and certificates as required.
6. Implement the authentication flow using SAML 2.0 bindings supported by MPass.
7. Validate attributes received from MPass and apply your own authorization logic.
8. Test end-to-end using the provided examples or your preferred stack.

## Glossary

For the complete glossary, please visit the [Glossary page](https://egov-moldova.github.io/egov4dev/glossary/glossary/).

## System capabilities

MPass serves as an intermediary between information systems and diverse authentication methods, unifying access by handling the differences among various identity providers. It securely exposes a single interface for authentication, provides relevant user identity attributes for authorization decisions, and manages the user interaction flow during the authentication process.

## Service dependencies

MPass depends on the digital identity providers, so its availability and performance is directly influenced by the availability and performance of the services delivered by the providers.

## Protocols and standards

MPass is using SAML v2.0 standard protocol and format for authentications. The following table contains a comprehensive list of references to standard specifications.

<table>
    <thead>
         <tr>
            <th><strong>SAML v2 Specification</strong></th>
            <th><strong>Abstract</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>SAML Core</strong></td>
            <td>This specification defines the syntax and semantics for XML-encoded assertions about authentication, attributes, and authorization, and for the protocols that convey this information.
            <br>Read the official documentation of <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf">SAML Core</a></td>
        </tr>
        <tr>
            <td><strong>SAML Bindings</strong></td>
            <td>This specification defines protocol bindings for the use of SAML assertions and request-response messages in communications protocols and frameworks.
            <br>Read the official documentation of <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf">SAML Bindings</a></td>
        </tr>
        <tr>
            <td><strong>SAML Profiles</strong></td>
            <td>This specification defines profiles for the use of SAML assertions and request-response messages in communications protocols and frameworks, as well as profiles for SAML attribute value syntax and naming conventions.
            <br>Read the official documentation of <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf">SAML Profiles</a></td>
        </tr>
        <tr>
            <td><strong>SAML Authn Context</strong></td>
            <td>This specification defines a syntax for the definition of authentication context declarations and an initial list of authentication context classes for use with SAML.
            <br>Read the official documentation of <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-authn-context-2.0-os.pdf">SAML Authn Context</a></td>
        </tr>
        <tr>
            <td><strong>SAML Metadata</strong></td>
            <td>This specification defines profiles for the dynamic exchange of SAML metadata among system entities regarding identifiers, binding support and endpoints, certificates and keys, and so forth.
            <br>Read the official documentation of <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf">SAML Metadata</a></td>
        </tr>
        <tr>
            <td><strong>SAML Security Considerations</strong></td>
            <td>This non-normative specification describes and analyzes the security and privacy properties of SAML.
            <br>Read the official documentation of <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-sec-consider-2.0-os.pdf">SAML Security Considerations</a></td>
        </tr>
        <tr>
            <td><strong>SAML 2.0 Errata</strong></td>
            <td>This document lists approved errata to the SAML V2.0 OASIS Standard.
            <br>Read the official documentation of <a href="https://docs.oasis-open.org/security/saml/v2.0/sstc-saml-approved-errata-2.0.pdf">SAML Security Considerations</a></td>
        </tr>
    </tbody>
</table>
