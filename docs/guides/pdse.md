# Ce este PDSE

Pentru dezvoltari pe PDSE (Platforma de Digitalizare a Serviciilor Electronice) sunt necesare două tipuri de librării publicate de AGE pe NuGet:

- **Librării de integrare** — pentru conectarea tehnică cu serviciile guvernamentale din suita M (MPass, MSign, MNotify, MDocs, etc.)
- **Librarii de componente UI** — pentru construirea interfețelor și fluxurilor de servicii publice, aliniate la Modelul Unitar de Design (MUD);

# Etapele de utilizare

Înainte de a începe dezvoltarea, instituția identifică:

- componentele de flux necesare (interpelare date din diverse registre de stat, necesitatea plății, livrării, semnării etc.);
- serviciile guvernamentale cu care este necesară integrarea (suita M, MConnect etc.).

Această etapă orientează selecția componentelor PDSE și determină ce acorduri și certificate vor fi necesare pe parcursul dezvoltării.

## 1. Înregistrarea intenției de dezvoltare**

Înainte de a începe dezvoltarea, instituția înregistrează sistemul informațional în Registrul Sistemelor Informaționale (RSI) și parcurge etapele administrative aferente (argumentare, bugetare, aprobare, achiziție, dezvoltare, ...). Procedura de față devine relevantă doar la etapa de dezvoltare.

## 2. Consultarea componentelor disponibile**

Toate librariile de pe NuGet sunt accesibile public, fără drepturi speciale sau acord prealabil. Aceste librării includ:

- componente pentru interfață (butoane, formulare, tabele, alerte, câmpuri de date, ș.a.) – `Egov.FOD.UIComponents`
- componente pentru fluxuri (interpelare date personale, livrare la domiciliu, plată prin Mpay, apostilare, ș.a.) – `Egov.FOD.ServiceComponents`;
- librării pentru configurarea ușoară a serviciilor M (autentificare, semnare, jurnalizare ș.a.)

Documentația tehnică și ghidurile de utilizare sunt disponibile pe [Nuget](https://www.nuget.org/profiles/egov-moldova).

> **Important:** Înainte de a trece la integrare, instituția identifică componentele de flux necesare (interpelare date, plată, livrare, semnare etc.) și serviciile guvernamentale cu care sistemul urmează să se integreze (suita M, MConnect etc.).

## 3. Integrarea componentelor în soluție**

Echipa de dezvoltare selectează pachetele necesare, verifică versiunea și cerințele tehnice și le integrează în soluție. Componentele pentru interfață și flux pot fi utilizate și testate local fără nicio procedură suplimentară.

> **Important:** Librariile de integrare cu serviciile M pot fi integrate în cod, însă conexiunea efectivă cu mediile de staging sau producție necesită un certificat client, obținut separat de la STISC (vezi pasul 4).

## 4. Obținerea certificatului client (pentru integrările cu serviciile M)**

Dacă sistemul dezvoltat se integrează cu unul sau mai multe servicii din suita M, instituția beneficiară solicită un certificat client de la STISC printr-o cerere separată. Fără acest certificat, integrările nu pot fi finalizate în mediile de staging sau producție.

## 5. Încheierea acordului cu AGE**

Instituția încheie cu AGE:

- un **acord unic** pentru utilizarea serviciilor din suita M (MPass, MSign, MNotify, MDocs, MPay etc.);
- un **acord separat** pentru MConnect, dacă este cazul.

Acordul se inițiază prin completarea formularului AGE destinat integrărilor, disponibil pe [egov4dev].

## 6. Testare și lansare în producție**

După finalizarea dezvoltării și obținerea certificatului client, instituția testează soluția în mediul de staging, apoi lansează în producție. Înainte de lansare, instituția completează formularul de notificare privind utilizarea componentelor FOD (denumirea instituției, denumirea sistemului, componentele și versiunile utilizate, persoana de contact tehnică).

## 7. Actualizări**

AGE publică versiuni noi ale componentelor pe NuGet. Developerul monitorizează pachetele utilizate direct pe NuGet, unde sunt vizibile versiunile noi și modificările aferente (release notes). Nu există notificări automate din partea AGE.