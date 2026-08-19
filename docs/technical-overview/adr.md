An **architecture decision record (ADR)** captures one architecturally significant decision: its context, the options that were considered, what was decided, and what consequences were accepted. Standards say *what* must be true; runbooks say *how* to operate; ADRs preserve *why* the system is the way it is.

Government systems outlive the teams that build them. Without ADRs, the reasoning behind every important choice leaves with the people — and future teams either cargo-cult decisions that no longer make sense or accidentally reverse ones that exist for a legal or security reason.

* * *

## When an ADR is required

Write an ADR for decisions that are expensive to reverse or that future maintainers will question:

- **Any deviation from the approved technology stack** — a new framework, language, database, or significant dependency. The deviation is not approved until the ADR exists.
- Choice of database engine, messaging pattern, or Blazor rendering mode for a new system.
- How the system integrates with the shared platforms when more than one pattern is possible (for example, synchronous MConnect queries vs. MConnect Events subscriptions).
- API style exceptions ([REST is the default](api-design-guide.md)) and breaking-change strategies.
- Anything where the team spent days evaluating options — if the analysis was worth days, it is worth a page.

Routine implementation choices that follow existing standards do not need ADRs. When in doubt, ask: *"will someone in three years wonder why we did this?"*

## Where ADRs live

ADRs are part of the repository they describe, in `/docs/adr/`, numbered sequentially:

```
docs/adr/
  0001-use-postgresql-for-registry-storage.md
  0002-integrate-payments-via-mpay-not-direct-psp.md
  0003-blazor-wasm-rendering-for-citizen-portal.md
```

- Numbers are never reused; a retired decision keeps its number and gets a status change instead of deletion.
- ADRs are reviewed through the same [pull request flow](code-reviews.md) as code — the review of the ADR *is* the architecture review, with the discussion preserved in the PR.
- An ADR is **immutable once accepted**: if the decision changes, write a new ADR that supersedes the old one and link them both ways.

## Lifecycle

| Status | Meaning |
| --- | --- |
| Proposed | Under discussion; not yet binding |
| Accepted | Decision made; the record is now permanent |
| Deprecated | No longer relevant (the component or context disappeared) |
| Superseded by ADR-NNNN | Replaced by a newer decision |

* * *

## Template

The template follows [MADR](https://adr.github.io/madr/) (Markdown Architectural Decision Records). Optional sections may be deleted; the required minimum is context, options, and outcome.

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

## Writing tips

- **State the decision in the title** — "Use PostgreSQL for registry storage", not "Database".
- Record honest negative consequences; an ADR with no downsides was not analyzed, only justified.
- Capture the rejected options and *why* — that is the part future teams cannot reconstruct.
- Keep it to one or two pages. An ADR is a record of a decision, not a design document.
