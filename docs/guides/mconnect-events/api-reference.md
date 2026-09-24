## Reguli de gestionare a erorilor

API-urile REST MConnect Events pot returna următoarele coduri de stare în caz de eroare:

| Cod de stare HTTP | Descriere |
|-----------------|-------------|
| **400 Bad Request** | Returnat atunci când cererea are o problemă. De exemplu, cererea nu include certificatul client sau un intermediar, lipsește un header, formatul nu este un JSON valid etc.<br><br>Pentru mai multe detalii, examinați conținutul răspunsului. |
| **401 Unauthorized** | Returnat pentru orice eroare de autorizare. Fie sistemul nu este înregistrat ca producător sau consumator, are o configurație de autorizare greșită, nu are dreptul de a publica evenimente de tipul indicat, sau nu poate utiliza sursa indicată etc.<br><br>Pentru mai multe detalii, examinați conținutul răspunsului. |
| **404 Not Found** | URL-ul cererii este greșit sau instanța de consumator nu este găsită (a expirat sau nu se află pe bridge-ul indicat).<br><br>Pentru mai multe detalii, examinați conținutul răspunsului. |
| **413 Content Too Large** | Returnat atunci când întreaga cerere HTTP este mai mare decât valoarea specificată în secțiunea Limite. |
| **422 Unprocessable Entity** | Returnat atunci când payload-ul evenimentului nu este valid conform schemei de eveniment configurate.<br><br>Pentru mai multe detalii, examinați conținutul răspunsului. |
| **500 Internal Server Error** | Eroare neașteptată. Contactați deținătorul serviciului și raportați eroarea. |

În caz de succes, codul de stare returnat este 200, 201, 202 sau 204.

## API-uri pentru producători

Producătorii pot produce evenimente folosind unul din următoarele API-uri.

**Important!** Pentru scenariile de producție, se recomandă producerea evenimentelor în loturi, folosind ultimul endpoint. Vezi și secțiunea Limite.

### Endpoint: POST /ce/produce/raw

**Descriere:** Produce un singur eveniment în formă brută (raw) în corpul cererii HTTP.

Setați headerul standard Content-Type la una din următoarele valori:
- `application/json` – payload-ul este în format JSON (cel mai probabil formatul pe care intenționați să îl utilizați);
- `application/octet-stream` – payload-ul este binar (doar pentru cazuri speciale);
- `text/plain` – payload-ul este text simplu (doar pentru cazuri speciale).

**Parametrii cererii:**

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Header | ce-specversion | string* | Versiunea specificației CloudEvents utilizată de eveniment. Aceasta permite interpretarea contextului. Trebuie setată întotdeauna la „1.0". |
| Header | ce-source | uri* | Identifică contextul în care s-a produs evenimentul. Trebuie setată la valoarea (sau la una dintre valorile) permise în configurația producătorului.<br><br>Producătorii trebuie să se asigure că source + id este unic pentru fiecare eveniment distinct. |
| Header | ce-id | string* | Identifică evenimentul.<br><br>Producătorii trebuie să se asigure că source + id este unic pentru fiecare eveniment distinct. |
| Header | ce-type | string* | Conține o valoare care descrie tipul evenimentului asociat producerii care a avut loc. Acest atribut este folosit pentru autorizare, rutare, observabilitate etc. |
| Header | ce-subject | string | Descrie subiectul evenimentului în contextul producătorului evenimentului (identificat de source). Un consumator consumă de obicei evenimente emise de o sursă, dar identificatorul sursei singur ar putea să nu fie suficient ca și calificator pentru un eveniment specific, dacă contextul sursei are o substructură internă. Opțional. |
| Header | ce-time | datetime | Marca temporală a momentului producerii. Nu poate fi setată la un moment viitor. Formatată conform RFC 3339. Dacă momentul producerii nu poate fi determinat, acest atribut poate fi setat la un alt moment (precum momentul curent) de către producătorul CloudEvents, însă toți producătorii pentru aceeași sursă trebuie să fie consecvenți în acest sens. Cu alte cuvinte, fie folosesc toți momentul real al producerii, fie folosesc toți același algoritm pentru determinarea valorii utilizate. Opțional, implicit momentul curent. |
| Header | ce-partitionkey | string | O cheie de partiționare pentru eveniment, specificată pentru a asigura ordinea consumării între mai multe evenimente cu aceeași cheie de partiționare. Opțional. |

