MPass is a reusable governmental shared platform-level service the main scope of which is to offer secure authentication using a variety of authentication methods and provide information for further authorization decisions by the integrating systems. MPass enables a secure government-wide single sign-on (SSO) as well as single logout (SLO) for residents of Republic of Moldova, so that they don’t have to remember multiple credentials for different services and not requiring them to visit or register in some other way directly with the service provider.

This document describes the technical interfaces exposed by MPass for information systems that will use MPass as authentication and authorization information provider. Its target audience is the development teams for those information systems.

The document contains the relevant information required for a complete understanding of MPass from the integration point of view. It contains integration-related technical details, security considerations, as well as describing the process of testing integration security.

This document is also accompanied by a .NET sample that exemplify the main interaction scenarios, i.e. performing SSO and SLO.

### Scope and target audience

This document describes the technical interfaces exposed by MPass for information systems that will use MPass as authentication and authorization information provider. Its target audience is the development teams for those information systems.

The details related to various authentication methods, such as using authorized client certificates, mobile signature, username/password, etc. provided by MPass are out of scope of this document.
