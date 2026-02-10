This section describes the communication protocol used for credential presentation.

<img src="../../assets/images/protocol.png" alt="Protocol">

The diagram depicts the interaction between EVO User, EVO Wallet module, Verifier Backend (server-side implementation of the Verifier) and Verifier Frontend (client-side implementation of the Verifier) in a presentation transaction.

The interaction consists of the following steps:

1. In case of dynamic QR (optional steps 1-3), the Verifier Frontend (triggered by Verifier’s representative) requests credential presentation transaction initiation from Verifier Backend.
2. Verifier Backend creates and records a new transaction.
3. Verifier Backend returns its identifier and a full link (which can be included in QR code) to Verifier Frontend.
4. A freshly created or static QR code or Link is shown to the User. The link includes the request_uri. Static QR codes can include the type of requested document, branch identifier, desk operator identifier as parameters in request_uri, enabling Verifier Backend to dynamically create the transaction.
5. The user scans the QR or taps on the Link. This results in Wallet app being opened.
6. Wallet verifiers link structure, creates and records a wallet_nonce.
7. To get an Authorization Request from Verifier Backend, the Wallet submits wallet_metadata and wallet_nonce to the provided request_uri using HTTP POST.
8. After identifying or creating a new transaction, Verifier Backend records in transaction the wallet_nonce and a newly created none and ephemeral key for response decryption.
9. Verifier Backend creates and sings an Authorization Request JWS, that includes its client_metadata with ephemeral key, nonce, wallet_nonce, dcql_query, response_uri and state, then returns it to the Wallet in a HTTP 200 OK response. The response_uri includes parameters that enable the Verifier to identify the transaction.
10. Wallet parses and validates Authorization Request signature and received wallet_nonce.
11. Wallet identifies the credentials matching the dcql_query and shows them to the user to request a presentation confirmation.
12. User reviews the request, can select returned credentials and/or data elements and confirms the presentation.
13. Wallet creates a device nonce, creates a DeviceResponse CBOR structure for each document and signs each with DeviceKey using COSE_Sign1 format.
14. Wallet derives a symmetric encryption key from Verifier submitted ephemeral key, its own ephemeral key, nonce and device nonce (using ECDH-ES algorithm) and encrypts the Authorization Response in JWE format.
15. Wallet submits the Authorization Response JWE to the Verifier Backend via the provided response_uri using HTTP POST. It includes nonce, device nonce, Wallet’s ephemeral key, vp_token with serialized DeviceResponse(s) and state.

## Device Engagement

During the device engagement phase, the Wallet app is opened and receives the URL that it can use to connect with the Verifier. This URL is the result of link opening or QR
scanning by the User.

In other words, the Verifier sends an Authorization Request as a Request Object by reference, as defined by JWT-Secure Authorization Request (JAR) defined in RFC9101 with extensions defined by OpenID4VP.

The URL has the following structure:

| URI Component | Description |
|---|---|
| eudi-openid4vp:// | URI scheme that causes the Wallet to open. |
| client_id | Required query parameter specifying the Client Identifier of the Verifier. The value is base64url-encoded SHA-256 hash of the DER-encoded X.509 public key certificate used by the Verifier to sign the request prefixed with “x509_hash:”. |
| request_uri | Required query parameter determining the HTTPS-based URL where the Wallet retrieves the Authorization Request object. The value MUST be URL-encoded. |
| request_uri_method | Required query parameter determining the HTTP method to be used. MUST be set to post. This means Wallet will submit to the indicated request_uri its metadata and a nonce using HTTP POST method. |

The URL-encoded request_uri can include additional parameters necessary to identify a pre-defined, pre-prepared or dynamically created transaction that represents the state of Authorization Request. For example, it can contain the type of the requested document, branch identifier, desk operator identifier or the identifier of the Authorization Request transaction that is freshly created and persisted by the Verifier backend. Thus, it is important to minimize its length when presented as QR, without allowing an attacker to easily generate or guess a correct one.

