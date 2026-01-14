# Overview

MPass is a government-wide authentication and identity management service in the Republic of Moldova that provides secure Single Sign-On (SSO) and Single Logout (SLO) across public digital services, enabling users to access multiple systems with one set of credentials while offering integrating systems standardized identity data for authorization purposes

## Jump right in

<div style="margin: 2rem 0;">
   <div style="display: flex; gap: 0.5rem;">
     <a href="process/" style="display: block; flex: 1 1 0; min-width: 0; padding: 1rem; background: #f6f6f6; border-radius: 8px; text-decoration: none; color: inherit;">
      <div style="font-size: 1.5rem; margin-bottom: 0.2rem;">⚡</div>
      <h3 style="font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">Connection steps</h3>
      <p style="color: #6b7280; margin: 0;">Get started with integration</p>
    </a>
     <a href="integration-development/" style="display: block; flex: 1 1 0; min-width: 0; padding: 1rem; background: #f6f6f6; border-radius: 8px; text-decoration: none; color: inherit;">
      <div style="font-size: 1.5rem; margin-bottom: 0.2rem;">📘</div>
      <h3 style="font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">Integration guide</h3>
      <p style="color: #6b7280; margin: 0;">Step-by-step documentation</p>
    </a>
     <a href="api-references/" style="display: block; flex: 1 1 0; min-width: 0; padding: 1rem; background: #f6f6f6; border-radius: 8px; text-decoration: none; color: inherit;">
      <div style="font-size: 1.5rem; margin-bottom: 0.2rem;">🌐</div>
      <h3 style="font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">API reference</h3>
      <p style="color: #6b7280; margin: 0;">Explore endpoints and callbacks</p>
    </a>
  </div>
</div>


## Quick start for integrators

1. Before being able to interact with MPass, a Service must be registered accordingly in MPass. To perform such a registration, please generate a self-signed or provide any existing certificate file (in .cer file format) to Service owner”;
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
