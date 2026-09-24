Infrastructura de guvernare electronică a Moldovei este construită în jurul unui set de platforme partajate, fiecare concepută pentru a rezolva o provocare comună — autentificare, semnare, plăți, schimb de date, notificări — astfel încât instituțiile publice să se poată concentra pe furnizarea serviciilor, în loc să reconstruiască fundațiile tehnice. Secțiunile de mai jos acoperă atât modelul de business, cât și îndrumările de integrare pentru fiecare platformă.

## Cadrul legal al platformelor

Fiecare platformă guvernamentală este instituită și guvernată printr-o Hotărâre de Guvern, care desemnează posesorul, deținătorul și, după caz, operatorul tehnic. Tabelul de mai jos este punctul unic de referință; detaliile sunt prezentate în ghidul fiecărui serviciu.

| Serviciu | Hotărâre de Guvern | Posesor | Deținător |
|---|---|---|---|
| [MPass](...) | HG nr. 1090/2013, pct. 3 sbp. 1) | AGE | de confirmat |
| [MSign](...) | HG nr. 405/2014, pct. 3 sbp. 1) | AGE | de confirmat |
| [MConnect](...) | HG nr. 211/2019, pct. 3 | AGE | AGE |
| [MConnect Events](...) | HG nr. 211/2019 (componentă) | AGE | AGE |
| [MPay](...) | HG nr. 712/2020, pct. 16 din Concept | AGE | AGE |
| [MPower](...) | HG nr. 375/2020, pct. 3 | AGE | AGE |
| [MNotify](...) | HG nr. 376/2020, pct. 3 | AGE | AGE |
| [MDelivery](...) | HG nr. 152/2021, pct. 2 | AGE | AGE |
| [MDocs](...) | HG nr. 305/2024, pct. 3 | AGE | AGE |
| [MLog](...) | HG nr. 708/2014, pct. 3 sbp. 1) | AGE | de confirmat |
| [e-Democrație](...) | HG nr. 564/2024, pct. 2 | AGE | AGE |
| [EVO / EVO Wallet](...) | HG nr. 5/2024, pct. 3; HG nr. 677/2025 | AGE | AGE |
| [PDSE / FOD](...) | HG nr. 717/2014, pct. 3 | AGE | de confirmat |

Operatorul tehnic este indicat pe pagina fiecărui serviciu, conform Hotărârii aplicabile.
Taxele prezentate în secțiunea „Acces și tarife” sunt stabilite prin actul normativ indicat în acea secțiune.

## Acces și tarife

Majoritatea serviciilor din infrastructura partajată eGov Moldova sunt disponibile gratuit pentru toate părțile care se integrează. Cu toate acestea, anumite platforme funcționează pe un model de recuperare a costurilor, stabilit prin reglementare guvernamentală. Taxele de acces se aplică per sistem informațional integrat și sunt facturate anual, în baza unui contract semnat. Instituțiile publice sunt scutite integral — taxele se aplică exclusiv persoanelor juridice de drept privat și persoanelor fizice.

