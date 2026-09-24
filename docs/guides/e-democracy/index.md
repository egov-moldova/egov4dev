<img src="../../assets/edemocracy-intro.png">

eDemocracy (ePetiții) este platforma care permite cetățenilor și persoanelor juridice să depună petiții electronic către autoritățile publice. Platforma permite autorităților să examineze, să proceseze și să răspundă la petiții printr-un serviciu digital centralizat.

Platforma expune un **API REST** care permite sistemelor informaționale externe ale autorităților publice să se integreze cu serviciul și să gestioneze petițiile electronic.

Accesul la API este acordat printr-unul dintre următoarele mecanisme de autentificare:

- **Certificat de sistem X.509** emis de **STISC** și înregistrat în **MPass**
- **Token JWT semnat cu cheie RSA**, validat folosind certificatul public înregistrat

## Pe scurt

**Ce este.** Platforma prin care persoanele fizice și juridice depun petiții, cereri, opinii și sugestii către autoritățile publice electronic, iar autoritățile le înregistrează, examinează și răspund într-un singur flux. O autoritate se poate integra prin API pentru a prelua cererile și a le gestiona în propriul sistem, fără înregistrare dublă.
Notă terminologică: Regulamentul sistemului utilizează termenii „registrator” și „furnizor de date” în sensuri diferite de cele din cadrul legal general — vezi secțiunea de terminologie.

**Temei normativ.** HG nr. 564/2024 cu privire la Sistemul informațional automatizat „e-Democrație” — pct. 2 — desemnarea posesorului și deținătorului.

Acte conexe: Legea nr. 239/2008 privind transparența în procesul decizional; Codul administrativ (petiționarea).

**Cine răspunde.**

| Rol | Entitate |
|---|---|
| Posesor | AGE |
| Deținător | AGE |
| Operator tehnico-tehnologic | STISC |

**Roluri în integrare.**

- AGE — posesor/deținător al platformei; încheie acordul de integrare și înregistrează sistemul integrat.
- STISC — emite certificatul de sistem necesar pentru staging și producție; operează infrastructura de găzduire.
- Posesorul sistemului integrat — decide scopul și temeiul legal al utilizării, drepturile de acces și răspunde de conformitate.
- Echipa de dezvoltare/integrare — implementează și testează integrarea tehnică.
- Utilizatorul final — persoana fizică sau unitatea de drept care beneficiază de serviciu.

**Condiții de acces.**

Gratuit. Accesul la API se acordă prin certificat de sistem X.509 emis de STISC și înregistrat în MPass, ori prin token JWT semnat cu cheie RSA, validat cu certificatul public înregistrat.

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
    <a href="api-reference/" class="quick-link-card">
      <div class="quick-link-icon">🌐</div>
      <h3 class="quick-link-title">Referință API</h3>
      <p class="quick-link-description">Explorează endpoint-urile și callback-urile</p>
    </a>    
  </div>
</div>
