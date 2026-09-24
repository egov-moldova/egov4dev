MDelivery este un serviciu guvernamental electronic conceput pentru a oferi un mecanism unificat și integrat de livrare, în scopul îmbunătățirii capacității logistice a Prestatorilor de servicii publice de a livra, sorta și urmări bunurile fizice (rezultate din serviciile publice prestate) către persoane fizice și juridice.

Pentru a permite procesul de livrare, MDelivery este integrat cu sistemele Prestatorilor de servicii (pentru a primi comenzile de livrat) și ale Cărăușilor (pentru a solicita servicii de livrare), precum și cu alte servicii guvernamentale electronice care facilitează procesul (MPass, MPay, MNotify).

## Pe scurt

**Ce este.** Serviciul guvernamental de livrare: mecanismul prin care rezultatul fizic al unui serviciu public (certificat, act apostilat, document de stare civilă etc.) ajunge la solicitant, acasă sau la serviciu, prin intermediul operatorilor poștali și curierilor integrați, fără vizitarea ghișeului. Prestatorul plasează comanda de livrare din propriul sistem; MDelivery o transmite cărăușului și returnează statusul livrării. Serviciul este integrat cu MPass, MPay și MNotify pentru autentificare, plată și notificarea beneficiarului.

**Temei normativ.** HG nr. 152/2021 cu privire la serviciul guvernamental de livrare (MDelivery) — pct. 2 — desemnarea posesorului și deținătorului.

Acte conexe: Legea nr. 234/2021 cu privire la serviciile publice; cadrul normativ privind serviciile poștale.

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

Gratuit pentru integrare (tariful de livrare se achită cărăușului). Obligatoriu: certificat STISC și acord cu AGE.

**Cui se adresează acest ghid.**

Principal: echipele de dezvoltare și integrare ale posesorilor de sisteme informaționale, publice și private.
Secundar: managerii de proiect și responsabilii de conformitate care pregătesc acordul cu AGE și certificatul STISC.

## Începeți rapid

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="process/" class="quick-link-card">
      <div class="quick-link-icon">⚡</div>
      <h3 class="quick-link-title">Pașii de conectare</h3>
      <p class="quick-link-description">Începeți procesul de integrare</p>
    </a>
    <a href="integration-development/" class="quick-link-card">
      <div class="quick-link-icon">📘</div>
      <h3 class="quick-link-title">Ghid de integrare</h3>
      <p class="quick-link-description">Documentație pas cu pas</p>
    </a>
    <a href="api-reference/" class="quick-link-card">
      <div class="quick-link-icon">🌐</div>
      <h3 class="quick-link-title">Referință API</h3>
      <p class="quick-link-description">Explorați endpoint-urile și callback-urile</p>
    </a>    
  </div>
</div>

## Structura documentului

Acest document conține informațiile relevante necesare pentru o înțelegere completă a sistemului MDelivery din perspectiva integrării. Include exemple de scenarii de integrare pentru diferite tehnologii. De asemenea, acest document descrie interfețele tehnice expuse de MDelivery pentru sistemele Prestatorilor de servicii care vor utiliza MDelivery, precum și detaliile tehnice care explică interacțiunea.

Publicul țintă îl constituie echipele de dezvoltare responsabile de integrare și administrarea sistemului.