<table class="pricing-table">
  <thead>
    <tr>
      <th>Serviciu</th>
      <th>Tip de utilizator</th>
      <th>Condiții de acces</th>
      <th style="width:20%">Taxă anuală per integrare</th>
    </tr>
  </thead>
  <tbody>
    <tr class="product-row">
      <td colspan="4"><strong>MPass</strong></td>
    </tr>
    <tr>
      <td></td>
      <td>Instituții publice</td>
      <td>Pe bază de contract</td>
      <td style="text-align:center">–</td>
    </tr>
    <tr>
      <td></td>
      <td>Persoane juridice de drept privat și persoane fizice</td>
      <td>Pe bază de contract (conform cadrului legal aplicabil)</td>
      <td style="text-align:center">10.800 lei</td>
    </tr>
    <tr class="product-row">
      <td colspan="4"><strong>MSign</strong></td>
    </tr>
    <tr>
      <td></td>
      <td>Instituții publice</td>
      <td>Gratuit</td>
      <td style="text-align:center">–</td>
    </tr>
    <tr>
      <td></td>
      <td>Persoane juridice de drept privat și persoane fizice</td>
      <td>Pe bază de contract (conform cadrului legal aplicabil)</td>
      <td style="text-align:center">15.200 lei</td>
    </tr>
    <tr class="product-row">
      <td colspan="4"><strong>MConnect</strong></td>
    </tr>
    <tr>
      <td></td>
      <td>Instituții publice</td>
      <td>Gratuit</td>
      <td style="text-align:center">–</td>
    </tr>
    <tr>
      <td></td>
      <td rowspan="2">Participanți din sectorul privat</td>
      <td>Taxă de instalare per sursă de date (unică)</td>
      <td style="text-align:center">1.000 lei</td>
    </tr>
    <tr>
      <td></td>
      <td>Taxă de schimb de date per interogare</td>
      <td style="text-align:center">0,25 lei</td>
    </tr>
    <tr class="product-row">
      <td colspan="2"><strong>Toate celelalte servicii</strong></td>
      <td>Gratuit</td>
      <td style="text-align:center">–</td>
    </tr>
  </tbody>
</table>

**Facturare per sistem:** Taxa anuală se aplică fiecărui sistem informațional integrat, în mod independent. Organizațiile care integrează mai multe sisteme trebuie să semneze un contract separat și să achite taxa aplicabilă pentru fiecare dintre acestea.

Platformele nu funcționează izolat. Diagrama de mai jos ilustrează modul în care acestea se raportează una la cealaltă — de la serviciile fundamentale de identitate și interoperabilitate, până la canalele de livrare orientate către cetățean. Înțelegerea acestor relații ajută dezvoltatorii să anticipeze care servicii trebuie integrate împreună și în ce ordine.

<img src="../assets/mega-ecosystem.png" alt="Ecosistemul EGOV" width="100%" align="right"/>


## <img src="../assets/logos/mconnect-logo.png" alt="mconnect logo" width="30" align="left" style="margin: 5px 10px 0 0;"/> **mconnect** – platforma de interoperabilitate

<a href="https://mconnect.gov.md/">MConnect</a> este platforma de interoperabilitate a statului, care permite schimbul de date între sistemele informaționale ale autorităților și instituțiilor publice. Prin intermediul acestei platforme, cetățenii și mediul de afaceri nu mai sunt obligați să prezinte certificate, extrase, copii sau alte documente care sunt deja disponibile în format electronic în cadrul sistemelor guvernamentale.

Utilizarea MConnect asigură accesul la date autentice direct din sursele originale, reduce povara administrativă, elimină duplicarea informațiilor și contribuie la creșterea eficienței în interacțiunea dintre cetățeni, mediul de afaceri și stat.

Platforma se bazează pe principiile legalității, accesului egal, autenticității și responsabilității comune a furnizorilor și consumatorilor de date. Instituțiile conectate la MConnect oferă servicii altor entități prin canale de comunicare securizate, conform acordurilor și prevederilor legale stabilite. În prezent, peste 480 de instituții sunt conectate la MConnect, asigurând milioane de schimburi automatizate de date zilnic. Acest fapt face din MConnect o componentă fundamentală a infrastructurii naționale de e-guvernare, contribuind direct la transformarea digitală a administrației publice.

### mconnect events

MConnect Events reprezintă cea mai nouă componentă a ecosistemului de schimb de date prin intermediul Platformei de Interoperabilitate (MConnect), creată pentru a transforma fundamental modul în care instituțiile publice partajează date. Extensia introduce un model modern, bazat pe evenimente, care permite sincronizarea aproape în timp real a modificărilor din registre, cu peste 2,5 milioane de mesaje procesate zilnic prin MConnect. Această abordare orientată pe evenimente crește viteza, reziliența și proactivitatea serviciilor publice, deschizând calea către procese complet automatizate și servicii digitale inteligente.

### Catalogul semantic