**Răspuns:** 202 Accepted – returnat atunci când evenimentul a fost persistat cu succes pentru toți consumatorii autorizați.

### Endpoint: POST /ce/produce/event

**Descriere:** Produce un singur eveniment conform standardului CloudEvents, ceea ce înseamnă că corpul cererii trebuie să fie un obiect JSON valid. Headerul standard HTTP Content-Type trebuie setat la `application/cloudevents+json`.

**Parametrii cererii:**

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Body | specversion | string* | Versiunea specificației CloudEvents utilizată de eveniment. Aceasta permite interpretarea contextului. Trebuie setată întotdeauna la „1.0". |
| Body | source | uri* | Identifică contextul în care s-a produs evenimentul. Trebuie setată la valoarea (sau la una dintre valorile) permise în configurația producătorului.<br><br>Producătorii trebuie să se asigure că source + id este unic pentru fiecare eveniment distinct. |
| Body | id | string* | Identifică evenimentul.<br><br>Producătorii trebuie să se asigure că source + id este unic pentru fiecare eveniment distinct. |
| Body | type | string* | Conține o valoare care descrie tipul evenimentului asociat producerii care a avut loc. Acest atribut este folosit pentru autorizare, rutare, observabilitate etc. |
| Body | datacontenttype | string | Tipul de conținut al valorii data. Acest atribut permite ca datele să conțină orice tip de conținut, format și codare putând diferi de cele ale formatului de eveniment ales. Opțional, implicit application/json. În prezent, doar datele JSON sunt acceptate de MConnect Events pentru acest endpoint. |
| Body | subject | string | Descrie subiectul evenimentului în contextul producătorului evenimentului (identificat de source). Un consumator consumă de obicei evenimente emise de o sursă, dar identificatorul sursei singur ar putea să nu fie suficient ca și calificator pentru un eveniment specific, dacă contextul sursei are o substructură internă. Opțional. |
| Body | time | date-time | Marca temporală a momentului producerii. Nu poate fi setată la un moment viitor. Formatată conform RFC 3339. Dacă momentul producerii nu poate fi determinat, acest atribut poate fi setat la un alt moment (precum momentul curent) de către producătorul CloudEvents, însă toți producătorii pentru aceeași sursă trebuie să fie consecvenți în acest sens. Cu alte cuvinte, fie folosesc toți momentul real al producerii, fie folosesc toți același algoritm pentru determinarea valorii utilizate. Opțional, implicit momentul curent. |
| Body | partitionkey | string | O cheie de partiționare pentru eveniment, specificată pentru a asigura ordinea consumării între mai multe evenimente cu aceeași cheie de partiționare. Opțional. |
| Body | data | JSON* | Payload-ul evenimentului în format JSON. |

**Răspuns:** 202 Accepted – returnat atunci când evenimentul (evenimentele) au fost persistate cu succes pentru toți consumatorii autorizați.

### Endpoint: POST /ce/produce/events

**Descriere:** Produce un lot de evenimente conform standardului CloudEvents, ceea ce înseamnă că corpul cererii trebuie să fie un tablou (array) JSON valid de obiecte JSON. Headerul standard HTTP Content-Type trebuie setat la `application/cloudevents-batch+json`.

Fiecare element al tabloului are structura descrisă la endpointul anterior.

Aceasta este modalitatea recomandată de a produce evenimente dacă implementați pattern-ul outbox (de asemenea recomandat), caz în care oricum acumulați o listă de evenimente de produs.

MConnect Events persistă fie toate evenimentele către unul sau mai mulți consumatori de destinație, fie niciunul, într-o manieră tranzacțională. Aceasta înseamnă că este sigur ca un producător să reîncerce producerea lotului de evenimente în caz de erori.

## API-uri pentru consumatori prin WebSocket

Există două protocoale pentru consumarea evenimentelor. WebSocket este cel recomandat, din motive de eficiență și performanță.

Endpointul WebSocket este accesibil prin mecanismul standard de upgrade al protocolului HTTP 1.1 și prin metoda standard HTTP 2 CONNECT, folosind următoarele endpointuri:

| Mediu | URL complet al endpointului |
|-------------|-------------------|
| Staging | wss://mconnect-events.staging.egov.md:8443/ce/consume/ws |
| Producție | wss://mconnect-events.gov.md:8443/ce/consume/ws |

