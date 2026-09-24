MPower este un portal public destinat persoanelor fizice și juridice, atât publice, cât și private, prin intermediul căruia pot fi acordate, revocate, la care se poate renunța și pot fi verificate împuternicirile.
MPower oferă posibilitatea de a verifica dacă persoana împuternicită (reprezentantul) este abilitată să acționeze în numele unei alte persoane fizice sau juridice (reprezentat) pe care o reprezintă.

## Pe scurt

**Ce este.** Registrul guvernamental al împuternicirilor: unde o persoană fizică sau juridică acordă, vizualizează, revocă sau renunță la dreptul unei alte părți de a acționa în numele său. Sistemul care se integrează nu trebuie să gestioneze el însuși împuternicirile — acesta întreabă MPower dacă reprezentantul deține împuternicirea invocată, pentru tipul de autorizare relevant. Tipurile de autorizare sunt definite împreună cu prestatorul de servicii, în funcție de serviciile pe care le oferă.

**Temei normativ.** HG nr. 375/2020 cu privire la serviciul guvernamental de împuterniciri electronice (MPower) — pct. 3 — desemnarea posesorului și deținătorului.

Acte conexe: Codul civil (reprezentarea); HG nr. 1090/2013 (MPass); HG nr. 405/2014 (MSign).

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

Gratuit. Obligatoriu: certificat de sistem emis de STISC și înregistrat de AGE în MPass, pentru accesul la componenta MPower Clients API.

**Cui se adresează acest ghid.**

Principal: echipele de dezvoltare și integrare ale posesorilor de sisteme informaționale, publice și private.
Secundar: managerii de proiect și responsabilii de conformitate care pregătesc acordul cu AGE și certificatul STISC.

## Direct la subiect

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
    <a href="api-reference/" class="quick-link-card">
      <div class="quick-link-icon">🌐</div>
      <h3 class="quick-link-title">Referință API</h3>
      <p class="quick-link-description">Explorați endpointurile și callback-urile</p>
    </a>    
  </div>
</div>

Pentru a accesa componenta MPower Clients API, trebuie să utilizați certificatul de autentificare a sistemului emis de STISC și înregistrat de AGE în MPass

## Constrângeri
Serviciul depinde de identitatea digitală a sistemelor terțe.

## Terminologie

<table>
    <thead>
         <tr>
            <th><strong>Termen</strong></th>
            <th><strong>Definiție</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><strong>Împuternicire (IR)</strong></th>
            <td>Act juridic unilateral al unei persoane fizice sau al unei persoane juridice de drept public sau privat (reprezentatul), creat în cadrul sistemului informațional MPower, prin care aceasta împuternicește o altă persoană (reprezentantul) să o reprezinte și să acționeze în raport cu terții, în numele și pe seama sa.</td>
        </tr>
        <tr>
            <th><strong>Tip de autorizare</strong></th>
            <td>Lista tipurilor de autorizări pentru care pot fi acordate împuterniciri prin MPower.</td>
        </tr>
        <tr>
            <th><strong>Reprezentat</strong></th>
            <td>Persoana fizică sau juridică de drept public sau privat care utilizează sistemul informațional MPower pentru a acorda, vizualiza sau revoca o împuternicire.</td>
        </tr>
        <tr>
            <th><strong>Reprezentant</strong></th>
            <td>Persoana fizică care, în baza unei împuterniciri create prin MPower, este autorizată să acționeze în numele persoanei reprezentate.</td>
        </tr>
        <tr>
            <th><strong>Cosemnatar</strong></th>
            <td>Persoană fizică, în calitate de terț, care utilizează MPower la acordarea împuternicirilor emise de Reprezentat către Reprezentant. Există doar pentru anumite tipuri de autorizare.</td>
        </tr>
        <tr>
            <th><strong>Prestator de servicii</strong></th>
            <td>Persoana juridică de drept public sau privat pentru care, în contextul serviciilor pe care le prestează, este necesar să fie definite tipuri specifice de autorizare.</td>
        </tr>
        <tr>
            <th><strong>Portalul MPower</strong></th>
            <td>Registrul public al împuternicirilor, destinat publicului larg.</td>
        </tr>
        <tr>
            <th><strong>MPower Admin</strong></th>
            <td>Aplicația de administrare pentru MPower. Un portal pentru administratorii MPower.</td>
        </tr>
        <tr>
            <th><strong>Aplicație</strong></th>
            <td>MPower</td>
        </tr>
        <tr>
            <th><strong>IDNP</strong></th>
            <td>Numărul unic de identificare pentru persoanele fizice (în Republica Moldova).</td>
        </tr>
        <tr>
            <th><strong>IDNO</strong></th>
            <td>Numărul unic de identificare pentru persoanele juridice (în Republica Moldova).</td>
        </tr>
        <tr>
            <th><strong>Șablon</strong></th>
            <td>Definește textul afișat utilizatorului la crearea unei împuterniciri, în funcție de tipul de autorizare selectat.</td>
        </tr>
    </tbody>
</table>
