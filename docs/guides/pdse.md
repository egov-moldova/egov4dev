# Ce este PDSE

PDSE (Platforma de Digitalizare a Serviciilor Electronice) este un cadru de dezvoltare (framework) care oferă **componente reutilizabile** și librării de integrare pentru proiectarea și dezvoltarea rapidă a serviciilor publice digitale.

## Pe scurt

**Ce este.** Cadrul comun de dezvoltare pe care instituțiile își construiesc serviciile publice electronice: componente reutilizabile de interfață aliniate la Modelul Unitar de Design, componente de flux (interpelarea datelor, plată, semnare, livrare, apostilare) și librării de integrare cu serviciile din suita M, publicate de AGE pe NuGet.
Delimitare de reținut: posesorul platformei este AGE, iar posesorul serviciului dezvoltat pe platformă rămâne instituția beneficiară. Utilizarea componentelor nu transferă către AGE responsabilitatea pentru serviciul rezultat.

**Temei normativ.** HG nr. 717/2014 cu privire la platforma de dezvoltare a serviciilor electronice (PDSE) — pct. 3 — desemnarea posesorului.

Acte conexe: HG nr. 677/2025 (Modelul Unitar de Design); HG nr. 153/2021 (RRSIS — înregistrarea sistemului informațional); HG nr. 544/2019 și Metodologia de coordonare a achizițiilor TIC.

**Cine răspunde.**

| Rol | Entitate |
|---|---|
| Posesor | AGE (pentru platformă). Pentru serviciul dezvoltat pe platformă — instituția beneficiară, în calitate de posesor. |
| Deținător |  |
| Operator tehnico-tehnologic | STISC (administrator tehnic al MCloud) |

**Roluri în integrare.**

- AGE — posesor/deținător al platformei; încheie acordul de integrare și înregistrează sistemul integrat.
- STISC — emite certificatul de sistem necesar conectării în staging și producție; operează infrastructura de găzduire.
- Posesorul sistemului integrat — decide scopul și temeiul legal al utilizării, drepturile de acces și răspunde de conformitate.
- Echipa de dezvoltare/integrare — implementează și testează integrarea tehnică.
- Utilizatorul final — persoana fizică sau unitatea de drept care beneficiază de serviciu.

**Condiții de acces.**

Componentele și documentația sunt publice pe NuGet, fără aprobare prealabilă. Conectarea la mediile de staging și producție necesită certificat client emis de STISC (distinct pe fiecare mediu) și acord cu AGE pentru suita M, respectiv acord separat pentru MConnect și MPay.

**Cui se adresează acest ghid.**

Principal: echipele de dezvoltare și integrare ale posesorilor de sisteme informaționale, publice și private.
Secundar: managerii de proiect și responsabilii de conformitate care pregătesc acordul cu AGE și certificatul STISC.

Pentru dezvoltarea unui sistem informațional pe PDSE sunt disponibile două categorii de librării publicate de AGE pe NuGet:

- **Librării de integrare** — utilizate pentru conectarea cu serviciile guvernamentale din suita M (MPass, MSign, MNotify, MDocs, MDelivery și altele)
- **Librarii de componente UI** — utilizate pentru construirea interfețelor și a fluxurilor de servicii publice digitale, aliniate la Modelul Unitar de Design (MUD)

Pentru utilizarea componentelor reutilizabile se vor parcurge urmatoarele etape:

## 1. Analiza necesităților

Înainte de începerea dezvoltării, instituția trebuie să identifice:

- fluxurile necesare în cadrul serviciului (interpelarea datelor din registre de stat, efectuarea plăților, semnarea documentelor, livrarea rezultatelor, etc.);
- serviciile guvernamentale cu care este necesară integrarea (suita M, MConnect, MPay, etc.).

Această analiză ajută la selectarea componentelor PDSE și determinarea acordurilor și certificatelor necesare pentru implementare.

## 2. Înregistrarea intenției de dezvoltare

În cazul instituțiilor publice, sistemul informațional care urmează a fi dezvoltat trebuie să fie înregistrat în Registrul resurselor și sistemelor informaționale ([RSI](https://rsi.gov.md/procedure)). Instituția parcurge etapele aferente, precum planificarea, bugetarea, aprobarea, achiziția și dezvoltarea. Înregistrarea se va face conform procedurii aplicabile.

## 3. Consultarea componentelor disponibile

Componentele și documentația tehnică sunt disponibile public pe [NuGet](https://www.nuget.org/profiles/egov-moldova) și nu necesită aprobări speciale pentru acces sau acord scris. Aceste librării includ:

- componente de interfață: butoane, formulare, tabele, alerte, câmpuri de date, ș.a. (`Egov.FOD.UIComponents`);
- componente pentru fluxuri: interpelarea datelor, plată, livrare, apostilare, etc. (`Egov.FOD.ServiceComponents`);
- librării pentru integrarea serviciilor AGE, precum MPass, MSign, MPower și altele.

Pentru acces la fișierele de design aferente componentelor de interfață din Figma, instituția trebuie să completeze formularul de solicitare, indicând denumirea instituției, sistemul informațional și persoana de contact tehnică.

## 4. Integrarea componentelor

Echipa de dezvoltare selectează și integrează pachetele necesare în sistemul dezvoltat, verificând versiunea și cerințele tehnice. Componentele de interfață și flux pot fi utilizate și testate local fără nicio formalitate suplimentară.

> **Important:** Librăriile pentru integrarea cu serviciile din suita M pot fi incluse în cod, însă conectarea efectivă la mediile de testare (staging) și producție necesită un certificat client emis de STISC (vezi pasul 5).

## 5. Obținerea certificatului client

Dacă sistemul dezvoltat se integrează cu unul sau mai multe servicii din suita M, instituția trebuie să solicite de la STISC un certificat client. Fără acest certificat, integrarea nu poate fi realizată în mediile de testare (staging) sau de producție.

> **Important:** Mediile de testare și producție vor fi configurate cu certificate client distincte. Pentru mediul de producție, va fi solicitat de la STISC un certificat dedicat, separat de cel utilizat în mediul de testare.

## 6. Încheierea acordurilor cu AGE

Înainte de utilizarea serviciilor guvernamentale, instituția încheie cu AGE:

- un **acord** pentru utilizarea serviciilor din suita M (MPass, MSign, MNotify, MDocs, MDelivery etc.);
- un **acord separat** pentru MConnect și MPay, dacă integrarea cu aceste servicii este necesară.

Procedura de semnare a acordului se inițiază prin completarea [formularului de solicitare a integrărilor](https://forms.cloud.microsoft/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u&route=shorturl) pus la dispoziție de AGE.

## 7. Testare și lansare în producție

După finalizarea dezvoltării, instituția testează sistemul dezvoltat în mediul de staging. În urma validării și acceptanței din partea AGE, sistemul poate fi lansat în producție. Pentru lansare în mediul de producție se utilizează certificatul client dedicat acestui mediu, obținut de la STISC în prealabil.

## 8. Actualizări și mentenanță

AGE publică periodic versiuni noi ale librăriilor pe NuGet. Echipa de dezvoltare a instituției trebuie să monitorizeze pachetele utilizate și să consulte informațiile despre modificări (release notes) și necesitatea de aplicare a acestora direct pe NuGet. În prezent, AGE nu transmite notificări automate privind apariția noilor versiuni.