## Error handling rules

For errors resulted for REST interface invocations, MDocs returns HTTP faults with fault codes and fault reasons describing the fault in plain English.

| Fault Code | Description |
|---|---|
| 400 Bad Request | The input request is not a valid JSON. Any other error which cannot be bypassed -- please note the provide detailed explanation in the response. |
| 401 Unauthorized | Triggered if the input event cannot be identified to be part of any IS |
| 403 Forbidden | Status code indicates that the server understood the request but refuses to authorize it. |
| 404 Not Found | The URL you have reached is not in service at this time (404). No data found for provided parameters. |
| 413 Payload Too Large | Information about the maximum allowed limit size for a message. Current limit for the whole message size is 256 KB. |
| 500 Internal Server Error | Error triggered by a defective work of MDocs system. Please contact MDocs administrators in case you receive such an error. |
| 507 | Server error. |

The clients that are using programming languages that support try...catch blocks, HTTP errors is the correct way to handle service invocation errors.

Documents can be published by client for document owner as well as for other identities.

## Blobs

### POST /blobs

Uploads or initiates partial upload for a blob which represents the contents of a document

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| documentTypeCode | string* | document type code |

*Required

**Request body:**

```json
{
  "idn": "2000009011288",
  "name": "Artur Reaboi",
  "Date": "2023-02-28",
  "Depts": [
    {
      "budgetCode": "Consolidat",
      "totalDebt": 31.36
    },
    {
      "budgetCode": "Bugetul asigurărilor sociale de stat",
      "totalDebt": 1436.44
    }
  ]
}
```

**Responses:**

| HTTP Status | Description | Example |
|---|---|---|
| 201 | The blob was created | `{ "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }` |
| 400 | Bad request - A parameter is invalid | |
| 403 | Forbidden | |

### PUT /blobs/{id}

Continue/complete partial upload for document. Part size range can be 5 MiB to 5 GiB. Last part size can be 0 B to 5 GiB.

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| id | string($uuid) (path)* | Blob id |

*Required

**Request body:**

```json
{
  "idn": "2000009011288",
  "name": "Artur Reaboi",
  "Date": "2023-02-28",
  "Depts": [
    {
      "budgetCode": "Consolidat",
      "totalDebt": 31.36
    },
    {
      "budgetCode": "Bugetul asigurărilor sociale de stat",
      "totalDebt": 1436.44
    }
  ]
}
```

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | The blob was updated |
| 400 | Bad request - A parameter is invalid |
| 403 | Forbidden |

### DELETE /blobs/{id}

Marks a blob as deleting

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| id | string($uuid) (path)* | blob id |

*Required

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | The blob was deleted |
| 400 | Bad request - A parameter is invalid |
| 403 | Forbidden |
| 404 | Not found |

### POST /transform

Transforms the uploaded file into the selected file format

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| documentTypeCode | string* | document type code |
| format | string* | format of the file that will be downloaded (Pdf or Html) |
| language | string | language used for dictionaries (Ro/En/Ru) |

*Required

**Request body:**

```json
{
  "idn": "2000009011288",
  "name": "Artur Reaboi",
  "Date": "2023-02-28",
  "Depts": [
    {
      "budgetCode": "Consolidat",
      "totalDebt": 31.36
    },
    {
      "budgetCode": "Bugetul asigurărilor sociale de stat",
      "totalDebt": 1436.44
    }
  ]
}
```

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 403 | Forbidden |

## Documents

### GET /documents

Displays all documents for current principal

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| principal | string | principal if you want to impersonate an identity |
| type | string | filter list to display only documents of the provided type |
| folderId | string($uuid) (path) | parent folder id |
| page | integer($int32) | number of the page you want to display |
| itemsPerPage | integer($int32) | number of items to display per page |
| orderField | string | order list by the field provided |
| searchBy | string | filter list to display documents that have fields containing the provided text |

**Response body:**

HTTP 200

```json
[
  {
    "id": "de9eb38a-b7e0-4a4c-bc3c-018a5f3ccff9",
    "name": "Docname",
    "folderId": null,
    "folderName": "Root",
    "number": "5",
    "expiresOn": null,
    "type": "Cazier",
    "type_Name_Ro": "Cazier",
    "type_Name_En": null,
    "type_Name_Ru": null,
    "typeIcon": null,
    "size": 92951,
    "indicativeFlags": 0,
    "createdOn": "2023-09-04T06:44:56.912",
    "createdBy": "urn:md:idno:1010600034203",
    "createdByName": "Instituţia Publică CENTRUL DE GUVERNARE ELECTRONICĂ (E-GOVERNMENT)",
    "modifiedOn": "2023-09-12T13:02:25.5085277",
    "modifiedBy": "urn:md:idnp:2002027065619",
    "modifiedByName": "ELENA PLUGARU"
  }
]
```

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 403 | Forbidden |
| 404 | Not Found |

