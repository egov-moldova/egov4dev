# Prezentare generală

MPass este serviciul guvernamental de autentificare și gestionare a identității din Republica Moldova, care oferă Single Sign-On (SSO) și Single Logout (SLO) securizate pe întreg spectrul serviciilor publice digitale, permițând utilizatorilor să acceseze mai multe sisteme cu un singur set de credențiale, oferind totodată sistemelor integrate date de identitate standardizate pentru scopuri de autorizare

## Pe scurt

**Ce este.** Serviciul guvernamental care permite unui utilizator să se autentifice o singură dată și apoi să acceseze mai multe sisteme publice, fără a avea nevoie de un cont separat în fiecare dintre acestea. Acesta transmite sistemului integrat un set standardizat de atribute de identitate (IDNP, nume, apartenență organizațională, roluri declarate), pe baza cărora sistemul respectiv decide ce drepturi acordă. MPass nu definește drepturile de acces din interiorul unui sistem integrat — aceasta rămâne responsabilitatea posesorului sistemului. Autentificarea poate fi efectuată prin semnătură mobilă, buletin de identitate electronic, token criptografic sau EVOSign.

**Temei normativ.** HG nr. 1090/2013 privind serviciul electronic guvernamental de autentificare și control al accesului (MPass) — pct. 3 sbp. 1) — desemnarea posesorului.

Acte conexe: Legea nr. 467/2003; Legea nr. 91/2014 (semnătura electronică); HG nr. 128/2014 (MCloud).

**Cine răspunde.**

| Rol | Entitate |
|---|---|
| Posesor | AGE |
| Deținător |  |
| Operator tehnico-tehnologic | STISC |

**Roluri în integrare.**

- AGE — posesor/deținător al platformei; încheie acordul de integrare și înregistrează sistemul integrat.
- STISC — emite certificatul de sistem necesar pentru staging și producție; operează infrastructura de găzduire.
- Posesorul sistemului integrat — decide scopul și temeiul legal al utilizării, drepturile de acces și răspunde de conformitate.
- Echipa de dezvoltare/integrare — implementează și testează integrarea tehnică.
- Utilizatorul final — persoana fizică sau unitatea de drept care beneficiază de serviciu.

**Condiții de acces.**

Instituții publice: în baza contractului, fără tarif.
Persoane juridice de drept privat și persoane fizice: în baza contractului — 10.800 lei/an per sistem integrat.
Obligatoriu: certificat de sistem emis de STISC, înregistrat în MPass.

**Cui se adresează acest ghid.**

Principal: echipele de dezvoltare și integrare ale posesorilor de sisteme informaționale, publice și private.
Secundar: managerii de proiect și responsabilii de conformitate care pregătesc acordul cu AGE și certificatul STISC.

## Treceți direct la treabă

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="process/" class="quick-link-card">
      <div class="quick-link-icon">⚡</div>
      <h3 class="quick-link-title">Pașii de conectare</h3>
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

## Ghid rapid pentru integratori

1. Înainte de a putea interacționa cu MPass, un Service trebuie să fie înregistrat corespunzător în MPass. Pentru a efectua o astfel de înregistrare, vă rugăm să generați un certificat auto-semnat sau să furnizați un certificat existent (în format fișier .cer) posesorului de serviciu";
2. Identificați setul de atribute necesare (inclusiv denumirile și valorile atributelor personalizate) care urmează să fie returnate de MPass în etapa de proiectare a Service-ului și specificați-le ca parte a înregistrării Service-ului.
3. Analizați fluxurile SSO/SLO pentru a înțelege interacțiunile dintre utilizator și sistem.
4. Pregătiți endpoint-urile SP (Assertion Consumer Service, Single Logout Service) și generați metadatele SP.
5. Înregistrați SP-ul dumneavoastră în MPass și faceți schimb de metadate și certificate, după caz.
6. Implementați fluxul de autentificare folosind binding-urile SAML 2.0 susținute de MPass.
7. Validați atributele primite de la MPass și aplicați propria logică de autorizare.
8. Testați integral (end-to-end) folosind exemplele furnizate sau tehnologia preferată.

