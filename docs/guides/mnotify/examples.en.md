This document provides examples of requests to MNotify. All requests are made using the curl command. Regardless of the chosen technology, you should construct the HTTP request to match the curl example. Install the client certificate in your HTTP request according to the technology you are using.

Below is an example showing how it is installed for a curl request:

```bash
$ curl \
--cert pathTo\public.pem:exportedPassword \
--key pathTo\privateKey.pem \
```

Set curl HTTP Header for content type by adding:

```bash
-H 'Content-Type: application/json'
```

All curl requests will include the –cert, --key, and -H parameters.

For simplicity, these parameters are not shown in the examples below.

## Send notification

**Request:**

```bash
curl -X 'POST' \
 'https://mnotify.staging.egov.md:8443/api/Notification' \
 -d '{
 "subject": {
 "ro": "Titlu",
 "en": "Title",
 "ru": "Заголовок"
 },
 "body": {
 "ro": "Corpul mesajului",
 "en": "Message body",
 "ru": "Текст сообщения"
 },
 "recipients": [
 {
 "value": "customer.email@gmail.com",
 "type": "Email"
 }
 ],
 "priority": "Low"
}'
```

**Response:**

```
9d871bac-f99c-4123-be7b-b391009a59db
```

To add an attachment to the notification request, you need to include the following section in the request body.

```json
"attachments": [
 {
 "fileName": "name_of_file.pdf",
 "base64": "encoded_byte_array"
 }
 ]
```

To use the recipient identification option (IDR), include the sections in the request body as shown in the example below.

```json
 "recipients": [
 {
 "value": "1010600034203",
 "type": "IDNO"
 }
 ],
 "resolutionPolicy": {
 "type": "IDNP",
 "parameters": {
 "direction": "Administrator"
 }
 }
```

## Get sender notifications

**Request:**

```bash
curl -X 'GET' \
'https://mnotify.staging.egov.md:8443/api/Notification?Page=1&ItemsPerPage=2&OrderField=createdAt%20desc'
```

**Response:**

```json
[
 {
 "id": "9d871bac-f99c-4123-be7b-b391009a59db",
 "status": "Sent",
 "createdAt": "2025-11-10T09:21:58.180599Z",
 "lastUpdatedAt": "2025-11-10T09:21:58.1805991Z",
 "createdBy": "49ce9f66-8d0b-e611-80e5-0050569d1194",
 "lastUpdatedBy": "49ce9f66-8d0b-e611-80e5-0050569d1194"
 },
 {
 "id": "6716a795-dc85-47fa-8677-b391008f67f6",
 "status": "Sent",
 "createdAt": "2025-11-10T08:42:07.6729122Z",
 "lastUpdatedAt": "2025-11-10T08:42:07.6729122Z",
 "createdBy": "49ce9f66-8d0b-e611-80e5-0050569d1194",
 "lastUpdatedBy": "49ce9f66-8d0b-e611-80e5-0050569d1194"
 }
]
```

## Get sender notification

**Request:**

```bash
curl -X 'GET' \
'https://mnotify.staging.egov.md:8443/api/Notification/9d871bac-f99c-4123-be7b-b391009a59db'
```

**Response:**

```json
{
 "id": "9d871bac-f99c-4123-be7b-b391009a59db",
 "status": "Sent",
 "recipients": []
}
```

## Cancel notification

**Request:**

```bash
curl -X 'DELETE' \
 'https://mnotify.staging.egov.md:8443/api/Notification/9d871bac-f99c-4123-be7b-b391009a59db'
```

**Response:**

```
9d871bac-f99c-4123-be7b-b391009a59db
```

## Create template

**Static variables:**

1. {{Date}}
2. {{Time}}
3. {{IDNP}}
4. {{IDNO}}
5. {{RecipientFirstName}}
6. {{RecipientLastName}}

**Request:**

```bash
curl -X 'POST' \
 'https://mnotify.staging.egov.md:8443/api/Template' \
 -d '{
 "name": "Welcome email",
 "description": "Send a custom message",
 "subject": {
 "ro": "Bun venit",
 "en": "Welcome",
 "ru": "Добро пожаловать"
 },
 "body": {
 "ro": "Dragă {{customerName}},\nBine venit....",
 "en": "Dear {{customerName}},\nWelcome....",
 "ru": "Дорогой {{customerName}},\nДобро пожаловать..."
 }
}'
```

