Schimbul de date în orice guvern este un demers complex, care implică eforturi la mai multe niveluri, inclusiv juridic, semantic, organizațional și tehnic. În Moldova, nivelul tehnic al schimbului de date este asigurat de MConnect – o platformă națională de schimb de date. Există numeroase modele consacrate pentru implementarea diverselor scenarii de schimb de date, inclusiv mesageria clasică de tip cerere/răspuns, distribuția de evenimente, distribuția de documente voluminoase și fluxurile de date (data streaming).

## Pe scurt

**Ce este.** Componenta platformei MConnect dedicată schimbului de date bazat pe evenimente. În loc ca un sistem să interogheze sursa cu întrebarea „s-a schimbat ceva?", sursa publică un eveniment atunci când survine schimbarea, iar sistemele autorizate îl primesc aproape în timp real. Aceasta reduce cuplarea dintre sisteme: producătorul nu trebuie să știe cine consumă, iar consumatorul poate prelua evenimentele în ritmul propriu.

MConnect Events nu are un act normativ separat: este reglementat ca o componentă a platformei MConnect.

**Temei normativ.** HG nr. 211/2019 privind platforma de interoperabilitate (MConnect) — aplicabilă ca parte componentă — pct. 3 — desemnarea posesorului și deținătorului platformei MConnect.

Acte conexe: Legea nr. 142/2018 cu privire la schimbul de date și interoperabilitate.

**Cine răspunde.**

| Rol | Entitate |
|---|---|
| Posesor | AGE (prin MConnect) |
| Deținător | AGE (prin MConnect) |
| Operator tehnico-tehnologic |  |

**Roluri în integrare.**

- AGE — posesor/deținător al platformei; încheie acordul de integrare și înregistrează sistemul integrat.
- STISC — emite certificatul de sistem necesar conectării în staging și producție; operează infrastructura de găzduire.
- Posesorul sistemului integrat — decide scopul și temeiul legal al utilizării, drepturile de acces și răspunde de conformitate.
- Echipa de dezvoltare/integrare — implementează și testează integrarea tehnică.
- Utilizatorul final — persoana fizică sau unitatea de drept care beneficiază de serviciu.

**Condiții de acces.**

Aceleași condiții ca MConnect. Obligatoriu: certificat de client X.509 v3, autorizare distinctă ca producător și/sau consumator, pe fiecare tip de eveniment.

**Cui se adresează acest ghid.**

Principal: echipele de dezvoltare și integrare ale posesorilor de sisteme informaționale, publice și private.
Secundar: managerii de proiect și responsabilii de conformitate care pregătesc acordul cu AGE și certificatul STISC.

Ca parte a platformei MConnect, MConnect Events este componenta concepută special pentru producerea și consumarea eficientă a evenimentelor. Aceasta include autentificarea și autorizarea clienților ca producători și consumatori, producerea și consumarea scalabilă a evenimentelor, validarea structurii evenimentelor la producere, stocarea scalabilă și flexibilă a evenimentelor în așteptarea consumării, disponibilitatea imediată a evenimentelor pentru consumatori, confirmarea consumării evenimentelor pentru a asigura livrarea fiabilă a acestora, precum și instrumente interne de configurare, monitorizare și depanare.

<picture class="theme-picture">
  <img src="../../assets/images/mconnect_events/mconnect.png" alt="Fluxul de semnare" data-theme="light">
</picture>

MConnect Events permite sistemelor să facă schimb de date despre diverse evenimente în timp real, precum și într-o manieră deconectată. Evenimentele curg de la producători către MConnect Events, apoi către consumatori, în ritmul suportat de aceștia, ori de câte ori sunt disponibili. Acest lucru reduce cuplarea dintre producători și consumatori, diminuând cerințele de disponibilitate și performanță ale acestora.

Acest document descrie interfețele tehnice expuse de MConnect Events pentru sistemele informaționale client, care le permit acestora să producă și să consume evenimente. Publicul-țintă îl reprezintă echipele de dezvoltare ale acestor sisteme informaționale.

Documentul conține informațiile relevante necesare pentru o înțelegere completă a MConnect Events din punctul de vedere al integrării. Acesta conține detalii tehnice legate de integrare, considerații de securitate, precum și descrierea testării integrării.

Deși documentul este conceput să fie agnostic din punct de vedere tehnologic, acesta documentează și librăria de integrare construită pentru .NET, pentru a simplifica și accelera integrările cu clienți .NET.

## Domeniul de aplicare și publicul-țintă
Acest document descrie interfețele tehnice expuse de MConnect Events pentru sistemele informaționale client care îl utilizează pentru a produce și consuma evenimente. Publicul-țintă îl reprezintă echipele de dezvoltare ale acestor sisteme informaționale.

## Glosar de termeni

