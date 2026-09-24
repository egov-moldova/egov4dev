Aceste standarde se aplică echipelor care dezvoltă soluții pentru ecosistemul eGov Moldova — atât echipelor proprii ale Agenției de Guvernare Electronică, cât și echipelor furnizorilor externi. Ele există pentru ca un cod scris de o echipă să poată fi întreținut, auditat și dezvoltat de o alta, ceea ce reprezintă ciclul de viață normal al unui sistem guvernamental.

Standardele sunt aplicate, acolo unde este posibil, prin automatizare — analizoare (analyzers), praguri de calitate în pipeline și revizuirea codului — nu prin memorie. Vedeți [Revizuiri de cod](code-reviews.md) pentru partea de proces.

* * *

## Limbaje și framework-uri

Proiectele utilizează stiva tehnologică guvernamentală aprobată, descrisă în [Instrumente și tehnologii](../tools/technologies.md): C# pe versiuni .NET suportate (LTS), ASP.NET Core pentru servicii, Blazor pentru interfețe web cu **Fod.UIComponents** — biblioteca proprie de componente UI a Agenției, care înlocuiește MudBlazor ca standard de componente — și Entity Framework Core pentru accesul la date.

- Nu introduceți framework-uri, limbaje sau dependențe semnificative noi fără o justificare arhitecturală explicită — consemnați decizia ca [înregistrare a deciziei de arhitectură](adr.md) și obțineți aprobarea la nivel de arhitectură tehnică.
- Fixați versiunile dependențelor în manifestele proiectului; intervalele de versiuni flotante nu sunt permise în build-urile de producție.
- Preferați reutilizarea pachetelor NuGet partajate **Egov** (pentru MPass, MSign și configurare) în locul reimplementării integrărilor cu platformele.

## Limbă

Tot codul, comentariile, mesajele de commit, identificatorii și contractele API sunt scrise în **limba engleză**. Limba română apare doar în textele orientate către utilizator (etichete, mesaje, notificări), care trebuie păstrate în resurse localizabile — niciodată scrise direct (hardcodate) în cod.

Atunci când vă integrați cu un sistem a cărui interfață folosește termeni în limba română, traduceți endpoint-urile și câmpurile în limba engleză la nivelul stratului de integrare, astfel încât restul sistemului să lucreze cu obiecte în limba engleză. Utilizați [glosarul](../glossary/glossary.md) pentru traducerile consacrate ale termenilor din domeniul guvernamental și extindeți-l atunci când lipsește un termen.

**Rău**

```csharp
var cerere = new CerereEliberareCertificat();   // Romanian identifier
```

**Bine**

```csharp
var request = new CertificateIssueRequest();
```

* * *

## Structura proiectului

Serviciile backend urmează **Clean Architecture** — dependențele sunt orientate spre interior, iar logica de business nu depinde niciodată de infrastructură:

| Strat | Conținut | Regulă de dependență |
| --- | --- | --- |
| Domain | Entități, obiecte valoare, evenimente de domeniu, interfețe | Nu depinde de nimic |
| Application | Cazuri de utilizare, handler-e pentru comenzi/interogări, DTO-uri, validatori | Depinde doar de Domain |
| Infrastructure | DbContext-uri, repository-uri, clienți pentru servicii externe, mesagerie | Implementează interfețele din Domain |
| Presentation | Controllere, middleware, modele de cerere/răspuns | Depinde de Application; conectează Infrastructure |

Consecințe practice:

- Nu faceți niciodată referire la elemente de infrastructură (un `DbContext`, un client HTTP, un producător de mesaje) din straturile Domain sau Application.
- Nu returnați niciodată entități de bază de date direct din endpoint-urile API — mapați la DTO-uri la granița stratului Application.
- Organizați repository-urile cu folderele convenționale `src/` și `tests/`; un singur serviciu per soluție (solution).

## Convenții C#

