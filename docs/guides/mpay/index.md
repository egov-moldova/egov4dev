MPay este un serviciu reutilizabil și partajat la nivel de platformă, al cărui scop principal este de a permite plata pentru orice e-Serviciu cu orice instrument de plată disponibil pe piață.
Interfața tehnică unificată, utilizată pentru integrarea e-Serviciilor cu MPay, simplifică semnificativ integrările, ascunzând diferențele dintre protocoalele și formatele tehnice.
Există numeroase avantaje netehnice oferite de MPay, precum gestionarea mai simplă a contractelor și decontarea simplificată, însă acestea nu fac obiectul acestui document.

## Pe scurt

**Ce este.** Serviciul guvernamental de plăți: un punct unic pentru achitarea taxelor, amenzilor și serviciilor publice cu orice instrument de plată disponibil pe piață (card, internet banking, terminal, numerar la prestatori). Prestatorul de servicii se integrează o singură dată cu MPay, în loc să se integreze separat cu fiecare bancă sau procesator. MPay confirmă plata către sistemul prestatorului și păstrează evidența și raportarea încasărilor. Posibilitatea de a plăti pentru un anumit serviciu depinde de disponibilitatea serviciului web expus de prestator.

**Temei normativ.** HG nr. 712/2020 cu privire la serviciul guvernamental de plăți electronice (MPay) — pct. 16 din Concept — desemnarea posesorului și deținătorului.

Acte conexe: Legea nr. 234/2021 cu privire la serviciile publice; cadrul bugetar privind încasările la buget.

**Cine răspunde.**

| Rol | Entitate |
|---|---|
| Posesor | AGE |
| Deținător | AGE |
| Operator tehnico-tehnologic |  |

**Roluri în integrare.**

- AGE — posesor/deținător al platformei; încheie acordul de integrare și înregistrează sistemul integrat.
- STISC — emite certificatul de sistem necesar conectării în staging și producție; operează infrastructura de găzduire.
- Posesorul sistemului integrat — decide scopul și temeiul legal al utilizării, drepturile de acces și răspunde de conformitate.
- Echipa de dezvoltare/integrare — implementează și testează integrarea tehnică.
- Utilizatorul final — persoana fizică sau unitatea de drept care beneficiază de serviciu.

**Condiții de acces.**

Gratuit pentru integratori (comisioanele instrumentelor de plată se stabilesc separat).
Obligatoriu: acord distinct cu AGE pentru MPay (separat de acordul pentru suita M) și certificat STISC.

**Cui se adresează acest ghid.**

Principal: echipele de dezvoltare și integrare ale posesorilor de sisteme informaționale, publice și private.
Secundar: managerii de proiect și responsabilii de conformitate care pregătesc acordul cu AGE și certificatul STISC.

## Pornire rapidă

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
    <a href="api-reference/" class="quick-link-card">
      <div class="quick-link-icon">🌐</div>
      <h3 class="quick-link-title">Referință API</h3>
      <p class="quick-link-description">Explorați endpoint-urile și callback-urile</p>
    </a>    
  </div>
</div>

## Domeniu de aplicare și public țintă

Acest document descrie interfețele tehnice utilizate pentru integrarea cu MPay. Există interfețe pe ambele părți, atât pe partea e-Serviciului plătibil, cât și pe partea MPay. Publicul său țintă este format din echipele de dezvoltare care implementează sau mențin sisteme informaționale ce urmează a fi integrate cu MPay.

## Dependențe de serviciu

Disponibilitatea MPay depinde de disponibilitatea implementării IServiceProvider, adică un plătitor nu va putea interoga o comandă sau o factură pentru un anumit e-Serviciu și nu va putea plăti pentru aceasta, dacă serviciul web al prestatorului e-Serviciului nu este disponibil.

## Protocoale și standarde

MPay expune un serviciu interoperabil WS-I Basic Profile 1.1 prin HTTPS, care corespunde binding-ului basicHttpBinding din WCF. MPay utilizează erori SOAP (SOAP faults) pentru raportarea erorilor.
MPay utilizează WS-Security (X.509) cu semnătură XML (la nivel de mesaj) pentru a asigura nerepudierea.