Sub-protocolul WebSocket care trebuie utilizat este:
```
cloudevents.json
```

Conexiunea WebSocket stabilită este un canal de comunicare bidirecțional simultan. Protocolul este destul de simplu.

### Mesaje trimise către consumator

MConnect Events transmite în flux evenimentele de consumat către client, sub formă de mesaje separate în format JSON, arătând ca mai jos.

**Primul mesaj exemplu:**
```json
{
  "specversion": "1.0",
  "source": "urn:source",
  "id": "sample-id-1001",
  "type": "Organization.Event.Occurred",
  "time": "2025...",
  "offset": "1",
  "data": { event-payload-inline-json }
}
```

**Al doilea mesaj exemplu:**
```json
{
  "specversion": "1.0",
  "source": "urn:source",
  "id": "sample-id-1002",
  "type": "Organization.Event.Occurred",
  "time": "2025...",
  "offset": "2",
  "data": { event-payload-inline-json }
}
```

Și așa mai departe.

Semnificația proprietăților este următoarea:

| Proprietate | Tip | Descriere |
|----------|------|-------------|
| specversion | string* | Versiunea specificației CloudEvents utilizată de eveniment, în prezent returnată întotdeauna ca „1.0". |
| source | uri* | Identifică contextul în care s-a produs evenimentul.<br><br>Producătorii trebuie să se asigure că source + id este unic pentru fiecare eveniment distinct. |
| id | string* | Identifică evenimentul.<br><br>Producătorii trebuie să se asigure că source + id este unic pentru fiecare eveniment distinct. |
| type | string* | Conține o valoare care descrie tipul evenimentului asociat producerii care a avut loc. |
| subject | string | Descrie subiectul evenimentului în contextul producătorului evenimentului (identificat de source). Un consumator consumă de obicei evenimente emise de o sursă, dar identificatorul sursei singur ar putea să nu fie suficient ca și calificator pentru un eveniment specific, dacă contextul sursei are o substructură internă. Opțional. |
| time | date-time* | Marca temporală a momentului în care evenimentul a avut loc sau a fost produs. Formatată conform RFC 3339. |
| partitionkey | string | O cheie de partiționare pentru eveniment, specificată pentru a asigura ordinea consumării între mai multe evenimente cu aceeași cheie de partiționare. Opțional. |
| offset | string* | Offset-ul evenimentului pentru instanța curentă de consumator. Utilizat pentru confirmări explicite. |
| data | JSON* | Payload-ul evenimentului în format JSON. |

### Mesaje trimise către MConnect Events

Clientul transmite înapoi în flux confirmări de consum sau evenimente eșuate (dead).

O confirmare arată astfel:
```
confirm:<<offset>>
```

adică prefixul „confirm:" urmat de offset, unde offset este un șir de caractere (un întreg mereu crescător, formatat ca string) preluat din evenimentul primit. Aceasta are ca rezultat confirmarea consumării tuturor evenimentelor până la offset-ul specificat.

Raportarea unui eveniment eșuat (dead) arată astfel:
```
dead:{ "specversion": "1.0", "source": "urn:source", "id": "sample-id-1002", "type": "Organization.Event.Occurred", "time": "2025…", "offset": "2", "data": { event-payload-inline-json } }
```

adică prefixul „dead:" urmat de JSON-ul evenimentului eșuat, pe care consumatorul îl poate modifica dacă este necesar, pentru gestionarea ulterioară specială a evenimentelor eșuate.

Orice alt prefix de mesaj va avea ca rezultat închiderea conexiunii WebSocket de către MConnect Events.

## API-uri pentru consumatori prin long polling

Există două protocoale pentru consumarea evenimentelor. WebSocket este cel recomandat. Totuși, dacă folosiți un framework care nu include un client WebSocket (ceea ce este foarte puțin probabil) sau dacă doriți doar să testați consumarea evenimentelor folosind Swagger UI (sau un instrument local de tip client HTTP), MConnect Events implementează și binecunoscutul protocol long polling.

Long polling presupune crearea unui consumator, interogarea (polling) evenimentelor de consumat (inclusiv trimiterea confirmărilor de consum) și ștergerea consumatorilor înainte de închidere. Consumatorii care nu interoghează activ evenimente sunt șterși automat după un anumit timp de expirare.

### Endpoint: POST /ce/consumers

