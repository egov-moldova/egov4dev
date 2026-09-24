## Reguli de tratare a erorilor

Pentru erorile rezultate din cererile REST, MNotify returnează coduri de stare HTTP standard, împreună cu mesaje corespunzătoare care descriu eroarea în limbaj clar.

| Cod de stare HTTP | Descriere |
|-----------------|-------------|
| 200 | Succes |
| 400 | Cerere invalidă, validarea a eșuat. Verificați respectarea regulilor de validare |
| 401 | Acces neautorizat. Verificați cerințele de autorizare |
| 403 | Interzis. Acțiunea solicitată nu este permisă pentru ID-ul transmis |
| 404 | Negăsit. Verificați datele cererii transmise |
| 409 | Conflict |
| 501 | A survenit o eroare de server. Contactați administratorul. |

## Operațiuni ale serviciului

### GET /api/Notifications/

**Descriere:** afișează toate notificările transmise de un expeditor.

**Returnează:** NotificationShortDto[]

**Parametri de intrare:**

| Denumire | Tip | Descriere |
|------|------|-------------|
| Page | integer | Numărul paginii curente |
| ItemsPerPage | integer | Numărul de elemente per pagină |
| OrderField | string | Poate ordona după numele proprietăților răspunsului (implicit Id). Ex. "CreatedAt desc" |
| SearchBy | string | Câmpul este interpretat ca UUID și filtrat ca NotificationId. Alte filtre nu funcționează, nefiind implementate. |

**Semnificația răspunsului HTTP:**

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 500-503 | A survenit o eroare de server. |

---

### GET /api/Notification/{id}

**Descriere:** Returnează obiectul cererii de notificare cu ID, Status și destinatarii multipli rezolvați cu mesajele aferente. Mesajul destinatarului include ID-ul mesajului, Status, Subiect și canalul folosit pentru transmitere.

**Returnează:** NotificationDto

**Parametri de intrare:**

| Denumire | Tip | Descriere |
|------|------|-------------|
| id | string | UUID-ul notificării, obținut anterior prin PostNotification. Parte a URL-ului |

**Semnificația răspunsului HTTP:**

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 404 | Negăsit. |
| 500-503 | A survenit o eroare de server. |

---

### POST /api/Notification

**Descriere:** Cerere de notificare care urmează a fi transmisă prin sistemul MNotify.

**Returnează:** UUID-ul cererii de notificare acceptate

**Parametri de intrare:**

| Denumire | Tip | Descriere |
|------|------|-------------|
| - | Notification | O cerere HTTP POST brută, cu codificare UTF-8 și tipul de conținut "application/json". |

**Erori:**

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 400 | Cerere invalidă. |
| 500-503 | A survenit o eroare de server. |

---

### DELETE /api/Notification/{id}

**Descriere:** Șterge notificarea, dacă aceasta nu a fost transmisă

**Returnează:** notificationID

**Parametri de intrare:**

| Denumire | Tip | Descriere |
|------|------|-------------|
| id | string | NotificationID care urmează a fi șters. Parte a URL-ului |

**Erori:**

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 409 | Conflict |
| 500-503 | A survenit o eroare de server. |

---

### GET /api/Template/

**Descriere:** afișează toate șabloanele de notificare create de un expeditor.

**Returnează:** TemplateShortDto[]

**Parametri de intrare:**

| Denumire | Tip | Descriere |
|------|------|-------------|
| Page | integer | Numărul paginii curente |
| ItemsPerPage | integer | Numărul de elemente per pagină |
| OrderField | string | Poate ordona după numele proprietăților răspunsului (implicit Id). Ex. "CreatedAt desc" |
| SearchBy | string | Câmpul este interpretat ca UUID și filtrat ca NotificationId. Alte filtre nu funcționează, nefiind implementate. |

**Semnificația răspunsului HTTP:**

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 500-503 | A survenit o eroare de server. |

---

### GET /api/Template/{id}

**Descriere:** Returnează un șablon specific creat de un expeditor, inclusiv toate proprietățile șablonului.

**Returnează:** TemplateDto

**Parametri de intrare:**

| Denumire | Tip | Descriere |
|------|------|-------------|
| id | string | UUID-ul șablonului, obținut anterior prin cererea PostTemplate. Parte a URL-ului |

**Semnificația răspunsului HTTP:**

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 500-503 | A survenit o eroare de server. |

---

### GET /api/Template/{id}/check

**Descriere:** Returnează un șablon specific creat de un expeditor, inclusiv toate proprietățile șablonului.

**Returnează:** TemplateDto

**Parametri de intrare:**

| Denumire | Tip | Descriere |
|------|------|-------------|
| id | string | TemplateId care urmează a fi completat cu variabile. Parte a URL-ului |
| variables | string | Șir JSON care conține o înregistrare CHEIE-VALOARE de completat în șablon |
| userId | string | userId ar trebui să completeze șablonul cu variabile implicite. În prezent, se completează doar IDNx |

