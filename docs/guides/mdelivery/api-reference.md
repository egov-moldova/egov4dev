## Reguli de tratare a erorilor

Pentru erorile rezultate din apelurile interfeței SOAP, MDelivery returnează erori SOAP (SOAP faults) cu coduri și motive de eroare care descriu defecțiunea în limbaj clar.

**Notă!** Pentru consumatorii care utilizează limbaje de programare ce suportă blocuri try…catch, capturarea excepțiilor SOAP Fault specifice framework-ului este modalitatea corectă de a trata erorile de apelare a serviciului.

| Cod eroare | Descriere |
|------------|-------------|
| AuthenticationFailed | Procesul de autentificare a consumatorului serviciului a eșuat. Vezi Autentificare |
| InvalidParameter | Un parametru de intrare este invalid. Vă rugăm să consultați textul Fault Reason returnat și descrierea operațiunii apelate. |
| 200 | Succes |
| 400 | Cerere invalidă, validarea a eșuat. Verificați respectarea regulilor de validare |
| 401 | Acces neautorizat. Verificați cerințele de autorizare |
| 403 | Interzis. Acțiunea solicitată nu este permisă pentru ID-ul transmis |
| 404 | Negăsit. Verificați datele cererii transmise |
| 500 | A survenit o eroare de server. Lipsă conexiune cu baza de date, din alte motive decât: 400 / 401. Contactați administratorul. |

## Operațiuni ale serviciului pentru Prestatorii de servicii

### GET detaliile comenzii

API-ul MDelivery solicită detaliile Comenzii de la sistemul informațional al Prestatorului de servicii.

| Semnătură | GET /api/v1/delivery/services/{serviceID}/orders/{orderID}/delivery/details |
|-----------|------------------------------------------------------------------------------|
| **Descriere** | MDelivery apelează sistemul Prestatorului de servicii pentru a vizualiza detaliile după orderID și serviceID. |
| **Returnează** | Detalii după orderID: status, message, receiver, pickupPointCode, orderSubmittedAt, deliveryAcceptedUntil, estimatedReadyAt, products, isPaid |

#### Parametri de intrare

| Denumire | Tip | Obligatoriu | Descriere |
|------|------|-----------|-------------|
| serviceID | string | Da | Numărul unic de identificare al serviciului. |
| orderID | string | Da | Numărul de identificare al comenzii. |

#### Răspuns

| Denumire | Tip | Obligatoriu | Descriere |
|------|------|-----------|-------------|
| id | string | Da | Numărul de identificare al comenzii. |
| isPaid | | Da | Statusul plății comenzii. Valori:<br>True – comanda a fost deja plătită.<br>False – comanda nu a fost plătită și plata agregată trebuie transmisă către MPay din MDelivery. |
| status | string | Da | Statusul curent al comenzii, conform enumerării statusurilor. |
| message | string | Nu | Detalii despre status. |
| **receiver** | | | Persoana care va primi livrarea. |
| type | string | Da | Tipul destinatarului. Valori:<br>Person - persoană fizică<br>Organization – persoană juridică |
| id | string | Da | IDNP-ul sau IDNO-ul destinatarului, în funcție de tip. |
| name | string | Nu | |
| first name | string | Nu | |
| email | string | Nu | |
| phone | string | Nu | |
| pickupPointCode | string | Nu | Codul de identificare al punctului de ridicare unde va fi pregătită comanda pentru a fi ridicată de cărăuș.<br>Notă! Dacă Prestatorul de servicii are înregistrat mai mult de 1 punct de ridicare în MDelivery, codul este obligatoriu. |
| orderSubmittedAt | data | Da | Data înregistrării comenzii. |
| deliveryAcceptedUntil | data | Da | Termenul limită până la care livrarea poate fi adăugată la comandă. |
| estimatedReadyAt | data | Da | Data estimată la care comanda va fi gata pentru ridicare. |
| **products** | | | Produsul care urmează a fi livrat. |
| code | string | Nu | ID-ul produsului înregistrat în profilul MDelivery.<br>Notă! Dacă Prestatorul de servicii are înregistrat mai mult de 1 produs în MDelivery, codul este obligatoriu. |
| description | string | Nu | Descrierea produsului |
| price | number | Da | Prețul comenzii |
| quantity | integer | Da | Cantitatea de produse inclusă în comandă. |
| length | number | Da | Lungimea coletului în cm. |
| width | number | Da | Lățimea coletului în cm. |
| height | number | Da | Înălțimea coletului în cm. |
| weight | number | Da | Greutatea coletului în kg. Poate fi exprimată zecimal (ex. 0.25) |
| holderID | string | Nu | IDNP-ul persoanei pentru care a fost emis documentul (titularul) |
| holderName | string | Nu | Numele persoanei pentru care a fost emis documentul. |
| holderFirstName | string | Nu | Prenumele titularului pentru care a fost emis documentul. |

