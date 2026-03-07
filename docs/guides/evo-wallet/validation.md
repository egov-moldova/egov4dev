To ensure authenticity and non-repudiation, before processing the received data elements, the Verifier shall validate it according to this section. Note that data elements presented for each document are encoded in a separate DeviceResponse CBOR structure.

## Authorization Response integrity validation

As stated previously, after identifying the corresponding transaction and before decrypting the received JWE, the Verifier SHALL:

1. verify that the **alg** JWE header value is "ECDH-ES";
2. verify that the **enc** JWE header value is "A256GCM";
3. verify the **apv** JWE header value matches the transaction persisted **nonce** value;
4. verify the **kid** JWE header value matches the transaction persisted key identifier.

## DeviceResponse structural validation

For each DeviceResponse, the Verifier SHALL:

1. verify that DeviceResponse.version is "1.0";
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

For each returned Document, the Verifier SHALL decode the MSO that is embedded in COSE_Sign1 signature which is Document.issuerSigned.issuerAuth and:

1. verify that MSO.version is "1.0";
2. decode issuer certificate chain from **x5chain** (label 33) unprotected header;
3. verify issuer signature created with public key of issuer certificate;
4. verify the value of **x5t** (label 34) protected header matches the SHA-256 thumbprint of the issuer certificate;
5. calculate all data element digests and compare them with MSO.valueDigests using the digest algorithm specified in MSO.digestAlgorithm (usually "SHA-256");
6. verify the match between MSO.docType and Document.docType;
7. verify MSO validity period against current time (current time must be between MSO.validityPeriod.validFrom and MSO.validityPeriod.validTo).

## Issuer certificate validation

The Verifier SHALL validate issuer certificate:

1. validity period against current time (current time must be between certificate NotBefore and NotAfter fields);
2. validity period to be maximum 457 days (according to ISO 18013-5);
3. validity period against MSO.validityPeriod.signed;
4. chain against trust anchors (root certificate);
5. Authority Key Identifier (AKI) to match CA certificate Subject Key Identifier (SKI);
6. subject "C" and "ST" fields (when present) to match "C" and "ST" fields of CA certificate;
7. signature algorithm to be "1.2.840.10045.4.3.2", "1.2.840.10045.4.3.3" or "1.2.840.10045.4.3.4";
8. key usage must be digitalSignature (bit 0 set);
9. extended key usage (EKU) must include "1.0.18013.5.1.2" (mdlDS);
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
2. for documents that have MSO.status property present, check the status of the Document online against Status List CWT referenced by **uri** (member of MSO.status.status_list), where the bit at index **idx** must be VALID (set to 0).

## Status List validation

For revocable documents, the Status List CWT is obtained using HTTP GET method from **uri** (member of MSO.status.status_list) using content negotiation. That means the HTTP request must have **Accept** header set to "application/statuslist+cwt".

Before processing a Status List CWT, the Verifier SHALL:

1. check the HTTP response to indicate **Content-Type**: "application/statuslist+cwt";
2. check the value of **type** (label 16) protected header to be "application/statuslist+cwt";
3. decode signing certificate chain from **x5chain** (label 33) unprotected header and check its match with issuer certificate;
4. verify the value of **x5t** (label 34) protected header matches the SHA-256 thumbprint of the signing certificate;
5. verify that the list is signed as embedded COSE_Sign1 signature using signing certificate public key;
6. verify CWT **subject** claim (key 2) match the Status List URI;
7. verify CWT **issued at** claim (key 6) and **expiration time** claim (key 4) against current time (10 minutes clock skew recommended);
8. decode the StatusList CBOR structure from CWT **status list** claim (key 65533) and decompress the status bits from **lst** member using ZLIB (**RFC 1950**).

As Status Lists are meant to ensure presentation privacy and efficiently store the status of multiple documents, the Verifier SHALL cache them according to CWT **time to live** claim (key 65534).