## Glosar

Pentru glosarul complet, vizitați [pagina Glosar](https://egov-moldova.github.io/egov4dev/glossary/glossary/).

## Capabilitățile sistemului

MPass acționează ca intermediar între sistemele informaționale și diverse metode de autentificare, unificând accesul prin gestionarea diferențelor dintre diverșii furnizori de identitate. Acesta expune securizat o interfață unică pentru autentificare, furnizează atributele relevante de identitate ale utilizatorului pentru deciziile de autorizare și gestionează fluxul de interacțiune cu utilizatorul pe parcursul procesului de autentificare.

## Dependențe de servicii

MPass depinde de furnizorii de identitate digitală, astfel încât disponibilitatea și performanța sa sunt influențate direct de disponibilitatea și performanța serviciilor oferite de aceștia.

## Protocoale și standarde

MPass utilizează protocolul și formatul standard SAML v2.0 pentru autentificări. Tabelul următor conține o listă cuprinzătoare de referințe către specificațiile standard.

<table>
    <thead>
         <tr>
            <th><strong>Specificația SAML v2</strong></th>
            <th><strong>Rezumat</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>SAML Core</strong></td>
            <td>Această specificație definește sintaxa și semantica pentru assertion-urile codificate în XML privind autentificarea, atributele și autorizarea, precum și pentru protocoalele care transmit aceste informații.
            <br>Citiți documentația oficială <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf">SAML Core</a></td>
        </tr>
        <tr>
            <td><strong>SAML Bindings</strong></td>
            <td>Această specificație definește binding-urile de protocol pentru utilizarea assertion-urilor SAML și a mesajelor de tip request-response în protocoale și framework-uri de comunicare.
            <br>Citiți documentația oficială <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf">SAML Bindings</a></td>
        </tr>
        <tr>
            <td><strong>SAML Profiles</strong></td>
            <td>Această specificație definește profiluri pentru utilizarea assertion-urilor SAML și a mesajelor de tip request-response în protocoale și framework-uri de comunicare, precum și profiluri pentru sintaxa și convențiile de denumire a valorilor atributelor SAML.
            <br>Citiți documentația oficială <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf">SAML Profiles</a></td>
        </tr>
        <tr>
            <td><strong>SAML Authn Context</strong></td>
            <td>Această specificație definește o sintaxă pentru definirea declarațiilor de context de autentificare și o listă inițială de clase de context de autentificare pentru utilizare cu SAML.
            <br>Citiți documentația oficială <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-authn-context-2.0-os.pdf">SAML Authn Context</a></td>
        </tr>
        <tr>
            <td><strong>SAML Metadata</strong></td>
            <td>Această specificație definește profiluri pentru schimbul dinamic de metadate SAML între entitățile sistemului, referitoare la identificatori, suportul pentru binding-uri și endpoint-uri, certificate și chei, ș.a.
            <br>Citiți documentația oficială <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf">SAML Metadata</a></td>
        </tr>
        <tr>
            <td><strong>SAML Security Considerations</strong></td>
            <td>Această specificație neormativă descrie și analizează proprietățile de securitate și confidențialitate ale SAML.
            <br>Citiți documentația oficială <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-sec-consider-2.0-os.pdf">SAML Security Considerations</a></td>
        </tr>
        <tr>
            <td><strong>SAML 2.0 Errata</strong></td>
            <td>Acest document listează erata aprobată pentru standardul OASIS SAML V2.0.
            <br>Citiți documentația oficială <a href="https://docs.oasis-open.org/security/saml/v2.0/sstc-saml-approved-errata-2.0.pdf">SAML Security Considerations</a></td>
        </tr>
    </tbody>
</table>
