## Reguli de gestionare a erorilor

Pentru erorile rezultate în urma invocărilor interfeței REST, MDocs returnează erori HTTP (HTTP faults) cu coduri de eroare (fault codes) și motive ale erorii (fault reasons) care descriu eroarea în termeni simpli și clari.

| Cod eroare | Descriere |
|---|---|
| 400 Bad Request | Cererea introdusă nu este un JSON valid. Orice altă eroare care nu poate fi ocolită -- vă rugăm să rețineți că se oferă o explicație detaliată în response. |
| 401 Unauthorized | Declanșată dacă evenimentul de intrare nu poate fi identificat ca făcând parte din niciun IS. |
| 403 Forbidden | Codul de status indică faptul că serverul a înțeles cererea, dar refuză să o autorizeze. |
| 404 Not Found | URL-ul accesat nu este activ în acest moment (404). Nu au fost găsite date pentru parametrii furnizați. |
| 413 Payload Too Large | Informații despre limita maximă admisă pentru dimensiunea unui mesaj. Limita curentă pentru dimensiunea totală a mesajului este de 256 KB. |
| 500 Internal Server Error | Eroare declanșată de o funcționare defectuoasă a sistemului MDocs. Vă rugăm să contactați administratorii MDocs în cazul în care primiți o astfel de eroare. |
| 507 | Eroare de server. |

Pentru clienții care utilizează limbaje de programare ce suportă blocuri try...catch, gestionarea erorilor HTTP este modalitatea corectă de a trata erorile de invocare a serviciului.

Documentele pot fi publicate de client atât pentru proprietarul documentului, cât și pentru alte identități.

## Blobs

### POST /blobs

Încarcă sau inițiază o încărcare parțială pentru un blob care reprezintă conținutul unui document

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| documentTypeCode | string* | codul tipului de document |

*Obligatoriu

**Corpul cererii:**

```json
{
  "idn": "2000009011288",
  "name": "Artur Reaboi",
  "Date": "2023-02-28",
  "Depts": [
    {
      "budgetCode": "Consolidat",
      "totalDebt": 31.36
    },
    {
      "budgetCode": "Bugetul asigurărilor sociale de stat",
      "totalDebt": 1436.44
    }
  ]
}
```

**Răspunsuri:**

| Status HTTP | Descriere | Exemplu |
|---|---|---|
| 201 | Blob-ul a fost creat | `{ "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }` |
| 400 | Cerere incorectă - Un parametru este invalid | |
| 403 | Forbidden | |

### PUT /blobs/{id}

Continuă/finalizează încărcarea parțială pentru document. Intervalul dimensiunii unei părți poate fi de la 5 MiB la 5 GiB. Dimensiunea ultimei părți poate fi de la 0 B la 5 GiB.

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| id | string($uuid) (path)* | ID-ul blob-ului |

*Obligatoriu

**Corpul cererii:**

```json
{
  "idn": "2000009011288",
  "name": "Artur Reaboi",
  "Date": "2023-02-28",
  "Depts": [
    {
      "budgetCode": "Consolidat",
      "totalDebt": 31.36
    },
    {
      "budgetCode": "Bugetul asigurărilor sociale de stat",
      "totalDebt": 1436.44
    }
  ]
}
```

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Blob-ul a fost actualizat |
| 400 | Cerere incorectă - Un parametru este invalid |
| 403 | Forbidden |

### DELETE /blobs/{id}

Marchează un blob ca fiind în curs de ștergere

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| id | string($uuid) (path)* | ID-ul blob-ului |

*Obligatoriu

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Blob-ul a fost șters |
| 400 | Cerere incorectă - Un parametru este invalid |
| 403 | Forbidden |
| 404 | Not found |

### POST /transform

Transformă fișierul încărcat în formatul de fișier selectat

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| documentTypeCode | string* | codul tipului de document |
| format | string* | formatul fișierului care va fi descărcat (Pdf sau Html) |
| language | string | limba utilizată pentru dicționare (Ro/En/Ru) |

*Obligatoriu

**Corpul cererii:**

```json
{
  "idn": "2000009011288",
  "name": "Artur Reaboi",
  "Date": "2023-02-28",
  "Depts": [
    {
      "budgetCode": "Consolidat",
      "totalDebt": 31.36
    },
    {
      "budgetCode": "Bugetul asigurărilor sociale de stat",
      "totalDebt": 1436.44
    }
  ]
}
```

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 400 | Cerere incorectă |
| 403 | Forbidden |

