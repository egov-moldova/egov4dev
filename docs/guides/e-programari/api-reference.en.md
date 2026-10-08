# API reference

The eProgramari API replicates all the functionality of the [programari.gov.md](https://programari.gov.md) user interface, so an institution's own information system can find a service, check free slots and book, confirm and cancel appointments.

- **Base path:** `/api`
- **Format:** JSON
- **Language:** the optional `x-custom-lang` header (`ro` by default, `en` or `ru`) sets the language of validation messages. It is accepted by every method.

!!! note "Authentication"
    The specification does not define an authentication scheme. Every method answers `401 Unauthorized` when the client cannot be identified and `403 Forbidden` when the client is not allowed to perform the operation.

## Booking flow

1. `GET /v2/organizations/list` — find the organization.
2. `GET /v2/locations/list` (or `list-by-idno`) — find its location.
3. `GET /v2/calendars/list` — find the service (calendar) offered at the location.
4. `GET /v2/calendars/config` (or `config-by-idno`) — read the working intervals, booked slots and days off.
5. `POST /v2/appointments/request` — request the appointment. It is created with status `Waiting`, or directly as `Scheduled` if `isEvo` is `true`.
6. `PATCH /v2/appointments/{appointmentId}/confirm` — confirm it (`Waiting` becomes `Scheduled`).
7. `DELETE /v2/appointments/{appointmentId}/cancel` — cancel it, if needed.

## Error Handling

| Code | Description |
|---|---|
| 200 | Success |
| 204 | No content — nothing found for the provided criteria |
| 400 | Invalid input parameters; see the response message for details (`AppointmentProblemDetails`) |
| 401 | Unauthorized — the client could not be identified |
| 403 | Forbidden — the client is not allowed to perform this operation |
| 500 | An unhandled error happened (`AppointmentProblemDetails`) |

## Appointment status

Status is a number. `0` is used only as a filter value.

| Value | Status |
|---|---|
| 0 | None — all statuses (default filter) |
| 1 | Waiting |
| 2 | Scheduled |
| 3 | Canceled |
| 4 | Finished |
| 5 | Rejected |
| 6 | Blocked |
| 7 | Absent |

## API Methods

### Appointments

```http
POST /v2/appointments/request
```

**Summary**

Create an appointment. The body is a list with one item for each citizen. Each item contains the citizen data and the services (calendar locations) with the start time to book. Appointments are created with status `Waiting`, or directly with status `Scheduled` when `isEvo` is `true`.

**Authorization**

Requires an identified client authorized for this operation.

**Header**:

- `x-custom-lang` (string, optional) – language of validation messages: `ro` (default), `en` or `ru`

**Request body** (`AppointmentRequestV2Model[]`):

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

**Responses**:

- `200 OK` – `SuccesAppointmentRequestModel` – appointment created successfully
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
DELETE /v2/appointments/{appointmentId}/cancel
```

**Summary**

Cancel an appointment by its id. The citizen is notified unless `notifyUser` is `false`.

**Authorization**

Requires an identified client authorized for this operation.

**Path parameters**:

- `appointmentId` (uuid, required) – id of the appointment

**Query parameters**:

- `notifyUser` (bool, optional, default: `true`) – whether the citizen is notified about the cancellation

**Responses**:

- `200 OK` – appointment canceled successfully
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
PATCH /v2/appointments/{appointmentId}/confirm
```

**Summary**

Confirm an appointment by its id. The status changes from `Waiting` to `Scheduled`.

**Authorization**

Requires an identified client authorized for this operation.

**Path parameters**:

- `appointmentId` (uuid, required) – id of the appointment

**Responses**:

- `200 OK` – appointment confirmed successfully
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/appointments/list
```

**Summary**

Get a page of appointments that match the filters.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `LocationRelatedIDNO` (string, optional) – IDNO of the organization that owns the location
- `UserIdentifier` (string, optional) – IDNP or passport number of the citizen who booked the appointment
- `ServiceCode` (string, optional) – code of the service
- `Start` (date-time, optional) – only appointments starting at or after this date
- `End` (date-time, optional) – only appointments ending at or before this date
- `Status` (int, optional, default: `0`) – filter by appointment status (see [Appointment status](#appointment-status))
- `PageSize` (int, required, default: `10`) – number of items per page
- `PageNumber` (int, required, default: `0`) – page number, zero-based

**Responses**:

- `200 OK` – `AppointmentsListResponseModelPaginationResponse`
- `204 No Content` – no appointments found
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/appointments/user-list
```

**Summary**

Get the appointments of a citizen, found by IDNP, optionally filtered by status and organization.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `Idnp` (string, required) – IDNP of the citizen (13 digits)
- `PageSize` (int, required, default: `10`) – number of items per page
- `PageNumber` (int, required, default: `0`) – page number, zero-based
- `Status` (int, optional, default: `0`) – filter by appointment status
- `Organization` (string, optional) – filter by organization

**Responses**:

- `200 OK` – `AppointmentsListResponseModel[]`
- `204 No Content` – no appointments found
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/appointments/user-list-updated
```

**Summary**

Get the updated appointments of a citizen, found by IDNP.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `Idnp` (string, required) – IDNP of the citizen (13 digits)
- `PageSize` (int, required, default: `10`) – number of items per page
- `PageNumber` (int, required, default: `0`) – page number, zero-based
- `Status` (int, optional, default: `0`) – filter by appointment status
- `Organization` (string, optional) – ignored by this method

**Responses**:

- `200 OK` – `AppointmentModel[]`
- `204 No Content` – no appointments found
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/appointments/location-list
```

**Summary**

Get the appointments of a location, by location id. The result does not contain data about the citizen.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `LocationId` (uuid, required) – id of the location
- `PageSize` (int, required, default: `10`) – number of items per page
- `PageNumber` (int, required, default: `0`) – page number, zero-based
- `Status` (int, optional, default: `0`) – filter by appointment status
- `Organization` (string, optional) – not used by this method

**Responses**:

- `200 OK` – `AppointmentPublicModel[]`
- `204 No Content` – no appointments found
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/appointments/calendar-location-list
```

**Summary**

Get the appointments of a calendar location (a service at a location). The result does not contain data about the citizen.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `CalendarLocationId` (uuid, required) – id of the calendar location (service at a location)
- `PageSize` (int, required, default: `10`) – number of items per page
- `PageNumber` (int, required, default: `0`) – page number, zero-based
- `Status` (int, optional, default: `0`) – filter by appointment status
- `Organization` (string, optional) – not used by this method

**Responses**:

- `200 OK` – `AppointmentPublicModel[]`
- `204 No Content` – no appointments found
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

### Organizations

```http
GET /v2/organizations/list
```

**Summary**

Get the organizations that offer public services with appointment options.

**Authorization**

Requires an identified client authorized for this operation.

**Responses**:

- `200 OK` – `OrganizationModel[]`
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

### Locations

```http
GET /v2/locations/list
```

**Summary**

Get a page of locations that belong to an organization.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `OrganizationId` (uuid, required) – id of the organization
- `PageSize` (int, required) – number of items per page; no default, always send it
- `PageNumber` (int, required) – page number, zero-based; no default, always send it

**Responses**:

- `200 OK` – `LocationModelPaginationResponse`
- `204 No Content` – no locations found
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/locations/list-by-idno
```

**Summary**

Get a page of locations that belong to the organization with the given IDNO.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `Idno` (string, required) – IDNO of the organization
- `PageSize` (int, required) – number of items per page; no default, always send it
- `PageNumber` (int, required) – page number, zero-based; no default, always send it

**Responses**:

- `200 OK` – `LocationModelPaginationResponse`
- `204 No Content` – no locations found
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

### Calendars

```http
GET /v2/calendars/list
```

**Summary**

Get the services (calendars) offered at a location, for example Passport, Notary Services, Emergency Travel Document.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `locationId` (uuid, required) – id of the location

**Responses**:

- `200 OK` – `CalendarInfo[]`
- `204 No Content` – no services found for the location
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/calendars/config
```

**Summary**

Get the configuration of a service at a location, including working intervals, working days and days off.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `calendarLocationId` (uuid, required) – id of the calendar location (service at a location)

**Responses**:

- `200 OK` – `CalendarLocationUiConfigModel`
- `204 No Content` – no configuration found
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

```http
GET /v2/calendars/config-by-idno
```

**Summary**

Get the configuration of a service at a location, found by the IDNO of the location and the service code.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `LocationIdno` (string, required) – IDNO of the location
- `ServiceCode` (string, required) – code of the service

**Responses**:

- `200 OK` – `CalendarLocationUiConfigModel`
- `204 No Content` – no configuration found
- `400 Bad Request` – invalid input parameters
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

### Settings

```http
GET /v2/settings
```

**Summary**

Get the settings of a calendar of an organization: working days, holidays and the hours available to confirm an appointment.

**Authorization**

Requires an identified client authorized for this operation.

**Query parameters**:

- `OrganizationId` (uuid, required) – id of the organization
- `CalendarId` (uuid, required) – id of the calendar (service)

**Responses**:

- `200 OK` – `SettingModel`
- `204 No Content` – no settings found
- `401 Unauthorized`
- `403 Forbidden`
- `500 Internal Server Error`

## Data models

A trailing `?` marks a nullable field and `*` a required one.

### Common

**`ResourceDto`** — text in three languages.

| Field | Type | Description |
|---|---|---|
| `ro` | string? | Romanian |
| `ru` | string? | Russian |
| `en` | string? | English |

**`SlotInfo`** — time interval of an appointment.

| Field | Type | Description |
|---|---|---|
| `start` | date-time | Start of the interval, with UTC offset |
| `end` | date-time | End of the interval, with UTC offset |

**`AppointmentProblemDetails`** — error returned with `400` and `500`.

| Field | Type | Description |
|---|---|---|
| `type` | string? | |
| `title` | string? | |
| `status` | int? | HTTP status code |
| `detail` | string? | |
| `instance` | string? | |
| `errors` | object? | |

**Pagination** — `AppointmentsListResponseModelPaginationResponse` and `LocationModelPaginationResponse` have the same shape.

| Field | Type | Description |
|---|---|---|
| `items` | array | Items on the current page (`AppointmentsListResponseModel[]` or `LocationModel[]`) |
| `totalCount` | int | Total number of items matching the request, across all pages |
| `pageSize` | int | Number of items per page |
| `currentPage` | int | Current page number, zero-based |
| `totalPages` | int | Total number of pages |

### Creating appointments

**`AppointmentRequestV2Model`** — request to create appointments for one citizen, for one or more services.

| Field | Type | Description |
|---|---|---|
| `isForeignCitizen`* | bool | `true` for a foreign citizen; then `passportNumber` is required instead of `idnp` |
| `idnp` | string | IDNP of the citizen; required when `isForeignCitizen` is `false` |
| `passportNumber` | string | Passport number; required when `isForeignCitizen` is `true` |
| `firstName`* | string | First name (2 to 60 characters) |
| `lastName`* | string | Last name (2 to 60 characters) |
| `notifyUser` | bool | Whether the citizen is notified by e-mail; default `true`. When `true`, `email` is required |
| `isEvo` | bool | If `true`, the appointment is created directly as `Scheduled`, without the confirmation step; default `false` |
| `email` | string | E-mail of the citizen; required when `notifyUser` is `true` |
| `phone`* | string | Phone number of the citizen |
| `residenceAddress` | string? | Residence address (optional) |
| `services`* | `ServiceRequestV2[]` | Services (calendar locations) and the start time requested for each |

**`ServiceRequestV2`** — a service requested at a specific date and time.

| Field | Type | Description |
|---|---|---|
| `calendarLocationId`* | uuid | Id of the calendar location (service at a location) to book |
| `start`* | date-time | Start of the appointment, with UTC offset, for example `2026-01-15T09:30:00+02:00` |
| `requestOptionId` | uuid? | Optional. Id of the selected request option, from `RequestOptions` of the service configuration (`calendars/config`) |
| `relatedOptionId` | uuid? | Optional. Id of the selected related option, from `RelatedOptions` of the service configuration |

**`SuccesAppointmentRequestModel`** — result of an appointment creation request.

| Field | Type | Description |
|---|---|---|
| `userAccessToken` | string? | |
| `appointmentRequestResultModels` | `AppointmentRequestResultModel[]` | One entry for each requested service |

**`AppointmentRequestResultModel`** — a created appointment.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Id of the created appointment; use it to confirm or cancel |
| `userAccessToken` | string? | |
| `locationName` | `ResourceDto` | Name of the location |
| `locationAddress` | string? | Address of the location |
| `email` | string? | E-mail to which the notification is sent |
| `calendarName` | `ResourceDto` | Name of the service (calendar) |
| `slotStart` | date-time | Start of the appointment |
| `slotEnd` | date-time | End of the appointment |
| `hoursUntilConfirmationDeadline` | int | Hours left to confirm the appointment before it expires |

### Reading appointments

**`AppointmentsListResponseModel`** — an appointment, as returned by `appointments/list` and `appointments/user-list`.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Unique id of the appointment |
| `code` | string? | Appointment code |
| `userIdentifier` | string? | IDNP or passport number of the citizen |
| `isForeignCitizen` | bool | `true` if the citizen is a foreign citizen |
| `firstName` | string? | First name of the citizen |
| `lastName` | string? | Last name of the citizen |
| `status` | int | Appointment status |
| `serviceCode` | string? | Code of the service |
| `organization` | string? | Name of the organization |
| `slot` | `SlotInfo` | Time interval |
| `calendar` | `ResourceDto` | Calendar (service) |
| `service` | `ResourceDto` | Service |
| `calendarLocation` | `ResourceDto` | Service at a location |
| `locationCoordinatesUrl` | string? | URL with the map coordinates of the location |
| `locationAddress` | string? | Address of the location |
| `requestOption` | `ResourceDto` | Selected request option |
| `relatedOption` | `ResourceDto` | Selected related option |

**`AppointmentPublicModel`** — public data of an appointment, without data about the citizen.

| Field | Type | Description |
|---|---|---|
| `id` | uuid? | Unique id of the appointment |
| `code` | string? | Appointment code |
| `status` | int | Appointment status |
| `slot` | `SlotInfo` | Time interval |
| `calendar` | `ResourceDto` | Calendar (service) |
| `service` | `ResourceDto` | Service |
| `calendarLocation` | `ResourceDto` | Service at a location |
| `requestOption` | `ResourceDto` | Selected request option |
| `relatedOption` | `ResourceDto` | Selected related option |

**`AppointmentModel`** — an appointment with the details of its service, location and attendees.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Unique id of the appointment |
| `code` | string? | Appointment code |
| `status` | int | Appointment status |
| `comment`, `reason`, `notes` | string? | |
| `calendarId` | uuid? | Id of the calendar (service) |
| `calendarName` | `ResourceDto` | Name of the calendar |
| `serviceId` | uuid? | Id of the service |
| `serviceName`, `serviceDescription`, `serviceDocuments` | `ResourceDto` | Name, description and required documents of the service |
| `calendarLocationId` | uuid? | Id of the calendar location (service at a location) |
| `calendarLocationName` | `ResourceDto` | Name of the service at the location |
| `locationCoordinatesUrl` | string? | URL with the map coordinates of the location |
| `locationAddress` | string? | Address of the location |
| `slotId` | uuid? | Id of the slot |
| `requestOptionId` | uuid? | Id of the selected request option |
| `relatedOptionId` | uuid? | Id of the selected related option |
| `slot` | `SlotInfo` | Time interval |
| `attendees` | `AttendeeModel[]` | Citizens registered on the appointment |
| `residenceAddress` | string? | Residence address of the citizen |

**`AttendeeModel`** — a citizen registered on an appointment.

| Field | Type |
|---|---|
| `id`, `appointmentId`, `calendarId`, `userId` | uuid? |
| `status` | int |
| `hasAttended` | bool |
| `passportNumber`, `indp`, `firstName`, `lastName`, `email`, `phone`, `residenceAddress` | string? |

### Organizations, locations and services

**`OrganizationModel`** — an organization that offers services through appointments.

| Field | Type | Description |
|---|---|---|
| `id` | uuid | Unique id of the organization |
| `idno` | string? | IDNO of the organization |
| `code` | string? | Code of the organization |
| `homeAlias` | string? | |
| `name`, `title`, `subTitle`, `description`, `about` | `ResourceDto` | Texts in three languages |
| `filterByLocation`, `filterByService` | bool | |
| `webPage` | string? | Web page of the organization |
| `faqId` | string? | |
| `type` | string? | |
| `isActive` | bool | `false` if the organization is deactivated |
| `contact` | `OrganizationContactModel` | Contact details: `fullAddress`, `phones[]`, `email`, `locationUrl` |

**`LocationModel`** — a location where an organization receives citizens.

| Field | Type | Description |
|---|---|---|
| `id` | uuid? | Unique id of the location |
| `name`*, `title`*, `about`* | `ResourceDto` | Texts in three languages |
| `webPage` | string? | Web page of the location |
| `phone`, `email` | string? | Contact |
| `relatedIDNO` | string? | |
| `capacity` | int | |
| `addressId` | uuid | |
| `organizationId`* | uuid | Id of the organization the location belongs to |
| `country`*, `region`*, `locality`*, `locationAddress`* | string | Address |
| `coordinatesUrl`* | string | URL with the map coordinates |
| `index` | string? | Postal index |
| `isActive` | bool | `false` if the location is deactivated |
| `imageInfo` | `ImageInfo` | `data` (base64) and `mimeType` |
| `counters` | `LocationCounterDetailsModel[]` | Counters: `id`, `name` (`ResourceDto`), `isActive` |

**`CalendarInfo`** — a service (calendar) available at a location.

| Field | Type | Description |
|---|---|---|
| `name` | `ResourceDto` | Name of the service |
| `calendarLocationId` | uuid | Id of the calendar location; use it when requesting an appointment |

**`CalendarLocationUiConfigModel`** — configuration needed to book a service at a location.

| Field | Type | Description |
|---|---|---|
| `calendarId` | uuid? | Id of the calendar |
| `calendarLocationId` | uuid? | Id of the calendar location; use it when requesting an appointment |
| `calendarName` | `ResourceDto` | Name of the service |
| `startDate`, `endDate` | date-time? | First and last date on which appointments can be booked |
| `activeDays`, `appointmentActiveDays`, `appointmentsLimit` | int? | |
| `slotDuration` | int | Duration of one slot, in minutes |
| `intervals` | `WorkIntervalModel[]` | Working intervals: `id`, `start`, `end`, `appointmentsPerSlotLimit`, `workDays[]` |
| `bookedSlots` | `BookedSlot[]` | Slots that already have bookings: `start`, `end`, `bookedCount` |
| `fullyBookedDays` | date[] | Days with no free slots left |
| `restrictions` | `RestrictionsModel` | `holidays[]` and `recoverableDaysOffs[]` (`dayOff`, `recovery`) |
| `locationCapacity` | int? | |
| `locationId` | uuid | Id of the location |
| `organizationServiceDocuments` | `OrganizationServiceDocumentModel[]` | Documents required per service: `calendarName`, `documents` (`ResourceDto`) |

**`SettingModel`** — calendar settings of an organization.

| Field | Type | Description |
|---|---|---|
| `organizationId` | uuid? | Id of the organization |
| `calendarId` | uuid? | Id of the calendar (service) |
| `workDays` | int[] | Working days |
| `holidays` | date-time[] | Holidays, when no appointments are available |
| `recoverableDaysOffs` | `RecoverableDaysOff[]` | `dayOff`, `recovery` |
| `workHours` | `ConfigWorkHour[]` | `start`, `end` |
| `hoursUntilConfirmationDeadline` | int | Hours a citizen has to confirm an appointment before it expires |
