# API References

This section summarizes key API behaviors and links to the full, interactive API documentation.

- **Swagger (development):** [https://mdocs.dev.egov.md:8443/api/swagger/index.html](https://mdocs.dev.egov.md:8443/api/swagger/index.html)

---

## Error handling rules

For errors that result from REST interface invocations, MDocs returns HTTP status codes with explanations.

| HTTP Status | Meaning |
|---|---|
| 400 Bad Request | The input request is not valid JSON or parameters are invalid |
| 401 Unauthorized | The client could not be identified/authenticated |
| 403 Forbidden | The server understood the request but refuses to authorize it |
| 404 Not Found | The URL is not in service or no data found for provided parameters |
| 413 Payload Too Large | The message exceeds the maximum allowed size (current overall limit ~256 KB) |
| 500 Internal Server Error | Error triggered by a defective operation of MDocs; contact administrators |
| 507 Server Error | Generic server error |

Note: In languages that support try/catch, HTTP error handling is the appropriate way to handle service invocation errors.

---

## Blobs API

- `POST /blobs` — upload blob
- `PUT /blobs/{id}` — complete partial upload
- `DELETE /blobs/{id}` — mark for deletion
- `POST /transform` — transform file (PDF/HTML)

### POST /blobs — Upload or initiate a partial upload
Represents the contents of a document.

**Parameters:**
- `documentTypeCode`: string (required) — document type code

**Example JSON body:**
```json
{
  "idn": "xxxxxxx",
  "name": "Ion Ionescu",
  "Date": "2023-02-28",
  "Depts": [
    { "budgetCode": "Consolidat", "totalDebt": 31.36 },
    { "budgetCode": "Bugetul asigurarilor sociale de stat", "totalDebt": 1436.44 }
  ]
}
```

**Responses:**
- 201 Created
```json
{ "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
```
- 400 Bad Request — Parameter is invalid
- 403 Forbidden

---

### PUT /blobs/{id} — Continue/complete partial upload
- Part size range: **5 MiB to 5 GiB**
- Last part size: **0 B to 5 GiB**

**Request body:**
```json
{
  "idn": "xxxxxxx",
  "name": "Ion Ionescu",
  "Date": "2023-02-28",
  "Depts": [
    { "budgetCode": "Consolidat", "totalDebt": 31.36 },
    { "budgetCode": "Bugetul asigurarilor sociale de stat", "totalDebt": 1436.44 }
  ]
}
```

---

### DELETE /blobs/{id} — Marks a blob as deleting
**Responses:**
- 200 OK — blob deleted
- 400 Bad Request
- 403 Forbidden
- 404 Not Found

---

### POST /transform — Transform uploaded file
**Parameters:**
- `documentTypeCode` (required)
- `format` (required): `Pdf` or `Html`
- `language`: `Ro`, `En`, or `Ru`

**Request body:**
```json
{
  "idn": "xxxxxxx",
  "name": "Ion Ionescu",
  "Date": "2023-02-28",
  "Depts": [
    { "budgetCode": "Consolidat", "totalDebt": 31.36 },
    { "budgetCode": "Bugetul asigurarilor sociale de stat", "totalDebt": 1436.44 }
  ]
}
```

---

## Documents API

- `GET /documents` — list documents
- `POST /documents` — create document
- `GET /recycled-documents` — list recycle bin
- `DELETE /recycled-documents` — empty recycle bin
- `GET /documents/{id}` — get metadata
- `PATCH /documents/{id}` — update properties
- `DELETE /documents/{id}` — recycle or delete permanently
- `GET /documents/{id}/versions` — list versions
- `POST /recycled-documents/{id}/restore` — restore document
- `GET /documents/{id}/size` — calculate size
- `POST /documents/{id}/copy` — copy document
- `GET /documents/{id}/blob` — download contents
- `POST /documents/{id}/blob` — overwrite contents

---

### Example: POST /documents
```json
{
  "blobId": "49f62517-bfdc-438b-b625-018aac4fddfd",
  "documents": [
    {
      "principal": "urn:md:idnp:xxxxxxx",
      "name": "JsonDoc",
      "number": "XT-85214P",
      "expiresOn": "2023-11-19T07:10:24.338Z",
      "createdOn": "2023-09-19T07:10:24.338Z",
      "createdBy": "urn:md:idnp:xxxxxxx",
      "folderId": "110b0724-6f02-48c1-af48-018a6029ef71"
    }
  ]
}
```

**Response (201 Created):**
```json
[
  {
    "id": "02f94707-20a8-4896-bafa-018aac5041aa",
    "name": "JsonDoc",
    "principal": "urn:md:idnp:xxxxxxx",
    "expiresOn": "2023-11-19T07:10:24.338Z"
  }
]
```

---

### Example: GET /documents/{id}
```json
{
  "id": "3109b560-6096-4af9-b67b-018ab719f623",
  "name": "Doc.pdf",
  "folderName": "Root",
  "number": "BY-56874",
  "expiresOn": "2023-10-01T09:37:26.6574102",
  "type": "Cazier",
  "size": 10880271,
  "createdBy": "urn:md:idno:xxxxxxx",
  "createdByName": "Public Institution E-Government",
  "modifiedBy": "urn:md:idnp:xxxxxxx",
  "modifiedByName": "Ion Ionescu"
}
```

---

## Document sharing API

- `POST /documents/{id}/shares` — share document
- `GET /documents/{id}/shares` — list shares
- `PUT /documents/{id}/shares/{shareid}` — modify share
- `DELETE /documents/{id}/shares/{shareid}` — delete share

**Example:**
```json
[
  {
    "for": "urn:md:idno:xxxxxxx",
    "from": "2023-09-26T06:14:01.795Z",
    "to": "2023-10-26T06:14:01.795Z",
    "permission": "write"
  }
]
```

---

## Shares API

- `GET /shares/for-me` — documents shared **to me**
- `GET /shares/by-me` — documents shared **by me**
- `POST /shares/reservations` — reserve share

**Example (reservation response):**
```json
{
  "id": "1b3d3a56-72a3-4601-bf72-018af98d7a8e",
  "accessCode": "47211813",
  "fullLink": "https://mdocs.dev.egov.md/view/1b3d3a56-72a3-4601-bf72-018af98d7a8e?accessCode=47211813"
}
```

---

## Document types
- `GET /document-types/{code}` — get document type details

**Example:**
```json
{
  "code": "Spinner",
  "title_Romanian": "Spinner",
  "versioningEnabled": true,
  "icon": null
}
```

---

## Principals
- `GET /principals/{id}/name` — get principal name

---

## Quota
- `GET /quota` — get storage quota usage

**Example:**
```json
{
  "storageMaximum": 50000000000,
  "storageUsage": 23082794
}
```