**Descriere:** Creează o instanță de consumator cu stare (stateful) pe unul din bridge-uri, care poate fi folosită pentru a consuma evenimente prin long polling. Este normal ca acest endpoint să dureze ceva timp (de obicei până la 30 de secunde), deoarece crearea consumatorilor necesită o coordonare internă.

**Parametrii cererii:**

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Query | events | boolean | Specifică dacă se consumă evenimentele standard produse de producători. Opțional, implicit true. |
| Query | test | boolean | Specifică dacă se consumă evenimentele de test produse de consumatorul apelant, în scop de testare (vezi API-urile pentru instrumente). Opțional, implicit true. |
| Query | dead | boolean | Specifică dacă se consumă evenimentele eșuate produse de consumatorul apelant. Opțional, implicit false. |
| Query | group | string | Specifică numele grupului de consumatori. Setat de sistemele care trebuie să consume evenimentele de două ori, în două subcomponente. Nu setați acest parametru atunci când consumați evenimente în paralel din mai multe instanțe ale aceluiași consumator, adică atunci când nu este nevoie să consumați aceleași evenimente de mai multe ori. Opțional, implicit „~default". |

**Răspuns:** 201 Created

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Header | Location | uri* | Un URL absolut, care reprezintă adresa de bază a instanței de consumator create.<br><br>În prezent are următoarea formă:<br>`https://{mconnect-events-base-address}/{bridge}/ce/consumers/{group}/instances/{instance}`<br><br>având următorii parametri de cale:<br>- bridge – instanța bridge-ului pe care a fost creat consumatorul;<br>- group – numele grupului pentru consumatorul creat;<br>- instance – identificatorul instanței de consumator.<br><br>Rețineți că forma se poate schimba în viitor, deci TREBUIE să o folosiți doar ca adresă de bază pentru celelalte apeluri legate de această instanță. |

### Endpoint: GET /{bridge}/ce/consumers/{group}/instances/{instance}/raw

**Descriere:** Consumă următorul eveniment în format brut (raw), dacă există. Payload-ul evenimentului este returnat în corpul răspunsului HTTP.

**Parametrii cererii:**

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Path | bridge | string* | Instanța bridge-ului pe care a fost creat consumatorul.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | group | string* | Numele grupului de consumatori.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | instance | string* | Identificatorul instanței de consumator.<br><br>Parte a adresei de bază a instanței de consumator. |
| Query | confirm | boolean | Specifică dacă se confirmă evenimentele consumate anterior. Opțional, implicit false. |

**Răspuns:** 200 OK

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Header | Content-Type | string* | Tipul payload-ului evenimentului returnat în corpul răspunsului. Poate fi:<br>- `application/json` – payload-ul este în format JSON (formatul cel mai folosit);<br>- `application/octet-stream` – payload-ul este binar (doar pentru cazuri speciale);<br>- `text/plain` – payload-ul este text simplu (doar pentru cazuri speciale). |
| Header | ce-specversion | string* | Versiunea specificației CloudEvents utilizată de eveniment. Aceasta permite interpretarea contextului. Setată întotdeauna la „1.0". |
| Header | ce-source | uri* | Identifică contextul în care s-a produs evenimentul.<br><br>Producătorii trebuie să se asigure că source + id este unic pentru fiecare eveniment distinct. |
| Header | ce-id | string* | Identifică evenimentul.<br><br>Producătorii trebuie să se asigure că source + id este unic pentru fiecare eveniment distinct. |
| Header | ce-type | string* | Conține o valoare care descrie tipul evenimentului asociat producerii care a avut loc. |
| Header | ce-subject | string | Descrie subiectul evenimentului în contextul producătorului evenimentului (identificat de source). Un consumator consumă de obicei evenimente emise de o sursă, dar identificatorul sursei singur ar putea să nu fie suficient ca și calificator pentru un eveniment specific, dacă contextul sursei are o substructură internă. Opțional. |
| Header | ce-time | datetime* | Marca temporală a momentului în care evenimentul a avut loc sau a fost produs. Formatată conform RFC 3339. |
| Header | ce-partitionkey | string | O cheie de partiționare pentru eveniment, specificată pentru a asigura ordinea consumării între mai multe evenimente cu aceeași cheie de partiționare. Opțional. |
| Header | ce-offset | string* | Offset-ul evenimentului pentru instanța curentă de consumator. Utilizat pentru confirmări explicite. |