#### Erori

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 400 | Cerere invalidă |
| 404 | Negăsit |
| 500 | A survenit o eroare de server. |

### PUT statusul livrării

Pentru a informa Prestatorul de servicii despre comanda de livrare și a urmări comanda de livrare, statusurile de livrare sunt actualizate prin API-ul MDelivery:
- când comanda de livrare este confirmată de Destinatar (statusul comenzii de livrare - AwaytingPayment)
- când comanda de livrare este plătită prin MPay (statusul comenzii de livrare - Paid)
- când statusul Ready al comenzii de livrare este primit de la sistemul Prestatorului de servicii, sau setat manual în registrul MDelivery (statusul comenzii de livrare – Ready)
- când statusul final de livrare este primit din partea Cărăușului (statusul comenzii de livrare – Delivered, Returned, Problem)

| Semnătură | PUT /{serviceID}/orders/{orderID}/delivery/status |
|-----------|---------------------------------------------------|
| **Descriere** | MDelivery solicită Prestatorului de servicii modificarea statusului livrării |
| **Returnează** | Cod de răspuns: 200,400,401,404,500 |

#### Parametri de intrare

| Denumire | Tip | Obligatoriu | Descriere |
|------|------|-----------|-------------|
| serviceID | string | Da | Numărul unic de identificare al serviciului. |
| orderID | string | Da | Numărul de identificare al comenzii. |
| status | string | Da | Enumerarea statusurilor. |
| message | string | Nu | Detalii suplimentare legate de status. |
| carrierName | string | Da | Denumirea cărăușului responsabil de livrare. |
| trackingID | string | Da | ID-ul atribuit comenzii pentru urmărire. trackingID=deliveryID |

#### Erori

| Cod | Motiv |
|------|--------|
| 204 | Succes |
| 400 | Cerere invalidă |
| 404 | Negăsit |
| 500 | A survenit o eroare de server. |

### GET modificările livrării

MDelivery solicită statusurile comenzilor modificate față de cererea anterioară (ex. în curs de procesare, anulate, gata pentru expediere) de la sistemul Prestatorului de servicii, pentru a fi transmise sistemului informațional al Cărăușului și pentru a urmări comanda.

| Semnătură | GET /{serviceID}/delivery/changes |
|-----------|-----------------------------------|
| **Descriere** | MDelivery apelează Prestatorul de servicii pentru a obține statusurile actualizate ale comenzilor. |
| **Returnează** | Lista comenzilor (array). |

#### Parametri de intrare

| Denumire | Tip | Obligatoriu | Descriere |
|------|------|-----------|-------------|
| serviceID | string | Da | Numărul unic de identificare al serviciului. |

#### Răspuns

| Denumire | Tip | Obligatoriu | Descriere |
|------|------|-----------|-------------|
| serviceID | string | Da | Numărul unic de identificare al serviciului. |
| orderID | string | Da | Numărul de identificare al comenzii. |
| status | string | Da | Statusul curent al comenzii, conform enumerării statusurilor. |

#### Erori

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 400 | Cerere invalidă |
| 404 | Negăsit |
| 500 | A survenit o eroare de server. |

## Rezultate primite din Swagger

### GET {link}/auth/api/v1/delivery/services/{serviceID}/orders/{orderID}/delivery/details

**CURL:**
```bash
curl -X GET "https://{link}/auth/api/v1/delivery/services/1/orders/o7741072598796449999/delivery/details" -H  "accept: text/plain"
```

**URL-ul cererii:**
```
https://{link}/auth/api/v1/delivery/services/1/orders/o7741072598796449999/delivery/details
```

**Răspunsul serverului**
Cod: 200
Corpul răspunsului:
```json
{
  "id": "string",
  "isPaid": true,
  "status": "AwaytingPayment",
  "message": "string",
  "receiver": {
    "type": "Person",
    "id": "string",
    "name": "string",
    "firstName": "string",
    "email": "string",
    "phone": "string"
  },
  "pickupPointCode": "string",
  "orderSubmittedAt":"2022-04-18T20:03:38.005Z",
  "deliveryAcceptedUntil": "2022-04-19T20:03:38.005Z"
  "estimatedReadyAt": "2022-04-25T20:03:38.005Z",
  "products": [
    {
      "code": "string",
      "description": "string",
      "price": 50,
      "quantity": 1,
      "length": 0,
      "width": 0,
      "height": 0,  
      "weight": 0,
      "holderID": "string",
      "holderName": "string",
      "holderFirstName": "string"
    }
  ]
}
```

### PUT /{serviceID}/orders/{orderID}/delivery/status

