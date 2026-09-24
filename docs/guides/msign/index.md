# Prezentare generală

MSign este un serviciu reutilizabil și partajat la nivel de platformă, al cărui scop principal este de a facilita utilizarea semnăturii electronice și de a simplifica integrările cu diverse instrumente de semnătură electronică.

## Pe scurt

**Ce este.** Serviciul guvernamental care acționează ca intermediar pentru semnarea și verificarea electronică a documentelor. În loc să se integreze separat cu fiecare instrument de semnătură de pe piață, un sistem se integrează o singură dată cu MSign, care ascunde diferențele și expune o interfață unică. MSign efectuează și verificarea semnăturii, inclusiv verificări de revocare a certificatului la prestatorul de servicii de încredere. MSign nu emite certificate și nu este prestator de servicii de încredere — este un intermediar.

**Temei normativ.** HG nr. 405/2014 privind serviciul electronic guvernamental de semnătură digitală (MSign) — pct. 3 sbp. 1) — desemnarea posesorului.

Acte conexe: Legea nr. 91/2014 privind semnătura electronică și documentul electronic; Legea nr. 467/2003.

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

Instituții publice: gratuit.
Persoane juridice de drept privat și persoane fizice: în baza contractului — 15.200 lei/an per sistem integrat.
Obligatoriu: certificat de sistem emis de STISC.

**Cui se adresează acest ghid.**

Principal: echipele de dezvoltare și integrare ale posesorilor de sisteme informaționale, publice și private.
Secundar: managerii de proiect și responsabilii de conformitate care pregătesc acordul cu AGE și certificatul STISC.

## Începeți rapid

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="process/" class="quick-link-card">
      <div class="quick-link-icon">⚡</div>
      <h3 class="quick-link-title">Pași de conectare</h3>
      <p class="quick-link-description">Începeți integrarea</p>
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
      <p class="quick-link-description">Explorați endpoint-urile și callback-urile</p>
    </a>
    <a href="https://www.nuget.org/profiles/egov-moldova" class="quick-link-card">
      <div class="quick-link-icon">📦</div>
      <h3 class="quick-link-title">Pachete NuGet</h3>
      <p class="quick-link-description">Pachete .NET pentru aplicația dumneavoastră.</p>
    </a>
  </div>
</div>

## Domeniu de aplicare și public țintă

Detaliile referitoare la diversele instrumente de semnătură electronică integrate cu MSign nu fac obiectul acestui document.

Pentru glosarul complet, vizitați pagina [Glosar](https://egov-moldova.github.io/egov4dev/glossary/glossary/).

## Capabilități generale ale sistemului

MSign este un serviciu reutilizabil și partajat la nivel de platformă, al cărui scop principal este de a facilita utilizarea semnăturii electronice și de a simplifica integrările cu diverse instrumente de semnătură electronică.
MSign este utilizat ca intermediar între diverse sisteme informaționale și furnizorii de instrumente de semnătură electronică. Furnizorii de semnătură electronică diferă semnificativ din punct de vedere al integrării, expunând diverse API-uri care pot implica interacțiunea directă a utilizatorului prin browser pentru a accesa dispozitivul criptografic al utilizatorului sau utilizarea unor dispozitive criptografice care nu sunt conectate direct la calculatorul utilizatorului. MSign se integrează cu acești furnizori, ascunde diferențele și expune o interfață unificată unică pentru sistemele informaționale care necesită integrarea semnăturii electronice.
Pentru semnarea propriu-zisă, MSign expune pagini web care ghidează utilizatorul prin selectarea instrumentului de semnătură electronică, introducerea datelor specifice instrumentului, progresul procesului de semnare și paginile cu rezultatul procesului de semnare.
Pentru verificarea semnăturii electronice, MSign expune un serviciu web de verificare care se integrează cu diverse autorități de certificare pentru a efectua verificarea propriu-zisă, inclusiv verificările de revocare a certificatului.

## Dependențe de servicii

MSign depinde de furnizorii de instrumente de semnătură electronică, astfel încât disponibilitatea și performanța sa sunt influențate direct de disponibilitatea și performanța oferite de furnizori.

## Protocoale și standarde

MSign expune un serviciu interoperabil WS-I Basic Profile 1.1 prin HTTPS, care corespunde basicHttpBinding din WCF. MSign utilizează SOAP faults pentru raportarea erorilor.
