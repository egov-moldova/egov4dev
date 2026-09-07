# Authentication provider integration specification

!!! note "Audience"
    This page is for an **authentication provider** (an electronic identification method or solution) integrating *into* MPass. It is separate from the rest of the MPass guide, which covers integrating information systems *with* MPass as consumers.

## 1. Purpose

MPass is the government authentication and access control service of the Republic of Moldova. It lets users sign in to public e-services with a single account (single sign-on) and issues each e-service a signed assertion of the user's identity.

MPass gives public e-services a single authentication point and integrates the various electronic identification methods and solutions offered by providers.

In an MPass integration, the authentication provider (hereinafter the **"Provider"**) works as follows: MPass sends it a one-time challenge, the Provider authenticates the user — for example by having them confirm in the Provider's app and sign the challenge with their qualified key — and returns the user's identity together with the proof. MPass then maps that identity to the user's account and issues the SAML session to the requesting e-service. The SAML exchange with the e-service is entirely MPass's responsibility — the Provider only authenticates the person.

This document covers only the technical integration interface for the authentication of a natural person. The Provider's legal obligations ([section 8](#8-legal-obligations-that-remain-with-the-provider)) are unchanged and are not limited by this document.

## 2. What the Provider does

For each authentication, MPass sends a challenge and, optionally, the user's identifier; the Provider authenticates the user and returns:

| What the Provider returns | Purpose |
|---------------------------|---------|
| **the user's qualified certificate** | MPass reads the national ID number (IDNP) from the certificate to identify the user. |
| **a signature over the challenge** | Proof that the user was present and controls their key, bound to this specific authentication (anti-replay); MPass retains it as evidence. |
| **a status** | Success or failure of the authentication. |

## 3. Identity and certificate requirements (mandatory for integration)

