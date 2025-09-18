# MPass – API references

This page describes the public interfaces exposed by MPass for Service Providers (SP) integrating via SAML 2.0. It focuses on concrete endpoints, supported bindings, mandatory/optional parameters, and validation rules. For implementation guidance and end-to-end testing, see Integration development and Integration tests.

- Integration development: [guides/mpass/integration-development.md](integration-development.md)
- Integration tests: [guides/mpass/integration-tests.md](integration-tests.md)

## Environments and endpoints

MPass exposes distinct testing and production environments. Use testing for all development and verification.

Tip: The table has been inverted to render better on narrow screens.

### Testing

| Item | Value |
|---|---|
| SSO URL | https://mpass.staging.egov.md/login/saml |
| SLO URL | https://mpass.staging.egov.md/logout/saml |
| Metadata index | https://mpass.staging.egov.md/meta |
| SAML metadata | https://mpass.staging.egov.md/meta/saml |

### Production

| Item | Value |
|---|---|
| SSO URL | https://mpass.gov.md/login/saml |
| SLO URL | https://mpass.gov.md/logout/saml |
| Metadata index | https://mpass.gov.md/meta |
| SAML metadata | https://mpass.gov.md/meta/saml |

Notes:
- The metadata index page contains links to the IdP signing certificate(s). Pin and rotate per environment.
- Never use localhost ACS/SLS in production.

## EntityIDs and profiles

- Protocol: SAML 2.0 (Core, Bindings, Profiles)
- Profiles: Web Browser SSO Profile; Single Logout Profile
- Bindings supported by IdP:
  - AuthnRequest: HTTP-Redirect and HTTP-POST
  - Response/Assertion: HTTP-POST to your ACS
  - LogoutRequest/LogoutResponse: HTTP-Redirect and HTTP-POST
- NameID formats accepted/returned:
  - Transient or Persistent, as configured
  - The logical NameIdentifier should be treated as SAML Subject NameID (see Integration development → Returned attributes)

## Service Provider (SP) requirements

- Register your SP in MPass (testing and production separately) and provide:
  - EntityID (URI string)
  - Assertion Consumer Service (ACS) endpoint(s)
  - Single Logout Service (SLS) endpoint(s) if SLO is used
  - Supported bindings and certificates (for signing, if applicable)
- Trust configuration: import the MPass IdP signing certificate(s) from environment-specific metadata.

## Authentication flow (AuthnRequest)

Send an AuthnRequest to the SSO URL using HTTP-Redirect or HTTP-POST.

Required fields
- ID: unique per request (used for correlation)
- Version: 2.0
- IssueInstant: current UTC timestamp
- Issuer: your SP EntityID
- Destination: MPass SSO URL for the selected environment
- AssertionConsumerServiceURL: your ACS URL (must match registration/metadata)
- ProtocolBinding: usually urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST
- NameIDPolicy: per integration (Transient/Persistent)

Optional/common fields:
- ForceAuthn: true to force fresh auth at IdP
- IsPassive: true to allow only SSO without user interaction
- RequestedAuthnContext: if you need a particular assurance level/method (as supported by policy)
- Extensions: integration-specific hints (only if agreed)

Signing:
- If your SP signs AuthnRequest, include a Signature per SAML XMLSig rules. HTTP-Redirect binding uses query param signature per spec.

Response handling at ACS:
- Expect an HTTP-POST containing SAMLResponse (base64-encoded). Optionally RelayState if you supplied it.
- Validate: XML signature(s), certificate trust (must chain to MPass IdP certs from metadata), Destination, Audience, Issuer, InResponseTo, Conditions (NotBefore/NotOnOrAfter), and replay prevention for IDs.
- On success: extract Subject NameID and attributes; establish local session.

## Logout (SLO)

Endpoints: use the SLO URL from the environment table.

Initiating SP-initiated logout:
- Send LogoutRequest (Redirect or POST). Include:
  - ID, Version, IssueInstant
  - Issuer (your EntityID)
  - NameID matching the authenticated session’s subject
  - SessionIndex from prior Assertion (if provided)
  - Destination: SLO URL
- Sign the request when your profile requires it.

Handling IdP-initiated logout:
- Your SLS endpoint must accept LogoutRequest/LogoutResponse (Redirect or POST)
- Validate signatures, Destination, Issuer, InResponseTo (for responses), and correlate session by NameID/SessionIndex

## Attributes returned

MPass returns a configurable set of user identity attributes in the Assertion. See the full list and descriptions here: [Returned attributes](integration-development.md#returned-attributes).

Key attributes commonly used:
- NameID (Subject)
- FirstName, LastName
- IDNP/IDNO and CompanyName (when present)
- EmailAddress, MobilePhone
- Roles/permissions (if custom attributes are configured)

## Security and validation rules

Your SP MUST enforce at least the following checks:
- Validate XML signatures on Response and/or Assertion as required by your library/profile
- Validate certificate trust against MPass metadata; reject unexpected issuers or key material
- Validate Destination equals your ACS (scheme/host/path)
- Validate Audience includes your SP EntityID
- Validate Issuer equals the MPass IdP EntityID from metadata
- Correlate InResponseTo with an outstanding request; enforce one-time use for IDs
- Enforce NotBefore/NotOnOrAfter with minimal clock skew tolerance
- Protect against replay (cache IDs, short-lived cookies, CSRF protections)

Related hands-on scenarios: see [Integration tests](integration-tests.md#security-scenarios).

## Error and status mapping

When authentication fails, the IdP returns a Response with a SAML Status:
- Success: urn:oasis:names:tc:SAML:2.0:status:Success
- Requester/Responder: general request/processing errors
- AuthnFailed: user/auth method failed
- NoAuthnContext: requirements not met (e.g., too strong requested)
- NoPassive: passive auth not possible
- PartialLogout: partial success during SLO

Recommended handling:
- Map SAML Status to user-friendly messages; avoid exposing raw protocol details
- Log with correlation IDs; do not persist PII or full assertions in logs

## Sample values and snippets

For full, language-specific examples, see [Examples](examples.md) and [Integration libraries](integration-libraries.md).

Minimal HTTP-Redirect example (parameter names):
- GET to SSO URL with SAMLRequest=<deflated+base64 XML> and optional RelayState
- If signed: Signature and SigAlg per SAML HTTP-Redirect binding

## References

- SAML v2.0 Core, Bindings, Profiles (see links in [Overview](index.md#protocols-and-standards))
- MPass metadata (per environment) lists exact EntityID, certificates, endpoints