- Respectați [convențiile standard Microsoft pentru C#](https://learn.microsoft.com/dotnet/csharp/fundamentals/coding-style/coding-conventions): `PascalCase` pentru tipuri și membri publici, `camelCase` pentru variabile locale și parametri, nume semnificative în locul abrevierilor.
- Formatarea și stilul sunt impuse prin fișierul `.editorconfig` inclus în repository, cu analizoare Roslyn activate; build-urile tratează avertismentele ca erori.
- Activați **nullable reference types** în proiectele noi.
- Utilizați `async`/`await` de la un capăt la altul pentru operațiuni I/O; nu blocați niciodată codul asincron (`.Result`, `.Wait()`).
- Utilizați injectarea de dependențe (dependency injection) pentru toți colaboratorii; evitați accesul static la servicii și service locators.
- Utilizați jurnalizare structurată prin `ILogger<T>` — vedeți [Gestionarea jurnalelor](log-management.md); `Console.WriteLine` nu este jurnalizare.

## Acces la date

- Toate modificările de schemă trec prin **migrări versionate** (EF Core Migrations); DDL manual asupra oricărui mediu partajat este interzis.
- Doar interogări parametrizate sau generate de ORM — concatenarea de șiruri în SQL este o încălcare critică de securitate, nu o problemă de stil.
- Noua logică de business trăiește în stratul Application, nu în proceduri stocate.
- Intrările din cache-ul Redis au întotdeauna un TTL.

* * *

## Codare securizată

Cerințele de securitate fac parte din definiția codului funcțional, nu o activitate separată. Nivelul minim pentru aplicațiile din ecosistem este **[OWASP ASVS Level 2](https://owasp.org/www-project-application-security-verification-standard/)**; în activitatea zilnică, modurile de eșec din **OWASP Top 10** trebuie prevenite activ:

- **Fără secrete în cod sau în fișierele de configurare din repository** — fără șiruri de conexiune cu credențiale, chei API, token-uri sau certificate. Secretele trăiesc în mecanismele securizate de configurare/vault ale platformei. Această regulă nu are excepții și se aplică în orice mediu, inclusiv în dezvoltare.
- Validați datele de intrare pe server pentru fiecare punct de intrare; codificați (encode) corespunzător datele de ieșire, în funcție de destinație (HTML, SQL, jurnale).
- Autentificați utilizatorii doar prin **MPass** — stocarea personalizată a credențialelor este interzisă.
- Aplicați verificări de autorizare la nivel de resursă, la fiecare cerere, nu doar în interfață.
- Fără date reale de producție în mediile de dezvoltare sau testare (staging) — utilizați date sintetice sau mascate.
- Analiza statică (SAST) și scanarea dependențelor (SCA) rulează în pipeline și sunt **blocante**: un eșec la scanarea de securitate se remediază, nu se ocolește. Constatările critice sau de severitate ridicată neremediate opresc lansarea.

* * *

## Testare

Testele fac parte din Definiția lui „Finalizat” — o funcționalitate fără teste nu este finalizată:

- **Teste unitare** pentru logica de business (straturile Domain și Application).
- **Teste de integrare** pentru servicii și API-uri, acoperind scenariile principale și căile de eroare.
- **Teste end-to-end** pentru fluxurile critice ale utilizatorilor, rulate pe staging înainte de lansare.

Acoperirea codului nou trebuie să fie de cel puțin **70%**, logica de business fiind supusă unui prag mai ridicat (țintă 80%). Acoperirea este măsurată în pipeline și impusă ca prag de calitate, împreună cu analiza statică — o lansare cu praguri nereușite (failing gates) nu avansează. Vedeți pagina de [revizuire a codului](code-reviews.md) pentru modul în care aceasta se încadrează în fluxul de livrare.

* * *

## Standarde de interfață cu utilizatorul

Interfețele web respectă [Sistemul unitar de design (MUD)](../mud/index.md) și sunt construite cu **Fod.UIComponents**, biblioteca de componente UI Blazor a Agenției. Interfețele noi folosesc Fod.UIComponents; aplicațiile MudBlazor existente migrează progresiv, pe măsură ce evoluează. Dincolo de sistemul de design, aceste reguli de implementare se aplică tuturor aplicațiilor AGE — ele fac diferența dintre o interfață care pare finalizată și una care își expune schema bazei de date:

**Text și etichete**

- Etichetele sunt în limba română corectă gramatical, cu majusculă doar la început de propoziție (sentence case): *„Cod personal"*, nu *„Cod Personal"* — camelCase și Title Case nu sunt practici tipografice românești.
- Nu afișați niciodată nume tehnice brute în interfață: `UserType` devine *Tipul utilizatorului*, `CreatedAt` devine *Data creării*. Aceasta se aplică deopotrivă etichetelor, opțiunilor din liste derulante, coloanelor din grile și filtrelor.
- Mesajele de eroare sunt în limba română, orientate către utilizator și acționabile: *„Introduceți un IDNP valid (13 cifre)"* — niciodată mesaje implicite ale framework-ului, precum *"Length cannot be longer than…"*, și niciodată jargon tehnic.

**Formate**

- Date: *12 septembrie 2024* (sau *12 sep 2024* acolo unde spațiul este limitat); forma numerică este `12.09.2024` — doar separator punct, ziua fără zero în față, luna cu zero în față.
- Oră: format de 24 de ore — `14:30`, niciodată `2:30 PM`.

**Comportamentul formularelor**

- Un formular are exact un buton vizual principal (submit/salvare); acțiunile secundare (*Anulează*) sunt vizual neutre; acțiunile tehnice sunt minime.
- Etichetele sunt întotdeauna prezente; placeholder-ele afișează conținut exemplificativ, nu înlocuiesc etichetele.
- Feedback-ul de validare apare atunci când un câmp pierde focusul (blur), nu la fiecare apăsare de tastă; câmpurile invalide primesc o stare vizuală clară, plus un mesaj.
- Câmpurile asociate sunt grupate pe același rând, cu spațiere de grilă consecventă; formularele sunt complet navigabile de la tastatură (Tab/Shift+Tab, Enter trimite formularul).

Structura și conținutul formularelor pentru ecranele reale provin din specificația de produs/design, nu din improvizația dezvoltatorului — regulile de mai sus reprezintă minimul, nu un substitut pentru livrabilele de design.