**Răspuns:** 204 No Content – returnat atunci când nu există evenimente de consumat. Returnat după expirarea timpului de așteptare (poll timeout), în care niciun producător nu a produs evenimente pentru consumatorul apelant.

### Endpoint: GET /{bridge}/ce/consumers/{group}/instances/{instance}/event

**Descriere:** Consumă următorul eveniment în format CloudEvents JSON.

**Parametrii cererii:**

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Path | bridge | string* | Instanța bridge-ului pe care a fost creat consumatorul.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | group | string* | Numele grupului de consumatori.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | instance | string* | Identificatorul instanței de consumator.<br><br>Parte a adresei de bază a instanței de consumator. |
| Query | confirm | boolean | Specifică dacă se confirmă evenimentele consumate anterior. Opțional, implicit false. |

**Răspuns:** 200 OK

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Header | Content-Type | string | Tipul conținutului răspunsului HTTP: `application/cloudevents+json` |
| Body | specversion | string* | Versiunea specificației CloudEvents utilizată de eveniment, în prezent returnată întotdeauna ca „1.0". |
| Body | source | uri* | Identifică contextul în care s-a produs evenimentul.<br><br>Producătorii trebuie să se asigure că source + id este unic pentru fiecare eveniment distinct. |
| Body | id | string* | Identifică evenimentul.<br><br>Producătorii trebuie să se asigure că source + id este unic pentru fiecare eveniment distinct. |
| Body | type | string* | Conține o valoare care descrie tipul evenimentului asociat producerii care a avut loc. |
| Body | subject | string | Descrie subiectul evenimentului în contextul producătorului evenimentului (identificat de source). Un consumator consumă de obicei evenimente emise de o sursă, dar identificatorul sursei singur ar putea să nu fie suficient ca și calificator pentru un eveniment specific, dacă contextul sursei are o substructură internă. Opțional. |
| Body | time | datetime* | Marca temporală a momentului în care evenimentul a avut loc sau a fost produs. Formatată conform RFC 3339. |
| Body | partitionkey | string | O cheie de partiționare pentru eveniment, specificată pentru a asigura ordinea consumării între mai multe evenimente cu aceeași cheie de partiționare. Opțional. |
| Body | offset | string* | Offset-ul evenimentului pentru instanța curentă de consumator. Utilizat pentru confirmări explicite. |
| Body | data | JSON* | Payload-ul evenimentului în format JSON. |

**Răspuns:** 204 No Content – returnat atunci când nu există evenimente de consumat. Returnat după expirarea timpului de așteptare (poll timeout), în care niciun producător nu a produs evenimente pentru consumatorul apelant.

### Endpoint: GET /{bridge}/ce/consumers/{group}/instances/{instance}/events

**Descriere:** Consumă următorul lot de evenimente în format CloudEvents JSON. Această metodă colectează un lot de evenimente înainte de a răspunde.

**Parametrii cererii:**

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Path | bridge | string* | Instanța bridge-ului pe care a fost creat consumatorul.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | group | string* | Numele grupului de consumatori.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | instance | string* | Identificatorul instanței de consumator.<br><br>Parte a adresei de bază a instanței de consumator. |
| Query | confirm | boolean | Specifică dacă se confirmă evenimentele consumate anterior. Opțional, implicit false. |

**Răspuns:** 200 OK

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Header | Content-Type | string | Tipul conținutului răspunsului HTTP: `application/cloudevents-batch+json` |
| Body | N/A | JSON array | Fiecare element al tabloului are structura descrisă la endpointul anterior. |

**Răspuns:** 204 No Content – returnat atunci când nu există evenimente de consumat. Returnat după expirarea timpului de așteptare (poll timeout), în care niciun producător nu a produs evenimente pentru consumatorul apelant.

### Endpoint: POST /{bridge}/ce/consumers/{group}/instances/{instance}/confirm

**Descriere:** Confirmă consumarea cu succes a tuturor evenimentelor citite sau până la offset-ul specificat.

**Parametrii cererii:**

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Path | bridge | string* | Instanța bridge-ului pe care a fost creat consumatorul.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | group | string* | Numele grupului de consumatori.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | instance | string* | Identificatorul instanței de consumator.<br><br>Parte a adresei de bază a instanței de consumator. |
| Query | offset | string | Specifică offset-ul ultimului eveniment până la care este confirmată consumarea evenimentelor. Opțional. Dacă nu este setat, toate evenimentele citite de această instanță de consumator sunt confirmate ca fiind consumate. |

