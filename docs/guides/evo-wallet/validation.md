To ensure authenticity and non-repudiation, before processing the received data elements, the Verifier shall validate it according to this section. Note that data elements presented for each document are encoded in a separate DeviceResponse CBOR structure.

## Authorization Response integrity validation

As stated previously, after identifying the corresponding transaction and before decrypting the received JWE, the Verifier SHALL:

1. verify that the **alg** JWE header value is ”ECDH-ES”;
2. verify that the **enc** JWE header value is “A256GCM”;
3. verify the apv **JWE** header value matches the transaction persisted **nonce** value;
4. verify the kid **JWE** header value matches the transaction persisted key identifier.

## DeviceResponse structural validation

For each DeviceResponse, the Verifier SHALL:

1. verify that DeviceResponse.version is “1.0”;
2. verify there are no document errors (in DeviceResponse.documentErrors);
3. verify DeviceResponse status (DeviceResponse.status must be zero);
4. verify that there is at least one document returned (in DeviceResponse.documents);
5. verify that the returned document type (DeviceResponse.documents[].docType) matches one of the requested (credentials[].meta.doctype_value in Authorization Request JWS payload dcql_query parameter or corresponds to a referenced DCQL query by scope);

## Document validation

For each Document, the Verifier SHALL:

1. verify there are no errors in document (in Document.errors);
2. verify that all requested and required data elements are present (in Document.issuerSigned.nameSpaces);
3. optionally, known document types with defined legal validity period data elements must be current (for example issue_date and expiry_date for Moldovan PID).

## Issuer data authentication

For each returned Document, the Verifier SHALL extract the MSO that is embedded in COSE_Sign1 signature which is Document.issuerSigned.issuerAuth and:

1. verify that MSO.version is “1.0”;
2. verify issuer signature;
3. calculate all data element digests and compare them with MSO.valueDigests using the digest algorithm specified in MSO.digestAlgorithm (usually “SHA-256”);
4. verify the match between MSO.docType and Document.docType;
5. verify MSO validity period against current time (current time must be between MSO.validityPeriod.validFrom and MSO.validityPeriod.validTo).

## Issuer certificate validation

The Verifier SHALL validate issuer certificate:

1. validity period against current time (current time must be between certificate NotBefore and NotAfter fields);
2. validity period to be maximum 457 days (according to ISO 18013-5);
3. validity period against MSO.validityPeriod.signed;
4. chain against <span class="highlight-text-yellow">a list of trusted anchors</span>;
5. Authority Key Identifier (AKI) to match CA certificate Subject Key Identifier (SKI);
6. subject “C” and “ST” fields (when present) to match “C” and “ST” fields of CA certificate;
7. signature algorithm to be "1.2.840.10045.4.3.2", "1.2.840.10045.4.3.3" or "1.2.840.10045.4.3.4";
8. key usage must be digitalSignature (bit 0 set);
9. extended key usage (EKU) must include “1.0.18013.5.1.2” (mdlDS);
10. does not contain any of the following extensions:
    * "2.5.29.30" – Name Constraints
    * "2.5.29.33" – Policy Mappings
    * "2.5.29.36" – Policy Constraints
    * "2.5.29.46" – Freshest CRL
    * "2.5.29.54" – Inhibit Any Policy.

## Device authentication

For each returned Document, the Verifier SHALL:

1. validate device key authorizations, if any (for each namespace in Document.deviceSigned.nameSpaces[], the entire namespace or each data element must be present in MSO.deviceKeyInfo.keyAuthorizations that is embedded in Document.issuerSigned.issuerAuth);
2. verify device signature of the DeviceAuthentication structure (meaning reconstructing DeviceAuthenticationBytes and verifying that it is signed as detached COSE_Sign1 signature with the COSE_Key in MSO.deviceKeyInfo.deviceKey).

## Revocation checks

For each returned Document, the Verifier SHALL:

1. check for issuer certificate revocation online using standard CRL/OCSP protocols and CRL or OCSP response signature verification, as efficiently implemented by all frameworks and platforms;
2. for documents that have MSO.status property present, check the revocation of the Document online against Status List CWT (referenced by MSO.status.status_list **uri** and **idx** properties) and check the issuer certificate that signed the CWT.

As Status Lists are meant to ensure presentation privacy and efficiently store the status of multiple documents, the Verifier SHALL cache them according to CWT **ttl** claim.
