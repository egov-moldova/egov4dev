This section describes the communication protocol used for credential presentation.

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