### POST /documents

Create documents

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| blobId | Guid* | The actual content of the document. NULL for folders. |
| principal | String(100)* | Who is the owner of the document in URN format: urn:md:idno/idnp |
| Name | String(250)* | The name of the file or folder |
| number | String(50) | Document number assigned by the issuer of the document |
| expiresOn | DateTime | When set, specifies the expiration date of the document |
| createdOn | DateTime | Equals to UploadedOn when not specified |
| createdBy | String(100) | Principal URN of the creator |
| folderId | Guid | Parent folder, which is a document without BlobId |

*Required

**Request body:**

```json
{
  "blobId": "49f62517-bfdc-438b-b625-018aac4fddfd",
  "documents": [
    {
      "principal": "urn:md:idnp:2002027065619",
      "name": "JsonDoc",
      "number": " XT-85214P",
      "expiresOn": "2023-11-19T07:10:24.338Z",
      "createdOn": "2023-09-19T07:10:24.338Z",
      "createdBy": "urn:md:idnp:2002027065619",
      "folderId": "110b0724-6f02-48c1-af48-018a6029ef71"
    }
  ]
}
```

**Notes:**
- For the document to be published successfully, "expiresOn" must be greater than "createdOn".
- If the client does not set an expiration date to the document type, then the created document will have the expiration date of the document type to which the blob refers.
- If the document type to which the blob refers does not have an expiration date set, then the created document will have expiresOn with the null value.
- At "createdOn" enter the date from which the document will be available, possibly when setting a future creation date, the document will be available from the set date (optional field).
- Validarea formatului identităților se face după formula "urn:md:"

**Response body:**

HTTP 201 Created

```json
[
  {
    "id": "a78e6501-877b-4969-bed7-018aad5406c8",
    "name": "Exemple (2)",
    "principal": "urn:md:idnp:2002027065619",
    "expiresOn": null
  }
]
```

**Responses:**

| HTTP Status | Description |
|---|---|
| 201 | Created |
| 400 | Bad request |
| 403 | Forbidden - Cannot create document because principal does not have Write permission on destination folder or upwards in hierarchy |
| 404 | Not Found |
| 507 | Server Error. Insufficient Storage |

### GET /documents/{id}

Get document details

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| id | string($uuid) (path)* | document id |
| principal | string (query) | principal if you want to impersonate an identity |

*Required

**Response body:**

HTTP 200

```json
{
  "id": "de9eb38a-b7e0-4a4c-bc3c-018a5f3ccff9",
  "name": "Docname",
  "folderId": null,
  "folderName": "Root",
  "number": "5",
  "expiresOn": null,
  "type": "Cazier",
  "type_Name_Ro": "Cazier",
  "type_Name_En": null,
  "type_Name_Ru": null,
  "typeIcon": null,
  "size": 92951,
  "indicativeFlags": 0,
  "createdOn": "2023-09-04T06:44:56.912",
  "createdBy": "urn:md:idno:1010600034203",
  "createdByName": "Instituţia Publică CENTRUL DE GUVERNARE ELECTRONICĂ (E-GOVERNMENT)",
  "modifiedOn": "2023-09-12T13:02:25.5085277",
  "modifiedBy": "urn:md:idnp:2002027065619",
  "modifiedByName": "ELENA PLUGARU"
}
```

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 403 | Forbidden |
| 404 | Not Found |

### PATCH /documents/{id}

Update document

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| id | string($uuid) (path)* | document id |
| principal | string (query) | principal if you want to impersonate an identity |

*Required

**Request body:**

```json
{
  "name": "UpdatedDocName",
  "number": "XT-12345",
  "expiresOn": "2023-12-31T23:59:59Z"
}
```

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 403 | Forbidden |
| 404 | Not Found |

### DELETE /documents/{id}

Delete document (moves to recycle bin)

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| id | string($uuid) (path)* | document id |
| principal | string (query) | principal if you want to impersonate an identity |

*Required

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 403 | Forbidden |
| 404 | Not Found |

### GET /documents/{id}/blob

Download document blob

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| id | string($uuid) (path)* | document id |
| principal | string (query) | principal if you want to impersonate an identity |

*Required

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success - returns the binary content of the document |
| 403 | Forbidden |
| 404 | Not Found |

### GET /documents/{id}/versions

Get document versions

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| id | string($uuid) (path)* | document id |
| principal | string (query) | principal if you want to impersonate an identity |
| page | integer($int32) | number of the page you want to display |
| itemsPerPage | integer($int32) | number of items to display per page |

*Required

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 403 | Forbidden |
| 404 | Not Found |

## Document sharing APIs

