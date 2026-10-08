# Referință API

API-ul eProgramari reproduce toate funcționalitățile interfeței [programari.gov.md](https://programari.gov.md), astfel încât sistemul informațional al unei instituții să poată găsi un serviciu, verifica intervalele libere și crea, confirma și anula programări.

- **Cale de bază:** `/api`
- **Format:** JSON
- **Limbă:** antetul opțional `x-custom-lang` (`ro` implicit, `en` sau `ru`) stabilește limba mesajelor de validare. Este acceptat de toate metodele.

## Autentificare

API-ul folosește **TLS mutual (mTLS)**: sistemul apelant prezintă certificatul de client la conectare și este identificat prin acesta.

- Certificatul trebuie înregistrat ca **serviciu autorizat să apeleze** API-ul. Dacă certificatul este înregistrat în MPass, administratorul MPass sau administratorul eProgramari îl adaugă ca serviciu autorizat.
- Pentru **staging și producție se folosesc credențiale diferite** — un certificat înregistrat pentru un mediu nu oferă acces la celălalt.
- O cerere de la un client care nu poate fi identificat primește răspunsul `401 Unauthorized`; o cerere de la un client identificat, dar fără dreptul de a efectua operațiunea, primește `403 Forbidden`.

Pentru conectarea unei instituții, consultați pașii de conectare de pe pagina de [prezentare generală](index.md#pe-scurt).

## Fluxul de programare

1. `GET /v2/organizations/list` — găsiți organizația.
2. `GET /v2/locations/list` (sau `list-by-idno`) — găsiți locația acesteia.
3. `GET /v2/calendars/list` — găsiți serviciul (calendarul) oferit la locație.
4. `GET /v2/calendars/config` (sau `config-by-idno`) — citiți intervalele de lucru, sloturile ocupate și zilele libere.
5. `POST /v2/appointments/request` — solicitați programarea. Aceasta este creată cu statusul `Waiting` sau direct `Scheduled`, dacă `isEvo` este `true`.
6. `PATCH /v2/appointments/{appointmentId}/confirm` — confirmați-o (`Waiting` devine `Scheduled`).
7. `DELETE /v2/appointments/{appointmentId}/cancel` — anulați-o, dacă este necesar.

## Gestionarea erorilor

| Cod | Descriere |
|---|---|
| 200 | Succes |
| 204 | Fără conținut — nu a fost găsit nimic pentru criteriile furnizate |
| 400 | Parametri de intrare invalizi; detalii în mesajul răspunsului (`AppointmentProblemDetails`) |
| 401 | Neautorizat — clientul nu a putut fi identificat |
| 403 | Interzis — clientul nu are dreptul să efectueze această operațiune |
| 500 | A apărut o eroare neprevăzută (`AppointmentProblemDetails`) |

## Statusul programării

Statusul este un număr. Valoarea `0` se folosește doar ca valoare de filtrare.

| Valoare | Status |
|---|---|
| 0 | None — toate statusurile (filtru implicit) |
| 1 | Waiting |
| 2 | Scheduled |
| 3 | Canceled |
| 4 | Finished |
| 5 | Rejected |
| 6 | Blocked |
| 7 | Absent |

## Metode API

### Programări (Appointments)

```http
POST /v2/appointments/request
```

**Rezumat**

Creează o programare. Corpul cererii este o listă cu câte un element pentru fiecare cetățean. Fiecare element conține datele cetățeanului și serviciile (calendar locations) cu ora de început dorită. Programările sunt create cu statusul `Waiting` sau direct `Scheduled`, când `isEvo` este `true`.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Antet**:

- `x-custom-lang` (string, opțional) – limba mesajelor de validare: `ro` (implicit), `en` sau `ru`

**Corpul cererii** (`AppointmentRequestV2Model[]`):

```json
[
  {
    "isForeignCitizen": false,
    "idnp": "2000000000000",
    "firstName": "Ion",
    "lastName": "Popescu",
    "notifyUser": true,
    "isEvo": false,
    "email": "ion.popescu@example.com",
    "phone": "+37360000000",
    "residenceAddress": "mun. Chișinău, str. Exemplu 1",
    "services": [
      {
        "calendarLocationId": "00000000-0000-0000-0000-000000000000",
        "start": "2026-01-15T09:30:00+02:00"
      }
    ]
  }
]
```

**Răspunsuri**:

- `200 OK` – `SuccesAppointmentRequestModel` – programare creată cu succes
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
DELETE /v2/appointments/{appointmentId}/cancel
```

**Rezumat**

Anulează o programare după id. Cetățeanul este notificat, cu excepția cazului în care `notifyUser` este `false`.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de rută**:

- `appointmentId` (uuid, obligatoriu) – id-ul programării

**Parametri de interogare**:

- `notifyUser` (bool, opțional, implicit: `true`) – dacă cetățeanul este notificat despre anulare

**Răspunsuri**:

- `200 OK` – programare anulată cu succes
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
PATCH /v2/appointments/{appointmentId}/confirm
```

**Rezumat**

Confirmă o programare după id. Statusul se schimbă din `Waiting` în `Scheduled`.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de rută**:

- `appointmentId` (uuid, obligatoriu) – id-ul programării

**Răspunsuri**:

- `200 OK` – programare confirmată cu succes
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/appointments/list
```

**Rezumat**

Returnează o pagină de programări care corespund filtrelor.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `LocationRelatedIDNO` (string, opțional) – IDNO al organizației care deține locația
- `UserIdentifier` (string, opțional) – IDNP sau numărul pașaportului cetățeanului care a făcut programarea
- `ServiceCode` (string, opțional) – codul serviciului
- `Start` (date-time, opțional) – doar programările care încep la această dată sau după
- `End` (date-time, opțional) – doar programările care se încheie la această dată sau înainte
- `Status` (int, opțional, implicit: `0`) – filtrare după statusul programării (vezi [Statusul programării](#statusul-programarii))
- `PageSize` (int, obligatoriu, implicit: `10`) – numărul de elemente pe pagină
- `PageNumber` (int, obligatoriu, implicit: `0`) – numărul paginii, începând de la zero

**Răspunsuri**:

- `200 OK` – `AppointmentsListResponseModelPaginationResponse`
- `204 No Content` – nu au fost găsite programări
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/appointments/user-list
```

**Rezumat**

Returnează programările unui cetățean, găsit după IDNP, cu filtrare opțională după status și organizație.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `Idnp` (string, obligatoriu) – IDNP al cetățeanului (13 cifre)
- `PageSize` (int, obligatoriu, implicit: `10`) – numărul de elemente pe pagină
- `PageNumber` (int, obligatoriu, implicit: `0`) – numărul paginii, începând de la zero
- `Status` (int, opțional, implicit: `0`) – filtrare după statusul programării
- `Organization` (string, opțional) – filtrare după organizație

**Răspunsuri**:

- `200 OK` – `AppointmentsListResponseModel[]`
- `204 No Content` – nu au fost găsite programări
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/appointments/user-list-updated
```

**Rezumat**

Returnează programările actualizate ale unui cetățean, găsit după IDNP.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `Idnp` (string, obligatoriu) – IDNP al cetățeanului (13 cifre)
- `PageSize` (int, obligatoriu, implicit: `10`) – numărul de elemente pe pagină
- `PageNumber` (int, obligatoriu, implicit: `0`) – numărul paginii, începând de la zero
- `Status` (int, opțional, implicit: `0`) – filtrare după statusul programării
- `Organization` (string, opțional) – ignorat de această metodă

**Răspunsuri**:

- `200 OK` – `AppointmentModel[]`
- `204 No Content` – nu au fost găsite programări
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/appointments/location-list
```

**Rezumat**

Returnează programările unei locații, după id-ul locației. Rezultatul nu conține date despre cetățean.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `LocationId` (uuid, obligatoriu) – id-ul locației
- `PageSize` (int, obligatoriu, implicit: `10`) – numărul de elemente pe pagină
- `PageNumber` (int, obligatoriu, implicit: `0`) – numărul paginii, începând de la zero
- `Status` (int, opțional, implicit: `0`) – filtrare după statusul programării
- `Organization` (string, opțional) – nefolosit de această metodă

**Răspunsuri**:

- `200 OK` – `AppointmentPublicModel[]`
- `204 No Content` – nu au fost găsite programări
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/appointments/calendar-location-list
```

**Rezumat**

Returnează programările unui calendar la o locație (un serviciu la o locație). Rezultatul nu conține date despre cetățean.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `CalendarLocationId` (uuid, obligatoriu) – id-ul calendarului la locație (serviciul la o locație)
- `PageSize` (int, obligatoriu, implicit: `10`) – numărul de elemente pe pagină
- `PageNumber` (int, obligatoriu, implicit: `0`) – numărul paginii, începând de la zero
- `Status` (int, opțional, implicit: `0`) – filtrare după statusul programării
- `Organization` (string, opțional) – nefolosit de această metodă

**Răspunsuri**:

- `200 OK` – `AppointmentPublicModel[]`
- `204 No Content` – nu au fost găsite programări
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

### Organizații (Organizations)

```http
GET /v2/organizations/list
```

**Rezumat**

Returnează organizațiile care oferă servicii publice cu opțiune de programare.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Răspunsuri**:

- `200 OK` – `OrganizationModel[]`
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

### Locații (Locations)

```http
GET /v2/locations/list
```

**Rezumat**

Returnează o pagină de locații care aparțin unei organizații.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `OrganizationId` (uuid, obligatoriu) – id-ul organizației
- `PageSize` (int, obligatoriu) – numărul de elemente pe pagină; fără valoare implicită, trimiteți-l întotdeauna
- `PageNumber` (int, obligatoriu) – numărul paginii, începând de la zero; fără valoare implicită, trimiteți-l întotdeauna

**Răspunsuri**:

- `200 OK` – `LocationModelPaginationResponse`
- `204 No Content` – nu au fost găsite locații
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/locations/list-by-idno
```

**Rezumat**

Returnează o pagină de locații care aparțin organizației cu IDNO-ul dat.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `Idno` (string, obligatoriu) – IDNO al organizației
- `PageSize` (int, obligatoriu) – numărul de elemente pe pagină; fără valoare implicită, trimiteți-l întotdeauna
- `PageNumber` (int, obligatoriu) – numărul paginii, începând de la zero; fără valoare implicită, trimiteți-l întotdeauna

**Răspunsuri**:

- `200 OK` – `LocationModelPaginationResponse`
- `204 No Content` – nu au fost găsite locații
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

### Calendare (Calendars)

```http
GET /v2/calendars/list
```

**Rezumat**

Returnează serviciile (calendarele) oferite la o locație, de exemplu Pașaport, Servicii notariale, Document de călătorie de urgență.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `locationId` (uuid, obligatoriu) – id-ul locației

**Răspunsuri**:

- `200 OK` – `CalendarInfo[]`
- `204 No Content` – nu au fost găsite servicii pentru locație
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/calendars/config
```

**Rezumat**

Returnează configurația unui serviciu la o locație, inclusiv intervalele de lucru, zilele lucrătoare și zilele libere.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `calendarLocationId` (uuid, obligatoriu) – id-ul calendarului la locație (serviciul la o locație)

**Răspunsuri**:

- `200 OK` – `CalendarLocationUiConfigModel`
- `204 No Content` – nu a fost găsită nicio configurație
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/calendars/config-by-idno
```

**Rezumat**

Returnează configurația unui serviciu la o locație, găsită după IDNO-ul locației și codul serviciului.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `LocationIdno` (string, obligatoriu) – IDNO al locației
- `ServiceCode` (string, obligatoriu) – codul serviciului

**Răspunsuri**:

- `200 OK` – `CalendarLocationUiConfigModel`
- `204 No Content` – nu a fost găsită nicio configurație
- `400 Bad Request` – parametri de intrare invalizi
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

### Setări (Settings)

```http
GET /v2/settings
```

**Rezumat**

Returnează setările unui calendar al unei organizații: zilele lucrătoare, sărbătorile și orele disponibile pentru confirmarea unei programări.

**Autorizare**

Necesită un client identificat și autorizat pentru această operațiune.

**Parametri de interogare**:

- `OrganizationId` (uuid, obligatoriu) – id-ul organizației
- `CalendarId` (uuid, obligatoriu) – id-ul calendarului (serviciului)

**Răspunsuri**:

- `200 OK` – `SettingModel`
- `204 No Content` – nu au fost găsite setări
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

## Modele de date

Semnul `?` de la sfârșit marchează un câmp care poate fi null, iar `*` un câmp obligatoriu.

### Comune

**`ResourceDto`** — text în trei limbi.

| Câmp | Tip | Descriere |
|---|---|---|
| `ro` | string? | Română |
| `ru` | string? | Rusă |
| `en` | string? | Engleză |

**`SlotInfo`** — intervalul de timp al unei programări.

| Câmp | Tip | Descriere |
|---|---|---|
| `start` | date-time | Începutul intervalului, cu decalaj UTC |
| `end` | date-time | Sfârșitul intervalului, cu decalaj UTC |

**`AppointmentProblemDetails`** — eroare returnată împreună cu `400` și `500`.

| Câmp | Tip | Descriere |
|---|---|---|
| `type` | string? | |
| `title` | string? | |
| `status` | int? | Cod de status HTTP |
| `detail` | string? | |
| `instance` | string? | |
| `errors` | object? | |

**Paginare** — `AppointmentsListResponseModelPaginationResponse` și `LocationModelPaginationResponse` au aceeași structură.

| Câmp | Tip | Descriere |
|---|---|---|
| `items` | array | Elementele paginii curente (`AppointmentsListResponseModel[]` sau `LocationModel[]`) |
| `totalCount` | int | Numărul total de elemente care corespund cererii, pe toate paginile |
| `pageSize` | int | Numărul de elemente pe pagină |
| `currentPage` | int | Numărul paginii curente, începând de la zero |
| `totalPages` | int | Numărul total de pagini |

### Crearea programărilor

**`AppointmentRequestV2Model`** — cerere de creare a programărilor pentru un cetățean, pentru unul sau mai multe servicii.

| Câmp | Tip | Descriere |
|---|---|---|
| `isForeignCitizen`* | bool | `true` pentru un cetățean străin; atunci `passportNumber` este obligatoriu în loc de `idnp` |
| `idnp` | string | IDNP al cetățeanului; obligatoriu când `isForeignCitizen` este `false` |
| `passportNumber` | string | Numărul pașaportului; obligatoriu când `isForeignCitizen` este `true` |
| `firstName`* | string | Prenumele (2–60 de caractere) |
| `lastName`* | string | Numele de familie (2–60 de caractere) |
| `notifyUser` | bool | Dacă cetățeanul este notificat prin e-mail; implicit `true`. Când este `true`, `email` este obligatoriu |
| `isEvo` | bool | Dacă este `true`, programarea este creată direct ca `Scheduled`, fără pasul de confirmare; implicit `false` |
| `email` | string | Adresa de e-mail a cetățeanului; obligatorie când `notifyUser` este `true` |
| `phone`* | string | Numărul de telefon al cetățeanului |
| `residenceAddress` | string? | Adresa de domiciliu (opțional) |
| `services`* | `ServiceRequestV2[]` | Serviciile (calendar locations) și ora de început solicitată pentru fiecare |

**`ServiceRequestV2`** — un serviciu solicitat la o anumită dată și oră.

| Câmp | Tip | Descriere |
|---|---|---|
| `calendarLocationId`* | uuid | Id-ul calendarului la locație (serviciul la o locație) de programat |
| `start`* | date-time | Începutul programării, cu decalaj UTC, de exemplu `2026-01-15T09:30:00+02:00` |
| `requestOptionId` | uuid? | Opțional. Id-ul opțiunii de cerere selectate, din `RequestOptions` din configurația serviciului (`calendars/config`) |
| `relatedOptionId` | uuid? | Opțional. Id-ul opțiunii asociate selectate, din `RelatedOptions` din configurația serviciului |

**`SuccesAppointmentRequestModel`** — rezultatul unei cereri de creare a programării.

| Câmp | Tip | Descriere |
|---|---|---|
| `userAccessToken` | string? | Token de acces emis persoanei. Toate programările persoanei sunt asociate acestui token, astfel încât pot fi găsite și modificate ulterior sau prezentate oricând este nevoie |
| `appointmentRequestResultModels` | `AppointmentRequestResultModel[]` | Câte un element pentru fiecare serviciu solicitat |

**`AppointmentRequestResultModel`** — o programare creată.

| Câmp | Tip | Descriere |
|---|---|---|
| `id` | uuid | Id-ul programării create; folosiți-l pentru confirmare sau anulare |
| `userAccessToken` | string? | Token de acces emis persoanei. Toate programările persoanei sunt asociate acestui token, astfel încât pot fi găsite și modificate ulterior sau prezentate oricând este nevoie |
| `locationName` | `ResourceDto` | Denumirea locației |
| `locationAddress` | string? | Adresa locației |
| `email` | string? | Adresa de e-mail la care se trimite notificarea |
| `calendarName` | `ResourceDto` | Denumirea serviciului (calendarului) |
| `slotStart` | date-time | Începutul programării |
| `slotEnd` | date-time | Sfârșitul programării |
| `hoursUntilConfirmationDeadline` | int | Orele rămase pentru confirmarea programării înainte de expirare |

### Citirea programărilor

**`AppointmentsListResponseModel`** — o programare, așa cum o returnează `appointments/list` și `appointments/user-list`.

| Câmp | Tip | Descriere |
|---|---|---|
| `id` | uuid | Id-ul unic al programării |
| `code` | string? | Codul programării |
| `userIdentifier` | string? | IDNP sau numărul pașaportului cetățeanului |
| `isForeignCitizen` | bool | `true` dacă cetățeanul este străin |
| `firstName` | string? | Prenumele cetățeanului |
| `lastName` | string? | Numele de familie al cetățeanului |
| `status` | int | Statusul programării |
| `serviceCode` | string? | Codul serviciului |
| `organization` | string? | Denumirea organizației |
| `slot` | `SlotInfo` | Intervalul de timp |
| `calendar` | `ResourceDto` | Calendarul (serviciul) |
| `service` | `ResourceDto` | Serviciul |
| `calendarLocation` | `ResourceDto` | Serviciul la o locație |
| `locationCoordinatesUrl` | string? | URL cu coordonatele locației pe hartă |
| `locationAddress` | string? | Adresa locației |
| `requestOption` | `ResourceDto` | Opțiunea de cerere selectată |
| `relatedOption` | `ResourceDto` | Opțiunea asociată selectată |

**`AppointmentPublicModel`** — datele publice ale unei programări, fără date despre cetățean.

| Câmp | Tip | Descriere |
|---|---|---|
| `id` | uuid? | Id-ul unic al programării |
| `code` | string? | Codul programării |
| `status` | int | Statusul programării |
| `slot` | `SlotInfo` | Intervalul de timp |
| `calendar` | `ResourceDto` | Calendarul (serviciul) |
| `service` | `ResourceDto` | Serviciul |
| `calendarLocation` | `ResourceDto` | Serviciul la o locație |
| `requestOption` | `ResourceDto` | Opțiunea de cerere selectată |
| `relatedOption` | `ResourceDto` | Opțiunea asociată selectată |

**`AppointmentModel`** — o programare cu detaliile serviciului, ale locației și ale participanților.

| Câmp | Tip | Descriere |
|---|---|---|
| `id` | uuid | Id-ul unic al programării |
| `code` | string? | Codul programării |
| `status` | int | Statusul programării |
| `comment`, `reason`, `notes` | string? | |
| `calendarId` | uuid? | Id-ul calendarului (serviciului) |
| `calendarName` | `ResourceDto` | Denumirea calendarului |
| `serviceId` | uuid? | Id-ul serviciului |
| `serviceName`, `serviceDescription`, `serviceDocuments` | `ResourceDto` | Denumirea, descrierea și documentele necesare ale serviciului |
| `calendarLocationId` | uuid? | Id-ul calendarului la locație (serviciul la o locație) |
| `calendarLocationName` | `ResourceDto` | Denumirea serviciului la locație |
| `locationCoordinatesUrl` | string? | URL cu coordonatele locației pe hartă |
| `locationAddress` | string? | Adresa locației |
| `slotId` | uuid? | Id-ul slotului |
| `requestOptionId` | uuid? | Id-ul opțiunii de cerere selectate |
| `relatedOptionId` | uuid? | Id-ul opțiunii asociate selectate |
| `slot` | `SlotInfo` | Intervalul de timp |
| `attendees` | `AttendeeModel[]` | Cetățenii înregistrați la programare |
| `residenceAddress` | string? | Adresa de domiciliu a cetățeanului |

**`AttendeeModel`** — un cetățean înregistrat la o programare.

| Câmp | Tip |
|---|---|
| `id`, `appointmentId`, `calendarId`, `userId` | uuid? |
| `status` | int |
| `hasAttended` | bool |
| `passportNumber`, `indp`, `firstName`, `lastName`, `email`, `phone`, `residenceAddress` | string? |

### Organizații, locații și servicii

**`OrganizationModel`** — o organizație care oferă servicii prin programări.

| Câmp | Tip | Descriere |
|---|---|---|
| `id` | uuid | Id-ul unic al organizației |
| `idno` | string? | IDNO al organizației |
| `code` | string? | Codul organizației |
| `homeAlias` | string? | |
| `name`, `title`, `subTitle`, `description`, `about` | `ResourceDto` | Texte în trei limbi |
| `filterByLocation`, `filterByService` | bool | |
| `webPage` | string? | Pagina web a organizației |
| `faqId` | string? | |
| `type` | string? | |
| `isActive` | bool | `false` dacă organizația este dezactivată |
| `contact` | `OrganizationContactModel` | Date de contact: `fullAddress`, `phones[]`, `email`, `locationUrl` |

**`LocationModel`** — o locație în care o organizație primește cetățeni.

| Câmp | Tip | Descriere |
|---|---|---|
| `id` | uuid? | Id-ul unic al locației |
| `name`*, `title`*, `about`* | `ResourceDto` | Texte în trei limbi |
| `webPage` | string? | Pagina web a locației |
| `phone`, `email` | string? | Contact |
| `relatedIDNO` | string? | |
| `capacity` | int | |
| `addressId` | uuid | |
| `organizationId`* | uuid | Id-ul organizației de care aparține locația |
| `country`*, `region`*, `locality`*, `locationAddress`* | string | Adresă |
| `coordinatesUrl`* | string | URL cu coordonatele pe hartă |
| `index` | string? | Cod poștal |
| `isActive` | bool | `false` dacă locația este dezactivată |
| `imageInfo` | `ImageInfo` | `data` (base64) și `mimeType` |
| `counters` | `LocationCounterDetailsModel[]` | Ghișee: `id`, `name` (`ResourceDto`), `isActive` |

**`CalendarInfo`** — un serviciu (calendar) disponibil la o locație.

| Câmp | Tip | Descriere |
|---|---|---|
| `name` | `ResourceDto` | Denumirea serviciului |
| `calendarLocationId` | uuid | Id-ul calendarului la locație; folosiți-l la solicitarea unei programări |

**`CalendarLocationUiConfigModel`** — configurația necesară pentru programarea la un serviciu dintr-o locație.

| Câmp | Tip | Descriere |
|---|---|---|
| `calendarId` | uuid? | Id-ul calendarului |
| `calendarLocationId` | uuid? | Id-ul calendarului la locație; folosiți-l la solicitarea unei programări |
| `calendarName` | `ResourceDto` | Denumirea serviciului |
| `startDate`, `endDate` | date-time? | Prima și ultima dată la care se pot face programări |
| `activeDays`, `appointmentActiveDays`, `appointmentsLimit` | int? | |
| `slotDuration` | int | Durata unui slot, în minute |
| `intervals` | `WorkIntervalModel[]` | Intervale de lucru: `id`, `start`, `end`, `appointmentsPerSlotLimit`, `workDays[]` |
| `bookedSlots` | `BookedSlot[]` | Sloturi care au deja programări: `start`, `end`, `bookedCount` |
| `fullyBookedDays` | date[] | Zile fără sloturi libere |
| `restrictions` | `RestrictionsModel` | `holidays[]` și `recoverableDaysOffs[]` (`dayOff`, `recovery`) |
| `locationCapacity` | int? | |
| `locationId` | uuid | Id-ul locației |
| `organizationServiceDocuments` | `OrganizationServiceDocumentModel[]` | Documente necesare per serviciu: `calendarName`, `documents` (`ResourceDto`) |

**`SettingModel`** — setările calendarului unei organizații.

| Câmp | Tip | Descriere |
|---|---|---|
| `organizationId` | uuid? | Id-ul organizației |
| `calendarId` | uuid? | Id-ul calendarului (serviciului) |
| `workDays` | int[] | Zile lucrătoare |
| `holidays` | date-time[] | Sărbători, când nu sunt disponibile programări |
| `recoverableDaysOffs` | `RecoverableDaysOff[]` | `dayOff`, `recovery` |
| `workHours` | `ConfigWorkHour[]` | `start`, `end` |
| `hoursUntilConfirmationDeadline` | int | Orele de care dispune cetățeanul pentru a confirma o programare înainte de expirare |
