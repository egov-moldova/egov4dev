This guide describes how to integrate a **Relying Party (RP)** with the **EVO Wallet** for requesting and receiving verifiable digital credentials in the form of **ISO 18013-5 mdoc**.

The integration is based on:
- OpenID for Verifiable Presentations (OpenID4VP)
- OAuth 2.0 Authorization Request
- Direct Post (JWT) response mode
- HAIP profile constraints
- ISO 18013-5 for document format and validation

## What this integration enables

After integration, your system (RP) will be able to:
- Request specific credential types (PID, DL, VRC, EU PID, ISO mDL)
- Define requested claims (data elements)
- Receive the user’s response as an encrypted payload
- Validate authenticity and integrity of the returned mdoc

## Actors

- User — the holder of the wallet and credentials
- EVO Wallet — mobile wallet application
- Relying Party (RP) — your service, which requests data
- RP Backend — endpoint that receives the direct post response and performs validation

## High-level flow

1. The RP generates an Authorization Request (signed).
2. The RP exposes it via a `request_uri`.
3. The RP triggers the wallet using a URL scheme.
4. The wallet fetches the request and prompts the user.
5. The wallet sends an encrypted Authorization Response directly to the RP backend (`direct_post.jwt`).
6. The RP decrypts, validates and processes the returned mdoc.

## Credential types supported

The wallet supports the following document types:

- `md.gov.wallet.pid.1` — Moldovan PID
- `md.gov.wallet.dl.1` — Moldovan Driving License
- `md.gov.wallet.vrc.1` — Moldovan Vehicle Registration Certificate
- `eu.europa.ec.eudi.pid.1` — European PID
- `org.iso.18013.5.1.mDL` — ISO mDL

## Security model (short)

- The request is signed by the RP.
- The response is encrypted and sent directly to the RP backend.
- The response contains:
  - an mdoc payload (CBOR structure)
  - device binding and issuer authenticity proofs
- The RP must validate:
  - issuer signature and certificate chain
  - device authentication
  - integrity of the returned structure

## Notations used in this documentation

- RP — Relying Party
- WALLET — EVO Wallet application
- OIDC — OpenID Connect
- VP — Verifiable Presentation
- mdoc — ISO 18013-5 mobile document
- JWS — JSON Web Signature
- JWE — JSON Web Encryption
- CBOR — Concise Binary Object Representation
- CDDL — CBOR Data Definition Language

## Recommended reading order

1. Standards & Profile
2. Integration Process
3. Protocol
4. Document Types
5. Format (mdoc / CBOR / CDDL)
6. Response Validation
7. Examples
8. Testing
