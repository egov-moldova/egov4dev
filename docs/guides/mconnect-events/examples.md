Iată un exemplu de CloudEvent în format „application/cloudevents+json":

```json
{
  "specversion": "1.0",
  "source": "urn:asp",
  "id": "23fa9243-fe2b-4bdc-8607-ab56d091622b",
  "type": "ASP.RST.VP.Invalidated",
  "time": "2025-03-01T23:09:03.2261311Z",
  "data": {
    "IDNP": "2134567890123",
    "Number": "123456789"
  }
}
```

Evenimentul de mai sus reprezintă faptul că certificatul de înmatriculare a vehiculului (VP) cu numărul „123456789" a fost invalidat, iar proprietarul vehiculului are IDNP „2134567890123". Schema pentru evenimentul de mai sus este următoarea:

```json
{
  "type": "object",
  "properties": {
    "IDNP": {
      "type": "string",
      "pattern": "^\\d{13}$"
    },
    "Number": {
      "type": "string"
    }
  },
  "required": [ "IDNP", "Number" ],
  "additionalProperties": false
}
```

Iată un alt exemplu de CloudEvent, considerat prelucrare de date cu caracter personal:

```json
{
  "specversion": "1.0",
  "source": "urn:asp",
  "id": "3dfce534-cdc9-44d5-ba39-690f69706589",
  "type": "MS.eCMND.Person.Born",
  "time": "2025-03-02T09:30:02+02:00",
  "data": {
    "ChildIDNP": "2134567890123",
    "MotherIDNP": "2134567890122",
    "HospitalID": 37,
    "CaseID": 10327,
    "EventReason": "Sincronizare date naștere 10327"
  }
}
```

Evenimentul de mai sus reprezintă faptul nașterii și include EventReason, care poate fi folosit ca temei legal pentru prelucrarea datelor cu caracter personal. În acest caz, MConnect Events este configurat să extragă temeiul legal din câmpul EventReason (folosind „$.EventReason" ca JSON path).

Schema pentru evenimentul de mai sus este următoarea:

```json
{
  "type": "object",
  "properties": {
    "ChildIDNP": {
      "type": "string",
      "pattern": "^\\d{13}$"
    },
    "MotherIDNP": {
      "type": "string",
      "pattern": "^\\d{13}$"
    },
    "HospitalID": {
      "type": "integer"
    },
    "CaseID": {
      "type": "integer"
    },
    "EventReason": {
      "type": "string"
    }
  },
  "required": [ "ChildIDNP", "MotherIDNP", "HospitalID", "CaseID", "EventReason" ],
  "additionalProperties": false
}
```
