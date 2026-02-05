This section describes the practical steps required to integrate with EVO Wallet across staging and production.

## Step 1 — Implement the RP flow

Implement the full RP flow:
- create and sign an Authorization Request (JWS)
- expose the request via `request_uri`
- trigger the wallet using the URL scheme
- receive the Authorization Response via `direct_post.jwt`
- decrypt and validate the returned payload

## Step 2 — Generate a Certificate Signing Request (CSR)

Generate a CSR for your RP.

The certificate will be used for:
- signing Authorization Requests
- enabling the wallet to verify the RP identity

## Step 3 — Obtain a staging certificate

Send the CSR to the wallet provider to obtain a certificate for the staging environment.

Use this certificate in your staging integration.

## Step 4 — Obtain a production certificate

After successful staging validation, repeat the CSR process for production.

Production access is granted only after the staging integration is confirmed to work correctly.

## Promotion rule

You must complete staging integration successfully before production certificates and production access are issued.
