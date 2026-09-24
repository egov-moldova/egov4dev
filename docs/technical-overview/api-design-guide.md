Acest ghid definește modul în care ar trebui proiectate API-urile REST pentru sistemele informaționale guvernamentale din ecosistemul eGov Moldova. Scopul său este o experiență coerentă pentru consumatori, în toate API-urile construite de instituții și echipe diferite: un dezvoltator care a integrat un API guvernamental ar trebui să se simtă „acasă” în următorul.

Ghidul se aplică **API-urilor REST noi**, construite de sau pentru Agenția de Guvernare Electronică și instituțiile publice. Platformele partajate își documentează contractele efective în [ghidurile lor de integrare](../platforms/index.md) — unele dintre acestea (MSign, MPay, MDelivery) expun interfețe SOAP din motive istorice și legate de semnătura legală, iar acele contracte rămân autoritare pentru integratori.

!!! note
    REST este stilul implicit de API pentru noile interfețe sincrone. Stilurile alternative (GraphQL, gRPC) necesită o justificare arhitecturală explicită, consemnată ca [înregistrare a deciziei de arhitectură](adr.md) — o preferință nu este o justificare.

* * *

## Principii de proiectare

### Proiectare orientată pe resurse

Modelați API-ul în jurul **resurselor** (datele), nu al operațiunilor. Un API orientat pe resurse expune o ierarhie de resurse, manipulate printr-un set restrâns de metode standard:

- O **colecție** conține o listă de resurse de același tip — `certificates`, `applications`, `payments`.
- O **resursă** are stare și zero sau mai multe sub-resurse.

Atunci când proiectați un API, urmați acest flux:

1. Determinați ce tipuri de resurse oferă API-ul.
2. Determinați relațiile dintre resurse.
3. Decideți schema de denumire a resurselor, pe baza tipurilor și relațiilor.
4. Decideți schemele resurselor.
5. Atașați resurselor un set minim de metode, preferând metodele standard.

### Principiul „o singură dată” și sursele autentice