[Catalogul Semantic](http://semantic.gov.md/) a fost dezvoltat ca urmare a analizei practicilor curente de gestionare a datelor, cu scopul de a îmbunătăți calitatea generală a datelor, utilizarea și coordonarea acestora, precum și alinierea lor la practicile internaționale. Pentru a crește calitatea datelor și a informațiilor despre acestea, precum și pentru a implementa bune practici internaționale, a fost necesară identificarea unei modalități mai eficiente și centralizate de sistematizare și gestionare a informațiilor despre date.

## <img src="../assets/logos/mpass-logo.png" alt="mpass logo" width="30" align="left" style="margin: 5px 10px 0 0;"/> **mpass** – serviciul de autentificare și autorizare

<a href="https://mpass.gov.md/">MPass</a> este serviciul guvernamental de autentificare și autorizare, care oferă cetățenilor și funcționarilor acces securizat la serviciile publice electronice. Prin utilizarea MPass, utilizatorii se autentifică o singură dată și pot accesa ulterior mai multe platforme și sisteme, fără a fi necesare autentificări repetate.

Autentificarea prin MPass poate fi realizată prin diverse metode, precum semnătura mobilă, token-ul criptografic sau aplicația EVOSign. Sistemul respectă standardele internaționale de securitate, asigurând confidențialitatea și integritatea procesului de autentificare.

În prezent, MPass este integrat cu peste 190 de platforme și sisteme guvernamentale, oferind cetățenilor o modalitate convenabilă și securizată de a accesa e-serviciile.

---

## <img src="../assets/logos/msign-logo.png" alt="msign logo" width="30" align="left" style="margin: 5px 10px 0 0;"/> **msign** – serviciul de semnătură electronică

<a href="https://msign.gov.md/">MSign</a> este serviciul de semnătură electronică al Republicii Moldova, conceput pentru a oferi autenticitate și valoare juridică documentelor electronice. Serviciul permite atât instituțiilor publice, cât și entităților private, să semneze documente digital, eliminând necesitatea proceselor pe suport de hârtie.

Prin MSign, cetățenii și organizațiile pot semna contracte, cereri, certificate și alte documente oficiale utilizând certificate calificate emise de furnizori acreditați. Documentele semnate asigură integritatea, autenticitatea și nerepudierea, în conformitate cu legea.

Platforma contribuie la reducerea birocrației, economisirea timpului și asigurarea unui nivel mai ridicat de securitate în comunicarea dintre stat, mediul de afaceri și cetățeni.

---

## <img src="../assets/logos/mpay-logo.png" alt="mpay logo" width="30" align="left" style="margin: 5px 10px 0 0;"/> **mpay** – platforma guvernamentală de plăți electronice

<a href="https://mpay.gov.md/">MPay</a> este platforma națională de plăți electronice, concepută pentru a simplifica interacțiunile financiare dintre cetățeni, mediul de afaceri și instituțiile publice. Aceasta oferă un mediu securizat și unificat pentru achitarea online a taxelor de stat, impozitelor și altor servicii publice, eliminând necesitatea vizitelor fizice sau a tranzacțiilor manuale.

Prin MPay, utilizatorii pot efectua plăți rapid, folosind diverse metode, precum cardurile bancare, internet banking-ul sau terminalele de plată. Platforma asigură transparență și fiabilitate prin generarea de chitanțe electronice și menținerea unei evidențe clare a tranzacțiilor. Prin integrarea cu numeroase servicii guvernamentale, MPay joacă un rol esențial în avansarea guvernării digitale și îmbunătățirea experienței generale a utilizatorilor în ecosistemul de e-guvernare al Moldovei.

---

## <img src="../assets/logos/mpower-logo.png" alt="mpower logo" width="30" align="left" style="margin: 5px 10px 0 0;"/> **mpower** – serviciul de delegare

<a href="https://mpower.gov.md/">MPower</a> este serviciul digital de delegare, care permite cetățenilor și organizațiilor să acorde drepturi de reprezentare altor persoane sau entități, în vederea accesării serviciilor publice electronice.

Prin MPower, un părinte poate delega dreptul de a accesa servicii în numele copilului său, un angajator poate delega sarcini angajaților, iar avocații pot reprezenta clienți. Sistemul este integrat cu MPass, MSign, MConnect și MNotify, asigurând procese de delegare securizate și verificabile.

Acest serviciu aduce beneficii semnificative în ceea ce privește flexibilitatea, reducerea necesității prezenței fizice și oferirea unor mecanisme de încredere pentru reprezentarea digitală legală.

---

## <img src="../assets/logos/mnotify-logo.png" alt="mnotify logo" width="30" align="left" style="margin: 5px 10px 0 0;"/> **mnotify** – serviciul de notificări

<a href="https://mnotify.gov.md/">MNotify</a> este platforma de notificări electronice care permite instituțiilor publice să trimită notificări oficiale cetățenilor și mediului de afaceri prin mai multe canale, precum email, SMS, aplicații mobile sau portalul MCabinet.

Notificările trimise prin MNotify țin cetățenii informați cu privire la amenzi, plăți, termene limită, indemnizații și alte obligații sau drepturi. Sistemul îmbunătățește comunicarea dintre guvern și cetățeni, asigurând transparență și eficiență.

MNotify poate trimite atât notificări automate, cât și manuale, oferind flexibilitate instituțiilor și confort destinatarilor.

---

## <img src="../assets/logos/mdelivery-logo.png" alt="mdelivery logo" width="30" align="left" style="margin: 5px 10px 0 0;"/> **mdelivery** – serviciul de livrare a documentelor

<a href="https://mdelivery.gov.md/">MDelivery</a> este serviciul guvernamental care asigură livrarea documentelor oficiale direct cetățenilor, la domiciliu sau la locul de muncă, fără a fi necesară deplasarea la instituțiile publice.

Lansat în iulie 2022, MDelivery permite cetățenilor să primească documente precum cazierul judiciar, certificatele de stare civilă sau documentele apostilate, prin intermediul furnizorilor de servicii poștale integrați.

Platforma reduce costurile administrative, crește accesibilitatea și oferă o modalitate modernă pentru guvern de a livra documente oficiale, atât în interiorul, cât și în afara Moldovei.

---

## <img src="../assets/logos/mlog-logo.png" alt="mlog logo" width="30" align="left" style="margin: 5px 10px 0 0;"/> **mlog** – serviciul de jurnalizare

[MLog](../guides/mlog) este serviciul centralizat de jurnalizare pentru sistemele informaționale din sectorul public, asigurând transparență, trasabilitate și responsabilitate. Platforma înregistrează date esențiale despre acțiunile utilizatorilor, inclusiv identificatori, marcaje temporale, resurse accesate și rezultatele operațiunilor.

Serviciul este obligatoriu pentru toate sistemele care procesează date cu caracter personal și informații guvernamentale critice, conform Hotărârii de Guvern nr. 708/2014.

MLog oferă autorităților instrumentele necesare pentru auditarea activității, detectarea anomaliilor și prevenirea accesului neautorizat sau a utilizării abuzive a sistemelor informaționale.

---

## <img src="../assets/logos/mdocs-logo.png" alt="mdocs logo" width="30" align="left" style="margin: 5px 10px 0 0;"/> **mdocs** – platforma de gestionare a documentelor

[MDocs](../guides/mdocs) este platforma guvernamentală pentru stocarea și schimbul de documente în format digital. Aceasta permite instituțiilor publice să încarce, să partajeze și să acceseze documente în mod securizat, în timp ce cetățenii își pot prelua documentele direct prin MCabinet.

Platforma reduce consumul de hârtie, simplifică procesele administrative și asigură conformitatea cu standardele de transparență și securitate.

MDocs este o componentă esențială a ecosistemului guvernării digitale a Moldovei, contribuind la eficiența administrației publice și la confortul interacțiunilor dintre cetățeni, mediul de afaceri și stat.