**Răspuns:** 204 No Content – returnat în urma confirmării cu succes.

### Endpoint: POST /{bridge}/ce/consumers/{group}/instances/{instance}/dead

**Descriere:** Produce un eveniment eșuat (dead) pentru consumatorul apelant, în format brut (raw).

Setați headerul standard Content-Type la una din următoarele valori:
- `application/json` – payload-ul este în format JSON (cel mai probabil formatul pe care intenționați să îl utilizați);
- `application/octet-stream` – payload-ul este binar (doar pentru cazuri speciale);
- `text/plain` – payload-ul este text simplu (doar pentru cazuri speciale).

**Parametrii cererii:**

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Path | bridge | string* | Instanța bridge-ului pe care a fost creat consumatorul.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | group | string* | Numele grupului de consumatori.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | instance | string* | Identificatorul instanței de consumator.<br><br>Parte a adresei de bază a instanței de consumator. |
| Header | ce-specversion | string* | Versiunea specificației CloudEvents utilizată de eveniment. Aceasta permite interpretarea contextului. Trebuie setată întotdeauna la „1.0". |
| Header | ce-source | uri* | Identifică contextul în care s-a produs evenimentul. |
| Header | ce-id | string* | Identifică evenimentul. |
| Header | ce-type | string* | Conține o valoare care descrie tipul evenimentului asociat producerii care a avut loc. |
| Header | ce-subject | string | Descrie subiectul evenimentului în contextul producătorului evenimentului (identificat de source). Un consumator consumă de obicei evenimente emise de o sursă, dar identificatorul sursei singur ar putea să nu fie suficient ca și calificator pentru un eveniment specific, dacă contextul sursei are o substructură internă. Opțional. |
| Header | ce-time | date-time | Marca temporală a momentului producerii. Formatată conform RFC 3339. Opțional, implicit momentul curent. |
| Header | ce-partitionkey | string | O cheie de partiționare pentru eveniment, specificată pentru a asigura ordinea consumării între mai multe evenimente cu aceeași cheie de partiționare. Opțional. |

**Răspuns:** 202 Accepted – returnat atunci când evenimentul eșuat a fost persistat cu succes.

### Endpoint: DELETE /{bridge}/ce/consumers/{group}/instances/{instance}

**Descriere:** Șterge (adică închide) instanța de consumator. Trebuie apelat înainte ca consumatorul să fie oprit. Apelarea explicită a acestui endpoint asigură utilizarea eficientă a resurselor și reconectarea mai rapidă a consumatorului.

**Parametrii cererii:**

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Path | bridge | string* | Instanța bridge-ului pe care a fost creat consumatorul.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | group | string* | Numele grupului de consumatori.<br><br>Parte a adresei de bază a instanței de consumator. |
| Path | instance | string* | Identificatorul instanței de consumator.<br><br>Parte a adresei de bază a instanței de consumator. |

**Răspuns:** 204 No Content – returnat în urma ștergerii cu succes a instanței de consumator.

## API-uri pentru instrumente (Tool APIs)

API-urile pentru instrumente sunt destinate utilizatorilor umani (adică dezvoltatorilor) pentru informații suplimentare și testare. Nu le apelați din sistemele voastre.

### Endpoint: GET /ce/tools/my-settings

**Descriere:** Returnează setările configurate pentru clientul apelant.

**Răspuns:** 200 OK

| Locație | Parametru | Tip | Descriere |
|----------|-----------|------|-------------|
| Body | N/A | JSON* | Setările configurate pentru clientul apelant, conform formatului intern, care se poate schimba oricând fără notificare prealabilă. Acest lucru este util pentru dezvoltatori, pentru a analiza configurația de referință și a identifica eventuale probleme. |

### Endpoint: POST /ce/tools/consumer/test

**Descriere:** Permite dezvoltatorilor de consumatori să producă un eveniment de test. Rețineți că, în cazul primului apel către acest endpoint, este normal ca un consumator deja conectat prin WebSocket să înceapă să consume evenimente de test după un anumit timp (până la 30 de minute), deoarece setările consumatorului sunt cache-uite.

Structura cererii, a răspunsului și comportamentul sunt similare cu cele ale endpointului de producere a evenimentelor brute (vezi mai sus: POST /ce/produce/raw).
