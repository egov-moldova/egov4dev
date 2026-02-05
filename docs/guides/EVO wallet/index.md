## Goal

This guide explains how to integrate a **Relying Party (RP)** with the **EVO Wallet** in order to request and receive **ISO 18013-5 mdoc** credentials via an OpenID4VP-based flow.

The integration is intended for teams implementing:
- backend endpoints
- signed requests (JWS)
- encrypted responses (JWE)
- ISO mdoc parsing and validation

## What you will implement (RP deliverables)

To integrate, the RP must implement:

1. **Authorization Request generation (JWS)**
   - create a signed authorization request
   - host it behind a `request_uri`

2. **Request hosting endpoint**
   - an endpoint that returns the signed request by URL (`request_uri`)

3. **Wallet invocation**
   - construct a deep link / URL scheme that opens EVO Wallet with required parameters

4. **Response receiver endpoint**
   - an HTTPS endpoint that receives the wallet response via `direct_post.jwt`

5. **Decryption + validation**
   - decrypt JWE
   - parse ISO 18013-5 mdoc
   - validate issuer authentication + device authentication

## High-level flow

1. RP creates an Authorization Request (signed JWS).
2. RP publishes it via `request_uri`.
3. RP triggers EVO Wallet using a URL scheme that includes:
   - `client_id`
   - `request_uri`
   - `request_uri_method=post`
4. Wallet fetches the request and prompts the user.
5. Wallet returns an Authorization Response as JWE to the RP backend using `direct_post.jwt`.
6. RP decrypts, validates, and consumes the mdoc payload.

## Supported credential types

The wallet supports requesting the following document types:

- `md.gov.wallet.pid.1` — Moldovan PID
- `md.gov.wallet.dl.1` — Moldovan Driving License
- `md.gov.wallet.vrc.1` — Moldovan Vehicle Registration Certificate
- `eu.europa.ec.eudi.pid.1` — European PID
- `org.iso.18013.5.1.mDL` — ISO mDL

## Main standards used

This integration is based on:

- OpenID for Verifiable Presentations (OpenID4VP)
- OAuth 2.0 / OIDC Authorization Request
- Response mode: `direct_post.jwt`
- HAIP profile constraints
- ISO/IEC 18013-5 (mdoc format)
- CBOR and CDDL for data structures

## Security model (practical view)

- The RP request is **signed** (JWS) so the wallet can verify the RP identity.
- The wallet response is **encrypted** (JWE) and sent directly to the RP backend.
- The response contains:
  - ISO 18013-5 mdoc (CBOR)
  - issuer authenticity proofs (MSO)
  - device binding proofs (DeviceAuth)

The RP must treat the response as valid only after:
- JWE decryption succeeds
- issuer signature + certificate chain checks succeed
- device authentication checks succeed
- the response structure is consistent with ISO 18013-5

## Key terms used in this documentation

- RP — Relying Party
- Wallet — EVO Wallet application
- OIDC — OpenID Connect
- OpenID4VP — OpenID for Verifiable Presentations
- mdoc — ISO 18013-5 mobile document
- JWS — JSON Web Signature (signed request)
- JWE — JSON Web Encryption (encrypted response)
- CBOR — Concise Binary Object Representation
- CDDL — CBOR Data Definition Language

## Recommended reading order

1. Standards & Profile
2. Integration Process
3. Protocol (device engagement, request, response, errors)
4. Document Types
5. Format (mdoc / CBOR / CDDL)
6. Response Validation
7. Examples
8. Testing
