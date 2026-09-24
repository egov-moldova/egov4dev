Acest capitol descrie procesul de dezvoltare a unei integrări.

## Înregistrarea Service-ului

Înainte de a putea interacționa cu MPass, un Service trebuie să fie înregistrat corespunzător în MPass. Pentru a efectua o astfel de înregistrare, vă rugăm să generați un certificat auto-semnat sau să furnizați un certificat existent (în format fișier .cer) posesorului de serviciu.

Din motive de securitate, mediile de testare și producție ale Service-ului TREBUIE să utilizeze certificate diferite, iar cheile private corespunzătoare TREBUIE păstrate cât mai confidențial posibil. MPass nu necesită acces la cheile private ale Service-ului pentru integrare.

## Atribute returnate

După o autentificare reușită și consimțământul utilizatorului (dacă este necesar), MPass generează și returnează un SAML Response cu atributele identității autentificate. Lista atributelor returnate este configurabilă ca parte a înregistrării Service-ului.

Tabelul următor conține lista atributelor standard.

| Denumirea atributului | Tip | Descriere |
|----------------|------|-------------|
| NameIdentifier | string (128) | Numele de utilizator sau IDNP. Acesta este un atribut special și trebuie returnat ca NameID (adică SubjectAttribute) în SAML. |
| IsResident | Boolean | Specifică dacă s-a verificat că utilizatorul este rezident al Republicii Moldova. |
| FirstName | string (64) | Prenumele utilizatorului. |
| LastName | string (64) | Numele de familie al utilizatorului. |
| BirthDate | string (10) | Data nașterii utilizatorului, în format „yyyy-MM-dd” (de ex., „1990-12-31”). |
| Gender | integer | Genul utilizatorului. Valori permise:<br>• 0 – Nespecificat<br>• 1 – Masculin<br>• 2 – Feminin |
| EmailAddress | string (64) | Adresa de e-mail a utilizatorului. |
| MobilePhone | string (16) | Numărul de telefon mobil al utilizatorului. |
| HomePhone | string (16) | Numărul de telefon fix al utilizatorului. |
| Language | string (2) | Limba preferată a utilizatorului. Valori permise: „ro”, „ru”, „en”. |
| AdministeredLegalEntity | string (512) | Denumirea și identificatorul companiilor (zero sau mai multe) pe care le administrează utilizatorul, în următorul format:<br>„Denumirea Entității Juridice IDNO”<br>Rețineți că IDNO se află după ultimul spațiu din denumire. |
| IDNO | string (13) | Identificatorul organizației utilizatorului. Acest atribut este disponibil doar dacă autentificarea a fost efectuată folosind un instrument care include această valoare în certificat. |
| CompanyName | string (128) | Denumirea organizației sau companiei utilizatorului. Acest atribut este disponibil doar dacă autentificarea a fost efectuată folosind un instrument care include această valoare în certificat. |

Un Service poate avea atribute personalizate create (utilizate de regulă în scop de autorizare, precum Role, Permissions etc.), asociate identităților și returnate ca parte a aceluiași SAML Response, cu valori corespunzătoare identității autentificate.

Vă rugăm să identificați setul de atribute necesare (inclusiv denumirile și valorile atributelor personalizate) care urmează să fie returnate de MPass în etapa de proiectare a Service-ului și să le specificați ca parte a înregistrării Service-ului.

## Acces la rețea

Deoarece interfața MPass este expusă public, nu este necesară nicio configurare specială de rețea sau modificare a listelor de control al accesului. Un dezvoltator poate realiza integrarea cu MPass folosind mașina sa locală de dezvoltare și poate utiliza o adresă localhost pentru AssertionConsumerServiceURL în AuthnRequest.

Rețineți că, din motive de securitate, o adresă localhost nu este acceptată în mediul de producție al MPass.

## Metode de autentificare

MPass oferă mai multe metode de autentificare. Toate metodele de autentificare puternică necesită un instrument de autentificare puternică, ceea ce înseamnă că cheia privată a persoanei care se autentifică este generată și păstrată pe dispozitive speciale. Este responsabilitatea integratorului să obțină un astfel de dispozitiv securizat de la furnizorii disponibili.

Metodele de autentificare slabă (precum nume de utilizator/parolă) sunt descurajate și, de regulă, nu sunt activate pentru niciun sistem în mediul de producție.

## Mediile sistemului

Sunt disponibile 2 medii de servicii: un mediu de testare și unul de producție.

| Mediu | URL SSO | URL SLO |
|-------------|---------|---------|
| Testare | https://mpass.staging.egov.md/login/saml | https://mpass.staging.egov.md/logout/saml |
| Producție | https://mpass.gov.md/login/saml | https://mpass.gov.md/logout/saml |

Integrările TREBUIE dezvoltate și testate exclusiv în mediul de testare. Pentru a asigura disponibilitatea ridicată, nu sunt permise teste de performanță, securitate sau de orice alt tip în mediul de producție.

## Metadate SAML

MPass expune metadate SAML, conforme cu specificația SAML Metadata, la următorul URL:

| Mediu | Index metadate | URL metadate SAML |
|-------------|----------------|-------------------|
| Testare | https://mpass.staging.egov.md/meta | https://mpass.staging.egov.md/meta/saml |
| Producție | https://mpass.gov.md/meta | https://mpass.gov.md/meta/saml |

Pagina index include, de asemenea, linkuri către certificatul MPass utilizat pentru semnarea mesajelor SAML în calitate de Identity Provider.