**Response:**

```
de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff
```

## Update template

**Request:**

```bash
curl -X 'PUT' \
 'https://mnotify.staging.egov.md:8443/api/Template/de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff' \
 -d '{
 "name": "string",
 "description": "string",
 "subject": {
 "ro": "Bun venit",
 "en": "Welcome",
 "ru": "Добро пожаловать"
 },
 "body": {
 "ro": "Dragă {{customerName}},\nBine venit....",
 "en": "Dear {{customerName}},\nWelcome....",
 "ru": "Дорогой {{customerName}},\nДобро пожаловать..."
 },
 "bodyShort": {
 "ro": "{{customerName}}, bine ai venit în NumeCompanie!",
 "en": "{{customerName}}, welcome to CompanyName!",
 "ru": "{{customerName}}, добро пожаловать в CompanyName!"
 }
}'
```

**Response:**

```
de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff
```

## Check template

**Request:**

```bash
curl -X 'POST' \
 'https://mnotify.staging.egov.md:8443/api/Template/de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff/check' \
 -d '{
 "variables": "{\"customerName\":\"John Doe\"}"
}'
```

**Response:**

```json
{
 "id": "de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff",
 "senderId": "1010600034203",
 "createdAt": "2025-11-10T09:53:14.0583598Z",
 "lastUpdatedAt": "2025-11-10T10:02:28.5479236Z",
 "createdBy": "1010600034203",
 "lastUpdatedBy": "1010600034203",
 "name": "string",
 "description": "string",
 "subject": {
 "ro": "Bun venit",
 "en": "Welcome",
 "ru": "Добро пожаловать"
 },
 "body": {
 "ro": "Dragă John Doe,\nBine venit....",
 "en": "Dear John Doe,\nWelcome....",
 "ru": "Дорогой John Doe,\nДобро пожаловать..."
 },
 "bodyShort": {
 "ro": "John Doe, bine ai venit în NumeCompanie!",
 "en": "John Doe, welcome to CompanyName!",
 "ru": "John Doe, добро пожаловать в CompanyName!"
 }
}
```

## Get sender templates

**Request:**

```bash
curl -X 'GET' \
 'https://mnotify.staging.egov.md:8443/api/Template?Page=1&ItemsPerPage=2&OrderField=createdAt%20desc'
```

**Response:**

```json
[
 {
 "id": "de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff",
 "name": "string",
 "createdAt": "2025-11-10T09:53:14.0583598Z",
 "lastUpdatedAt": "2025-11-10T10:02:28.5479236Z",
 "createdBy": "1010600034203",
 "lastUpdatedBy": "1010600034203"
 },
 {
 "id": "b9aebe65-6397-4d83-8394-26be82e65070",
 "name": "string",
 "createdAt": "2025-11-10T07:12:59.1376564Z",
 "lastUpdatedAt": "2025-11-10T07:12:59.1376752Z",
 "createdBy": "1010600034203",
 "lastUpdatedBy": "1010600034203"
 }
]
```

## Get sender template

**Request:**

```bash
curl -X 'GET' \
 'https://mnotify.staging.egov.md:8443/api/Template/de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff'
```

**Response:**

```json
{
 "id": "de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff",
 "senderId": "1010600034203",
 "createdAt": "2025-11-10T09:53:14.0583598Z",
 "lastUpdatedAt": "2025-11-10T10:02:28.5479236Z",
 "createdBy": "1010600034203",
 "lastUpdatedBy": "1010600034203",
 "name": "string",
 "description": "string",
 "subject": {
 "ro": "Bun venit",
 "en": "Welcome",
 "ru": "Добро пожаловать"
 },
 "body": {
 "ro": "Dragă {{customerName}},\nBine venit....",
 "en": "Dear {{customerName}},\nWelcome....",
 "ru": "Дорогой {{customerName}},\nДобро пожаловать..."
 },
 "bodyShort": {
 "ro": "{{customerName}}, bine ai venit în NumeCompanie!",
 "en": "{{customerName}}, welcome to CompanyName!",
 "ru": "{{customerName}}, добро пожаловать в CompanyName!"
 }
}
```

## Delete sender template

**Request:**

```bash
curl -X 'DELETE' \
 'https://mnotify.staging.egov.md:8443/api/Template/de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff'
```

**Response:**

```
de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff
```
