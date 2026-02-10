This document describes the standard protocols and formats used by Verifiers to receive presentations of documents from EVO Wallet. Its target audience is the development teams for Verifier information systems.

## Context and Standards

Following the EUDI Wallet regulation and its implementing acts, EVO Wallet implements remote presentation of attributes to wallet-relying parties according to OpenID4VP 1.0, using the mdoc format defined in ISO/IEC 18013-5, via same-device flow to retrieve documents. The mechanism is described in Section 8.3.1 of OpenID4VP 1.0 as “direct_post.jwt” response mode. Actual implementation profile is guided by OpenID4VC HAIP 1.0 with ISO mdoc as credential format.

OpenID4VP is an extension of OAuth 2.0 that enables the Holder (mdoc holder) to present Credential (mdoc) using its Wallet (mdoc app) to a Verifier (mdoc reader) upon request. In this context, the Wallet acts as OAuth 2.0 Authorization Server and the Verifier acts as OAuth 2.0 Client.

## Jump right in

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="integration/" class="quick-link-card">
      <div class="quick-link-icon">🔌</div>
      <h3 class="quick-link-title">Integration</h3>
      <p class="quick-link-description">How to integrate with EVO Wallet</p>
    </a>
    <a href="protocol/" class="quick-link-card">
      <div class="quick-link-icon">🔐</div>
      <h3 class="quick-link-title">Protocol</h3>
      <p class="quick-link-description">OpenID4VP flow and direct_post.jwt details</p>
    </a>
    <a href="examples/" class="quick-link-card">
      <div class="quick-link-icon">🧾</div>
      <h3 class="quick-link-title">Examples</h3>
      <p class="quick-link-description">Full request/response payload samples</p>
    </a>
  </div>
</div>

## Referenced standards

| Standard | Description |
|----------|-------------|
| OpenID4VP 1.0 | OpenID for Verifiable Presentations 1.0 |
| OpenID4VC HAIP 1.0 | OpenID for Verifiable Credentials High Assurance Interoperability Profile 1.0 |
| RFC 6749 | The OAuth 2.0 Authorization Framework |
| RFC 8414 | OAuth 2.0 Authorization Server Metadata |
| RFC 9101 | The OAuth 2.0 Authorization Framework: JWT-Secured Authorization Request (JAR) |
| ISO/IEC 18013-5:2021 | Personal identification — ISO-compliant driving licence Part 5: Mobile driving licence (mDL) application |
| ISO/IEC TS 18013-7:2025 | Personal identification — ISO-compliant driving licence Part 7: Mobile driving licence (mDL) add-on functions |
| RFC 7049 | Concise Binary Object Representation (CBOR) |
| RFC 8152 | CBOR Object Signing and Encryption (COSE) |
| RFC 8610 | Concise Data Definition Language (CDDL): A Notational Convention to Express Concise Binary Object Representation (CBOR) and JSON Data Structures |
| RFC 9360 | CBOR Object Signing and Encryption (COSE): Header Parameters for Carrying and Referencing X.509 Certificates |
| IETF TSL _draft_ | IETF Token Status List - _draft-ietf-oauth-status-list-15_ |