## Documents

### GET /documents

Afișează toate documentele pentru principalul curent

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| principal | string | principalul, dacă doriți să impersonați o identitate |
| type | string | filtrează lista pentru a afișa doar documentele de tipul furnizat |
| folderId | string($uuid) (path) | ID-ul folderului părinte |
| page | integer($int32) | numărul paginii pe care doriți să o afișați |
| itemsPerPage | integer($int32) | numărul de elemente de afișat pe pagină |
| orderField | string | ordonează lista după câmpul furnizat |
| searchBy | string | filtrează lista pentru a afișa documentele care au câmpuri ce conțin textul furnizat |

**Corpul răspunsului:**

HTTP 200

```json
[
  {
    "id": "de9eb38a-b7e0-4a4c-bc3c-018a5f3ccff9",
    "name": "Docname",
    "folderId": null,
    "folderName": "Root",
    "number": "5",
    "expiresOn": null,
    "type": "Cazier",
    "type_Name_Ro": "Cazier",
    "type_Name_En": null,
    "type_Name_Ru": null,
    "typeIcon": null,
    "size": 92951,
    "indicativeFlags": 0,
    "createdOn": "2023-09-04T06:44:56.912",
    "createdBy": "urn:md:idno:1010600034203",
    "createdByName": "Instituţia Publică CENTRUL DE GUVERNARE ELECTRONICĂ (E-GOVERNMENT)",
    "modifiedOn": "2023-09-12T13:02:25.5085277",
    "modifiedBy": "urn:md:idnp:2002027065619",
    "modifiedByName": "ELENA PLUGARU"
  }
]
```

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 400 | Cerere incorectă |
| 403 | Forbidden |
| 404 | Not Found |

### POST /documents

Creează documente

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| blobId | Guid* | Conținutul efectiv al documentului. NULL pentru foldere. |
| principal | String(100)* | Cine este proprietarul documentului, în format URN: urn:md:idno/idnp |
| Name | String(250)* | Numele fișierului sau folderului |
| number | String(50) | Numărul documentului atribuit de emitentul documentului |
| expiresOn | DateTime | Dacă este setat, specifică data de expirare a documentului |
| createdOn | DateTime | Egal cu UploadedOn dacă nu este specificat |
| createdBy | String(100) | URN-ul principalului creator |
| folderId | Guid | Folderul părinte, care este un document fără BlobId |

*Obligatoriu

**Corpul cererii:**

```json
{
  "blobId": "49f62517-bfdc-438b-b625-018aac4fddfd",
  "documents": [
    {
      "principal": "urn:md:idnp:2002027065619",
      "name": "JsonDoc",
      "number": " XT-85214P",
      "expiresOn": "2023-11-19T07:10:24.338Z",
      "createdOn": "2023-09-19T07:10:24.338Z",
      "createdBy": "urn:md:idnp:2002027065619",
      "folderId": "110b0724-6f02-48c1-af48-018a6029ef71"
    }
  ]
}
```

**Note:**
- Pentru ca documentul să fie publicat cu succes, "expiresOn" trebuie să fie mai mare decât "createdOn".
- Dacă clientul nu setează o dată de expirare pentru tipul de document, atunci documentul creat va avea data de expirare a tipului de document căruia îi aparține blob-ul.
- Dacă tipul de document căruia îi aparține blob-ul nu are setată o dată de expirare, atunci documentul creat va avea valoarea null pentru expiresOn.
- La "createdOn" introduceți data de la care documentul va fi disponibil; este posibil ca, la setarea unei date de creare viitoare, documentul să fie disponibil de la data setată (câmp opțional).
- Validarea formatului identităților se face după formula "urn:md:"

**Corpul răspunsului:**

HTTP 201 Created

```json
[
  {
    "id": "a78e6501-877b-4969-bed7-018aad5406c8",
    "name": "Exemple (2)",
    "principal": "urn:md:idnp:2002027065619",
    "expiresOn": null
  }
]
```

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 201 | Created |
| 400 | Cerere incorectă |
| 403 | Forbidden - Documentul nu poate fi creat deoarece principalul nu are permisiunea Write asupra folderului destinație sau în ierarhia superioară |
| 404 | Not Found |
| 507 | Eroare de server. Spațiu de stocare insuficient |

