Această secțiune reprezintă o orientare tehnică pentru dezvoltatorii care sunt noi în ecosistemul **eGov Moldova**. Pagina rezumă modul în care este organizat ecosistemul, interfețele tehnice expuse de fiecare platformă, stiva tehnologică utilizată pentru construirea serviciilor digitale guvernamentale și practicile aplicabile la dezvoltarea sau integrarea acestora.

Restul secțiunii detaliază standardele de inginerie aplicabile echipelor care construiesc soluții pentru ecosistem:

- **[Ghid de proiectare a API-urilor](api-design-guide.md)** – cum se proiectează API-uri REST coerente pentru sistemele informaționale guvernamentale
- **[Standarde de cod](code-standards.md)** – standarde de codare, securitate, testare și UI pentru echipele de dezvoltare
- **[Revizuiri de cod](code-reviews.md)** – modelul de ramificare (branching), regulile pentru pull request-uri și eticheta revizuirii
- **[Înregistrări ale deciziilor de arhitectură](adr.md)** – modul în care sunt documentate deciziile de arhitectură
- **[Gestionarea jurnalelor (log-urilor)](log-management.md)** – cerințele de audit și jurnalizare tehnică

Aceasta completează paginile mai detaliate ale acestei documentații: [Platforme și servicii](../platforms/index.md) (perspectiva de business), [Principii de dezvoltare](../principles/architecture.md) (regulile de arhitectură) și [Instrumente și tehnologii](../tools/technologies.md) (referința completă a stivei tehnologice).

* * *

## Ecosistemul pe scurt