**CURL:**
```bash
curl -X PUT "{link}/auth/api/v1/delivery/services/1/orders/o7741072598796449999/delivery/status" -H  "accept: */*" -H  "Content-Type: application/json" -d "{\"status\":\"Ready\",\"message\":\"test\",\"carrierName\":\"Muvi Express\",\"trackingID\":\"0220106997753968\",\"carrierEstimatedDeliveryStart\":\"2022-01-20T15:20:52.923Z\",\"carrierEstimatedDeliveryEnd\":\"2022-01-20T15:20:52.923Z\",\"carrierCost\":65}"
```

**URL-ul cererii:**
```
https://{link}/auth/api/v1/delivery/services/1/orders/0220106997753968/delivery/status
```

**Răspunsul serverului**
Cod: 204

### GET /{serviceID}/delivery/changes

**CURL:**
```bash
curl -X GET "https://{link]/aurh/api/v1/delivery/services/1/delivery/changes" -H  "accept: text/plain"
```

**URL-ul cererii:**
```
https://{link}/auth/api/v1/delivery/services/1/delivery/changes
```

**Răspunsul serverului**
Cod: 200
Corpul răspunsului:
```json
[
[
 { 
    "serviceID": "1",
    "orderID": "o5581066056252949999",
     "status": "Ready"
  },
  {
    "serviceID": "1",
    "orderID": "o5581309365303909999",
    "status": "Ready"
  }
]
```

## Statusuri

Statusurile de livrare utilizate în sistem pe parcursul procesului de livrare definesc etapa livrării și acțiunile solicitate a fi declanșate.

Statusurile de livrare din MDelivery pot să nu reflecte statusul procesării comenzii în sistemul Prestatorului de servicii sau statusul AWB-ului în sistemele Cărăușilor. În cadrul lucrărilor de integrare, statusurile relevante trebuie mapate pentru a reflecta acțiunile/etapele corespunzătoare.

- statusuri setate în MDelivery legate de crearea comenzii de livrare și plată, până la începerea procesării comenzii.
- statusuri primite de la Prestatorul de servicii legate de procesarea comenzii și pregătirea pentru procesul de expediere.
- statusuri primite de la Cărăuș după ridicarea comenzii și pe parcursul procesului de expediere.

| Nr | Denumire | Descriere | Comentarii |
|----|------|-------------|----------|
| 1 | AwaitingPayment | Livrarea este în așteptarea plății | Comanda de livrare este creată, dar încă neplătită.<br>Statusul este generat de MDelivery când Destinatarul confirmă Comanda de livrare, dar comanda încă nu este plătită. |
| 2 | Paid | Livrarea este plătită | Statusul anterior (AwaitingPayment) este modificat în MDelivery când este primită confirmarea plății de la MPay. |
| 3 | Processing | Prestatorul de servicii procesează Comanda. | Statusul este primit de la sistemul Prestatorului de servicii prin GET delivery/changes. |
| 4 | Cancelled | Comanda este anulată în sistemul Prestatorului de servicii. Nu se poate efectua nicio livrare. | Statusul este primit de la sistemul Prestatorului de servicii prin GET delivery/changes. |
| 5 | Expired | Comanda Prestatorului de servicii a expirat. Nu se pot face modificări de livrare. | Statusul este primit de la sistemul Prestatorului de servicii prin GET delivery/changes. |
| 6 | Ready | Produsele sunt gata pentru expediere. | Statusul este primit de la sistemul Prestatorului de servicii prin GET delivery/changes.<br>Pe baza acestui status, MDelivery transmite cererea către Cărăușul asignat pentru crearea foii de parcurs. |
| 7 | AwaitingPickup | Se așteaptă ridicarea de către Cărăuș. | Statusul este modificat pe partea MDelivery după transmiterea cu succes a cererii către Cărăuș pentru crearea foii de parcurs. |
| 8 | Delivering | Livrarea este în curs. | Statusul este primit de la Cărăuș, confirmând că livrarea a fost ridicată de la Prestatorul de servicii. |
| 9 | Delivered | Livrarea este finalizată. | Statusul este primit de la Cărăuș. |
| 10 | Confirmed | Livrarea este confirmată de Destinatarul final. | |
| 11 | Problem | A survenit o problemă de livrare. | Detaliile pot fi consultate în Message. |
| 12 | Returning | Produsele sunt în curs de returnare. | Comanda nu a fost livrată și este în curs de returnare către Prestatorul de servicii. |
| 13 | Returned | Produse returnate. | Comanda este returnată Prestatorului de servicii. |
| 14 | Unknown | Statusul livrării este necunoscut, adică Comanda nu include livrare. | |

  - statusurile 1 și 2 sunt setate în MDelivery și sunt legate de crearea comenzii de livrare și plată, până la începerea procesării comenzii.
  - statusurile 3 până la 6 sunt primite de la Prestatorul de servicii și sunt legate de procesarea comenzii și pregătirea pentru procesul de expediere.
  - statusurile 7 până la 13 sunt primite de la Cărăuș după ridicarea comenzii și pe parcursul procesului de expediere.

