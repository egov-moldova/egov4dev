MLog este un serviciu al cărui scop principal este de a facilita înregistrarea evenimentelor legale recepționate din diverse surse oficiale și de a permite accesul facil la istoricul acestor evenimente.

Acest document descrie interfețele tehnice expuse de MLog pentru sistemele informaționale care vor utiliza MLog ca registru al evenimentelor legale. Publicul-țintă al documentului este echipele de dezvoltare ale acestor sisteme informaționale.

Documentul conține toate informațiile relevante necesare pentru o înțelegere completă a MLog din perspectiva integrării. Acesta include detalii privind dezvoltarea integrărilor, considerații de securitate și o referință API.

Documentul este însoțit și de exemple Java care ilustrează scenariul principal de interacțiune.

## Pe scurt

**Ce este.** Serviciul guvernamental de jurnalizare: registrul centralizat în care sistemele informaționale înregistrează evenimente semnificative — cine a accesat ce date, când, prin ce operațiune și cu ce rezultat. Sistemul care se integrează nu mai dezvoltă propria funcționalitate de jurnalizare și nu mai păstrează aceste înregistrări separat. Evenimentele pot fi semnate; pentru anumite sisteme, înregistrarea evenimentelor nesemnate poate fi interzisă. Integrarea este o obligație pentru autoritățile și instituțiile care dețin sisteme informaționale, pe cont propriu, în timp ce utilizarea serviciului este gratuită.

**Temei normativ.** HG nr. 708 din 28 august 2014 privind serviciul electronic guvernamental de jurnalizare (MLog) — DE CONFIRMAT — pct. 3 sbp. 1) — desemnarea posesorului; pct. 4 — obligația de integrare și gratuitatea utilizării.

Acte conexe: Legea nr. 133/2011; HG nr. 128/2014 (MCloud); Regulile privind modul de administrare a serviciului MLog.

**Cine răspunde.**

| Rol | Entitate |
|---|---|
| Posesor | AGE |
| Deținător |  |
| Operator tehnico-tehnologic | STISC |

**Roluri în integrare.**

- AGE — posesor/deținător al platformei; încheie acordul de integrare și înregistrează sistemul integrat.
- STISC — emite certificatul de sistem necesar conectării în staging și producție; operează infrastructura de găzduire.
- Posesorul sistemului integrat — decide scopul și temeiul legal al utilizării, drepturile de acces și răspunde de conformitate.
- Echipa de dezvoltare/integrare — implementează și testează integrarea tehnică.
- Utilizatorul final — persoana fizică sau unitatea de drept care beneficiază de serviciu.

**Condiții de acces.**

Gratuit, în limitele competențelor prevăzute de lege. Integrarea se realizează din contul mijloacelor proprii ale instituției.

**Cui se adresează acest ghid.**

Principal: echipele de dezvoltare și integrare ale posesorilor de sisteme informaționale, publice și private.
Secundar: managerii de proiect și responsabilii de conformitate care pregătesc acordul cu AGE și certificatul STISC.

## Începe direct

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

## Scop și public-țintă

Acest document descrie interfețele tehnice expuse de MLog pentru sistemele informaționale care vor utiliza MLog ca registru pentru evenimente legale sau importante. Publicul-țintă al documentului este echipele de dezvoltare ale acestor sisteme informaționale.

Detaliile privind modul de determinare a evenimentelor importante pentru un sistem informațional nu fac obiectul acestui document.

## Structura acestui ghid

Acest ghid conține informațiile relevante necesare pentru o înțelegere completă a MLog din perspectiva integrării. Este însoțit și de exemple care ilustrează unele scenarii de integrare folosind anumite tehnologii.

Secvența de lectură recomandată este următoarea:
- Contextul sistemului
- Scenarii de interacțiune
- Dezvoltarea integrării
- Considerații de securitate

Celelalte capitole au scop de referință.

## Capabilități generale ale sistemului

MLog este un serviciu reutilizabil și partajat la nivel de platformă, al cărui scop principal este de a fi un registru de evenimente și de a permite interogarea și analiza ulterioară a acestora. Notă: capabilitățile de analiză complexă sunt disponibile doar administratorilor MLog, în timp ce interogarea simplă a evenimentelor este disponibilă tuturor clienților, pentru evenimentele pe care le-au înregistrat anterior.

Evenimentele înregistrate în MLog pot fi semnate, iar pentru anumite sisteme evenimentele nesemnate ar putea să nu fie acceptate pentru înregistrare.

Implicit, MLog expune o interfață simplă de interogare pentru evenimentele înregistrate de sistemele client, fie după ID-ul de înregistrare returnat, fie după un interval de timp.

## Protocoale și standarde

MLog expune o interfață HTTP REST și utilizează protocolul JOSE pentru semnarea obiectelor JSON.