### POST /documents/{id}/shares

Share a document with one or more identities

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| id | string($uuid) (path)* | document id |
| principal | string (query) | principal if you want to impersonate an identity |

*Required

**Request body:**

```json
{
  "shares": [
    {
      "sharedFor": "urn:md:idnp:2005042155206",
      "permission": "Read",
      "from": "2023-11-01T00:00:00",
      "to": "2023-11-30T23:59:59"
    }
  ]
}
```

**Notes:**
- `permission`: "Read" or "Write"
- `from` and `to`: Optional date range for the share
- `from` <= `to` and `to` > now

**Responses:**

| HTTP Status | Description |
|---|---|
| 201 | Created |
| 400 | Bad request |
| 403 | Forbidden |
| 404 | Not Found |

### GET /documents/{id}/shares

Get all shares for a document

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| id | string($uuid) (path)* | document id |
| principal | string (query) | principal if you want to impersonate an identity |

*Required

**Response body:**

HTTP 200

```json
{
  "id": "48e0b28a-0784-471b-b0bd-018ae14636c5",
  "name": "json.json",
  "folderId": null,
  "number": "string",
  "type": "Unknown",
  "type_Name_Ro": "Unknown",
  "type_Name_En": null,
  "type_Name_Ru": null,
  "typeIcon": null,
  "size": 11081517,
  "createdOn": "2023-09-06T09:09:02.148974",
  "createdBy": "urn:md:idno:1018600049308",
  "createdByName": "CODWER S.R.L.",
  "modifiedOn": "2023-09-22T11:22:23.7414537",
  "modifiedBy": "urn:md:idno:1018600049308",
  "modifiedByName": "CODWER S.R.L.",
  "expiresOn": "2023-12-09T23:59:59",
  "shares": [
    {
      "id": "b07df74f-f1e5-43f6-ad86-018acd0632e7",
      "permission": "Write",
      "sharedOn": "2023-09-25T15:47:30.1517579",
      "sharedFor": "urn:md:idnp:2005042155206",
      "sharedForName": "LILIA GUPCA",
      "from": "2023-11-01T00:00:00",
      "to": "2023-11-04T00:00:00"
    },
    {
      "id": "08877815-ffd0-4af8-8284-018ae1465b0f",
      "permission": "Write",
      "sharedOn": "2023-09-29T14:09:59.0554621",
      "sharedFor": "urn:md:idno:1003600034203",
      "sharedForName": "LETO S.R.L.",
      "from": null,
      "to": null
    }
  ]
}
```

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 403 | Forbidden |

## Shares APIs

### GET /shares/for-me

List the shares made for the current principal

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| principal | string (query) | principal if you want to impersonate an identity |
| page | integer($int32) | number of the page you want to display |
| itemsPerPage | integer($int32) | number of items to display per page |
| orderField | string | order list by the field provided |
| searchBy | string | filter list to display documents that have fields containing the provided text |

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 403 | Forbidden |

### GET /shares/by-me

List the shares made by the current principal

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| principal | string (query) | principal if you want to impersonate an identity |
| page | integer($int32) | number of the page you want to display |
| itemsPerPage | integer($int32) | number of items to display per page |
| orderField | string | order list by the field provided |
| searchBy | string | filter list to display documents that have fields containing the provided text |

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 403 | Forbidden |

### POST /shares/reservations

Reserves a share

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| generateAccessCode | boolean | generateAccessCode = true if you want to generate access code |

**Response body:**

HTTP 201

```json
{
  "id": "1b3d3a56-72a3-4601-bf72-018af98d7a8e",
  "accessCode": "47211813",
  "fullLink": "https://mdocs.dev.egov.md/view/1b3d3a56-72a3-4601-bf72-018af98d7a8e?accessCode=47211813"
}
```

**Responses:**

| HTTP Status | Description |
|---|---|
| 201 | Created |

## Document types

### GET /document-types/{code}

Get document type details

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| code | String* | Document type code |

*Required

**Response body:**

HTTP 200

```json
{
  "code": "Spinner",
  "title_Romanian": "Spinner",
  "title_English": null,
  "title_Russian": null,
  "versioningEnabled": true,
  "icon": null
}
```

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |

## Principals

### GET /principals/{id}/name

Get principal name

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| id | String (path)* | principal |

*Required

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 403 | Forbidden |

## Quota

### GET /quota

Get quota information

**Parameters**

| Name | Data Type | Description |
|---|---|---|
| principal | String (query)* | Principal if you want to impersonate an identity |

**Response body:**

HTTP 200

```json
{
  "storageMaximum": 50000000000,
  "storageUsage": 23082794
}
```

**Responses:**

| HTTP Status | Description |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 403 | Forbidden |
| 507 | Server Error |
