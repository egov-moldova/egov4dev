## Error handling rules

For errors resulting from REST requests, MNotify returns standard HTTP Status codes with corresponding messages describing the fault in plain English.

| HTTP Status Code | Description |
|-----------------|-------------|
| 200 | Success |
| 400 | Bad request, Validation failed. Check validation rules compliance |
| 401 | Unauthorized Access. Check authorization requirements |
| 403 | Forbidden. The requested action is not allowed for the transmitted ID |
| 404 | Not found. Check the sent request data |
| 409 | Conflict |
| 501 | A server error occurred. Contact the Administrator. |

## Service operations

### GET /api/Notifications/

**Description:** shows all the notifications transmitted by a sender.

**Returns:** NotificationShortDto[]

**Input parameters:**

| Name | Type | Description |
|------|------|-------------|
| Page | integer | Current page number |
| ItemsPerPage | integer | Items per page |
| OrderField | string | Can order by response property names (default Id). Ex. "CreatedAt desc" |
| SearchBy | string | Field is parsed as a UUID and filtered as NotificationId. Other filters do not work as not implemented. |

**HTTP Response meaning:**

| Code | Reason |
|------|--------|
| 200 | Success |
| 500-503 | A server error occurred. |

---

### GET /api/Notification/{id}

**Description:** Returns the notification request object with ID, Status, and resolved multiple recipients with multiple messages. The recipient message includes message ID, Status, Subject and the channel used for transmission.

**Returns:** NotificationDto

**Input parameters:**

| Name | Type | Description |
|------|------|-------------|
| id | string | The UUID of the notification was called earlier using PostNotification. Part of URL |

**HTTP Response meaning:**

| Code | Reason |
|------|--------|
| 200 | Success |
| 404 | Not found. |
| 500-503 | A server error occurred. |

---

### POST /api/Notification

**Description:** Notification request to be sent through the MNotify system.

**Returns:** UUID of accepted notification request

**Input parameters:**

| Name | Type | Description |
|------|------|-------------|
| - | Notification | A HTTP POST raw request with UTF-8 encoding and a content type "application/json". |

**Faults:**

| Code | Reason |
|------|--------|
| 200 | Success |
| 400 | Bad Request. |
| 500-503 | A server error occurred. |

---

### DELETE /api/Notification/{id}

**Description:** Delete the notification if it has not been transmitted

**Returns:** notificationID

**Input parameters:**

| Name | Type | Description |
|------|------|-------------|
| id | string | NotificationID, which is to be deleted. Part of URL |

**Faults:**

| Code | Reason |
|------|--------|
| 200 | Success |
| 409 | Conflict |
| 500-503 | A server error occurred. |

---

### GET /api/Template/

**Description:** shows all the notification templates created by a sender.

**Returns:** TemplateShortDto[]

**Input parameters:**

| Name | Type | Description |
|------|------|-------------|
| Page | integer | Current page number |
| ItemsPerPage | integer | Items per page |
| OrderField | string | Can order by response property names (default Id). Ex. "CreatedAt desc" |
| SearchBy | string | Field is parsed as a UUID and filtered as NotificationId. Other filters do not work as not implemented. |

**HTTP Response meaning:**

| Code | Reason |
|------|--------|
| 200 | Success |
| 500-503 | A server error occurred. |

---

### GET /api/Template/{id}

**Description:** Return a specific template created by a sender, including all template properties.

**Returns:** TemplateDto

**Input parameters:**

| Name | Type | Description |
|------|------|-------------|
| id | string | The UUID of the template was called earlier using the PostTemplate request. Part of URL |

**HTTP Response meaning:**

| Code | Reason |
|------|--------|
| 200 | Success |
| 500-503 | A server error occurred. |

---

### GET /api/Template/{id}/check

**Description:** Return a specific template created by a sender, including all template properties.

**Returns:** TemplateDto

**Input parameters:**

