# Dezvoltarea integrării

## Autentificare

API-ul eDemocracy suportă două metode de autentificare.

### Token JWT (recomandat)

Token-urile JWT trebuie semnate folosind o cheie privată RSA.

Cheia publică corespunzătoare trebuie înregistrată la **AGE**. 

Payload-ul token-ului trebuie să includă **IDNP/IDNO**-ul apelantului în claim-ul `data.idno`.

Acest identificator este utilizat de platformă drept **context de proprietate (owner context)** pentru toate apelurile API.

**Exemplu de header:**

```
Authorization: Bearer <jwt_token>
```

### Certificat X.509 (Mutual TLS)

Metodă alternativă de autentificare.

**Cerințe:** 

- Certificat emis de **STISC**
- Înregistrat în **MPass**
- Autentificare bazată pe numărul de serie al certificatului 

Dacă un token JWT este prezent în header-ul `Authorization` și este valid, acesta are prioritate față de autentificarea prin certificat.

În caz contrar, identitatea sistemului este derivată din certificatul client. 

## Medii de servicii

**URL de bază al API-ului**

| Mediu | URL de bază al API-ului |
|---|---|
| Testare | `https://epetitii.staging.egov.md/petitie/` |
| Producție | `https://epetitii.gov.md/petitie/` |

**Documentație Swagger**  

| Mediu | Swagger |
|---|---|
| Testare | [Swagger UI (Test)](https://epetitii.staging.egov.md/petitie/swagger/index.html) |

> Toate integrările trebuie testate în **mediul de testare** înainte de activarea în producție. 

## Securitate 

### Autorizarea accesului

După autentificare, platforma verifică dacă sistemul are permisiunea de a accesa endpoint-ul solicitat.

**Exemplu de configurare a permisiunilor:**

```json
{

"AllowedEndpoints": [

  "/authority/petitions",

  "/authority/petitions/{petitionNumber}",

  "/authority/petitions/{petitionNumber}/pdf",

  "/authority/petitions/{petitionNumber}/attachment/{attachmentId}"

],

"Scope": "own-authority"

}

```

### Valori pentru Scope

| Scope | Descriere |
|---|---|
| `own-authority` | Acces limitat la petițiile atribuite autorității |
| `all` | Acces la toate petițiile (integrări centrale) |

## Criptare

Toată comunicarea cu API-ul eDemocracy folosește criptare **TLS (HTTPS)**.

Conexiunile HTTP necriptate nu sunt acceptate.
