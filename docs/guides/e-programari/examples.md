# Exemple

Exemplele urmează [fluxul de programare](api-reference.md#fluxul-de-programare). Fiecare apel se face prin TLS mutual, deci certificatul de client și cheia sa privată sunt prezentate la fiecare cerere (`--cert`, `--key`).

- Înlocuiți `<host>` cu adresa mediului pe care o primiți la conectarea instituției.
- Id-urile sunt afișate ca UUID-uri de substituție — folosiți-le pe cele reale, returnate de apelul anterior.
- Răspunsurile sunt prescurtate, iar valorile au caracter ilustrativ.

## 1. Găsirea organizației

```bash
curl --cert client.crt --key client.key \
  -X GET "https://<host>/api/v2/organizations/list" \
  -H "accept: application/json" \
  -H "x-custom-lang: ro"
```

**Exemplu de răspuns:**

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

## 2. Găsirea locației

```bash
curl --cert client.crt --key client.key \
  -X GET "https://<host>/api/v2/locations/list?OrganizationId=00000000-0000-0000-0000-000000000001&PageSize=10&PageNumber=0" \
  -H "accept: application/json"
```

**Exemplu de răspuns:**

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

## 3. Găsirea serviciului

```bash
curl --cert client.crt --key client.key \
  -X GET "https://<host>/api/v2/calendars/list?locationId=00000000-0000-0000-0000-000000000002" \
  -H "accept: application/json"
```

**Exemplu de răspuns:**

```json
[
  {
    "name": { "ro": "Pașapoarte", "ru": "Паспорта", "en": "Passports" },
    "calendarLocationId": "00000000-0000-0000-0000-000000000003"
  }
]
```

Folosiți `calendarLocationId` la solicitarea programării.

## 4. Citirea configurației serviciului

```bash
curl --cert client.crt --key client.key \
  -X GET "https://<host>/api/v2/calendars/config?calendarLocationId=00000000-0000-0000-0000-000000000003" \
  -H "accept: application/json"
```

**Exemplu de răspuns** (prescurtat — `intervals` și `restrictions` omise):

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

`bookedSlots` și `fullyBookedDays` arată ce este deja ocupat; `slotDuration` este în minute.

## 5. Solicitarea programării

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

**Exemplu de răspuns:**

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

Programarea este creată cu statusul `Waiting`. Păstrați `id`-ul pentru a o confirma sau anula, precum și `userAccessToken` — tokenul persoanei, de care sunt asociate toate programările acesteia.

**Cetățean străin.** Setați `isForeignCitizen` la `true` și trimiteți `passportNumber` în loc de `idnp`:

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

**Fără pasul de confirmare.** Cu `"isEvo": true`, programarea este creată direct cu statusul `Scheduled`.

## 6. Confirmarea programării

```bash
curl --cert client.crt --key client.key \
  -X PATCH "https://<host>/api/v2/appointments/00000000-0000-0000-0000-000000000004/confirm"
```

`200 OK` — statusul se schimbă din `Waiting` în `Scheduled`.

## 7. Anularea programării

```bash
curl --cert client.crt --key client.key \
  -X DELETE "https://<host>/api/v2/appointments/00000000-0000-0000-0000-000000000004/cancel?notifyUser=false"
```

`200 OK` — programarea este anulată. Implicit, cetățeanul este notificat; `notifyUser=false` dezactivează notificarea.

## 8. Lista programărilor unui cetățean

```bash
curl --cert client.crt --key client.key \
  -X GET "https://<host>/api/v2/appointments/user-list?Idnp=2000000000000&PageSize=10&PageNumber=0" \
  -H "accept: application/json"
```

**Exemplu de răspuns** (prescurtat):

```json
[
  {
    "id": "00000000-0000-0000-0000-000000000004",
    "userIdentifier": "2000000000000",
    "firstName": "Ion",
    "lastName": "Popescu",
    "status": 2,
    "organization": "Denumirea organizației",
    "slot": {
      "start": "2026-01-15T09:30:00+02:00",
      "end": "2026-01-15T10:00:00+02:00"
    }
  }
]
```

`status` este un număr — `2` înseamnă `Scheduled` (vezi [Statusul programării](api-reference.md#statusul-programarii)). `204 No Content` înseamnă că cetățeanul nu are programări pentru criteriile date.

## Bune practici

- Trimiteți `PageSize` și `PageNumber` la fiecare apel de listare. Numerotarea paginilor începe de la `0`, iar endpoint-urile pentru locații nu au valori implicite.
- Tratați `204 No Content` ca „nu a fost găsit nimic”, nu ca pe o eroare.
- Citiți configurația serviciului (`calendars/config`) înainte de programare și trimiteți `start` cu decalajul UTC.
- Confirmați o programare `Waiting` în intervalul `hoursUntilConfirmationDeadline`, altfel aceasta expiră.
- Trimiteți `x-custom-lang` pentru a primi mesajele de validare în limba utilizatorului.
- Păstrați în cache listele de organizații, locații și servicii, în loc să le cereți la fiecare programare.
