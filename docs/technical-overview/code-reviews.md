Revizuirea codului este locul unde calitatea, securitatea și cunoștințele partajate chiar au loc. Fiecare modificare a unui sistem din ecosistemul eGov Moldova ajunge într-o ramură (branch) protejată doar printr-un pull request care a fost revizuit — nu există excepții pentru vechime, urgență sau echipă.

* * *

## Modelul de ramificare (branching)

Dezvoltarea urmează un flux de promovare pe trei ramuri:

```
feature/* ──PR──▶ dev ──PR──▶ staging ──PR──▶ main
                  │             │               │
                  ▼             ▼               ▼
             auto-deploy    regression,     production
             + functional   UAT, E2E        deploy
             QA
```

- Toată dezvoltarea are loc pe **ramuri de tip feature, create din `dev`** — niciodată direct pe `dev`, `staging` sau `main`.
- Codul avansează doar prin pull request-uri: feature → `dev` (implementat automat pentru QA funcțional), `dev` → `staging` (testare de regresie, UAT, end-to-end), `staging` → `main` (implementare în producție).
- **Hotfix-urile** pornesc din `main`, trec printr-un PR accelerat către `staging` pentru un test rapid (smoke test), apoi către `main` pentru implementare urgentă. Un defect critic de producție este anunțat mai întâi managerului de livrare — nu remediat printr-un PR direct către `main`.
- După fiecare lansare, `main` este sincronizat înapoi în `staging`, iar `staging` în `dev`, astfel încât mediile să nu diverge niciodată.

## Cerințe pentru pull request

Un pull request este pregătit pentru revizuire atunci când:

- Face referire la **elementul de lucru** (`#ID`) și descrie ce s-a modificat și de ce.
- Este **mic și focalizat** — o singură modificare logică. PR-urile mari și amestecate primesc revizuiri mai lente și mai superficiale.
- **Pipeline-ul CI trece**: build (avertismentele tratate ca erori), teste unitare și de integrare, analiză statică, scanarea dependențelor și a secretelor. Eșecurile scanării de securitate sunt blocante — se remediază, nu se face merge peste ele.
- Nu conține **niciun fel de credențiale, chei sau date personale reale** — nici în cod, nici în configurare, nici în fixture-urile de test.

Efectuarea merge-ului necesită minimum **două aprobări: un coleg (peer) și un tech lead sau QA**. Commit-urile directe pe ramurile protejate sunt dezactivate.

* * *

## Cultura de revizuire

Revizuirile își pierd valoarea dacă oamenii încetează să comenteze — sau încetează să prezinte lucrări oneste — pentru că simt comentariile ca pe niște atacuri. Eticheta este simplă: **criticați codul, nu autorul**, păstrați comentariile concise și neutre, și cereți clarificări în loc să presupuneți lipsă de cunoștințe.

Deoarece multe echipe și furnizori contribuie la ecosistem, evaluatorii (reviewers) folosesc un vocabular comun de comentarii, astfel încât intenția să nu fie niciodată ambiguă:

- **`Consider:`** — o sugestie sau o cunoștință partajată; autorul o poate adopta sau nu, fără a bloca aprobarea.
- **`Should:`** — codul trebuie să se schimbe: are un bug, este nesigur, are efecte secundare periculoase sau un cost de performanță semnificativ. Un comentariu `Should:` trebuie susținut de un argument concret; dacă nu puteți explica *de ce*, este cel mult un `Consider:`.

## Ce verifică evaluatorii (reviewers)

1. **Corectitudine** — modificarea face ceea ce cere elementul de lucru, inclusiv cazurile limită și căile de eroare?
2. **Securitate** — validarea datelor de intrare, autorizare la fiecare accesare a resurselor, fără secrete, fără suprafață de injecție, fără date personale în jurnale sau URL-uri. Vedeți [Standarde de cod](code-standards.md).
3. **Teste** — logica nouă vine cu teste unitare; comportamentul modificat vine cu teste actualizate; pragurile de acoperire (coverage gates) trec.
4. **Conformitate cu standardele** — [standarde de cod](code-standards.md), [proiectarea API-urilor](api-design-guide.md) pentru modificări de contract, [regulile de jurnalizare](log-management.md) pentru orice atinge evenimente de business.
5. **Mentenabilitate** — va înțelege următoarea echipă acest cod? Denumire, structură, absența codului mort și a blocurilor comentate.
6. **Impactul asupra contractului** — pentru modificări de API: este compatibil retroactiv, sau necesită o creștere de versiune și notificarea consumatorilor?

* * *

## Definiția lui „Gata de început” / Definiția lui „Finalizat”

Revizuirea se încadrează într-un flux de livrare mai amplu, cu praguri explicite:

| Etapă | Condiție |
| --- | --- |
| Gata (poate intra într-un sprint) | Povestea (story) are criterii de acceptanță, o estimare și dependențele clarificate |
| Rezolvat (dezvoltare finalizată) | Cod implementat, revizuire trecută, testat local, implementat pe DEV, fără vulnerabilități critice |
| Gata de implementare | Testele QA (funcționale, de regresie, E2E) au trecut pe staging, UAT aprobat |
| Închis | Implementarea în producție confirmată și verificările post-implementare trecute |

Ambiguitatea în cerințe sau criterii de acceptanță este escaladată către product owner sau analist — nu rezolvată prin implementarea unei presupuneri.

## Echipe de furnizori externi

Echipele furnizorilor urmează același flux, cu obligații suplimentare:

- Codul sursă este stocat **integral în repository-urile Agenției**, încă din prima zi — livrarea prin arhive, repository-uri private sau medii găzduite de furnizor nu este acceptată.
- Furnizorii implementează în mediile de dezvoltare; implementările în staging și producție necesită aprobare din partea rolurilor de livrare și de securitate.
- Înainte de lansare, la finalul unui epic major, sau atunci când echipa furnizorului se schimbă, o **tranziție de cunoștințe** este obligatorie: documentația de arhitectură actualizată, contractele API și schemele bazei de date, problemele și riscurile cunoscute, notele de implementare și o sesiune tehnică de predare live, cu echipele de dezvoltare, QA și DevOps ale Agenției.