Either scanned from a QR or tapped on as a link, accessing this URL causes the Wallet app to open. The app will then make a HTTP POST request to the Verifier’s request_uri with Accept header set to application/oauth-authz-req+jwt with the following parameters encoded as application/x-www-form-urlencoded:

| Parameter | Description |
|---|---|
| wallet_metadata | A string containing a JSON object described below. |
| wallet_nonce | A string value used to mitigate replay attacks of the Authorization Request. The Verifier MUST use it as wallet_nonce value in the signed Authorization Request object. Value is base64url-encoded. |

The structure of wallet_metadata object is the following:

| Parameter | Description |
|---|---|
| issuer | The value for issuer is the Wallet issuer identifier. EVO Wallet uses the following value: https://evo.gov.md/wallet/v1 |
| authorization_endpoint | The value for authorization_endpoint is the OAuth 2 Authorization Endpoint where the mdoc reader sends the Authorization Request. EVO Wallet uses the following value: eudi-openid4vp: |
| response_types_supported | A non-empty array of strings containing the values of the response types that the Wallet supports. EVO Wallet uses the following values: ["vp_token"] |
| response_modes_supported | A non-empty array of strings containing the values of the response modes that the Wallet supports. EVO Wallet uses the following values: ["direct_post.jwt"] |
| vp_formats_supported | An object containing a list of name/value pairs, where the name is a Credential Format Identifier and the value defines format-specific parameters that a Wallet supports. EVO Wallet uses the following value: { "mso_mdoc": { "issuerauth_alg_values": [-9], "deviceauth_alg_values": [-9] } } |
| client_id_prefixes_supported | A non-empty array of strings containing the values of the Client Identifier Prefixes that the Wallet supports. EVO Wallet uses the following values: [“x509_hash”] |
| request_object_signing_alg_values_supported | A non-empty array of strings containing the list supported cryptographic algorithms for securing the Request Object. EVO Wallet uses the following values: ["ES256"] |
| authorization_encryption_alg_values_supported | A non-empty array of strings containing the supported algorithms for encryption. EVO Wallet uses the following values: ["ECDH-ES"] |
| authorization_encryption_enc_values_supported | A non-empty array of strings containing the supported key types for encryption. EVO Wallet uses the following values: ["A256GCM"] |

## Returning Authorization Request

As a result of HTTP POST request to the Verifier’s request_uri, the Verifier shall respond with a new Authorization Request.

It is suggested that an Authorization Request and the corresponding Authorization Response is part of a presentation transaction persisted by Verifier. It includes a freshly generated nonce and ephemeral key (with public key returned in client_metadata.jwks), has an expiration and usage status to prevent replays.

How is Friendly Name recorded/extracted from the certificate/request?

What about the Friendly Name of the operator (is it intermediary?)? It might be the reason to use verifier_info?

Returned Authorization Request object MUST is a signed JWT, meaning JWS according to RFC 7515.

The Authorization Request JWS header has the following parameters:

| Parameter | Description |
|---|---|
| typ | JWT token type. MUST be set to: oauth-authz-req+jwt |
| alg | The algorithm identifier used to sign the JWT. MUST be set to: ES256 |
| x5c | An array of strings containing the X.509 public key certificate chain used by the Verifier to sign the request. Each string in the array is a base64-encoded (not base64url-encoded) DER PKIX certificate value. The certificate containing the public key corresponding to the key used to digitally sign the request MUST be the first certificate. This MAY be followed by additional certificates, with each subsequent certificate being the one used to certify the previous one. |

The Authorization Request JWS payload has the following parameters:

| Parameter | Description |
|---|---|
| aud | The audience of the Authorization Request Object and is set to the issuer Wallet Metadata parameter, meaning: https://evo.gov.md/wallet/v1 |
| client_id | The client identifier that was issued to the client during the registration process prefixed by client identifier prefix. Example value: x509_hash:71N_JciVv6eCUmUpqbY9l6pjFWTV14nCt2VEjIY1-2w |
| client_metadata | A JSON object containing the Verifier metadata values as defined in this document. |
| dcql_query | A JSON object containing a DCQL query as defined in this document. |
| scope | A string used as an alias for a well-defined DCQL query. Currently no aliases are yet defined by EVO Wallet. |
| transaction_data | An optional non-empty array of strings, where each string is a base64url-encoded JSON object that contains a typed parameter set with details about the transaction that the Verifier is requesting the End-User to authorize. Not yet leveraged by EVO. |
| verifier_info | This is the place to reference Verifier’s logo, ToS, PP and actual human operator for physical presentations. |
| response_type | Response type to be used. MUST be: vp_token |
| response_mode | Response mode to be used. MUST be: direct_post.jwt |
| response_uri | The HTTPS URL that represents the HTTPS POST endpoint for submitting the encrypted Authorization Response required by the Response Mode direct_post.jwt. This usually includes parameters that enable the Verifier to identify the presentation transaction. |
| nonce | A cryptographic nonce - an unpredictable random or pseudorandom value. Nonces shall have a minimum entropy of 16 bytes. A new nonce value shall be chosen for each transaction. |
| wallet_nonce | The value MUST be set to the one passed by the Wallet. |
| state | Optional string value that MUST only contain ASCII URL safe characters (uppercase and lowercase letters, decimal digits, hyphen, period, underscore, and tilde). Returned by the Wallet back to Verifier when submitting Authorization Response. Usually used to pass the authorization request-id persisted by the Verifier, correlating between Authorization Request and Response. |

The structure of client_metadata object is the following:

| Parameter | Description |
|---|---|
| jwks | A JSON Web Key Set, as defined in RFC 7591, contains one public key used by the Wallet as an input to a key agreement used for encryption of the Authorization Response. The key use parameter MUST be set to enc, alg MUST be set to ECDH-ES, kty must be EC, crv must be P-256, and it MUST have a kid (Key ID) parameter that uniquely identifies the key within the context of the request. |
| encrypted_response_enc_values_supported | Response encryption algorithm to be used. MUST be: A256GCM |
| vp_formats_supported | Same with vp_formats_supported described in wallet_metadata object. |

The structure of the dcql_query object is the following:

| Parameter | Description |
|---|---|
| credentials | A required non-empty array of Credential Queries as defined in this document. |
| credentials_set | An optional non-empty array of Credential Set Queries that specifies additional constraints on which of the requested Credentials to return. |

Each entry in credentials MUST be an object with the following parameters:

| Parameter | Description |
|---|---|
| id | A required string identifying the Credential in the response and, if provided, the constraints in credential_sets. The value MUST be a non-empty string consisting of alphanumeric, underscore (_), or hyphen (-) characters. Within the Authorization Request, the same id MUST NOT be present more than once. |
| format | A required string that specifies the format of the requested Credential. This MUST be set to mso_mdoc. |
| multiple | An optional boolean which indicates whether multiple Credentials can be returned for this Credential Query. If omitted, the default value is false. |
| meta | A required object defining additional properties requested by the Verifier that apply to the metadata and validity data of the Credential. The properties of this object are defined per Credential Format. This MUST contain a doctype_value parameter which is a string that specifies an allowed value for the doctype of the requested Verifiable Credential. It MUST be a valid doctype identifier as defined by ISO 18013-5. |
| trusted_authorities | An optional non-empty array of objects that specifies expected authorities or trust frameworks that certify Issuers, that the Verifier will accept. |
| require_cryptographic_holder_binding | An optional boolean value which indicates whether the Verifier requires a Cryptographic Holder Binding proof. Do not set, as the default value is true. |
| claims | An optional array of claims as defined in this document. Verifiers MUST NOT point to the same claim more than once in a single query. |
| claim_sets | An optional non-empty array containing arrays of identifiers for elements in claims that specifies which combinations of claims for the Credential are requested. |