Pentru glosarul complet, vizitați [pagina Glosar](https://egov-moldova.github.io/egov4dev/glossary/glossary/).

## Capabilități generale ale sistemului

MConnect Events este un serviciu la nivel de platformă, o componentă a MConnect, Platforma Națională de Interoperabilitate, care permite sistemelor informaționale să producă și să consume eficient evenimente, aproape în timp real.

Testele noastre de performanță au arătat un debit constant de 10.000 de evenimente/secundă, implicând mai mulți producători și consumatori în paralel. Puteți produce și consuma evenimente din mai multe instanțe ale aplicației voastre, folosind același certificat de client. În plus, un consumator poate consuma în mod repetat evenimentele disponibile, specificând un grup de consumatori diferit (în loc să folosească cel implicit).

MConnect Events autorizează producătorii și direcționează evenimentele în funcție de fiecare tip de eveniment. Este posibil să se autorizeze mai mulți producători să producă evenimente de același tip și să se configureze rutarea astfel încât mai mulți consumatori să poată consuma evenimente de același tip. Autorizarea producătorilor include, de asemenea, validarea structurii fiecărui eveniment folosind schema JSON definită pentru fiecare tip de eveniment.

Producătorii pot produce un singur eveniment sau un lot de evenimente. Este important de menționat că, dacă un eveniment este greșit, de exemplu are un tip de eveniment neautorizat pentru acest producător sau o structură invalidă conform schemei configurate, întregul lot este respins.

În cazurile care necesită o consumare ordonată a evenimentelor legate de o anumită entitate din lumea reală (precum o persoană, o tranzacție etc.), producătorii trebuie să specifice o cheie de partiționare, conform extensiei de partiționare CloudEvents.

Implicit, MConnect Events stochează evenimentele produse pentru până la 5 zile (120 de ore), permițând consumatorilor să le consume oricând sunt disponibili. Pentru a asigura o disponibilitate ridicată, evenimentele sunt stocate în 3 replici. Aceste setări pot fi modificate la cerere, atunci când este rezonabil.

Pentru a simplifica testarea integrării consumatorilor, API-ul permite consumatorilor să producă evenimente de test pentru propriul consum.

Consumatorii pot raporta înapoi evenimentele pe care nu le pot consuma (de obicei din cauza structurii greșite) ca evenimente eșuate (dead). Acestea sunt stocate într-un spațiu special de stocare a evenimentelor eșuate pentru consumator și ar putea necesita o intervenție manuală ulterioară.

## Dependențe ale serviciului
MConnect Events este implementat într-o infrastructură de înaltă disponibilitate și depinde doar de disponibilitatea API-ului MPass pentru gestionarea clienților. API-ul MPass are, de asemenea, o disponibilitate ridicată, însă MConnect Events pune în cache setările clienților pentru până la 30 de minute. Acest lucru asigură performanță ridicată la deschiderea conexiunilor, cu excepția celor inițiale, reducând astfel această dependență.

De asemenea, este important de menționat că, din motive de implementare tehnică, este normal ca consumatorii să înceapă să consume evenimente cu o mică întârziere (câteva secunde) după deschiderea conexiunii de consumator.

## Protocoale și standarde

MConnect Events își expune API-urile prin HTTPS, suportând HTTP 1.1 și 2. Endpointul HTTPS folosește TLS 1.2 și versiuni superioare și necesită autentificare prin certificate client (codificate în format X.509 v3).

Clienții MConnect Events folosesc [CloudEvents v1](https://cloudevents.io) pentru a produce și consuma evenimente, utilizând JSON Event Format și HTTP Protocol Binding. Ori de câte ori este necesar, producătorii pot specifica o cheie de partiționare, conform [extensiei de partiționare CloudEvents](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/partitioning.md), în timp ce consumatorii trebuie să folosească WebSocket Protocol Binding pentru o consumare eficientă a evenimentelor.

Endpointurile pentru producători și pentru consumatorii prin long-polling sunt descrise în format [OpenAPI 3.0](https://www.openapis.org/). Totuși, pentru consumatori eficienți, recomandarea este să folosească endpointul WebSocket, accesibil prin [mecanismul standard de upgrade al protocolului HTTP 1.1](https://http.dev/protocol-upgrade), sau prin metoda standard HTTP 2 CONNECT ([vezi secțiunea 8.3 din RFC 7540](https://httpwg.org/specs/rfc7540.html)).

La validarea evenimentelor în timpul producerii, în raport cu schema configurată, versiunile JSON Schema suportate sunt Draft 6, Draft 7, Draft 2019-09 și [Draft 2020-12](https://json-schema.org/specification). Versiunea este identificată pe baza cuvintelor-cheie folosite în schemă.

## Limite

Conform standardului CloudEvents, se recomandă ca evenimentele publicate să nu depășească [**64 KB**](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#size-limits). Aceasta nu doar asigură faptul că orice intermediar va transmite mai departe evenimentele, dar face și transmiterea acestora eficientă și permite o distribuție mai largă a lor, subliniind totodată sensul de bază al evenimentelor (adică mesaje care informează despre ceva ce s-a întâmplat și nu un mijloc de transport pentru orice tip de date). Producătorii CloudEvents AR TREBUI să păstreze evenimentele compacte, evitând includerea unor elemente de date voluminoase în payload-ul evenimentului și folosind în schimb payload-ul evenimentului pentru a face trimitere (link) către astfel de elemente de date.

Toate cererile HTTP trimise către MConnect Events pot avea până la **1 MB**. Aceasta înseamnă că orice mesaj HTTP trimis de producător, fie un lot de evenimente, fie un singur eveniment, nu trebuie să depășească 1 MB.

Implicit, MConnect Events păstrează evenimentele neconsumate până la **5 zile (120 de ore)**. Aceasta înseamnă că, dacă un consumator este inactiv pe această durată, ar putea pierde evenimente.

Implicit, consumatorii MConnect Events dintr-un grup pot fi scalați eficient în **divizori ai lui 12**, de exemplu 1, 2, 3, 4, 6 sau 12 consumatori.

Dacă niciuna dintre aceste limite nu acoperă scenariile voastre practice, puteți solicita ajustarea lor, cu o **justificare corespunzătoare**.