### GET /documents/{id}

Obține detaliile documentului

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| id | string($uuid) (path)* | ID-ul documentului |
| principal | string (query) | principalul, dacă doriți să impersonați o identitate |

*Obligatoriu

**Corpul răspunsului:**

HTTP 200

```json
{
  "id": "de9eb38a-b7e0-4a4c-bc3c-018a5f3ccff9",
  "name": "Docname",
  "folderId": null,
  "folderName": "Root",
  "number": "5",
  "expiresOn": null,
  "type": "Cazier",
  "type_Name_Ro": "Cazier",
  "type_Name_En": null,
  "type_Name_Ru": null,
  "typeIcon": null,
  "size": 92951,
  "indicativeFlags": 0,
  "createdOn": "2023-09-04T06:44:56.912",
  "createdBy": "urn:md:idno:1010600034203",
  "createdByName": "Instituţia Publică CENTRUL DE GUVERNARE ELECTRONICĂ (E-GOVERNMENT)",
  "modifiedOn": "2023-09-12T13:02:25.5085277",
  "modifiedBy": "urn:md:idnp:2002027065619",
  "modifiedByName": "ELENA PLUGARU"
}
```

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 403 | Forbidden |
| 404 | Not Found |

### PATCH /documents/{id}

Actualizează documentul

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| id | string($uuid) (path)* | ID-ul documentului |
| principal | string (query) | principalul, dacă doriți să impersonați o identitate |

*Obligatoriu

**Corpul cererii:**

```json
{
  "name": "UpdatedDocName",
  "number": "XT-12345",
  "expiresOn": "2023-12-31T23:59:59Z"
}
```

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 400 | Cerere incorectă |
| 403 | Forbidden |
| 404 | Not Found |

### DELETE /documents/{id}

Șterge documentul (mută în coșul de reciclare)

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| id | string($uuid) (path)* | ID-ul documentului |
| principal | string (query) | principalul, dacă doriți să impersonați o identitate |

*Obligatoriu

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 403 | Forbidden |
| 404 | Not Found |

### GET /documents/{id}/blob

Descarcă blob-ul documentului

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| id | string($uuid) (path)* | ID-ul documentului |
| principal | string (query) | principalul, dacă doriți să impersonați o identitate |

*Obligatoriu

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes - returnează conținutul binar al documentului |
| 403 | Forbidden |
| 404 | Not Found |

### GET /documents/{id}/versions

Obține versiunile documentului

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| id | string($uuid) (path)* | ID-ul documentului |
| principal | string (query) | principalul, dacă doriți să impersonați o identitate |
| page | integer($int32) | numărul paginii pe care doriți să o afișați |
| itemsPerPage | integer($int32) | numărul de elemente de afișat pe pagină |

*Obligatoriu

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 400 | Cerere incorectă |
| 403 | Forbidden |
| 404 | Not Found |

## API-uri pentru partajarea documentelor

### POST /documents/{id}/shares

Partajează un document cu una sau mai multe identități

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| id | string($uuid) (path)* | ID-ul documentului |
| principal | string (query) | principalul, dacă doriți să impersonați o identitate |

*Obligatoriu

**Corpul cererii:**

```json
{
  "shares": [
    {
      "sharedFor": "urn:md:idnp:2005042155206",
      "permission": "Read",
      "from": "2023-11-01T00:00:00",
      "to": "2023-11-30T23:59:59"
    }
  ]
}
```

**Note:**
- `permission`: "Read" sau "Write"
- `from` și `to`: interval de date opțional pentru partajare
- `from` <= `to` și `to` > acum

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 201 | Created |
| 400 | Cerere incorectă |
| 403 | Forbidden |
| 404 | Not Found |

### GET /documents/{id}/shares

Obține toate partajările pentru un document

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| id | string($uuid) (path)* | ID-ul documentului |
| principal | string (query) | principalul, dacă doriți să impersonați o identitate |

*Obligatoriu

**Corpul răspunsului:**

HTTP 200