| Name | Type | Description |
|------|------|-------------|
| id | string | TemplateId, which is to be filled with variables. Part of URL |
| variables | string | JSON string that contains a KEY-VALUE record to be filled into template |
| userId | string | The userId should complete the template with default variables. At the moment, only IDNx is filled |

**HTTP Response meaning:**

| Code | Reason |
|------|--------|
| 200 | Success |
| 500-503 | A server error occurred. |

---

### POST /api/Template

**Description:** Template request to be saved in the MNotify system.

**Returns:** UUID of accepted template request

**Input parameters:**

| Name | Type | Description |
|------|------|-------------|
| - | TemplateDto | A HTTP POST raw request with UTF-8 encoding and a content type "application/json". |

**Faults:**

| Code | Reason |
|------|--------|
| 200 | Success |
| 400 | Bad Request. |
| 500-503 | A server error occurred. |

---

### PUT /api/Template/{id}

**Description:** Update a specific template created by a sender.

**Returns:** UUID of updated template request

**Input parameters:**

| Name | Type | Description |
|------|------|-------------|
| id | string | The UUID of the template was called earlier using the PostTemplate request. Part of URL |
| - | TemplateDto | A HTTP POST raw request with UTF-8 encoding and a content type "application/json". |

**HTTP Response meaning:**

| Code | Reason |
|------|--------|
| 200 | Success |
| 500-503 | A server error occurred. |

---

### DELETE /api/Template/{id}

**Description:** Delete the template from the MNotify system.

**Returns:** UUID of deleted template

**Input parameters:**

| Name | Type | Description |
|------|------|-------------|
| id | string | The template id, which is to be deleted. Part of URL |

**Faults:**

| Code | Reason |
|------|--------|
| 200 | Success |
| 409 | Conflict |
| 500-503 | A server error occurred. |

---

## Structures

### NotificationShortDto

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| ID | uuid | Required | Notification unique identifier |
| Status | NotificationStatus | Required | Notification status |
| CreatedAt | datetime | Required | Date and time when the Notification was requested |
| LastUpdatedAt | datetime | Required | Date and time when the status of the Notification was changed |
| CreatedBy | string | Required | Identity of the Sender |
| LastUpdatedBy | string | Required | The identity of the system that last modified the Notification object |

### NotificationDto

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| Id | uuid | Required | Notification unique identifier |
| Status | NotificationStatus | Required | Notification status |
| Recipients | RecipientMessagesDto[] | Optional | List of recipients with resolved messages per channel preferences |

### RecipientMessagesDto

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| Value | string | Required | The value of IDNP or IDNO of the recipient registered in MNotify |
| Type | string | Required | "IDNP" or "IDNO" |
| IsLegal | bool | Required | Indicates if the recipient is a legal entity |
| Messages | MessageShortDto[] | Optional | List of messages resolved by IDNP/IDNO |

### MessageShortDto

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| MessageId | uuid | Required | Notification Message unique identifier |
| Subject | string | Required | The message subject. Same as the Notification request subject |
| Status | NotificationStatus | Required | Notification status |
| Channel | Channel | Required | Enumeration of the Channel through the message sent |
| CreatedAt | datetime | Required | Date and time when the Notification was requested |
| LastUpdatedAt | datetime | Required | Date and time when the status of the Notification was changed |
| CreatedBy | string | Required | Identity of the Sender |
| LastUpdatedBy | string | Required | The identity of the system that last modified the Notification object |

### Notification

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| UserId | string | Optional | The field should be completed with the user IDNP in case the notification sender is not a system notification |
| Subject | ContentLanguage | Required | The notification subject |
| Body | ContentLanguage | Required | The notification body. The HTML raw is accepted |
| BodyShort | ContentLanguage | Required | The notification short message. It should be sent through instant message channels in multiple languages |
| Priority | Priority | Required | The priority of notification. It is Enumerable. |
| Template | ContentTemplate | Optional | The notification template to be used for the notification message |
| Recipients | RecipientIdentifierDto[] | Required | The list of recipients for the notification |
| ResolutionPolicy | IdrPolicy | Optional | The resolution policy helps to identify the recipient from IDNO, Cadastral Number IDNV, and vehicle plate number |
| Attachments | Attachment[] | Optional | The notification attachments. Limited formats are allowed (.jpeg,.jpg,.png,.txt,.pdf,.csv,.xls). The maximum size of attachments should not be greater than 10 Mb. |