These requirements are set by MPass. Certificate recognition and structure derive from [Law No. 124/2022](https://www.legis.md/cautare/getResults?doc_id=151294&lang=ro) and from the technical regulations approved by the supervisory body (the Information and Security Service of the Republic of Moldova).

1. The user is authenticated on the basis of a **qualified certificate for electronic signature** (Art. 25 of Law No. 124/2022). The assurance level of the electronic identification means — low, substantial or high (Art. 5¹ of Law No. 124/2022) — is set at onboarding.
2. The `serialNumber` attribute of the certificate's Subject Distinguished Name carries the **user's IDNP** (13 digits) — **not the certificate serial number** — per the qualified certificate structure set by the supervisory body (Art. 13(4) of Law No. 124/2022) and the ETSI EN 319 412-1 semantics (usually with a prefix, e.g. `PNOMD-<IDNP>`). This is the value MPass uses to identify the account.
3. The signature is produced over **exactly** the challenge MPass sent for this authentication ([section 6](#6-authentication-and-security)). Signature and digest algorithms are agreed at onboarding (algorithms in force; algorithms considered insecure are not accepted).
4. **CA recognition.** The certificate is issued under a recognised certification authority: the issuing trust service provider must appear on the **national trusted list** maintained and published by the supervisory body (Art. 8 and Art. 35(2)(e) of Law No. 124/2022). For qualified trust service providers established in EU member states, the recognition under Art. 3 and Art. 8(7)–(9) applies.

!!! warning "Point 4 is the essential prerequisite"
    MPass trusts an identity only when it rests on a recognised qualified certificate. A certificate issued under a CA that is not on the trusted list cannot be accepted as an identity, even if the signature is technically valid.

    At validation, MPass also applies the conditions of Art. 29 of Law No. 124/2022 (qualified certificate, valid at the time of authentication, issued by a qualified provider). Confirm the certificate CA with the MPass team before starting development.

## 4. Integration modes

The Provider implements the mode that matches how the user authorises the authentication:

- **Synchronous** — for instant authentication. MPass calls the Provider's Authenticate operation and receives the identity + proof directly in the response.
- **Asynchronous** — when the user must confirm on a phone or in an app. MPass calls the Authenticate operation, the Provider accepts the request and, once the user has confirmed, notifies MPass with a short callback; MPass then retrieves the result from the Provider.

Either mode may be implemented. The data exchanged is the same; only the timing differs.

## 5. API contract

The Provider exposes the operations below over HTTPS; every call is authenticated as described in [section 6](#6-authentication-and-security). Field names are indicative — a SOAP or REST equivalent is acceptable; the exact schema (WSDL / OpenAPI) is agreed during onboarding.

### 5.1 Authenticate — request (MPass → Provider)

| Field | Type | Notes |
|-------|------|-------|
| `requestId` | string | Correlation id for this authentication. Echoed back. |
| `challenge` | bytes | A one-time value generated by MPass for this authentication. The user's signature must be over exactly this value. |
| `userId` | string, optional | The user's IDNP, when MPass already knows it (e.g. the user entered it). When absent, the Provider determines the user from its own app / device and returns their identity. |
| `description` | string | Short text shown to the user (e.g. the name of the service they are signing in to). |
| `callbackUrl` | string | Asynchronous mode only — the address the Provider POSTs to when authentication completes. |
| `withNotification` | bool, optional | Whether to push a prompt to the user's device. |

### 5.2 Result (Provider → MPass)

Returned directly (synchronous) or via the status operation (asynchronous):

| Field | Type | Notes |
|-------|------|-------|
| `status` | enum | `Pending`, `Success` or `Failure`. |
| `failureReason` | string | Present on `Failure` — a short, user-meaningful reason (see [section 7](#7-status-and-error-conventions)). |
| `signerCertificate` | bytes | The user's qualified certificate (DER). MPass reads the IDNP from its Subject. |
| `subject` | string, optional | The certificate Subject (distinguished name), if you prefer to pass it explicitly. |
| `challengeSignature` | bytes | The user's signature over the challenge from 5.1. |

### 5.3 Callback (asynchronous mode only)

When authentication completes, the Provider POSTs to `callbackUrl` a minimal body containing only `requestId`. This is a wake-up notification only — **the certificate, Subject and signature are not included in the callback**. On receipt, MPass calls the Provider's status operation to retrieve the result.

### 5.4 Status / result operation (asynchronous mode only)

MPass requests the result of a previously submitted authentication by its `requestId`. Return the structure of section 5.2. While the user has not yet confirmed, return `status = Pending`.

### 5.5 Device selection (optional)

If a user may have more than one device or identity and one must be chosen, the Provider indicates this in its response so MPass can present the choice to the user. Describe the mechanism at onboarding.

## 6. Authentication and security

- **Authentication.** Every request is authenticated with a bearer token over HTTPS. MPass sends an `Authorization: Bearer <token>` header on each call to the Provider's service, using a token (API key) issued by the Provider to MPass. The Provider's callback to MPass carries an `Authorization: Bearer <token>` header using a token issued by MPass to the Provider. Tokens are exchanged during onboarding, can be rotated, and are never placed in URLs.
- **Transport.** All traffic runs over HTTPS (TLS 1.2 or higher). The Provider's endpoint must present a valid server certificate.
- **Challenge binding (anti-replay).** The user's signature must be over exactly the challenge MPass sent for this authentication. An old challenge is not accepted or reused; each authentication uses a fresh one.
- **Identity binding.** When `userId` (IDNP) is supplied, the authenticated user must be that person — the `serialNumber` attribute of the certificate's Subject must equal the supplied IDNP. If it does not, the Provider fails the request rather than returning a success.
- **Correlation.** Always echo `requestId` so the result maps unambiguously to the authentication.
- **No identity material in callbacks** — callbacks carry only the identifier and are authenticated as above.

## 7. Status and error conventions

- Report `Success` only when the user has actually confirmed and been authenticated.
- On failure, return a concise `failureReason` that can be shown to the user — for example: user cancelled, wrong PIN, no active device, device blocked, certificate expired, certificate revoked, or user not registered.
- An expired or unconfirmed challenge must result in `Failure` (or remain `Pending` until it expires), never a `Success`.

## 8. Legal obligations that remain with the Provider

This document covers only the technical integration interface. The Provider remains subject to the obligations under the normative framework in force, including:

- An integration contract with the eGovernance Agency, signed before going to production, under the MPass Regulation.
- Conformity assessment of the electronic identification means against the criteria, technical specifications and procedures for the assurance level (low / substantial / high), carried out by a conformity assessment body (Art. 5¹(3) of Law No. 124/2022); the means and its assurance level are published on the supervisory body's official website (Art. 5¹(4)).
- If the Provider itself issues the qualified certificates used for authentication: the obligations of a qualified trust service provider under Law No. 124/2022 — verifying the applicant's identity (Art. 10(2) point 4), revocation within at most 3 working hours (Art. 16(3)), keeping records for 15 years (Art. 10(2) point 9), a conformity audit at least once every two years (Art. 10(2) point 10). If the certificates are issued by a third-party provider, these obligations rest with that provider.
- Meeting the cybersecurity obligations under Law No. 48/2023 (Art. 39 of Law No. 124/2022).
- Complying with personal data protection legislation during the authentication process.
- The identification of the user within information systems may not be restricted by their identity data (Art. 5 of Law No. 124/2022).

## 9. What we need from the Provider to begin

1. The API endpoint URL(s) and the service description (WSDL or OpenAPI).
2. The token (API key) the Provider's service will accept from MPass; in return, MPass will issue a token to authenticate the Provider's callback.
3. Written confirmation of the CA behind the authentication and that it appears on the national trusted list (section 3, point 4); for EU providers — the reference to the member state's trusted list.
4. The target assurance level (low / substantial / high) and, where applicable, the conformity assessment report.
5. A test environment and a test user identity for end-to-end validation.

## 10. Acceptance checklist

1. Authenticate API exposed over HTTPS and authenticated with a bearer token (section 6), in synchronous or asynchronous mode.
2. Returns the user's qualified certificate (IDNP in the `serialNumber` attribute of the Subject) and a signature over the challenge.
3. `requestId` echoed back; the signature is bound to exactly the challenge that was sent (anti-replay enforced).
4. `userId` (IDNP) honoured when supplied — the authenticated user matches.
5. Asynchronous mode (if used): wake-up callback + result retrieval via the status operation; no identity material in the callback.
6. Certificate CA confirmed as recognised (trusted list) — a test authentication maps to the correct user end to end.
7. The target assurance level agreed and recorded in the integration contract.
8. The obligations in section 8 confirmed.
