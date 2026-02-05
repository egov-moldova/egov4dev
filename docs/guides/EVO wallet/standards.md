This integration is aligned with the European Digital Identity Wallet (EUDI Wallet) ecosystem and uses the following standards and profiles.

## Core standards

### OpenID for Verifiable Presentations (OpenID4VP)
The wallet interaction is based on OpenID4VP, where the Relying Party (RP) issues an authorization request and the wallet returns a verifiable presentation response.

### OAuth 2.0 Authorization Request
The RP constructs an OAuth2/OIDC-style authorization request, exposed via `request_uri` and referenced through a wallet deep link.

### Response Mode: `direct_post.jwt`
The wallet returns the response directly to the RP backend using `direct_post.jwt`, where the response is:
- delivered via HTTP POST
- encrypted as a JWE

### HAIP profile
The flow follows HAIP constraints (wallet interoperability profile), including strict usage of signed requests and response encryption.

## Credential format standards

### ISO/IEC 18013-5 (mdoc)
All credential data is returned as an ISO 18013-5 **mdoc** structure.

Key aspects:
- issuer authenticity is proven through issuer-signed MSO structures
- device binding is proven through DeviceAuth
- the payload is CBOR encoded

### CBOR
The mdoc is encoded in CBOR (Concise Binary Object Representation).

### CDDL
The guide includes CDDL definitions to describe the exact CBOR structures expected in the response.

## Referenced standards (list)

- OpenID4VP
- OAuth 2.0 / OIDC Authorization Request
- Response Mode: `direct_post.jwt`
- HAIP profile constraints
- ISO/IEC 18013-5
- CBOR
- CDDL

## Notes for implementers

- The protocol is not a generic OIDC login. It is a VP request/response flow.
- Your RP backend must support:
  - signed authorization requests (JWS)
  - encrypted authorization responses (JWE)
  - ISO 18013-5 mdoc parsing and validation
- Correct validation is mandatory; parsing the payload without validation is insufficient for production use.
