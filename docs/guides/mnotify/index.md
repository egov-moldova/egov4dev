MNotify este un serviciu guvernamental de notificări electronice, conceput pentru a transmite notificări către destinatari prin diferite canale de notificare, pentru a informa despre evenimente legate de serviciile publice sau alte comunicări relevante.

În prezent, MNotify suportă ca și canale de livrare: e-mail, notificări push EVO (până la finele anului 2026), Viber, Telegram și MCabinet. Proprietatea IDNP este obligatorie la specificarea identității destinatarului notificării.

## Pe scurt

**Ce este.** Serviciul guvernamental de notificări: instituțiile îl utilizează pentru a transmite comunicări oficiale persoanelor fizice și juridice prin canalele active ale destinatarului (e-mail, web push, Viber, Telegram, cabinet personal). Sistemul integrator transmite o singură cerere, identificând destinatarul prin IDNP sau alt identificator acceptat; selectarea canalului și livrarea efectivă sunt gestionate de MNotify. Serviciul oferă de asemenea gestionarea contactelor, gestionarea șabloanelor și acces la istoricul notificărilor transmise.

**Temei normativ.** HG nr. 376/2020 cu privire la serviciul guvernamental de notificări electronice (MNotify) — pct. 3 — desemnarea posesorului și deținătorului.

Acte conexe: Legea nr. 133/2011 privind protecția datelor cu caracter personal; HG nr. 1090/2013 (MPass).

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

Gratuit. Obligatoriu: înregistrarea sistemului în MPass și certificat de client validat prin MPass.

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

Suplimentar, MNotify oferă următoarele funcționalități extinse:

* **Gestionarea contactelor** – Sistemul oferă instrumente pentru adăugarea de contacte noi de utilizatori și listarea celor existente. De asemenea, permite setarea unei limbi preferate pentru utilizator. Mai mult, MNotify poate verifica dacă un utilizator există în sistem și dacă acesta are cel puțin un canal activ, exceptând cabinetul personal.

* **Acces la istoricul notificărilor** – MNotify oferă instrumente pentru extragerea listei de notificări transmise de sistemul informațional al expeditorului. De asemenea, permite extragerea listei de notificări livrate unui anumit utilizator, în baza IDNP-ului acestuia.

* **Gestionarea șabloanelor (operațiuni CRUD)** – Sistemul suportă operațiuni de creare, citire, actualizare și ștergere pentru șabloanele de notificări. Aceasta reduce complexitatea de partea sistemului integrat și asigură o latență mai mică la trimiterea cererilor de notificare. Șabloanele suportă atribute care permit inserarea de valori dinamice în funcție de utilizatorul destinatar.

## Domeniu de aplicare și public țintă

Acest document descrie interfețele tehnice expuse de MNotify pentru sistemele informaționale ale Expeditorilor care vor utiliza MNotify în scopuri de notificare.

Acest ghid se adresează dezvoltatorilor interesați în integrarea diverselor sisteme cu API-ul MNotify pentru trimiterea notificărilor prin (e-mail, SMS, web push, Telegram, portalul cetățeanului, etc.) utilizând serviciul guvernamental de notificări electronice.

Acest document conține informațiile relevante necesare pentru o înțelegere completă a MNotify din perspectiva integrării. Include exemple de scenarii de integrare pentru diferite tehnologii.

## Dependențe de servicii

MNotify depinde de următoarele servicii:
- MPass – pentru autorizarea clientului.
- IDR – pentru identificarea destinatarului.
- Canalele de notificare – pentru transmiterea mesajelor către destinatari.

## Protocoale și standarde

MNotify expune un serviciu RESTful peste HTTPS, asigurând o comunicare securizată și bazată pe standarde. Fiecare cerere HTTP trebuie să includă un certificat client valid pentru autentificare și autorizare.

Validarea certificatului client se realizează prin intermediul serviciului guvernamental de autentificare și autorizare MPass. Este obligatoriu ca sistemul informațional să fie înregistrat în MPass și ca cheia publică a certificatului client să fie adăugată în configurația acestuia.

Raportarea erorilor se realizează prin coduri de stare HTTP standard (de ex., 400 Bad Request, 401 Unauthorized, 500 Internal Server Error), împreună cu mesaje de eroare structurate în format JSON, care oferă detalii suplimentare de diagnosticare.

## Format de comunicare

MNotify utilizează un format JSON generic pentru specificarea identităților de notificare, adică a destinatarilor.

```json
"recipients": [
 {
 "value": "2222222222222",
 "type": "Idnp"
 }
 ]
```

```json
"recipients": [
 {
 "value": "artur.reaboi@egov.md",
 "type": "email"
 }
 ]
```
