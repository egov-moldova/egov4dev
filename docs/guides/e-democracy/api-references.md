## Error Handling

<table>
<tr><th>Code</th><th>Description</th></tr>
<tr><td>AuthenticationFailed</td><td>System authentication failed</td></tr>
<tr><td>InvalidParameter</td><td>Invalid request parameter</td></tr>
<tr><td>AccessDenied</td><td>Insufficient permissions</td></tr>
<tr><td>PetitionNotFound</td><td>Petition identifier not found</td></tr>
<tr><td>200</td><td>Success</td></tr>
<tr><td>400</td><td>Bad request</td></tr>
<tr><td>401</td><td>Unauthorized</td></tr>
<tr><td>403</td><td>Forbidden</td></tr>
<tr><td>404</td><td>Not found</td></tr>
<tr><td>500</td><td>Server error</td></tr>
</table>

## API Methods

```http
GET /authority/petitions
```

**Summary**

Retrieve paginated list of petitions for the authenticated authority.

**Authorization**

Requires a valid JWT or client certificate mapped to a public authority system.

**Query parameters**:

- `page` (int, optional, default: 1) – page number
- `pageSize` (int, optional, default: 10) – items per page
- `excludeRegistered` (bool, optional) – exclude petitions already registered for processing
- `status` (FodStatusEnumModel, repeated, optional) – filter by petition status

**Responses**:

- `200 OK` – `DataResponse<PetitionModel>`
- `204 No Content` – no petitions found
- `400 Bad Request` – invalid parameters
- `403 Forbidden` – insufficient permissions
- `500 Internal Server Error`

```http
POST /requestor/petitions
```

**Summary**

Retrieve paginated list of petitions for a specific citizen or economic operator.

**Authorization**

Requires a valid JWT or client certificate. The owner context (IDNP/IDNO) is taken from the token/certificate and must match the request body.

**Request body** (`PetitionsRequest`):

- `page` (int, optional, default: 1)
- `pageSize` (int, optional, default: 10)
- `filterStatuses` (FodStatusEnumModel[], optional)
- `excludeRegistered` (bool, optional)
- `contextId` (string, required) – IDNP or IDNO of the petition owner

**Responses**:

- `200 OK` – `DataResponse<PetitionModel>`
- `401 Unauthorized` – authentication failed
- `403 Forbidden` – insufficient permissions
- `500 Internal Server Error`

```http
GET /authority/petitions/{petitionNumber}/pdf
```

**Summary**

Download the main petition document (PDF) for the authority.

**Route parameters**:

- `petitionNumber` (string, required) – petition identifier

**Responses**:

- `200 OK` – `PetitionFileResponse` (content, content type, file name)
- `204 No Content` – document not found
- `400 Bad Request` – petition not found or invalid request
- `403 Forbidden` – insufficient permissions
- `500 Internal Server Error` 

```http
GET /authority/petitions/{petitionNumber}/attachment/{attachmentId}
```

**Summary**

Download an attachment file for a petition.  

**Route parameters**:

- `petitionNumber` (string, required)
- `attachmentId` (guid, required)

**Responses**:

- `200 OK` – `PetitionFileResponse`
- `204 No Content` – attachment not found
- `400 Bad Request` – petition or attachment not found / invalid request
- `403 Forbidden` – insufficient permissions
- `500 Internal Server Error`

```http
GET /requestor/{contextId}/{petitionNumber}/{responseId}
```

**Summary**

Download a petition response document for a citizen / economic operator.

**Route parameters**:

- `contextId` (string, required) – IDNP/IDNO of the petition owner
- `petitionNumber` (string, required)
- `responseId` (string, required)

**Responses**:

- `200 OK` – binary file content
- `204 No Content` – response document not found
- `401 Unauthorized` – authentication failed
- `403 Forbidden` – insufficient permissions
- `500 Internal Server Error`
  
```http
GET /requestor/extend-term/{contextId}/{petitionNumber}/{decisionId}
```

**Summary**

Download the extend-term decision document for a petition.

**Route parameters**:

- `contextId` (string, required) – IDNP/IDNO of the petition owner
- `petitionNumber` (string, required)
- `decisionId` (string, required)

**Responses**:

- `200 OK` – binary file content
- `204 No Content` – decision document not found
- `401 Unauthorized` – authentication failed
- `403 Forbidden` – insufficient permissions
- `500 Internal Server Error`

```http
DELETE /requestor/{contextId}/{petitionNumber}
```

**Summary**

Delete or hide a petition for a citizen / economic operator.

**Route parameters**:

- `contextId` (string, required) – IDNP/IDNO of the petition owner
- `petitionNumber` (string, required)

**Responses**:

- `200 OK` – `bool` result indicating success
- `401 Unauthorized` – authentication failed
- `403 Forbidden` – insufficient permissions
- `500 Internal Server Error`

```http
POST /authority/petitions/register
```

**Summary**

Register the start of petition processing by the authority.

**Authorization**

Requires authority system identity via JWT or certificate.

**Request body** (`RegisterPetitionRequestModel`):

- `petitionNumber` (string, required)
- `registrationNumber` (string, required)
- `registrationDate` (DateTime, required)
- `responsiblePersonIdnp` (string, required)
- `estimatedResolveDate` (DateTime?, optional)

**Responses**:

- `200 OK` – registration successful
- `400 Bad Request` – petition not found or validation error
- `403 Forbidden` – insufficient permissions
- `500 Internal Server Error`

```http
POST /authority/petitions/close
```

**Summary**

Register petition closure and upload the response document.

**Authorization**

Requires authority system identity via JWT or certificate.

**Request body** (`ClosePetitionRequestModel`):

- `petitionNumber` (string, required)
- `petitionExitNumber` (string, required)
- `satisfactionState` (ResponseState)
- `rejectionState` (ResponseState)
- `refuseState` (ResponseState)
- `unexaminedState` (ResponseState)
- `redirectedState` (ResponseState)
- `file` (`PetitionResponseFile`, required) – response document
- `responsiblePersonIdnp` (string, required)
- `responseDate` (DateTime?, optional)

**Responses**:

- `200 OK` – closure registered successfully
- `400 Bad Request` – petition not found or validation error
- `403 Forbidden` – insufficient permissions
- `500 Internal Server Error` 