### ContentTemplate

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| Id | UUID | Required | The template ID received from the template creation request |
| Variables | string | Optional | The variables are sent as a JSON string. For example, {"Name": "John"}. MNotify will change the template body variables with values from variables. For example, body:{"en": "Dear {{Name}}"} would transform into (Dear John) |

### ContentLanguage

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| Ro | string | Required | Romanian content |
| Ru | string | Optional | Russian content |
| En | string | Optional | English content |

### RecipientIdentifierDto

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| Value | string | Required | Contact value. For example, if the type is Email, then a value should be a valid email contact |
| Type | string | Required | Type can take a string value of Channel enumerator |

### IdrPolicy

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| type | string | Required | Could have one of the following values: "IDNO", "IDNV", "CadastralNumber", "PlateNumber" |
| parameters | IdrParameter | Required | The parameter indicates who the receiver is. |

### IdrParameter

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| Direction | string | Required | Could have one of the following values: "Owner", "Administrator", "Founder" |

### Attachment

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| FileName | string | Required | The file name, including extension |
| Base64 | string | Required | Converted file as base64 string |

### TemplateShortDto

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| Id | int | Required | The template Id |
| Name | string | Required | The template name |
| CreatedAt | datetime | Required | Date and time when the Template was requested |
| LastUpdatedAt | datetime | Required | Date and time when the status of the Template was changed |
| CreatedBy | string | Required | Identity of the Sender |
| LastUpdatedBy | string | Required | The identity of the system that last modified the Template object |

### TemplateDto

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| Name | string (50) | Required | The template name |
| Description | string | Required | The Template description |
| Subject | ContentLanguage | Required | The template notification subject |
| Body | ContentLanguage | Required | The template notification body |
| BodyShort | ContentLanguage | Required | The template notification short body |

---

## Enumerations

### Priority

| Member | Description |
|--------|-------------|
| Medium | The notification does not have any specific importance. |
| Low | The importance of the notification is low. |
| High | The importance of the notification is high. |

### NotificationStatus

| Member | Description |
|--------|-------------|
| Pending | The notification request was enqueued for sending. |
| Resolving | The final recipients are being identified, and their preferences are being read. |
| Sending | The final notification is ready to be sent to the resolved recipient and the identified Notification Channel. |
| Sent | The notification was sent to the Notification Channel. |
| Delivered | Notification Channel acknowledged notification delivery. |
| Read | The recipient confirms notification was read. |
| Cancelling | The notification request is in the process of being cancelled. |
| Cancelled | The notification request was successfully canceled. |
| Failed | The notification request was not sent to all recipient channels (except the MCabinet channel). Failed notification request failed, and failure code is included in the notification status response. |

### Channel

| Member | Description |
|--------|-------------|
| Email | The notification delivery channel is e-mail. |
| SMS | The notification delivery channel is a SMS message. |
| Viber | The notification delivery channel is viber. |
| Web push | The notification delivery channel is browser(web push). |
| MCabinet | The notification is sent to MCabinet. |

---

## Validation rules

| Field name | Validation conditions |
|------------|----------------------|
| IDNP | strictly 13 digits |
| Mail address | caracter@caracter.caracter |
| Mail body size | without attachment - 15 MB<br>with attachments - 10 MB |
| Subject length | mail - 41 characters<br>SMS - 160 characters |
| Cancel the notification request | the notification request can not be canceled if:<br>- the notification channel does not support it<br>- the notification was already delivered |