**Semnificația răspunsului HTTP:**

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 500-503 | A survenit o eroare de server. |

---

### POST /api/Template

**Descriere:** Cerere de șablon care urmează a fi salvată în sistemul MNotify.

**Returnează:** UUID-ul cererii de șablon acceptate

**Parametri de intrare:**

| Denumire | Tip | Descriere |
|------|------|-------------|
| - | TemplateDto | O cerere HTTP POST brută, cu codificare UTF-8 și tipul de conținut "application/json". |

**Erori:**

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 400 | Cerere invalidă. |
| 500-503 | A survenit o eroare de server. |

---

### PUT /api/Template/{id}

**Descriere:** Actualizează un șablon specific creat de un expeditor.

**Returnează:** UUID-ul cererii de șablon actualizate

**Parametri de intrare:**

| Denumire | Tip | Descriere |
|------|------|-------------|
| id | string | UUID-ul șablonului, obținut anterior prin cererea PostTemplate. Parte a URL-ului |
| - | TemplateDto | O cerere HTTP POST brută, cu codificare UTF-8 și tipul de conținut "application/json". |

**Semnificația răspunsului HTTP:**

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 500-503 | A survenit o eroare de server. |

---

### DELETE /api/Template/{id}

**Descriere:** Șterge șablonul din sistemul MNotify.

**Returnează:** UUID-ul șablonului șters

**Parametri de intrare:**

| Denumire | Tip | Descriere |
|------|------|-------------|
| id | string | ID-ul șablonului care urmează a fi șters. Parte a URL-ului |

**Erori:**

| Cod | Motiv |
|------|--------|
| 200 | Succes |
| 409 | Conflict |
| 500-503 | A survenit o eroare de server. |

---

## Structuri

### NotificationShortDto

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| ID | uuid | Obligatoriu | Identificatorul unic al notificării |
| Status | NotificationStatus | Obligatoriu | Statusul notificării |
| CreatedAt | datetime | Obligatoriu | Data și ora la care a fost solicitată notificarea |
| LastUpdatedAt | datetime | Obligatoriu | Data și ora la care s-a modificat statusul notificării |
| CreatedBy | string | Obligatoriu | Identitatea expeditorului |
| LastUpdatedBy | string | Obligatoriu | Identitatea sistemului care a modificat ultima dată obiectul Notification |

### NotificationDto

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| Id | uuid | Obligatoriu | Identificatorul unic al notificării |
| Status | NotificationStatus | Obligatoriu | Statusul notificării |
| Recipients | RecipientMessagesDto[] | Opțional | Lista destinatarilor cu mesajele rezolvate în funcție de preferințele de canal |

### RecipientMessagesDto

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| Value | string | Obligatoriu | Valoarea IDNP sau IDNO a destinatarului înregistrat în MNotify |
| Type | string | Obligatoriu | "IDNP" sau "IDNO" |
| IsLegal | bool | Obligatoriu | Indică dacă destinatarul este o persoană juridică |
| Messages | MessageShortDto[] | Opțional | Lista mesajelor rezolvate după IDNP/IDNO |

### MessageShortDto

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| MessageId | uuid | Obligatoriu | Identificatorul unic al mesajului de notificare |
| Subject | string | Obligatoriu | Subiectul mesajului. Identic cu subiectul cererii de notificare |
| Status | NotificationStatus | Obligatoriu | Statusul notificării |
| Channel | Channel | Obligatoriu | Enumerarea canalului prin care a fost trimis mesajul |
| CreatedAt | datetime | Obligatoriu | Data și ora la care a fost solicitată notificarea |
| LastUpdatedAt | datetime | Obligatoriu | Data și ora la care s-a modificat statusul notificării |
| CreatedBy | string | Obligatoriu | Identitatea expeditorului |
| LastUpdatedBy | string | Obligatoriu | Identitatea sistemului care a modificat ultima dată obiectul Notification |

### Notification

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| UserId | string | Opțional | Câmpul trebuie completat cu IDNP-ul utilizatorului, în cazul în care expeditorul notificării nu este o notificare de sistem |
| Subject | ContentLanguage | Obligatoriu | Subiectul notificării |
| Body | ContentLanguage | Obligatoriu | Corpul notificării. Se acceptă cod HTML brut |
| BodyShort | ContentLanguage | Obligatoriu | Mesajul scurt al notificării. Trebuie transmis prin canalele de mesagerie instantanee, în mai multe limbi |
| Priority | Priority | Obligatoriu | Prioritatea notificării. Este o enumerare. |
| Template | ContentTemplate | Opțional | Șablonul de notificare care urmează a fi utilizat pentru mesajul de notificare |
| Recipients | RecipientIdentifierDto[] | Obligatoriu | Lista destinatarilor notificării |
| ResolutionPolicy | IdrPolicy | Opțional | Politica de rezolvare ajută la identificarea destinatarului din IDNO, Numărul Cadastral IDNV și numărul de înmatriculare al vehiculului |
| Attachments | Attachment[] | Opțional | Atașamentele notificării. Sunt permise formate limitate (.jpeg, .jpg, .png, .txt, .pdf, .csv, .xls). Dimensiunea maximă a atașamentelor nu trebuie să depășească 10 Mb. |

