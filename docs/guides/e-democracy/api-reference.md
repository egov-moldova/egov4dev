# Referință API

## Gestionarea erorilor

| Cod | Descriere |
|---|---|
| AuthenticationFailed | Autentificarea în sistem a eșuat |
| InvalidParameter | Parametru de request invalid |
| AccessDenied | Permisiuni insuficiente |
| PetitionNotFound | Identificatorul petiției nu a fost găsit |
| 200 | Succes |
| 400 | Request invalid |
| 401 | Neautorizat |
| 403 | Interzis |
| 404 | Negăsit |
| 500 | Eroare de server |

## Metode API

```http
GET /authority/petitions
```

**Rezumat**

Preia lista paginată de petiții pentru autoritatea autentificată.

**Autorizare**

Necesită un JWT valid sau un certificat client asociat unui sistem al unei autorități publice.

**Parametri de query**:

- `page` (int, opțional, implicit: 1) – numărul paginii
- `pageSize` (int, opțional, implicit: 10) – numărul de elemente per pagină
- `excludeRegistered` (bool, opțional) – exclude petițiile deja înregistrate pentru procesare
- `status` (FodStatusEnumModel, repetabil, opțional) – filtrează după statusul petiției

**Răspunsuri**:

- `200 OK` – `DataResponse<PetitionModel>`
- `204 No Content` – nu au fost găsite petiții
- `400 Bad Request` – parametri invalizi
- `403 Forbidden` – permisiuni insuficiente
- `500 Internal Server Error`

```http
POST /requestor/petitions
```

**Rezumat**

Preia lista paginată de petiții pentru un cetățean sau operator economic specific.

**Autorizare**

Necesită un JWT valid sau un certificat client. Contextul proprietarului (IDNP/IDNO) este preluat din token/certificat și trebuie să corespundă cu corpul request-ului.

**Corpul request-ului** (`PetitionsRequest`):

- `page` (int, opțional, implicit: 1)
- `pageSize` (int, opțional, implicit: 10)
- `filterStatuses` (FodStatusEnumModel[], opțional)
- `excludeRegistered` (bool, opțional)
- `contextId` (string, obligatoriu) – IDNP sau IDNO al proprietarului petiției

**Răspunsuri**:

- `200 OK` – `DataResponse<PetitionModel>`
- `401 Unauthorized` – autentificarea a eșuat
- `403 Forbidden` – permisiuni insuficiente
- `500 Internal Server Error`

```http
GET /authority/petitions/{petitionNumber}/pdf
```

**Rezumat**

Descarcă documentul principal al petiției (PDF) pentru autoritate.

**Parametri de rută**:

- `petitionNumber` (string, obligatoriu) – identificatorul petiției

**Răspunsuri**:

- `200 OK` – `PetitionFileResponse` (conținut, tip de conținut, nume de fișier)
- `204 No Content` – documentul nu a fost găsit
- `400 Bad Request` – petiția nu a fost găsită sau request invalid
- `403 Forbidden` – permisiuni insuficiente
- `500 Internal Server Error` 

```http
GET /authority/petitions/{petitionNumber}/attachment/{attachmentId}
```

**Rezumat**

Descarcă un fișier atașat la o petiție.  

**Parametri de rută**:

- `petitionNumber` (string, obligatoriu)
- `attachmentId` (guid, obligatoriu)

**Răspunsuri**:

- `200 OK` – `PetitionFileResponse`
- `204 No Content` – atașamentul nu a fost găsit
- `400 Bad Request` – petiția sau atașamentul nu au fost găsite / request invalid
- `403 Forbidden` – permisiuni insuficiente
- `500 Internal Server Error`

```http
GET /requestor/{contextId}/{petitionNumber}/{responseId}
```

**Rezumat**

Descarcă documentul de răspuns al unei petiții pentru un cetățean / operator economic.

**Parametri de rută**:

- `contextId` (string, obligatoriu) – IDNP/IDNO al proprietarului petiției
- `petitionNumber` (string, obligatoriu)
- `responseId` (string, obligatoriu)

**Răspunsuri**:

- `200 OK` – conținut binar al fișierului
- `204 No Content` – documentul de răspuns nu a fost găsit
- `401 Unauthorized` – autentificarea a eșuat
- `403 Forbidden` – permisiuni insuficiente
- `500 Internal Server Error`
  
```http
GET /requestor/extend-term/{contextId}/{petitionNumber}/{decisionId}
```

**Rezumat**

Descarcă documentul de decizie privind prelungirea termenului pentru o petiție.

**Parametri de rută**:

- `contextId` (string, obligatoriu) – IDNP/IDNO al proprietarului petiției
- `petitionNumber` (string, obligatoriu)
- `decisionId` (string, obligatoriu)

**Răspunsuri**:

- `200 OK` – conținut binar al fișierului
- `204 No Content` – documentul de decizie nu a fost găsit
- `401 Unauthorized` – autentificarea a eșuat
- `403 Forbidden` – permisiuni insuficiente
- `500 Internal Server Error`

```http
DELETE /requestor/{contextId}/{petitionNumber}
```

**Rezumat**

Șterge sau ascunde o petiție pentru un cetățean / operator economic.

**Parametri de rută**:

- `contextId` (string, obligatoriu) – IDNP/IDNO al proprietarului petiției
- `petitionNumber` (string, obligatoriu)

**Răspunsuri**:

- `200 OK` – rezultat `bool` care indică succesul
- `401 Unauthorized` – autentificarea a eșuat
- `403 Forbidden` – permisiuni insuficiente
- `500 Internal Server Error`

```http
POST /authority/petitions/register
```

**Rezumat**

Înregistrează începerea procesării petiției de către autoritate.

**Autorizare**

Necesită identitatea sistemului autorității prin JWT sau certificat.

**Corpul request-ului** (`RegisterPetitionRequestModel`):

- `petitionNumber` (string, obligatoriu)
- `registrationNumber` (string, obligatoriu)
- `registrationDate` (DateTime, obligatoriu)
- `responsiblePersonIdnp` (string, obligatoriu)
- `estimatedResolveDate` (DateTime?, opțional)

**Răspunsuri**:

- `200 OK` – înregistrare reușită
- `400 Bad Request` – petiția nu a fost găsită sau eroare de validare
- `403 Forbidden` – permisiuni insuficiente
- `500 Internal Server Error`

```http
POST /authority/petitions/close
```

**Rezumat**

Înregistrează închiderea petiției și încarcă documentul de răspuns.

**Autorizare**

Necesită identitatea sistemului autorității prin JWT sau certificat.

**Corpul request-ului** (`ClosePetitionRequestModel`):

- `petitionNumber` (string, obligatoriu)
- `petitionExitNumber` (string, obligatoriu)
- `satisfactionState` (ResponseState)
- `rejectionState` (ResponseState)
- `refuseState` (ResponseState)
- `unexaminedState` (ResponseState)
- `redirectedState` (ResponseState)
- `file` (`PetitionResponseFile`, obligatoriu) – documentul de răspuns
- `responsiblePersonIdnp` (string, obligatoriu)
- `responseDate` (DateTime?, opțional)

**Răspunsuri**:

- `200 OK` – închidere înregistrată cu succes
- `400 Bad Request` – petiția nu a fost găsită sau eroare de validare
- `403 Forbidden` – permisiuni insuficiente
- `500 Internal Server Error` 
