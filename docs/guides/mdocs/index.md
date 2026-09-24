MDocs este o soluție IT oferită ca serviciu SaaS, bazată pe platforma MCloud, concepută pentru a implementa un mecanism centralizat de stocare și partajare a documentelor rezultate din prestarea serviciilor publice, iar beneficiarii acestuia vor fi persoane fizice și juridice de drept public și privat.

Acest document descrie interfețele tehnice expuse de MDocs pentru sistemele informaționale care vor utiliza MDocs ca mijloc de schimb și stocare a documentelor. Publicul-țintă al acestuia îl constituie echipele de dezvoltare ale acestor sisteme informaționale.

Documentul conține toate informațiile relevante necesare pentru o înțelegere completă a MDocs din punctul de vedere al integrării. Acesta include detalii privind dezvoltarea integrărilor, considerații de securitate și o referință API.

Acest document include, de asemenea, exemple de request-uri și response-uri REST care exemplifică scenariul principal de interacțiune.

## Pe scurt

**Ce este.** Platforma guvernamentală pentru stocarea și partajarea documentelor rezultate din prestarea serviciilor publice. Instituția încarcă documentul o singură dată; beneficiarul — o persoană fizică sau juridică — îl preia și îl poate partaja în continuare, cu drept de citire sau scriere, fără a face schimb de fișiere prin e-mail. Este oferit ca serviciu (SaaS) pe platforma tehnologică guvernamentală comună MCloud. Este util în special pentru autoritățile care nu dispun de o soluție proprie de gestionare a documentelor.

**Temei normativ.** HG nr. 305/2024 cu privire la serviciul guvernamental de păstrare și partajare a documentelor (MDocs) — pct. 3 — desemnarea posesorului și deținătorului.

Acte conexe: HG nr. 128/2014 (MCloud — platforma pe care este găzduit serviciul); Legea nr. 133/2011.

**Cine răspunde.**

| Rol | Entitate |
|---|---|
| Posesor | AGE |
| Deținător | AGE |
| Operator tehnico-tehnologic | STISC |

**Roluri în integrare.**

- AGE — posesor/deținător al platformei; încheie acordul de integrare și înregistrează sistemul integrat.
- STISC — emite certificatul de sistem necesar conectării în staging și producție; operează infrastructura de găzduire.
- Posesorul sistemului integrat — decide scopul și temeiul legal al utilizării, drepturile de acces și răspunde de conformitate.
- Echipa de dezvoltare/integrare — implementează și testează integrarea tehnică.
- Utilizatorul final — persoana fizică sau unitatea de drept care beneficiază de serviciu.

**Condiții de acces.**

Gratuit. Obligatoriu: certificat STISC și acord cu AGE pentru suita M.

**Cui se adresează acest ghid.**

Principal: echipele de dezvoltare și integrare ale posesorilor de sisteme informaționale, publice și private.
Secundar: managerii de proiect și responsabilii de conformitate care pregătesc acordul cu AGE și certificatul STISC.

## Treci direct la treabă

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="process/" class="quick-link-card">
      <div class="quick-link-icon">⚡</div>
      <h3 class="quick-link-title">Pașii de conectare</h3>
      <p class="quick-link-description">Începe integrarea</p>
    </a>
    <a href="integration-development/" class="quick-link-card">
      <div class="quick-link-icon">📘</div>
      <h3 class="quick-link-title">Ghid de integrare</h3>
      <p class="quick-link-description">Documentație pas cu pas</p>
    </a>    
  </div>
      <div class="quick-links-container">
    <a href="api-reference/" class="quick-link-card">
      <div class="quick-link-icon">🌐</div>
      <h3 class="quick-link-title">Referință API</h3>
      <p class="quick-link-description">Explorează endpoint-urile și callback-urile</p>
    </a>
    <a href="https://www.nuget.org/profiles/egov-moldova" class="quick-link-card">
      <div class="quick-link-icon">📦</div>
      <h3 class="quick-link-title">Pachete NuGet</h3>
      <p class="quick-link-description">Pachete .NET pentru aplicația ta.</p>
    </a>
  </div>
</div>

## Domeniu de aplicare și public-țintă

Acest document descrie interfețele tehnice expuse de MDocs pentru sistemele informaționale care vor utiliza MDocs pentru stocarea și partajarea documentelor rezultate din prestarea serviciilor publice. Publicul-țintă al acestuia îl constituie echipele de dezvoltare ale acestor sisteme informaționale.

Detaliile legate de decizia privind evenimentele importante pentru un sistem informațional nu fac obiectul acestui document.

## Structura acestui document

Acest document conține informațiile relevante necesare pentru o înțelegere completă a MDocs din punctul de vedere al integrării. Este însoțit, de asemenea, de exemple care ilustrează unele scenarii de integrare utilizând anumite tehnologii.

Secvența de citire recomandată este următoarea, pe capitole:

- Contextul sistemului
- Scenarii de interacțiune
- Dezvoltarea integrării
- Considerații de securitate

Celelalte capitole au rol de referință.