### ContentTemplate

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| Id | UUID | Obligatoriu | ID-ul șablonului primit la cererea de creare a șablonului |
| Variables | string | Opțional | Variabilele sunt transmise ca șir JSON. De exemplu, {"Name": "John"}. MNotify va înlocui variabilele din corpul șablonului cu valorile din variables. De exemplu, body:{"en": "Dear {{Name}}"} se va transforma în (Dear John) |

### ContentLanguage

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| Ro | string | Obligatoriu | Conținut în limba română |
| Ru | string | Opțional | Conținut în limba rusă |
| En | string | Opțional | Conținut în limba engleză |

### RecipientIdentifierDto

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| Value | string | Obligatoriu | Valoarea de contact. De exemplu, dacă tipul este Email, valoarea trebuie să fie o adresă de e-mail validă |
| Type | string | Obligatoriu | Type poate avea o valoare string din enumerarea Channel |

### IdrPolicy

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| type | string | Obligatoriu | Poate avea una dintre următoarele valori: "IDNO", "IDNV", "CadastralNumber", "PlateNumber" |
| parameters | IdrParameter | Obligatoriu | Parametrul indică cine este destinatarul. |

### IdrParameter

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| Direction | string | Obligatoriu | Poate avea una dintre următoarele valori: "Owner", "Administrator", "Founder" |

### Attachment

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| FileName | string | Obligatoriu | Denumirea fișierului, inclusiv extensia |
| Base64 | string | Obligatoriu | Fișierul convertit ca șir base64 |

### TemplateShortDto

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| Id | int | Obligatoriu | ID-ul șablonului |
| Name | string | Obligatoriu | Denumirea șablonului |
| CreatedAt | datetime | Obligatoriu | Data și ora la care a fost solicitat șablonul |
| LastUpdatedAt | datetime | Obligatoriu | Data și ora la care s-a modificat statusul șablonului |
| CreatedBy | string | Obligatoriu | Identitatea expeditorului |
| LastUpdatedBy | string | Obligatoriu | Identitatea sistemului care a modificat ultima dată obiectul Template |

### TemplateDto

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| Name | string (50) | Obligatoriu | Denumirea șablonului |
| Description | string | Obligatoriu | Descrierea șablonului |
| Subject | ContentLanguage | Obligatoriu | Subiectul notificării din șablon |
| Body | ContentLanguage | Obligatoriu | Corpul notificării din șablon |
| BodyShort | ContentLanguage | Obligatoriu | Corpul scurt al notificării din șablon |

---

## Enumerări

### Priority

| Membru | Descriere |
|--------|-------------|
| Medium | Notificarea nu are o importanță specifică. |
| Low | Importanța notificării este scăzută. |
| High | Importanța notificării este ridicată. |

### NotificationStatus

| Membru | Descriere |
|--------|-------------|
| Pending | Cererea de notificare a fost pusă în coada de transmitere. |
| Resolving | Destinatarii finali sunt în curs de identificare, iar preferințele lor sunt citite. |
| Sending | Notificarea finală este pregătită pentru a fi trimisă către destinatarul rezolvat și canalul de notificare identificat. |
| Sent | Notificarea a fost trimisă către canalul de notificare. |
| Delivered | Canalul de notificare a confirmat livrarea notificării. |
| Read | Destinatarul confirmă că a citit notificarea. |
| Cancelling | Cererea de notificare este în curs de anulare. |
| Cancelled | Cererea de notificare a fost anulată cu succes. |
| Failed | Cererea de notificare nu a fost transmisă tuturor canalelor destinatarilor (cu excepția canalului MCabinet). Cererea de notificare eșuată a eșuat, iar codul de eroare este inclus în răspunsul cu statusul notificării. |

### Channel

| Membru | Descriere |
|--------|-------------|
| Email | Canalul de livrare a notificării este e-mail-ul. |
| SMS | Canalul de livrare a notificării este un mesaj SMS. |
| Viber | Canalul de livrare a notificării este Viber. |
| Web push | Canalul de livrare a notificării este browser-ul (web push). |
| MCabinet | Notificarea este transmisă către MCabinet. |

---

## Reguli de validare

| Denumire câmp | Condiții de validare |
|------------|----------------------|
| IDNP | strict 13 cifre |
| Adresă de e-mail | caracter@caracter.caracter |
| Dimensiunea corpului mesajului | fără atașament - 15 MB<br>cu atașamente - 10 MB |
| Lungimea subiectului | e-mail - 41 de caractere<br>SMS - 160 de caractere |
| Anularea cererii de notificare | cererea de notificare nu poate fi anulată dacă:<br>- canalul de notificare nu suportă această operațiune<br>- notificarea a fost deja livrată |
