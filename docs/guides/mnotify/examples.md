Acest document oferă exemple de cereri către MNotify. Toate cererile sunt realizate folosind comanda curl. Indiferent de tehnologia aleasă, ar trebui să construiți cererea HTTP astfel încât să corespundă exemplului curl. Instalați certificatul client în cererea dumneavoastră HTTP în funcție de tehnologia utilizată.

Mai jos este prezentat un exemplu care arată modul de instalare pentru o cerere curl:

```bash
$ curl \
--cert pathTo\public.pem:exportedPassword \
--key pathTo\privateKey.pem \
```

Setați antetul HTTP curl pentru tipul de conținut, adăugând:

```bash
-H 'Content-Type: application/json'
```

Toate cererile curl vor include parametrii –cert, --key și -H.

Pentru simplitate, acești parametri nu sunt prezentați în exemplele de mai jos.

## Trimiterea notificării

**Cerere:**

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

**Răspuns:**

```
9d871bac-f99c-4123-be7b-b391009a59db
```

Pentru a adăuga un atașament la cererea de notificare, trebuie să includeți următoarea secțiune în corpul cererii.

```json
"attachments": [
 {
 "fileName": "name_of_file.pdf",
 "base64": "encoded_byte_array"
 }
 ]
```

Pentru a utiliza opțiunea de identificare a destinatarului (IDR), includeți secțiunile în corpul cererii, conform exemplului de mai jos.

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

## Obținerea notificărilor expeditorului

**Cerere:**

```bash
curl -X 'GET' \
'https://mnotify.staging.egov.md:8443/api/Notification?Page=1&ItemsPerPage=2&OrderField=createdAt%20desc'
```

**Răspuns:**

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

## Obținerea unei notificări a expeditorului

**Cerere:**

```bash
curl -X 'GET' \
'https://mnotify.staging.egov.md:8443/api/Notification/9d871bac-f99c-4123-be7b-b391009a59db'
```

**Răspuns:**

```json
{
 "id": "9d871bac-f99c-4123-be7b-b391009a59db",
 "status": "Sent",
 "recipients": []
}
```

## Anularea notificării

**Cerere:**

```bash
curl -X 'DELETE' \
 'https://mnotify.staging.egov.md:8443/api/Notification/9d871bac-f99c-4123-be7b-b391009a59db'
```

**Răspuns:**

```
9d871bac-f99c-4123-be7b-b391009a59db
```

## Crearea unui șablon

**Variabile statice:**

1. {{Date}}
2. {{Time}}
3. {{IDNP}}
4. {{IDNO}}
5. {{RecipientFirstName}}
6. {{RecipientLastName}}

**Cerere:**

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

**Răspuns:**

```
de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff
```

## Actualizarea șablonului

**Cerere:**

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

**Răspuns:**

```
de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff
```

## Verificarea șablonului

**Cerere:**

```bash
curl -X 'POST' \
 'https://mnotify.staging.egov.md:8443/api/Template/de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff/check' \
 -d '{
 "variables": "{\"customerName\":\"John Doe\"}"
}'
```

**Răspuns:**

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

## Obținerea șabloanelor expeditorului

**Cerere:**

```bash
curl -X 'GET' \
 'https://mnotify.staging.egov.md:8443/api/Template?Page=1&ItemsPerPage=2&OrderField=createdAt%20desc'
```

**Răspuns:**

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

## Obținerea unui șablon al expeditorului

**Cerere:**

```bash
curl -X 'GET' \
 'https://mnotify.staging.egov.md:8443/api/Template/de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff'
```

**Răspuns:**

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

## Ștergerea șablonului expeditorului

**Cerere:**

```bash
curl -X 'DELETE' \
 'https://mnotify.staging.egov.md:8443/api/Template/de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff'
```

**Răspuns:**

```
de4ea3da-bc02-4bc3-9c0d-16a0e64a06ff
```
