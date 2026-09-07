# Signature provider integration specification

!!! note "Audience"
    This page is for an **electronic signature provider** (a signing instrument) integrating *into* MSign. It is separate from the rest of the MSign guide, which covers integrating information systems *with* MSign as consumers.

## 1. Purpose

MSign is the integrated government electronic signature service of the Republic of Moldova, established by [Government Decision No. 405/2014](https://www.legis.md/cautare/getResults?doc_id=143127&lang=ro). The service owner is the Public Institution "eGovernance Agency"; the technical administrator is the Public Institution "Information Technology and Cyber Security Service".

MSign is an integrator service: it does not issue certificates and does not itself create signatures. It gives users the mechanism to select an electronic signature provider and to apply and verify electronic signatures through that provider. Both qualified and advanced electronic signature means may be used within MSign.

In an MSign integration, the electronic signature provider (hereinafter the **"Provider"**) works as follows: MSign sends it the data to be signed, and the Provider returns the completed electronic signature together with the signer's certificate. MSign stores the result as-is and passes it to the requesting e-service. Responsibility for the authenticity of the electronic signature lies with the Provider.

This document covers only the technical integration interface for the electronic signature of a natural person (the signer, within the meaning of Art. 2 of [Law No. 124/2022](https://www.legis.md/cautare/getResults?doc_id=151294&lang=ro)). It does not cover the electronic seal of a legal person, which is not yet implemented in the Republic of Moldova. The Provider's legal obligations as a trust service provider ([section 8](#8-legal-obligations-that-remain-with-the-provider)) are unchanged and are not limited by this document.

## 2. What is signed

Each signing request contains one or more documents, each of one of the following two types:

| Type | What MSign sends | What the Provider returns |
|------|------------------|---------------------------|
| **Hash** | A document hash — SHA-256 (32 bytes) or another SHA-2 / SHA-3 family algorithm agreed at onboarding. **SHA-1 is not accepted.** The document stays with the e-service; only the hash is signed. | A complete **detached XAdES** signature at level **T** over that hash, plus the signer's certificate. |
| **PDF** | The PDF document. | The same PDF with an embedded **PAdES level T** signature, plus the signer's certificate. |

A single request may contain several documents; the Provider signs each one and returns one signature per document.

## 3. Signature format requirements (mandatory for integration)

These requirements are set by MSign on the basis of the technical regulations and standards approved by the supervisory body (the Information and Security Service of the Republic of Moldova), under Art. 35(2)(f) and (h) of Law No. 124/2022. They are not stated in the law itself but in the subordinate technical framework.

1. Hash → **detached XAdES**, protection level "T" (baseline, with a timestamp), per ETSI EN 319 132.
2. PDF → **PAdES level "T"**, embedded in the returned PDF, per ETSI EN 319 142.
3. Level "T" requires an electronic timestamp on the signature. For a qualified electronic signature this must be a **qualified electronic timestamp** (Art. 31 of Law No. 124/2022).
4. **Signature type and Provider status:**
    - MSign accepts both qualified and advanced electronic signatures, and providers may be qualified or non-qualified trust service providers (MSign Regulation, points 2 and 4; Art. 6(1) of Law No. 124/2022).
    - The signature type produced and the Provider's level are set at onboarding and recorded in the integration contract signed with the eGovernance Agency.
    - If the requesting e-service needs a signature with the same legal value as a handwritten signature (Art. 21(2) of Law No. 124/2022), a **qualified electronic signature** is required — based on a qualified certificate for electronic signature (Art. 24 and 25) and created with a qualified signature creation device (Art. 27).
5. **Recognition of the signing CA.** The trust service provider that issues the signer's certificate must appear on the **national trusted list** maintained and published by the supervisory body (Art. 8 and Art. 35(2)(e) of Law No. 124/2022). For qualified trust service providers established in EU member states, the recognition under Art. 3 and Art. 8(7)–(9) applies. For advanced signatures produced by a non-qualified provider, the recognition conditions agreed in the integration contract apply.

!!! warning "Point 5 is the essential prerequisite for qualified signatures"
    After signing, MSign independently validates every signature by checking it against the national trusted list of qualified trust service providers and against the validation conditions of Art. 29 of Law No. 124/2022 (qualified certificate, valid at the time of signing, issued by a qualified provider).

    A qualified signature produced under a CA that is not on the trusted list will be reported as **invalid** — even if it was created correctly — and will therefore be unusable. Confirm the signing CA with the MSign team before starting development.

## 4. Integration modes

The Provider implements the mode that matches how the user authorises the signature:

- **Synchronous** — for instant / server-side signing. MSign calls the Provider's Sign operation and receives the completed signatures directly in the response.
- **Asynchronous** — when the user must confirm on a phone or in an app. MSign calls the Sign operation, the Provider accepts the request and, once the user has signed, notifies MSign with a short callback; MSign then retrieves the completed signatures from the Provider.

Either mode may be implemented. The data exchanged is the same; only the timing differs.

## 5. API contract

The Provider exposes the operations below over HTTPS; every call is authenticated as described in [section 6](#6-authentication-and-security). Field names are indicative — a SOAP or REST equivalent is acceptable; the exact schema (WSDL / OpenAPI) is agreed during onboarding.

### 5.1 Sign — request (MSign → Provider)

| Field | Type | Notes |
|-------|------|-------|
| `requestId` | string | Correlation id for the whole request. Echoed back. |
| `signerId` | string, optional | The user's national ID number (IDNP). When present, the signature must be produced by exactly that person (see [section 6](#6-authentication-and-security)). |
| `description` | string | Short human-readable text describing what is being signed (may be shown to the user). |
| `callbackUrl` | string | Asynchronous mode only — the address the Provider POSTs to when signing completes. |
| `items[]` | list | One entry per document (below). |

Each `items[]` entry:

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | Per-document correlation id. Echoed back in the matching result. |
| `contentType` | enum | `Hash` or `Pdf`. |
| `hash` | bytes | Present for Hash — the digest to sign. |
| `document` | bytes | Present for Pdf — the PDF to sign. |
| `fileName`, `fileMediaType` | string, optional | For display to the user. |

### 5.2 Result (Provider → MSign)

Returned directly (synchronous) or via the status operation (asynchronous):

| Field | Type | Notes |
|-------|------|-------|
| `status` | enum | `Pending`, `Success` or `Failure`. |
| `failureReason` | string | Present on `Failure` — a short, user-meaningful reason (see [section 7](#7-status-and-error-conventions)). |
| `signerCertificate` | bytes | The signer's X.509 certificate (DER). |
| `items[]` | list | One entry per document (below). |

Each result `items[]` entry:

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | The document correlation id, echoed from the request. |
| `signature` | bytes | For Hash: the completed detached XAdES-T. For Pdf: the returned PDF with the embedded PAdES-T. |

### 5.3 Callback (asynchronous mode only)

When signing completes, the Provider POSTs to `callbackUrl` a minimal body containing only `requestId` / the transaction id. This is a wake-up notification only — **the signature is not included in the callback**. On receipt, MSign calls the Provider's status operation to retrieve the completed signatures.

### 5.4 Status / result operation (asynchronous mode only)

MSign requests the result of a previously submitted signing by its `requestId`. Return the structure of section 5.2. While signing is still in progress, return `status = Pending`.

## 6. Authentication and security

- **Authentication.** Every request is authenticated with a bearer token over HTTPS. MSign sends an `Authorization: Bearer <token>` header on each call to the Provider's service, using a token (API key) issued by the Provider to MSign. The Provider's callback to MSign carries an `Authorization: Bearer <token>` header using a token issued by MSign to the Provider. Tokens are exchanged during onboarding, can be rotated, and are never placed in URLs.
- **Transport.** All traffic runs over HTTPS (TLS 1.2 or higher). The Provider's endpoint must present a valid server certificate. The exchange runs over secure channels with cryptographic protection of the information (MSign Regulation, point 14).
- **Signer binding.** When `signerId` (IDNP) is supplied, the signature must belong to exactly that person. The person's identifier is carried in the `serialNumber` attribute of the certificate's Subject Distinguished Name — **not the certificate serial number** — per the qualified certificate structure set by the supervisory body (Art. 13(4) of Law No. 124/2022) and the ETSI EN 319 412-1 semantics (usually with a prefix, e.g. `PNOMD-<IDNP>`). The exact field format is agreed at onboarding. If the identifier in the certificate does not match the supplied IDNP, the Provider fails the request rather than returning a signature.
- **Correlation.** Always echo `requestId` and each item `id` so results map unambiguously to documents.
- **No signature material in callbacks** — callbacks carry only the identifier and are authenticated as above.

## 7. Status and error conventions

- Report `Success` only when all documents in the request have been signed.
- On failure, return a concise `failureReason` that can be shown to the user — for example: user cancelled, wrong PIN, no active device, certificate expired, certificate revoked, or the signer does not match the expected person.
- If the user has more than one signing device / identity and one must be chosen, the Provider indicates this so MSign can present the choice (optional — describe the mechanism at onboarding).

## 8. Legal obligations that remain with the Provider

This document covers only the technical integration interface. As a trust service provider integrated into MSign, the Provider remains subject to the obligations under Law No. 124/2022 and the MSign Regulation, including:

- An integration contract with the eGovernance Agency, signed before going to production (MSign Regulation, points 5(8) and 9(4)); new providers are integrated "in the manner established by the legislation in force … if they meet the legal requirements" (MSign Regulation, point 23).
- Verifying the identity of the certificate applicant through one of the methods in Art. 10(2) point 4 of Law No. 124/2022.
- Revoking the public-key certificate and recording it in the register within at most 3 working hours of receiving information that requires revocation (Art. 16(3)).
- Recording and keeping accessible the relevant information for 15 years, including after ceasing activity (Art. 10(2) point 9); keeping the public-key certificate for at least 15 years from revocation or expiry (Art. 15(2)).
- Arranging, at its own expense, at least once every two years, a conformity audit of its qualified trust services carried out by a conformity assessment body (Art. 10(2) point 10).
- Meeting the cybersecurity obligations under Law No. 48/2023 (Art. 39 of Law No. 124/2022).
- Complying with personal data protection legislation while providing the trust services (Art. 52; MSign Regulation, Chapter IV).
- Qualified providers only: notifying the supervisory body of changes in the provision of qualified trust services and of any intention to cease that activity (Art. 10(2) point 2).

## 9. What we need from the Provider to begin

1. The API endpoint URL(s) and the service description (WSDL or OpenAPI).
2. The token (API key) the Provider's service will accept from MSign; in return, MSign will issue a token to authenticate the Provider's callback.
3. Written confirmation of the signature type produced (qualified or advanced) and of the Provider's status (qualified or non-qualified trust service provider).
4. For qualified signatures: written confirmation of the signing CA and that it appears on the national trusted list (section 3, point 5); for EU providers — the reference to the member state's trusted list.
5. A test environment and a test signer identity for end-to-end validation.

## 10. Acceptance checklist

1. Sign API exposed over HTTPS and authenticated with a bearer token (section 6), in synchronous or asynchronous mode.
2. Hash documents returned as detached XAdES-T; PDF documents returned with embedded PAdES-T; the signer's certificate returned in both cases.
3. Level "T" ensured by an electronic timestamp (qualified, for qualified signatures).
4. `requestId` and each item `id` echoed back correctly for multi-document requests.
5. `signerId` (IDNP) honoured — the identifier in the signer's certificate matches the expected person.
6. Asynchronous mode (if used): wake-up callback + result retrieval via the status operation; no signature in the callback.
7. Signature type and Provider status recorded in the integration contract with the eGovernance Agency.
8. For qualified signatures: signing CA confirmed as recognised (trusted list) — a test signature passes MSign validation end to end.
9. The obligations in section 8 confirmed.