Guvernarea digitală a Moldovei este construită ca un set de **servicii de platformă partajate și reutilizabile**, operate de Agenția de Guvernare Electronică a Moldovei. În loc ca fiecare instituție să își construiască propria capacitate de autentificare, plăți, semnare sau notificare, sistemele informaționale integrează platformele partajate și se concentrează pe propria logică de business — în conformitate cu principiile [reutilizării](../principles/architecture.md#reutilizarea-solu%C8%9Biilor) și [interoperabilității](../principles/architecture.md#interoperabilitate-din-start).

Toate platformele sunt găzduite pe **[MCloud](https://www.egov.md/en/content/mcloud-platform)**, cloud-ul guvernamental operat de [STISC](https://stisc.gov.md/), și fac schimb de date prin **MConnect**, platforma națională de interoperabilitate.

<img src="../assets/mega-ecosystem.png" alt="Ecosistemul eGov Moldova" width="100%"/>

| Nivel | Platforme | Ce oferă |
| --- | --- | --- |
| Identitate și încredere | [MPass](../guides/mpass/index.md), [MSign](../guides/msign/index.md), [MPower](../guides/mpower/index.md), [EVO Wallet](../guides/evo-wallet/index.md) | Autentificare și deautentificare unică (SSO/SLO), semnătură electronică calificată, delegarea drepturilor de reprezentare, portofel de identitate digitală compatibil EUDI |
| Schimb de date | MConnect ([MConnect Events](../guides/mconnect-events/index.md)), [Catalogul Semantic](http://semantic.gov.md/) | Date autentice direct din registrele sursă, distribuirea evenimentelor aproape în timp real, punct unic de descoperire pentru datele guvernamentale |
| Facilitatori de servicii | [MPay](../guides/mpay/index.md), [MNotify](../guides/mnotify/index.md), [MDelivery](../guides/mdelivery/index.md), [MDocs](../guides/mdocs/index.md) | Plăți cu orice instrument disponibil pe piață, notificări multicanal, livrarea fizică a documentelor oficiale, stocarea și schimbul de documente digitale |
| Transparență și audit | [MLog](../guides/mlog/index.md) | Înregistrarea centralizată a evenimentelor cu relevanță juridică, obligatorie pentru sistemele care procesează date personale și critice |
| Participarea cetățenilor | [eDemocrație (ePetiții)](../guides/e-democracy/index.md) | Depunerea și procesarea electronică a petițiilor |

* * *

## Interfețe de integrare

Fiecare platformă expune o interfață tehnică documentată. Tabelul de mai jos este cea mai rapidă modalitate de a vedea ce tip de integrare este de așteptat, înainte de a deschide ghidul corespunzător.

| Platformă | Domeniu | Interfață tehnică |
| --- | --- | --- |
| MPass | Autentificare și autorizare (SSO/SLO) | SAML 2.0 |
| MSign | Semnătură electronică | SOAP |
| MPay | Plăți pentru servicii publice | SOAP cu mesaje semnate |
| MPower | Delegarea drepturilor de reprezentare | REST |
| MConnect Events | Producerea și consumul de evenimente | REST |
| MNotify | Notificări (e-mail, push, Viber, Telegram, MCabinet) | REST |
| MDelivery | Livrarea documentelor oficiale | SOAP și REST |
| MDocs | Stocarea și schimbul de documente | REST |
| MLog | Jurnalizarea evenimentelor cu relevanță juridică | REST |
| EVO Wallet | Prezentarea la distanță a atributelor de identitate | OpenID4VP 1.0 (OAuth 2.0), ISO/IEC 18013-5 mdoc |
| eDemocrație | Petiții electronice | REST |

Serviciile REST publică contracte **OpenAPI**, lizibile automat — locațiile exacte sunt indicate în referința API din fiecare ghid. Serviciile SOAP publică contracte **WSDL** și necesită semnături la nivel de mesaj, cu certificatul de serviciu.

* * *

## Tehnologie

Stiva de mai jos este stiva de referință folosită de Agenția de Guvernare Electronică pentru construirea platformelor și este recomandată pentru sistemele informaționale guvernamentale. Vedeți [Instrumente și tehnologii](../tools/technologies.md) pentru lista completă.

### General

| Tehnologie | Descriere |
| --- | --- |
| C# / .NET | Platforma principală de dezvoltare pentru serviciile digitale guvernamentale. Un singur limbaj pentru backend și frontend permite cod partajat, instrumente comune și librării de integrare reutilizabile, distribuite ca pachete NuGet. |
| ASP.NET Core | Framework-ul web utilizat pentru servicii REST și aplicații web scalabile. |

### Frontend

| Tehnologie | Descriere |
| --- | --- |
| Blazor (Server / WebAssembly) | Framework pentru construirea interfețelor web interactive în .NET, păstrând un singur limbaj în întreaga soluție. |
| Fod.UIComponents | Biblioteca proprie de componente UI Blazor a Agenției și standardul țintă pentru interfețele noi, aliniat la sistemul unitar de design. |
| MudBlazor | Bibliotecă de componente utilizată de aplicațiile existente — ecosistemul este în tranziție de la MudBlazor la Fod.UIComponents. |
| MUD — sistemul unitar de design | [Modelul Unitar de Design al Moldovei](../mud/index.md) — obligatoriu pentru toate instituțiile publice și furnizorii acestora. Standardizează componentele, paletele de culori, tipografia, spațierea și tiparele de interacțiune, cu accesibilitatea integrată. |

### Backend

| Tehnologie | Descriere |
| --- | --- |
| Entity Framework Core | Mapor obiect-relațional (ORM) pentru accesul la baze de date relaționale. |
| FluentValidation | Validare declarativă a cererilor și regulilor de business. |
| Swashbuckle (OpenAPI) | Generează documentația Swagger direct din codul serviciului, menținând contractele API și implementarea sincronizate. |

### Date

| Tehnologie | Descriere |
| --- | --- |
| SQL Server / PostgreSQL | Stocare relațională pentru date tranzacționale. |
| Redis | Caching distribuit și optimizarea performanței. |
| Structuri JSON | Configurare dinamică a regulilor, categoriilor și validărilor, fără redistribuire (redeployment). |

### Protocoale și specificații

| Protocol | Unde este utilizat |
| --- | --- |
| SAML 2.0 | Autentificare și schimb de atribute de identitate cu MPass. |
| SOAP | Operațiuni de semnare, plată și livrare (MSign, MPay, MDelivery), cu semnarea mesajelor pe bază de certificat. |
| REST + OpenAPI | Interfețe moderne de servicii (MPower, MConnect Events, MNotify, MDocs, MLog, eDemocrație). |
| OAuth 2.0 / OpenID4VP 1.0 | Prezentarea acreditărilor din portofel către părțile care se bazează pe acestea (relying parties) (EVO Wallet), cu documente în format ISO/IEC 18013-5 mdoc, conform reglementării EUDI Wallet. |
| TLS cu certificate client | Securitatea transportului și autentificarea clienților în toate platformele, folosind certificate emise de [STISC](https://semnatura.md/). |

### Librării de integrare

Librăriile oficiale de integrare sunt publicate pe [NuGet](https://www.nuget.org/profiles/egov-moldova) pentru sistemele construite pe ASP.NET Core, de exemplu:

| Pachet | Scop |
| --- | --- |
| `Egov.Integrations.MPass.Saml` | Integrarea Service Provider cu MPass, folosind SAML 2.0. |
| `Egov.Integrations.MSign.Soap` | Integrare cu MSign pentru operațiuni de semnătură digitală, prin SOAP. |
| `Egov.Extensions.Configuration` | Utilitare pentru încărcarea certificatelor și configurare, partajate de pachetele Egov. |

Sistemele construite pe alte stive tehnologice se integrează direct prin protocoalele deschise — ghidurile includ exemple în alte limbaje (de exemplu, exemple Java pentru MLog). Vedeți secțiunea *Librării de integrare* din fiecare ghid.

### Stocarea codului și colaborare

| Instrument | Descriere |
| --- | --- |
| Azure DevOps | Gestionarea activității (livrări, sarcini, defecte) și pipeline-uri automatizate de build, testare și deploy. |
| GitLab | Controlul versiunilor și integrare continuă. |
| Feed-uri NuGet private | Distribuirea componentelor interne reutilizabile între echipe. |
| GitHub ([egov-moldova](https://github.com/egov-moldova)) | Locul public al acestei documentații și al librăriilor și exemplelor de integrare open-source. |

### Infrastructură

| Tehnologie | Descriere |
| --- | --- |
| MCloud | Platforma cloud guvernamentală care găzduiește serviciile, cu configurații pentru scalabilitate, securitate și recuperare în caz de dezastru. |
| Docker | Împachetarea aplicațiilor în containere portabile. |
| Kubernetes | Orchestrarea serviciilor containerizate. |
| Helm | Implementări declarative și versionate în Kubernetes, cu rollback rapid. |

### Monitorizare și observabilitate

| Instrument | Descriere |
| --- | --- |
| Elasticsearch + Kibana | Indexarea, căutarea și vizualizarea jurnalelor și a datelor operaționale. |
| Prometheus + Grafana | Colectarea metricilor, monitorizare și tablouri de bord (dashboards). |
| MLog | Înregistrarea evenimentelor cu relevanță juridică, completând jurnalizarea tehnică cu o pistă de audit impusă de reglementare. |

### Documentație

| Resursă | Descriere |
| --- | --- |
| eGov4Dev | Acest site — documentația oficială pentru dezvoltatori, construită cu MkDocs și publicată din repository-ul [egov4dev](https://github.com/egov-moldova/egov4dev). |
| Contracte OpenAPI | Contracte API lizibile automat, publicate de serviciile REST; locațiile sunt indicate în referința API din fiecare ghid de integrare. |

* * *

## Medii

Fiecare platformă este disponibilă în două medii, urmând o convenție consecventă de URL:

| Mediu | Model de URL | Scop |
| --- | --- | --- |
| Testare (staging) | `https://<service>.staging.egov.md` | Dezvoltarea și testarea integrării. |
| Producție | `https://<service>.gov.md` | Funcționare live, după testarea cu succes a integrării. |

Accesul la ambele medii necesită înregistrarea sistemului care se integrează și, pentru majoritatea platformelor, un certificat client emis de STISC, utilizat pentru autentificare TLS și — pentru serviciile SOAP — pentru semnarea mesajelor. Pașii exacți, contactele și cerințele contractuale sunt descrise în [Procedura de conectare](../platforms/procedure.md).

* * *

## Practici

**Arhitectură.** Toate soluțiile trebuie să respecte [Principiile de dezvoltare](../principles/architecture.md): interoperabilitate implicită, securitate și confidențialitate încă din concepție, reutilizarea platformelor partajate, principiul „o singură dată” și integrarea orientată pe evenimente („evenimente implicit”). Datele sunt consumate din registre autentice prin MConnect, în loc să fie colectate repetat de la cetățeni.

**Ciclul de viață al integrării.** Integrările încep în mediul de testare (staging), urmează pașii din [Procedura de conectare](../platforms/procedure.md) și trec în producție doar după testarea integrării. Platformele cu impact juridic sau financiar (de exemplu, MPass, MPay, MSign) necesită suplimentar contracte, conform cadrului normativ aplicabil — vedeți [acces și tarife](../platforms/index.md#acces-%C8%99i-tarife).

**Standarde de inginerie.** Echipele care construiesc soluții pentru ecosistem respectă standardele din această secțiune: [ghidul de proiectare a API-urilor](api-design-guide.md) pentru noile interfețe de servicii, [standardele de cod](code-standards.md) și [regulile de revizuire a codului](code-reviews.md) pentru dezvoltarea zilnică, [înregistrările deciziilor de arhitectură](adr.md) pentru alegerile tehnice semnificative și cerințele de [gestionare a jurnalelor](log-management.md) pentru auditabilitate.

**Ghiduri coerente.** Fiecare ghid de integrare din această documentație urmează aceeași structură — prezentare generală, pași de conectare, scenarii de interacțiune, dezvoltarea integrării, referința API, exemple, librării de integrare și jurnalul de modificări — astfel încât, odată ce ați integrat o platformă, următoarea vă va părea familiară.

* * *

## Ce urmează

- [Platforme și servicii](../platforms/index.md) — ce face fiecare platformă și în ce condiții este disponibilă
- [Procedura de conectare](../platforms/procedure.md) — cum vă puteți conecta la un serviciu
- [Principii de dezvoltare](../principles/architecture.md) — principiile de arhitectură obligatorii
- [Instrumente și tehnologii](../tools/technologies.md) — referința tehnologică completă
- [Sistemul unitar de design](../mud/index.md) — standardul național de design pentru interfețele guvernamentale
- **Ghiduri de integrare** — ghidul pas cu pas pentru platforma pe care o integrați
