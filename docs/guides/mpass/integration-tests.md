Această secțiune descrie cazurile de testare pentru sistemele care se integrează cu MPass. Aceste teste asigură atât corectitudinea funcțională, cât și conformitatea de securitate a integrării.

## Cazuri de testare funcțională

### TC_FUNCT_01: Autentificare inițiată de Service

**Descriere:** Autentificare inițiată de Service

**Condiții inițiale:** Utilizator neautentificat în Service și în MPass

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Login” al Service-ului | Browser-ul este redirecționat către MPass, fără erori afișate |
| 2 | Autentificați-vă în MPass | Browser-ul este redirecționat înapoi către Service ca utilizator autentificat |

---

### TC_FUNCT_02: Single Sign-On prin MPass

**Descriere:** Single sign-on prin MPass

**Condiții inițiale:**
- Utilizator neautentificat în Service
- Utilizator autentificat direct în MPass

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Login” al Service-ului | Browser-ul este redirecționat către MPass și redirecționat înapoi (cu sau fără consimțământ de autentificare) către Service ca utilizator autentificat, fără erori afișate |

---

### TC_FUNCT_03: Autentificare întreruptă

**Descriere:** Autentificare întreruptă

**Condiții inițiale:** Utilizator neautentificat în Service și în MPass

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Login” al Service-ului | Browser-ul este redirecționat către MPass pentru autentificare |
| 2 | Anulați autentificarea în MPass | Browser-ul este redirecționat înapoi către Service fără autentificare, iar Service nu afișează nicio eroare |

---

### TC_FUNCT_04: Delogare inițiată de Service

**Descriere:** Delogare inițiată de Service

**Condiții inițiale:** Utilizator autentificat în Service prin MPass

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Logout” al Service-ului | Browser-ul este redirecționat către MPass și redirecționat înapoi (cu sau fără consimțământ de autentificare) către Service ca utilizator delogat, fără erori afișate |
| 2 | Accesați orice resursă protejată a Service-ului | Accesul la resursă este refuzat și/sau utilizatorul este redirecționat către MPass pentru autentificare |

---

### TC_FUNCT_05: Delogare inițiată de MPass (Single Logout)

**Descriere:** Delogare inițiată de MPass (adică single logout)

**Condiții inițiale:** Utilizator autentificat în Service prin MPass

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați linkul „Logout” din MPass | După efectuarea delogării unice, MPass afișează faptul că utilizatorul nu este autentificat |
| 2 | Accesați orice resursă protejată a Service-ului | Accesul la resursă este refuzat și/sau utilizatorul este redirecționat către MPass pentru autentificare |

---

## Cazuri de testare de securitate

### TC_SEC_01: Verificarea validării semnăturii SAML Response

**Descriere:** Verificarea validării semnăturii SAML Response

**Condiții inițiale:**
- Utilizator neautentificat în Service, dar autentificat în MPass
- Este bifată doar următoarea opțiune în SAML Advanced Options: „Do not sign SAML Response”

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Login” al Service-ului | Browser-ul este redirecționat către MPass și redirecționat înapoi către Service fără autentificare reușită, întrucât SAML Response nu este semnat |

---

### TC_SEC_02: Verificarea certificatului de validare a semnăturii SAML Response

**Descriere:** Verificarea certificatului de validare a semnăturii SAML Response

**Condiții inițiale:**
- Utilizator neautentificat în Service, dar autentificat în MPass
- Este bifată doar următoarea opțiune în SAML Advanced Options: „Use compatible certificate for signing”

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Login” al Service-ului | Browser-ul este redirecționat către MPass și redirecționat înapoi către Service fără autentificare reușită, întrucât SAML Response este semnat cu un certificat invalid |

---

### TC_SEC_03: Verificarea faptului că SAML Response nu a expirat

**Descriere:** Verificarea faptului că SAML Response nu a expirat

**Condiții inițiale:**
- Utilizator neautentificat în Service, dar autentificat în MPass
- Nicio opțiune nu este bifată în SAML Advanced Options
- Ceasul serverului Service a fost modificat cu câteva ore în viitor

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Login” al Service-ului | Browser-ul este redirecționat către MPass și redirecționat înapoi către Service fără autentificare reușită, întrucât SAML Response a expirat |

---

### TC_SEC_04: Verificarea faptului că SAML Response nu este prea nou

**Descriere:** Verificarea faptului că SAML Response nu este prea nou

**Condiții inițiale:**
- Utilizator neautentificat în Service, dar autentificat în MPass
- Este bifată doar următoarea opțiune în SAML Advanced Options: „SAML Response IssueInstant is specified in local time, instead of UTC”

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Login” al Service-ului | Browser-ul este redirecționat către MPass și redirecționat înapoi către Service fără autentificare reușită, întrucât SAML Response a expirat (2 sau 3 ore în viitor pentru fusul orar al Moldovei) |

---

### TC_SEC_05: Verificarea validării Destination din SAML Response

**Descriere:** Verificarea validării Destination din SAML Response

**Condiții inițiale:**
- Utilizator neautentificat în Service, dar autentificat în MPass
- Este bifată doar următoarea opțiune în SAML Advanced Options: „Do not specify Destination in SAML Response”

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Login” al Service-ului | Browser-ul este redirecționat către MPass și redirecționat înapoi către Service fără autentificare reușită, întrucât SAML Response/@Destination nu este specificat |

---

### TC_SEC_06: Verificarea faptului că InResponseTo din SAML Response este verificat

**Descriere:** Verificarea faptului că InResponseTo din SAML Response este verificat

**Condiții inițiale:**
- Utilizator neautentificat în Service, dar autentificat în MPass
- Este bifată doar următoarea opțiune în SAML Advanced Options: „Do not specify InResponseTo in SAML Response”

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Login” al Service-ului | Browser-ul este redirecționat către MPass și redirecționat înapoi către Service fără autentificare reușită, întrucât SAML Response/@InResponseTo nu este specificat |

---

### TC_SEC_07: Verificarea validării InResponseTo din SAML Response

**Descriere:** Verificarea validării InResponseTo din SAML Response

**Condiții inițiale:**
- Utilizator neautentificat în Service și în MPass
- Nicio opțiune nu este bifată în SAML Advanced Options

**Pași:**

| Pas | Sarcină | Rezultat așteptat |
|------|------|----------------|
| 1 | Accesați butonul/linkul „Login” al Service-ului | Browser-ul este redirecționat către MPass pentru autentificare |
| 2 | Întrerupeți sesiunea utilizatorului în Service (reporniți serverul sau ștergeți-o din stocarea sesiunilor), astfel încât AuthnRequest/@ID generat să se piardă | Sesiunea utilizatorului este întreruptă |
| 3 | Autentificați-vă în MPass | Browser-ul este redirecționat înapoi către Service fără autentificare reușită, întrucât SAML Response/@InResponseTo este acum invalid |

---

## Note importante

- Securitatea sistemelor care se integrează cu MPass depinde în mare măsură de securitatea integrării
- Toate cazurile de testare legate de securitate TREBUIE să fie validate cu succes înainte de trecerea în producție
- Serviciile trebuie să implementeze o validare SAML completă, așa cum este descrisă în secțiunea privind considerațiile de securitate
- Revizuirea și auditul integrării trebuie efectuate folosind aceste cazuri de testare