[Principiul „o singură dată”](../principles/architecture.md#principiul-o-singur%C4%83-dat%C4%83-once-only) modelează direct proiectarea API-urilor:

- Nu solicitați consumatorilor (sau, prin intermediul lor, cetățenilor) date care există deja într-un registru guvernamental autentic — consumați-le prin **MConnect**.
- API-ul dumneavoastră este sursa autoritară pentru datele asupra cărora instituția dumneavoastră are mandat. Păstrați aceste date corecte și expuneți-le pentru reutilizare — [contribuiți, nu doar consumați](../principles/architecture.md#contribuie-nu-doar-consuma).
- Stocați doar datele pentru care sistemul dumneavoastră este autoritar, plus identificatori de legătură către date deținute de alte registre.
- Emiteți evenimente la modificări semnificative de stare ([evenimente implicit](../principles/architecture.md#evenimente-implicit-events-by-default)) prin MConnect Events, în loc să obligați consumatorii să interogheze periodic (polling).

* * *

## Convenții de denumire

Toate numele utilizate de un API trebuie să fie **simple**, **intuitive** și **consecvente**.

- Toți identificatorii API — resurse, câmpuri, parametri, operațiuni — sunt scriși în **limba engleză**. Limba română este utilizată doar în textele afișate utilizatorului, produse de aplicații, niciodată în numele din contract. Utilizați [glosarul](../glossary/glossary.md) atunci când traduceți termeni din domeniul guvernamental moldovenesc și extindeți-l atunci când lipsește un termen.
- Utilizați același termen pentru același concept peste tot; evitați supraîncărcarea numelor și numele vagi.

**Rău**

```
Info        // informații despre ce?
Service     // serviciu pentru ce?
Cerere      // română în contract
```

**Bine**

```
OrderStatus          // statusul unei comenzi (Order)
CertificateRequest   // o cerere pentru un certificat
```

### Resurse și scheme

- Tipurile de resurse sunt **substantive la singular**, în `PascalCase`: `Certificate`, `PaymentOrder`.
- Numele câmpurilor sunt în `camelCase`: `firstName`, `issuedAt`. Array-urile și listele sunt substantive la plural.

### URI-uri

- Segmentele de colecție sunt **forma la plural** a substantivului resursei: `/certificates`, `/payment-orders`.
- Utilizați litere **minuscule** în căi (paths); folosiți cratime (`-`) pentru a separa cuvintele, niciodată underscore.
- Utilizați `/` pentru a exprima ierarhia; nu terminați căile cu o bară oblică (slash).
- Parametrii de interogare (query parameters) folosesc `camelCase`.
- Nu plasați niciodată date cu caracter personal (IDNP, nume, adrese) în URI-uri sau în șirurile de interogare — identificatorii propriilor resurse sunt acceptabili, identificatorii personali ai cetățenilor nu. Transmiteți datele cu caracter personal în corpul cererii (request body) al unei cereri autentificate.

```
https://my-service.gov.md/api/v1/certificates/1024/attachments/7
                           |  |       |         |       |      |
                           |  |       |         |       |      ID resursă
                           |  |       |         |       ID colecție
                           |  |       |         ID resursă
                           |  |       ID colecție
                           |  Versiune majoră
                           Cale de bază API
```

* * *

## Metode standard

Preferați cele cinci **metode standard** în locul operațiunilor personalizate. Un API tipic orientat pe resurse expune multe resurse cu puține metode:

| Metodă | Verb HTTP | Operează pe | Exemplu |
| --- | --- | --- | --- |
| `LIST` | `GET` | o colecție | `GET /api/v1/certificates` |
| `GET` | `GET` | o resursă unică | `GET /api/v1/certificates/{id}` |
| `CREATE` | `POST` | o colecție | `POST /api/v1/certificates` |
| `UPDATE` | `PUT` / `PATCH` | o resursă unică | `PATCH /api/v1/certificates/{id}` |
| `DELETE` | `DELETE` | o resursă unică | `DELETE /api/v1/certificates/{id}` |

Utilizați verbele HTTP în mod semantic — `GET` nu modifică niciodată starea, `PUT`/`PATCH` nu creează efecte secundare dincolo de resursa vizată, iar citirile pot fi reîncercate în siguranță.

### Metode personalizate

Atunci când o acțiune nu se mapează curat pe o metodă standard (trimitere, aprobare, arhivare), **transformați acțiunea într-un substantiv (nounify)** și modelați-o ca sub-resursă, în loc să inventați endpoint-uri de tip RPC:

```
POST   /api/v1/applications/{id}/submissions     // depunerea unei cereri
POST   /api/v1/documents/{id}/signatures         // solicitarea semnării
DELETE /api/v1/messages/{id}/archives            // dezarhivarea unui mesaj
```

* * *

## Coduri de status HTTP

Păstrați setul de coduri de status returnate de un API restrâns și predictibil:

| Cod | Semnificație | Utilizare tipică |
| --- | --- | --- |
| 200 | OK | `GET` reușit, sau `PUT`/`PATCH`/`DELETE` reușit care returnează conținut |
| 201 | Created | `POST` reușit; răspunsul conține identificatorul noii resurse |
| 204 | No Content | `PUT`/`PATCH`/`DELETE` reușit, fără nimic de returnat |
| 400 | Bad Request | Eșec de validare; detalii în obiectul de eroare |
| 401 | Unauthorized | Clientul nu a reușit să se autentifice |
| 403 | Forbidden | Autentificat, dar fără permisiunea de a efectua operațiunea |
| 404 | Not Found | Resursa vizată nu există |
| 409 | Conflict | Cererea intră în conflict cu starea curentă a resursei |
| 429 | Too Many Requests | Clientul a depășit limitele de rată; răspunsul include un header `Retry-After` |
| 500 | Server Error | Eroare neașteptată; detaliile sunt jurnalizate pe server, se returnează un mesaj generic |

Reguli care previn cele mai frecvente probleme de integrare:

- **Nu returnați niciodată `200 OK` cu un corp de eroare.** Codul de status este contractul.
- O colecție goală este un `200` reușit, cu o listă goală — nu un `404`.
- Ștergerea unei resurse deja șterse returnează `204`, nu `404` — clienților rareori le pasă că resursa deja nu mai exista.
- Clienții limitați (throttled) primesc `429` cu un header `Retry-After`; se așteaptă ca aceștia să implementeze o strategie de backoff, în loc să bombardeze endpoint-ul.

* * *

## Erori

Răspunsurile de eroare respectă **[RFC 7807 — Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)** (`application/problem+json`). Formele personalizate de eroare sunt interzise în API-urile noi.

```json
{
  "type": "https://my-service.gov.md/errors/validation",
  "title": "Request validation failed",
  "status": 400,
  "detail": "The field 'idnp' must contain exactly 13 digits.",
  "instance": "/api/v1/certificates",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-00",
  "errors": {
    "idnp": ["The field 'idnp' must contain exactly 13 digits."]
  }
}
```

- `type`, `title`, `status` — clasificare lizibilă automat a problemei.
- `detail` — o explicație lizibilă pentru oameni, orientată către consumatorul API-ului. Scrieți-o pentru dezvoltatorul care se integrează, nu pentru propria echipă.
- `traceId` — identificator de corelare care permite furnizorului să găsească eșecul în [jurnalele](log-management.md) sale.
- Nu expuneți niciodată detalii interne în răspunsurile de eroare: stack traces, șiruri de conexiune, SQL, căi de server sau mesajele implicite ale framework-ului.

* * *

## Definiții de date

| Aspect | Standard |
| --- | --- |
| Codificarea textului | UTF-8 peste tot ([RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)) |
| Data și ora | Șiruri [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) / ISO 8601 — `2026-08-07T14:30:00Z`. Stocați și transmiteți în UTC (sau cu un offset explicit); prezentarea locală este responsabilitatea clientului. Ora locală a Moldovei este UTC+2 (UTC+3 vara), astfel încât o „dată fără fus orar” este o eroare garantată. |
| Persoane fizice | `idnp` — numărul de identificare de stat, din 13 cifre, al unei persoane fizice. Transmiteți-l ca șir de caractere din 13 cifre, niciodată ca număr (din cauza zerourilor de la început). |
| Persoane juridice | `idno` — numărul de identificare de stat, din 13 cifre, al unei organizații; aceeași regulă privind formatul de tip șir. |
| Limbi | Coduri ISO 639-1 din două litere: `ro`, `ru`, `en`. |
| Monedă | Coduri ISO 4217 (`MDL`); sumele ca șiruri zecimale sau numere, într-un câmp separat de codul monedei. |

### Corpuri de răspuns

Returnați un **obiect** JSON (nu un array simplu) ca structură de nivel superior, astfel încât contractul să poată fi extins fără a afecta clienții:

```json
{
  "certificates": [
    { "id": "1001", "status": "Issued" },
    { "id": "1002", "status": "Pending" }
  ],
  "nextCursor": "aWQ6MTAwMw=="
}
```

### Paginare

Susțineți paginarea colecțiilor **încă din prima versiune** — adăugarea ei ulterioară este o modificare incompatibilă (breaking change). Acceptați parametrii de interogare `cursor` și `limit` (cu o valoare implicită și un maxim rezonabile pentru `limit`) și returnați un câmp `nextCursor`, gol atunci când nu mai există rezultate. Paginarea bazată pe cursor evită problemele de rânduri duplicate și omise, specifice paginării prin offset pe seturi de date în schimbare; `totalCount` poate fi furnizat atunci când este ieftin de calculat.

* * *

## Versionare

- Versiunea **majoră** apare în calea URI, prefixată cu `v`: `/api/v1/certificates`. Versiunile minore și patch nu apar niciodată în URL-uri.
- Respectați [versionarea semantică](https://semver.org/) pentru serviciul propriu-zis; urmăriți ca modificările să fie compatibile retroactiv.
- O modificare incompatibilă (breaking change) — eliminarea sau redenumirea unui câmp, modificarea semanticii — necesită o **versiune majoră nouă, care funcționează în paralel cu cea veche**. Nu întrerupeți niciodată în tăcere un contract existent.
- La retragerea unei versiuni vechi, notificați toți consumatorii înregistrați printr-un ghid de migrare și o dată de dezactivare cu cel puțin **6 luni** înainte (cu excepția cazului în care jurnalele arată că versiunea nu mai are apelanți), și publicați note de lansare la fiecare actualizare de versiune.

* * *

## Documentație

- Fiecare API REST publică o **specificație OpenAPI generată din cod** (în ASP.NET Core, prin Swashbuckle) — nu scrisă manual, astfel încât contractul să nu se poată abate de la implementare.
- Documentația interactivă (Swagger UI) este expusă în mediul de **testare (staging)** pentru integratori. În **producție**, documentația interactivă este dezactivată implicit — aceasta expune suprafața de atac și detaliile interne oricui o găsește. Activați-o în producție doar pentru o nevoie deliberată și aprobată; altfel, distribuiți fișierul de specificație prin canalul de documentație.
- Documentați fiecare operațiune, parametru și proprietate de schemă cu descrieri; documentați `type`-urile de eroare; furnizați cel puțin un exemplu funcțional pentru fiecare scenariu principal.
- Mențineți un jurnal de modificări pentru API, așa cum fac și [ghidurile de integrare](../platforms/index.md) ale platformelor.

* * *

## Securitate

- **TLS este obligatoriu** pe toate endpoint-urile, în toate mediile. Apelurile sistem-la-sistem se autentifică prin **certificate client emise de STISC**, conform [procedurii de conectare](../platforms/procedure.md).
- Autentificarea și autorizarea utilizatorilor se realizează prin **MPass**; serviciile nu trebuie să implementeze propria stocare a credențialelor.
- Validați toate datele de intrare pe server, indiferent de validarea din partea clientului; preferați listele de permisiuni (allow-lists) în locul listelor de interdicții (deny-lists).
- Aplicați autorizarea la fiecare cerere, la nivel de resursă — eșecurile de autorizare la nivel de obiect (IDOR) se numără printre cele mai frecvente vulnerabilități API.
- Nu plasați niciodată secrete, token-uri sau date cu caracter personal în URL-uri; acestea ajung în jurnalele de acces și în istoricul browserului.
- Aplicați **limitarea ratei (rate limiting)** pe toate endpoint-urile expuse, pentru a proteja disponibilitatea, returnând [`429 Too Many Requests`](#coduri-de-status-http) la depășirea limitelor.
- Aplicațiile care procesează date cu caracter personal trebuie să înregistreze evenimente cu relevanță juridică în [MLog](../guides/mlog/index.md) — vedeți [gestionarea jurnalelor](log-management.md).
- Nivelul minim de securitate pentru aplicațiile din ecosistem este **OWASP ASVS Level 2**; proiectați API-urile în conformitate cu acesta încă de la început, nu ca adaptare ulterioară.

* * *

## Medii

Furnizați aceleași medii pe care le oferă platformele partajate, cu aceeași convenție de URL:

| Mediu | Scop |
| --- | --- |
| Dezvoltare | Dezvoltare internă și verificări automate; doar date sintetice. |
| Testare (staging) (`*.staging.egov.md`) | Mediu de integrare pentru consumatorii API — echivalent funcțional cu producția, cu **date sintetice sau mascate, niciodată date reale de producție**. |
| Producție (`*.gov.md`) | Funcționare live, cu date reale și autentificare live. |

Consumatorii dezvoltă și certifică integrarea în mediul de testare (staging) înainte de a primi acces la producție.