```json
{
  "id": "48e0b28a-0784-471b-b0bd-018ae14636c5",
  "name": "json.json",
  "folderId": null,
  "number": "string",
  "type": "Unknown",
  "type_Name_Ro": "Unknown",
  "type_Name_En": null,
  "type_Name_Ru": null,
  "typeIcon": null,
  "size": 11081517,
  "createdOn": "2023-09-06T09:09:02.148974",
  "createdBy": "urn:md:idno:1018600049308",
  "createdByName": "CODWER S.R.L.",
  "modifiedOn": "2023-09-22T11:22:23.7414537",
  "modifiedBy": "urn:md:idno:1018600049308",
  "modifiedByName": "CODWER S.R.L.",
  "expiresOn": "2023-12-09T23:59:59",
  "shares": [
    {
      "id": "b07df74f-f1e5-43f6-ad86-018acd0632e7",
      "permission": "Write",
      "sharedOn": "2023-09-25T15:47:30.1517579",
      "sharedFor": "urn:md:idnp:2005042155206",
      "sharedForName": "LILIA GUPCA",
      "from": "2023-11-01T00:00:00",
      "to": "2023-11-04T00:00:00"
    },
    {
      "id": "08877815-ffd0-4af8-8284-018ae1465b0f",
      "permission": "Write",
      "sharedOn": "2023-09-29T14:09:59.0554621",
      "sharedFor": "urn:md:idno:1003600034203",
      "sharedForName": "LETO S.R.L.",
      "from": null,
      "to": null
    }
  ]
}
```

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 400 | Cerere incorectă |
| 403 | Forbidden |

## API-uri pentru shares

### GET /shares/for-me

Listează partajările făcute pentru principalul curent

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| principal | string (query) | principalul, dacă doriți să impersonați o identitate |
| page | integer($int32) | numărul paginii pe care doriți să o afișați |
| itemsPerPage | integer($int32) | numărul de elemente de afișat pe pagină |
| orderField | string | ordonează lista după câmpul furnizat |
| searchBy | string | filtrează lista pentru a afișa documentele care au câmpuri ce conțin textul furnizat |

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 400 | Cerere incorectă |
| 403 | Forbidden |

### GET /shares/by-me

Listează partajările făcute de principalul curent

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| principal | string (query) | principalul, dacă doriți să impersonați o identitate |
| page | integer($int32) | numărul paginii pe care doriți să o afișați |
| itemsPerPage | integer($int32) | numărul de elemente de afișat pe pagină |
| orderField | string | ordonează lista după câmpul furnizat |
| searchBy | string | filtrează lista pentru a afișa documentele care au câmpuri ce conțin textul furnizat |

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 400 | Cerere incorectă |
| 403 | Forbidden |

### POST /shares/reservations

Rezervă o partajare

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| generateAccessCode | boolean | generateAccessCode = true dacă doriți să generați un cod de acces |

**Corpul răspunsului:**

HTTP 201

```json
{
  "id": "1b3d3a56-72a3-4601-bf72-018af98d7a8e",
  "accessCode": "47211813",
  "fullLink": "https://mdocs.staging.egov.md/view/1b3d3a56-72a3-4601-bf72-018af98d7a8e?accessCode=47211813"
}
```

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 201 | Created |

## Tipuri de documente

### GET /document-types/{code}

Obține detaliile tipului de document

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| code | String* | Codul tipului de document |

*Obligatoriu

**Corpul răspunsului:**

HTTP 200

```json
{
  "code": "Spinner",
  "title_Romanian": "Spinner",
  "title_English": null,
  "title_Russian": null,
  "versioningEnabled": true,
  "icon": null
}
```

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |

## Principali

### GET /principals/{id}/name

Obține numele principalului

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| id | String (path)* | principal |

*Obligatoriu

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 400 | Cerere incorectă |
| 403 | Forbidden |

## Cotă (Quota)

### GET /quota

Obține informații despre cotă

**Parametri**

| Nume | Tip de date | Descriere |
|---|---|---|
| principal | String (query)* | Principalul, dacă doriți să impersonați o identitate |

**Corpul răspunsului:**

HTTP 200

```json
{
  "storageMaximum": 50000000000,
  "storageUsage": 23082794
}
```

**Răspunsuri:**

| Status HTTP | Descriere |
|---|---|
| 200 | Succes |
| 400 | Cerere incorectă |
| 403 | Forbidden |
| 507 | Eroare de server |