Each entry in credential_sets MUST be an object with the following parameters:

| Parameter | Description |
|---|---|
| options | A required non-empty array, where each value in the array is a list of Credential Query identifiers representing one set of Credentials that satisfies the use case. The value of each element in the options array is a non-empty array of identifiers which reference elements in credentials. |
| required | An optional boolean which indicates whether this set of Credentials is required to satisfy the particular use case at the Verifier. If omitted, the default value is true. |

Each entry in trusted_authorities array MUST be an object with the following parameters:

| Parameter | Description |
|---|---|
| type | A required string uniquely identifying the type of information about the issuer trust framework. Use “aki” or “etsli_tl”. |
| values | A required non-empty array of strings, where each string (value) contains information specific to the used Trusted Authorities Query type that allows the identification of an issuer, or a trust framework that an issuer belongs to. |

Each entry in claims array MUST be an object with the following parameters:

| Parameter | Description |
|---|---|
| id | A string identifying the particular claim. The value MUST be a non-empty string consisting of alphanumeric, underscore (_), or hyphen (-) characters. Within the particular claims array, the same id MUST NOT be present more than once. Required if claims_set is present, optional otherwise. |
| path | A required value that MUST be a non-empty array representing a claims path pointer that specifies the path to a claim within the Credential. A path pointer into an mdoc contains two elements of type string. The first element refers to a namespace and the second element refers to a data element identifier. |
| values | An optional non-empty array of strings, integers or boolean values that specifies the expected values of the claim. If the values property is present, the Wallet SHOULD return the claim only if the type and value of the claim both match exactly for at least one of the elements in the array. |
| intent_to_retain | An optional boolean variable that indicates whether the Verifier intends to retain the received data element. Default value is false. The Verifier SHALL not retain any data elements, except for data elements for which the intent_to_retain flag was set to true in the request. To retain is defined as “to store for a period longer than necessary to conduct the transaction in realtime”. |

## Handling Authorization Response

After user consent, Wallet sends the encrypted Authorization Response as JWE using HTTP POST method to Verifier’s response_uri, with the following parameters encoded as application/x-www-form-urlencoded:

| Parameter | Description |
|---|---|
| response | A string containing the encrypted Authorization Response in JWE format. |

The Authorization Response JWE header has the following parameters:

| Parameter | Description |
|---|---|
| alg | Always set to ECDH-ES. |
| enc | Always set to A256GCM. |
| kid | Value of the kid JWK parameter of the public key that was used for key agreement to encrypt the response. |
| epk | The public key of the generated ephemeral key pair of the Wallet encoded as a JWK. |
| apu | base64url-encoded-with-no-padding value of the device nonce. |
| apv | base64url-encoded-with-no-padding value of the utf-8 encoded nonce parameter from the Authorization Request object. |

The Authorization Response JWE payload has the following parameters:

| Parameter | Description |
|---|---|
| vp_token | This is a JSON-encoded object containing entries where the key is the id value used for a Credential Query in the DCQL query and the value is an array of one or more base64url-encoded DeviceResponse structures, which is documented in the Format section of this document. |
| state | The value of the state string that was submitted as part of the Authorization Request. Usually used to pass the authorization request-id persisted by the Verifier, correlating between Authorization Request and Response. |

The Verifier can decrypt Authorization Response JWE with a derived AES-256 symmetric key using Concat KDF algorithm, according to Section 4.6 from RFC 7518 using:

• Private part of the ephemeral key of the Verifier (recipient), of which the public part was sent to Wallet in Authorization Request JWS payload client_metadata.jwks parameter identified by kid parameter sent back in Authorization Response JWE header.

