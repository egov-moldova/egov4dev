# Overview

MPass is the government-wide authentication and identity service for the Republic of Moldova. It provides secure Single Sign-On (SSO) and Single Logout (SLO) across public services and exposes a unified interface to multiple authentication methods (e.g., client certificates, mobile signature, username/password). Integrating systems use the identity information issued by MPass to make authorization decisions within their own sessions.

MPass is a reusable governmental shared platform-level service the main scope of which is to offer secure authentication using a variety of authentication methods and provide information for further authorization decisions by the integrating systems. MPass enables a secure government-wide single sign-on (SSO) as well as single logout (SLO) for residents of Republic of Moldova, so that they don’t have to remember multiple credentials for different services and not requiring them to visit or register in some other way directly with the service provider.

This guide targets development teams integrating their information systems with MPass. It consolidates the key concepts, protocols, and hands-on steps you need to implement and verify an integration.

## Quick start for integrators

1. Review the SSO/SLO flows to understand user and system interactions.
2. Prepare your SP endpoints (Assertion Consumer Service, Single Logout Service) and generate SP metadata.
3. Register your SP with MPass and exchange metadata and certificates as required.
4. Implement the authentication flow using SAML 2.0 bindings supported by MPass.
5. Validate attributes received from MPass and apply your own authorization logic.
6. Test end-to-end using the provided examples or your preferred stack.

## Glossary

For the complete glossary, please visit the [Glossary page](https://egov-moldova.github.io/egov4dev/glossary/glossary/).

## System capabilities

MPass is used as intermediary between various information systems and various authentication methods. Authentication methods differ significantly from the integration point of view, exposing various APIs that might involve direct user interaction through the browser to enter some additional data and/or access user’s cryptographic device or interact with cryptographic devices that are not directly connected to user’s PC. MPass integrates with these identity and authentication providers, hides the differences and exposes a single unified and secure interface to information systems that require authentication functionality.

Depending on requesting information system, MPass will provide various attributes about the authenticated user identity. These attributes might come from user certificate used for authentication, user’s profile in MPass or external authentic systems. Using the provided identity attribute values, integrating systems can further perform authorization decisions inside their session established for the authenticated identity.

For actual authentication, MPass exposes web pages that guide the user through authentication method, method specific data input, authentication progress and result pages.

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
