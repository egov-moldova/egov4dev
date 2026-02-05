This section describes the minimum steps required to integrate a Relying Party (RP) with EVO Wallet in staging and production.

## Prerequisites (technical)

Before requesting certificates, the RP must be able to:
- generate and sign Authorization Requests (JWS)
- host the request via a `request_uri` endpoint
- invoke the wallet using the EVO URL scheme
- receive the response via `direct_post.jwt` (HTTP POST to RP backend)
- decrypt the JWE and validate the returned ISO 18013-5 mdoc

## Step 1 — Implement the RP integration flow

Implement the full end-to-end flow described in the **Protocol** section:
- Device engagement (URL scheme)
- Authorization Request (JWS)
- Authorization Response (JWE)
- Error handling

## Step 2 — Generate a Certificate Signing Request (CSR)

Generate a CSR for your RP signing certificate.

This certificate is required for:
- signing Authorization Requests
- enabling EVO Wallet to verify the RP identity and trust the request

## Step 3 — Obtain a staging certificate

Send the CSR to the wallet provider and obtain a certificate for the staging environment.

Use the staging certificate to sign requests in staging.

## Step 4 — Staging validation

Staging integration is considered successful when:
- the wallet can fetch the request from your `request_uri`
- the wallet can post the response to your backend endpoint
- your backend can decrypt the JWE
- your backend can validate the mdoc (issuer auth + device auth)
- requested document types and claims are returned correctly

## Step 5 — Obtain a production certificate

After successful staging validation, repeat the CSR process for production.

Production certificates and production access are issued only after staging is confirmed.

## Environment separation (staging vs production)

Staging and production are separate environments. In practice this means:
- different certificates (and usually different trust anchors)
- different base URLs and endpoints
- separate validation and approval before go-live

## Go-live checklist (short)

- [ ] `request_uri` endpoint works and is reachable by the wallet
- [ ] `direct_post.jwt` endpoint accepts wallet POSTs over HTTPS
- [ ] JWS signing works with the issued RP certificate
- [ ] JWE decryption works
- [ ] ISO 18013-5 validation is implemented (not just parsing)
- [ ] Error handling implemented for wallet error responses