• Public part of the ephemeral key of the Wallet (producer or sender) sent to Verifier in Authorization Response JWE header epk parameter.

• Information about producer, sent in Authorization Response JWE header apu parameter, which is the device nonce generated by Wallet.

• Information about recipient, sent in Authorization Response JWE header apv parameter, which is Verifier’s nonce originally sent in Authorization Request JWS payload.

Verifier shall also ensure that the apv JWE header value matches the transaction persisted nonce value.

To ensure authenticity and non-repudiation, before processing the received document elements, the Verifier shall validate it according to Response validation section.

Upon successful processing of Authorization Response or Authorization Error Response, the Verifier MUST respond with an HTTP status code of 200 with Content-Type of application/json and a JSON object in response body with the following parameters:

| Parameter | Description |
|---|---|
| redirect_uri | An optional string containing a URI. When this parameter is present the Wallet MUST redirect the user agent to this URI. This allows the Verifier to continue the interaction with the End-User on the device where the Wallet resides after the Wallet has sent the Authorization Response to the Response URI. |

## Authorization Error Response

In case of error, Wallet sends the plain Authorization Error Response using HTTP POST method to Verifier’s response_uri, with the following parameters encoded as application/x-www-form-urlencoded:

| Parameter | Description |
|---|---|
| error | Error code with values described in this section. |
| error_description | Human readable error description. |
| state | The value of the state string that was submitted as part of the Authorization Request. Usually used to pass the authorization request-id persisted by the Verifier, correlating between Authorization Request and Response. |

Upon successful processing of Authorization Error Response, the Verifier MUST respond as documented for Authorization Response.

The error response follows the rules as defined in RFC 6749, with the following additional clarifications:

#### invalid_scope
- Requested scope value is invalid, unknown, or malformed.

#### invalid_request
- The request contains both a dcql_query parameter and a scope parameter referencing a DCQL query.
- The request uses the vp_token Response Type but does not include a dcql_query parameter nor a scope parameter referencing a DCQL query.
- The Wallet does not support the Client Identifier Prefix passed in the Authorization Request.
- The Client Identifier passed in the request did not belong to its Client Identifier Prefix, or requirements of a certain prefix were violated, for example an unsigned request was sent with Client Identifier Prefix https.

#### invalid_client
- client_metadata parameter is present, but the Wallet recognizes Client Identifier and knows metadata associated with it.
- Verifier's pre-registered metadata has been found based on the Client Identifier, but client_metadata parameter is also present.

#### access_denied
- The Wallet did not have the requested Credentials to satisfy the Authorization Request.
- The End-User did not give consent to share the requested Credentials with the Verifier.
- The Wallet failed to authenticate the End-User.

This document also defines the following additional error codes and error descriptions:

#### vp_formats_not_supported
- The Wallet does not support any of the formats requested by the Verifier, such as those included in the vp_formats_supported registration parameter.

#### invalid_request_uri_method
- The value of the request_uri_method request parameter is neither get nor post (case-sensitive).

#### invalid_transaction_data
- any of the following is true for at least one object in the transaction_data structure:
  - contains an unknown or unsupported transaction data type value,
  - is an object of a known type but containing unknown fields,
  - contains fields of the wrong type for the transaction data type,
  - contains fields with invalid values for the transaction data type,
  - is missing required fields for the transaction data type,
  - the credential_ids does not match, or
  - the referenced Credential(s) are not available in the Wallet.

#### wallet_unavailable
- The Wallet appears to be unavailable and therefore unable to respond to the request. It can be useful in situations where the user agent cannot invoke the Wallet and another component receives the request while the End-User wishes to continue the journey on the Verifier website. For example, this applies when using claimed HTTPS URIs handled by the Wallet provider in case the platform cannot or does not translate the URI into a platform intent to invoke the Wallet. In this case, the Wallet provider would return the Authorization Error Response to the Verifier and might redirect the user agent back to the Verifier website.

￼
