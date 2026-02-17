EVO Wallet currently supports Verifiable Presentations, i.e. documents, in mdoc format, according to ISO 18013-5:2022. The standard defines them as Concise Binary Object Representation (CBOR) structures.

This section contains definitions in Concise Data Definition Language (CDDL) described in **RFC 8610**, a language used to define CBOR data structures. In CDDL, **bstr** refers to Byte String, defined as major type 2 and **tstr** refers to Text String, defined as major type 3 (encoded as UTF-8).

DeviceResponse, i.e. device retrieval mdoc response, shall be encoded and formatted as follows:

```
DeviceResponse = {
  “version”: tstr,                      ; Version DeviceResponse, shall be “1.0”
  ? “documents”: [+Document],           ; Returned documents
  ? “documentErrors”: [+DocumentError]  ; error codes for unreturned documents
  “status”: uint                        ; Status code, set to 0 when OK
}

Document = {
  “docType”: tstr                       ; Document type returned
  “issuerSigned”: IssuerSigned,         ; Returned data elements signed by the issuer
  “deviceSigned”: DeviceSigned          ; Returned data elements signed by the wallet
  ? “errors”: Errors
}

DocumentError = {
  DocType => ErrorCode                  ; Error codes for unreturned documents
}

IssuerSigned = {
  ? “nameSpaces”: IssuerNameSpaces,     ; Returned data elemenents
  “issuerAuth”: IssuerAuth              ; Contains the mobile security object (MSO)
                                        ; for issuer data authentication
}

IssuerNameSpaces = {
  + NameSpace => [+IssuerSignedItemBytes]     ; Returned data elements for each namespace
}

IssuerSignedItemBytes = #6.24(bstr .cbor IssuerSignedItem)

IssuerSignedItem = {
  “digestID”: DigestID,                       ; Digest ID for issuer data authentication
  “random”: bstr,                             ; Random value for issuer data authentication
  “elementIdentifier”: DataElementIdentifier, ; Data element identifier
  “elementValue”: DataElementValue            ; Data element value
}

IssuerAuth = Cose_Sign1             ; Untagged COSE_Sign1 signature of embedded
                                    ; MobileSecurityObjectBytes with Issuer certificate
                                    ; chain as COSE_X509 in x5chain unprotected header
                                    ; according to RFC 9360

MobileSecurityObjectBytes = #6.24(bstr .cbor MobileSecurityObject)

MobileSecurityObject = {
  “version”: tstr,                  ; Version of MobileSecurityObject, shall be “1.0”
  “digestAlgorithm”: tstr           ; Message digest algorithm used
  “valueDigests”: ValueDigests,     ; Digests of all data elements per namespace
  “deviceKeyInfo”: DeviceKeyInfo,   ; Info about device key
  “docType”: DocType,               ; Document type
  “validityInfo”: ValidityInfo      ; Info about document validity
  ? “status”: StatusInfo            ; Info about document status
}

ValueDigests = {
  + NameSpace => DigestIDs          ; Digest IDs for each namespace
}

DigestIDs = {
  + DigestID => Digest              ; Digest value corresponding to DigestID
}

DeviceKeyInfo = {
  “deviceKey”: DeviceKey,                   ; Device public key
  ? “keyAuthorizations”: KeyAuthorizations, ; Device key usage authorizations
  ? “keyInfo”: KeyInfo                      ; Device key information
}

DeviceKey = COSE_Key                        ; Untagged COSE_Key (RFC 8152)

KeyAuthorizations = {
  ? “nameSpaces”: AuthorizedNameSpaces      ; Namespaces authorized for DeviceKey
  ? “dataElements”: AuthorizedDataElements  ; Data elements authorized for DeviceKey
}

AuthorizedNameSpaces = [
  + NameSpace
]

AuthorizedDataElements = {
  + NameSpace => DataElementsArray
}

DataElementsArray = [
 + DataElementIdentifier
]

KeyInfo = {
 * int => any                   ; Positive integers are RFU, negative integers may
                                ; be for proprietary use
}

ValidityInfo = {
  “signed”: tdate,
  “validFrom”: tdate,
  “validUntil”: tdate,
  ? “expectedUpdate”: tdate
}

StatusInfo = {
  “status_list”: StatusListInfo ; Reference to status CWT
}

StatusListInfo = {
  “idx”: uint                   ; The index to check for status information
  “uri”: tstr                   ; Status list token URI
}

DeviceSigned = {
  “nameSpaces”: DeviceNameSpacesBytes,  ; Returned data elements
  “deviceAuth”: DeviceAuth              ; Device authentication for mdoc
                                        ; authentication (i.e. presentation)
}

DeviceNameSpacesBytes = #6.24(bstr .cbor DeviceNameSpaces)

DeviceNameSpaces = {
  * NameSpace => DeviceSignedItems      ; Returned data elements for each namespace
}

DeviceSignedItems = {
  + DataElementIdentifier => DataElementValue ; Returned data element 
                                              ; identifier and value
}

DeviceAuth = {
  “deviceSignature”: DeviceSignature          ; Signature for mdoc authentication
}

DeviceSignature = COSE_Sign1                  ; Untagged COSE_Sign1 signature of 
                                              ; detached DeviceAuthenticationBytes

DeviceAuthenticationBytes = #6.24(bstr .cbor DeviceAuthentication)

DeviceAuthentication = [
  “DeviceAuthentication”,
  SessionTranscript,
  DocType,
  DeviceNameSpacesBytes
]

SessionTranscript = [
  null,                     ; DeviceEngagementBytes set to null
  null,                     ; EReaderKeyBytes set to null
  OpenID4VPHandover         ; OpenID4VP-specific handover structure
]

OpenID4VPHandover = [
 “OpenID4VPHandover”,       ; A fixed identifier for this handover type
 OpenID4VPHandoverInfoHash  ; A cryptographic hash of OpenID4VPHandoverInfo
]

OpenID4VPHandoverInfoHash = bstr ; SHA-256 hash of OpenID4VPHandoverInfoBytes

OpenID4VPHandoverInfoBytes = bstr .cbor OpenID4VPHandoverInfo

OpenID4VPHandoverInfo = [
  clientId: tstr,           ; client_id request parameter, including prefix
  nonce: tstr,              ; nonce request parameter
  jwkThumbprint: bstr,      ; JWK SHA-256 Thumbprint (RFC 7638) of the 
                            ; Verifier’s public key used for encryption
  responseUri: tstr         ; response_uri request parameter
]

Errors = {
  + NameSpace => ErrorItems ; Error codes for each namespace
}

ErrorItems = {
  + DataElementIdentifier => ErrorCode  ; Error code per data element

}

DocType = tstr                          ; Document type

NameSpace = tstr                        ; Namespace name

DateElementIdentifier = tstr            ; Data element identifier (name)

DataElementValue = any                  ; Data element value

DigestID = uint                         ; Digest identifier used in IssuerSignedItem

Digest = bstr                           ; Hash value

ErrorCode = int                         ; Error code
```
