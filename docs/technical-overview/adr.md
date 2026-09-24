O **înregistrare a deciziei de arhitectură (architecture decision record, ADR)** surprinde o singură decizie semnificativă din punct de vedere arhitectural: contextul acesteia, opțiunile luate în considerare, ce s-a decis și ce consecințe au fost acceptate. Standardele spun *ce* trebuie să fie adevărat; ghidurile de operare (runbooks) spun *cum* se operează; ADR-urile păstrează *de ce* sistemul este așa cum este.

Sistemele guvernamentale supraviețuiesc echipelor care le construiesc. Fără ADR-uri, raționamentul din spatele fiecărei decizii importante pleacă odată cu oamenii — iar echipele viitoare fie copiază mecanic decizii care nu mai au sens, fie inversează accidental decizii care există dintr-un motiv legal sau de securitate.

* * *

## Când este necesar un ADR

Scrieți un ADR pentru deciziile care sunt costisitoare de inversat sau pe care viitorii responsabili de mentenanță le vor pune sub semnul întrebării:

- **Orice abatere de la stiva tehnologică aprobată** — un nou framework, limbaj, bază de date sau o dependență semnificativă. Abaterea nu este aprobată până când nu există ADR-ul.
- Alegerea motorului de bază de date, a tiparului de mesagerie sau a modului de randare Blazor pentru un sistem nou.
- Modul în care sistemul se integrează cu platformele partajate, atunci când este posibil mai mult de un tipar (de exemplu, interogări sincrone MConnect vs. abonamente MConnect Events).
- Excepții de la stilul API ([REST este implicit](api-design-guide.md)) și strategii pentru modificări incompatibile (breaking changes).
- Orice situație în care echipa a petrecut zile întregi evaluând opțiuni — dacă analiza a meritat zile de muncă, merită și o pagină.

Deciziile de implementare curente, care respectă standardele existente, nu necesită ADR-uri. În caz de îndoială, întrebați-vă: *„va vrea cineva peste trei ani să știe de ce am făcut asta?”*

## Unde locuiesc ADR-urile

ADR-urile fac parte din repository-ul pe care îl descriu, în `/docs/adr/`, numerotate secvențial:

```
docs/adr/
  0001-use-postgresql-for-registry-storage.md
  0002-integrate-payments-via-mpay-not-direct-psp.md
  0003-blazor-wasm-rendering-for-citizen-portal.md
```

- Numerele nu se reutilizează niciodată; o decizie retrasă își păstrează numărul și primește o schimbare de status, în loc să fie ștearsă.
- ADR-urile sunt revizuite prin același [flux de pull request](code-reviews.md) ca și codul — revizuirea ADR-ului *este* revizuirea de arhitectură, cu discuția păstrată în PR.
- Un ADR este **imuabil odată acceptat**: dacă decizia se schimbă, se scrie un ADR nou care îl înlocuiește pe cel vechi, iar cele două se leagă reciproc.

## Ciclul de viață

| Status | Semnificație |
| --- | --- |
| Propus (Proposed) | În discuție; încă nu este obligatoriu |
| Acceptat (Accepted) | Decizie luată; înregistrarea devine permanentă |
| Depreciat (Deprecated) | Nu mai este relevant (componenta sau contextul au dispărut) |
| Înlocuit de ADR-NNNN (Superseded by) | Înlocuit de o decizie mai nouă |

* * *

## Șablon (Template)

Șablonul urmează [MADR](https://adr.github.io/madr/) (Markdown Architectural Decision Records). Secțiunile opționale pot fi eliminate; minimul necesar este contextul, opțiunile și rezultatul.

```markdown
# NNNN — Short title stating the decision

* Status: proposed | accepted | deprecated | superseded by [ADR-NNNN](NNNN-example.md)
* Deciders: everyone involved in the decision
* Date: YYYY-MM-DD

Technical story: work item / ticket URL <!-- optional -->

## Context and problem statement

Describe the context and the problem in two or three sentences.
Articulating it as a question often helps.

## Decision drivers <!-- optional -->

* driver 1 — e.g., a constraint, regulation, or quality attribute
* driver 2

## Considered options

* Option 1
* Option 2
* Option 3

## Decision outcome

Chosen option: "Option 1", because — justification referencing the
decision drivers.

### Positive consequences <!-- optional -->

* …

### Negative consequences <!-- optional -->

* accepted trade-offs, follow-up decisions now required

## Pros and cons of the options <!-- optional -->

### Option 1

* Good, because …
* Bad, because …

### Option 2

* Good, because …
* Bad, because …

## Links <!-- optional -->

* Refined by / supersedes [ADR-NNNN](NNNN-example.md)
```

## Sfaturi de redactare

- **Precizați decizia în titlu** — „Utilizarea PostgreSQL pentru stocarea registrului”, nu „Bază de date”.
- Consemnați cu onestitate consecințele negative; un ADR fără dezavantaje nu a fost analizat, ci doar justificat.
- Consemnați opțiunile respinse și *de ce* — aceasta este partea pe care viitoarele echipe nu o pot reconstitui.
- Păstrați-l pe una sau două pagini. Un ADR este o înregistrare a unei decizii, nu un document de proiectare.
