# Examples

The examples follow the [booking flow](api-reference.md#booking-flow). Every call is made over mutual TLS, so the client certificate and its private key are presented with each request (`--cert`, `--key`).

- Replace `<host>` with the environment host you receive when your institution is connected.
- Ids are shown as placeholder UUIDs — use the real ones returned by the previous call.
- Responses are abridged and the values are illustrative.

## 1. Find the organization

```bash
curl --cert client.crt --key client.key \
  -X GET "https://<host>/api/v2/organizations/list" \
  -H "accept: application/json" \
  -H "x-custom-lang: en"
```

**Example response:**

```json
[
  {
    "id": "00000000-0000-0000-0000-000000000001",
    "idno": "1234567890123",
    "name": { "ro": "Denumire", "ru": "Название", "en": "Organization name" },
    "isActive": true
  }
]
```

## 2. Find the location

```bash
curl --cert client.crt --key client.key \
  -X GET "https://<host>/api/v2/locations/list?OrganizationId=00000000-0000-0000-0000-000000000001&PageSize=10&PageNumber=0" \
  -H "accept: application/json"
```

**Example response:**

```json
{
  "items": [
    {
      "id": "00000000-0000-0000-0000-000000000002",
      "name": { "ro": "Sediul central", "ru": "Центральный офис", "en": "Head office" },
      "organizationId": "00000000-0000-0000-0000-000000000001",
      "locality": "Chișinău",
      "locationAddress": "str. Exemplu 1",
      "isActive": true
    }
  ],
  "totalCount": 1,
  "pageSize": 10,
  "currentPage": 0,
  "totalPages": 1
}
```

## 3. Find the service

```bash
curl --cert client.crt --key client.key \
  -X GET "https://<host>/api/v2/calendars/list?locationId=00000000-0000-0000-0000-000000000002" \
  -H "accept: application/json"
```

**Example response:**

```json
[
  {
    "name": { "ro": "Pașapoarte", "ru": "Паспорта", "en": "Passports" },
    "calendarLocationId": "00000000-0000-0000-0000-000000000003"
  }
]
```

Use `calendarLocationId` when requesting the appointment.

## 4. Read the service configuration

```bash
curl --cert client.crt --key client.key \
  -X GET "https://<host>/api/v2/calendars/config?calendarLocationId=00000000-0000-0000-0000-000000000003" \
  -H "accept: application/json"
```

**Example response** (abridged — `intervals` and `restrictions` omitted):

```json
{
  "calendarLocationId": "00000000-0000-0000-0000-000000000003",
  "startDate": "2026-01-12T00:00:00+02:00",
  "endDate": "2026-03-12T00:00:00+02:00",
  "slotDuration": 30,
  "bookedSlots": [
    {
      "start": "2026-01-15T09:00:00+02:00",
      "end": "2026-01-15T09:30:00+02:00",
      "bookedCount": 1
    }
  ],
  "fullyBookedDays": ["2026-01-16"]
}
```

`bookedSlots` and `fullyBookedDays` show what is already taken; `slotDuration` is in minutes.

## 5. Request the appointment

```bash
curl --cert client.crt --key client.key \
  -X POST "https://<host>/api/v2/appointments/request" \
  -H "Content-Type: application/json" \
  -H "accept: application/json" \
  -d '[
    {
      "isForeignCitizen": false,
      "idnp": "2000000000000",
      "firstName": "Ion",
      "lastName": "Popescu",
      "notifyUser": true,
      "isEvo": false,
      "email": "ion.popescu@example.com",
      "phone": "+37360000000",
      "services": [
        {
          "calendarLocationId": "00000000-0000-0000-0000-000000000003",
          "start": "2026-01-15T09:30:00+02:00"
        }
      ]
    }
  ]'
```

**Example response:**

```json
{
  "userAccessToken": "<token>",
  "appointmentRequestResultModels": [
    {
      "id": "00000000-0000-0000-0000-000000000004",
      "locationName": { "ro": "Sediul central", "ru": "Центральный офис", "en": "Head office" },
      "locationAddress": "str. Exemplu 1",
      "email": "ion.popescu@example.com",
      "calendarName": { "ro": "Pașapoarte", "ru": "Паспорта", "en": "Passports" },
      "slotStart": "2026-01-15T09:30:00+02:00",
      "slotEnd": "2026-01-15T10:00:00+02:00",
      "hoursUntilConfirmationDeadline": 24
    }
  ]
}
```

The appointment is created with status `Waiting`. Keep the `id` to confirm or cancel it, and the `userAccessToken` — it is the token of the person, to which all of their appointments are linked.

**Foreign citizen.** Set `isForeignCitizen` to `true` and send `passportNumber` instead of `idnp`:

```json
{
  "isForeignCitizen": true,
  "passportNumber": "AB1234567",
  "firstName": "John",
  "lastName": "Smith",
  "notifyUser": false,
  "phone": "+37360000000",
  "services": [
    {
      "calendarLocationId": "00000000-0000-0000-0000-000000000003",
      "start": "2026-01-15T09:30:00+02:00"
    }
  ]
}
```

**Skip the confirmation step.** With `"isEvo": true` the appointment is created directly as `Scheduled`.

## 6. Confirm the appointment

```bash
curl --cert client.crt --key client.key \
  -X PATCH "https://<host>/api/v2/appointments/00000000-0000-0000-0000-000000000004/confirm"
```

`200 OK` — the status changes from `Waiting` to `Scheduled`.

## 7. Cancel the appointment

```bash
curl --cert client.crt --key client.key \
  -X DELETE "https://<host>/api/v2/appointments/00000000-0000-0000-0000-000000000004/cancel?notifyUser=false"
```

`200 OK` — the appointment is canceled. By default the citizen is notified; `notifyUser=false` turns the notification off.

## 8. List a citizen's appointments

```bash
curl --cert client.crt --key client.key \
  -X GET "https://<host>/api/v2/appointments/user-list?Idnp=2000000000000&PageSize=10&PageNumber=0" \
  -H "accept: application/json"
```

**Example response** (abridged):

```json
[
  {
    "id": "00000000-0000-0000-0000-000000000004",
    "userIdentifier": "2000000000000",
    "firstName": "Ion",
    "lastName": "Popescu",
    "status": 2,
    "organization": "Organization name",
    "slot": {
      "start": "2026-01-15T09:30:00+02:00",
      "end": "2026-01-15T10:00:00+02:00"
    }
  }
]
```

`status` is a number — `2` is `Scheduled` (see [Appointment status](api-reference.md#appointment-status)). `204 No Content` means the citizen has no appointments for the criteria.

## Good practices

- Send `PageSize` and `PageNumber` on every list call. Page numbers start at `0`, and the locations endpoints have no default.
- Treat `204 No Content` as "nothing found", not as an error.
- Read the service configuration (`calendars/config`) before booking, and send `start` with its UTC offset.
- Confirm a `Waiting` appointment within `hoursUntilConfirmationDeadline`, or it expires.
- Send `x-custom-lang` to get validation messages in the user's language.
- Cache organization, location and service lists instead of requesting them on every booking.
