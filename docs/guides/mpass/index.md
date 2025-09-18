# Overview

MPass is the government-wide authentication and identity service for the Republic of Moldova. It provides secure Single Sign-On (SSO) and Single Logout (SLO) across public services and exposes a unified interface to multiple authentication methods (e.g., client certificates, mobile signature, username/password). Integrating systems use the identity information issued by MPass to make authorization decisions within their own sessions.

This guide targets development teams integrating their information systems with MPass. It consolidates the key concepts, protocols, and hands-on steps you need to implement and verify an integration.

## At a glance

- Interaction scenarios: how SSO and SLO flows work in practice — see [Interaction scenarios](interaction-scenarios.md).
- Integration development: how to configure your Service Provider (SP), exchange metadata, and handle callbacks — see [Integration development](integration-development.md).
- API references: endpoints, parameters, and expected responses — see [API references](api-references.md).
- Examples: runnable samples illustrating typical integrations — see [Examples](examples.md).
- Integration libraries: SDKs and helper libraries you can reuse — see [Integration libraries](integration-libraries.md).
- Change log: notable changes and migration notes — see [Change log](change-log.md).

## Quick start for integrators

1. Review the SSO/SLO flows to understand user and system interactions. See [Interaction scenarios](interaction-scenarios.md).
2. Prepare your SP endpoints (Assertion Consumer Service, Single Logout Service) and generate SP metadata. See [Integration development](integration-development.md).
3. Register your SP with MPass and exchange metadata and certificates as required. See [Integration development](integration-development.md).
4. Implement the authentication flow using SAML 2.0 bindings supported by MPass. See [API references](api-references.md).
5. Validate attributes received from MPass and apply your own authorization logic. See [API references](api-references.md).
6. Test end-to-end using the provided examples or your preferred stack. See [Examples](examples.md) and [Integration libraries](integration-libraries.md).

Tip: For terminology used across platforms and services, see the project [Glossary](../../glossary/glossary.md).

##**Scope and target audience**

This document describes the technical interfaces exposed by MPass for information systems that will use MPass as authentication and authorization information provider. Its target audience is the development teams for those information systems.

The details related to various authentication methods, such as using authorized client certificates, mobile signature, username/password, etc. provided by MPass are out of scope of this document.

##**Notations**
This document contains several notation styles; the following details the styles that have a degree of significance beyond the purpose of communicating information:
<br><span class="highlight-text-yellow">Yellow Highlighted Text</span> – Text that is highlighted in yellow irrespective of font attributes (font type, italics, bold, underlined, etc.) means that the text is waiting clarification or verification.
<br><span class="red-bold-text">Red Bold Text</span> – Text that is red in color and bold, defines an important piece of information that must be read.
<br>***Italic Bold Text*** – Text that is bold and italic detail actual information or scripts that need to be executed, created, and copied from or to.
<br>~~Strikethrough Text~~ – Text which is outdated and should be ignored

##**Glossary of terms**

<table>
    <thead>
         <tr>
            <th><strong>Term</strong></th>
            <th><strong>Definition</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>GET</strong></td>
            <td>A standard HTTP request method</td>
        </tr>
        <tr>
            <td><strong>IDNP</strong></td>
            <td>Personal identifier number (unique in Republic of Moldova)</td>
        </tr>
        <tr>
            <td><strong>IDNO</strong></td>
            <td>Organization identifier number (unique in Republic of Moldova)</td>
        </tr>
        <tr>
            <td><strong>POST</strong></td>
            <td>A standard HTTP request method</td>
        </tr>
        <tr>
            <td><strong>SAML</strong></td>
            <td>Secure Assertion Markup Language</td>
        </tr>
        <tr>
            <td><strong>SLO</strong></td>
            <td>Single logout</td>
        </tr>
        <tr>
            <td><strong>SSO</strong></td>
            <td>Single sign-on</td>
        </tr>
    </tbody>
</table>

##**General system capabilities**

MPass is a reusable governmental shared platform-level service the main scope of which is to offer secure authentication using a variety of authentication methods and provide information for further authorization decisions by the integrating systems. MPass enables a secure government-wide single sign-on (SSO) as well as single logout (SLO) for residents of Republic of Moldova, so that they don’t have to remember multiple credentials for different services and not requiring them to visit or register in some other way directly with the service provider.

MPass is used as intermediary between various information systems and various authentication methods. Authentication methods differ significantly from the integration point of view, exposing various APIs that might involve direct user interaction through the browser to enter some additional data and/or access user’s cryptographic device or interact with cryptographic devices that are not directly connected to user’s PC. MPass integrates with these identity and authentication providers, hides the differences and exposes a single unified and secure interface to information systems that require authentication functionality.

Depending on requesting information system, MPass will provide various attributes about the authenticated user identity. These attributes might come from user certificate used for authentication, user’s profile in MPass or external authentic systems. Using the provided identity attribute values, integrating systems can further perform authorization decisions inside their session established for the authenticated identity.

For actual authentication, MPass exposes web pages that guide the user through authentication method, method specific data input, authentication progress and result pages.

##**Service dependencies**
MPass depends on the digital identity providers, so its availability and performance is directly influenced by the availability and performance of the services delivered by the providers.

##**Protocols and standards**

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