## Capabilități generale ale sistemului

Serviciul de Găzduire și Partajare a Documentelor (MDocs) este o soluție IT oferită ca serviciu SaaS, bazată pe platforma MCloud, concepută pentru a implementa un mecanism centralizat de stocare și partajare a documentelor rezultate din prestarea serviciilor publice, iar beneficiarii acestuia vor fi persoane fizice și juridice de drept public și privat.

Prestarea serviciilor de găzduire și partajare a documentelor va permite standardizarea proceselor de partajare a rezultatelor serviciilor publice oferite de autoritățile publice din Republica Moldova printr-o platformă digitală, care va fi accesibilă autorităților publice care nu și-au digitizat încă serviciile.

Beneficiile tehnologice și organizaționale ale oferirii instrumentului de găzduire și partajare a fișierelor sunt următoarele:

- un repozitoriu centralizat de date pentru toate documentele livrate în cadrul prestării serviciilor publice;
- un proces standardizat pentru partajarea documentelor legate de rezultatul prestării serviciului public;
- digitizarea procesului de partajare a documentelor pentru autoritățile publice care nu dispun de soluții IT performante;
- reducerea costurilor de prestare a serviciilor publice;
- încurajarea schimbului electronic de documente între autoritățile publice din Republica Moldova;
- crearea condițiilor pentru implementarea unor soluții software pentru crearea și gestionarea arhivelor electronice;
- un mecanism eficient pentru schimbul automat de date între sistemele informaționale cu care va interacționa Serviciul de Găzduire și Partajare a Documentelor (MDocs);
- integrarea cu serviciile platformelor guvernamentale (MPass, MSign, MNotify, MLog, MPower, MCabinet, MDelivery, MWallet, MConnect, Catalogul Semantic, Portalul Date Deschise);
- o interfață de utilizator unică, intuitivă și ergonomică;
- facilități performante de gestionare, configurare și dezvoltare dinamică.

Prin oferirea serviciilor de găzduire și partajare a documentelor, Guvernul urmărește îmbunătățirea serviciilor publice prin intermediul platformelor digitale ale autorităților publice din Republica Moldova și reducerea utilizării documentelor pe suport de hârtie, prin oferirea unor facilități adecvate cetățenilor.

## Protocoale și standarde

**MDocs** expune o interfață HTTP REST și utilizează JSON ca format de mesaj.

## Tip de document

Implicit, în sistem există două tipuri de documente: Unknown și folder.

Orice alt tip de document trebuie definit de un administrator.

Dacă tipul de document nu este specificat la încărcarea blob-ului, atunci implicit se aplică tipul de document Unknown.

**Flag-uri de configurare disponibile:**

| **Nume** | **Descriere** |
|---|---|
| **Official document** | Permite administratorului să marcheze un tip de document ca fiind oficial. Tipurile de documente predefinite nu pot fi oficiale. |
| **Permanent delete on expiration** | Marchează tipurile de documente care sunt șterse complet la expirare sau șterse mai întâi prin coșul de reciclare (Recycle bin). Un document este considerat „în curs de expirare” dacă ExpiresOn este mai mic de 30 de zile (interval de timp configurabil). Aceasta înseamnă ștergere permanentă la expirare. |
| **Allow anonymous document verification** | Permite verificarea publică a documentelor de acest tip. |
| **Documents versioning** | Permite versionarea documentelor |

## Permisiuni de partajare

| **Descriere** | **Permisiune** | |
|---|---|---|
| | **Citire** | **Scriere** |
| Principalul poate **vizualiza** fișierul sau folderul. | **Da** | **Da** |
| Principalul poate **citi** fișierul sau folderul (inclusiv în josul ierarhiei). | **Da** | **Da** |
| Principalul poate **edita** fișierul sau folderul (inclusiv în josul ierarhiei). | **Nu** | **Da** |
| Principalul poate **suprascrie** fișierul sau poate **adăuga**/**elimina** orice document din folderul partajat. | **Nu** | **Da** |
| Principalul poate **recicla** documentul partajat (fișier/folder), dar nu îl poate șterge definitiv. | **Nu** | **Da** |

## Paginare

**Parametri**

| **Nume** | **Tip de date** | **Descriere** |
|---|---|---|
| page | integer($int32) | numărul paginii pe care doriți să o afișați |
| itemsPerPage | integer($int32) | numărul de elemente de afișat per pagină |
| orderField | string | ordonează lista după câmpul indicat |
| searchBy | string | filtrează lista pentru a afișa documentele care au câmpuri ce conțin textul indicat |

## Format

Header-ul de reprezentare Content-Type este utilizat pentru a indica tipul media original al resursei (înainte de aplicarea oricărei codificări a conținutului pentru transmitere).

MDocs permite orice tip MIME pentru blob-uri, dar aplică un tratament special pentru următoarele:

| **Tip MIME** | **Extensie** |
|---|---|
| application/json | .json |

Pentru tipurile de document cu schemă specificată, conținutul documentului este validat în raport cu schema respectivă.
