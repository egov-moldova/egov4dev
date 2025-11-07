Here is a sample CloudEvent in "application/cloudevents+json" format:

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

The event above represents the fact that VP (Vehicle Registration Certificate) with Number "123456789" was invalidated and the owner of the vehicle has "2134567890123" as IDNP. The schema for the above event is the following:

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

Here is another CloudEvent example that is considered as personal data processing:

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

The event above represents the fact of birth and includes EventReason that can be used as legal reason for personal data processing. In this case, MConnect Events is configured to extract the legal reason from EventReason field (using "$.EventReason" as JSON path).

The schema for the above event is the following:

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
