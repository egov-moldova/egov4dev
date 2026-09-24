Code review is where quality, security, and shared knowledge actually happen. Every change to a system in the eGov Moldova ecosystem reaches a protected branch only through a pull request that has been reviewed — there are no exceptions for seniority, urgency, or team.

* * *

## Branching model

Development follows a three-branch promotion flow:

```
feature/* ──PR──▶ dev ──PR──▶ staging ──PR──▶ main
                  │             │               │
                  ▼             ▼               ▼
             auto-deploy    regression,     production
             + functional   UAT, E2E        deploy
             QA
```

- All development happens on **feature branches created from `dev`** — never directly on `dev`, `staging`, or `main`.
- Code moves forward only through pull requests: feature → `dev` (deployed automatically for functional QA), `dev` → `staging` (regression, UAT, end-to-end testing), `staging` → `main` (production deployment).
- **Hotfixes** branch from `main`, go through an expedited PR to `staging` for a smoke test, then to `main` for urgent deployment. A critical production defect is announced to the delivery manager first — not fixed via a direct PR to `main`.
- After each release, `main` is synchronized back into `staging` and `staging` into `dev`, so environments never drift apart.

## Pull request requirements

A pull request is ready for review when:

- It references its **work item** (`#ID`) and describes what changed and why.
- It is **small and focused** — one logical change. Large mixed PRs get slower, shallower reviews.
- The **CI pipeline passes**: build (warnings as errors), unit and integration tests, static analysis, dependency and secret scanning. Security scan failures are blocking — they are fixed, never merged over.
- It contains **no credentials, keys, or real personal data** — neither in code, nor configuration, nor test fixtures.

Merging requires a minimum of **two approvals: a peer and a technical lead or QA**. Direct commits to protected branches are disabled.

* * *

## Review culture

Reviews lose their value if people stop commenting — or stop submitting honest work — because comments feel like attacks. The etiquette is simple: **critique the code, not the author**, keep comments concise and neutral, and ask for clarification instead of assuming ignorance.

Because many teams and vendors contribute to the ecosystem, reviewers use a shared comment vocabulary so intent is never ambiguous:

- **`Consider:`** — a suggestion or shared knowledge; the author may adopt it or not without blocking approval.
- **`Should:`** — the code needs to change: it is buggy, insecure, has dangerous side effects, or a significant performance cost. A `Should:` comment must be backed by a concrete argument; if you cannot explain *why*, it is a `Consider:` at most.

## What reviewers check

1. **Correctness** — does the change do what the work item asks, including edge cases and error paths?
2. **Security** — input validation, authorization on every resource access, no secrets, no injection surface, no personal data in logs or URLs. See [Code standards](code-standards.md).
3. **Tests** — new logic arrives with unit tests; changed behavior arrives with updated tests; coverage gates pass.
4. **Standards conformance** — [code standards](code-standards.md), [API design](api-design-guide.md) for contract changes, [logging rules](log-management.md) for anything touching business events.
5. **Maintainability** — will the next team understand this? Naming, structure, absence of dead code and commented-out blocks.
6. **Contract impact** — for API changes: is it backwards compatible, or does it require a version bump and consumer notification?

* * *

## Definition of Ready / Definition of Done

The review sits inside a wider delivery flow with explicit gates:

| Stage | Condition |
| --- | --- |
| Ready (can enter a sprint) | The story has acceptance criteria, an estimate, and clarified dependencies |
| Resolved (development done) | Code implemented, review passed, tested locally, deployed to DEV, no critical vulnerabilities |
| Ready for deployment | QA tests (functional, regression, E2E) passed on staging, UAT approved |
| Closed | Production deployment confirmed and post-deploy checks passed |

Ambiguity in requirements or acceptance criteria is escalated to the product owner or analyst — not resolved by implementing an assumption.

## External supplier teams

Vendor teams follow the same flow with additional obligations:

- Source code lives **entirely in the Agency's repositories** from day one — delivery via archives, private repositories, or vendor-hosted environments is not accepted.
- Vendors deploy to development environments; staging and production deployments require approval from the delivery and security roles.
- Before go-live, at the end of a major epic, or when the vendor team changes, a **knowledge transition** is mandatory: updated architecture documentation, API contracts and database schemas, known issues and risks, deployment notes, and a live technical handover session with the Agency's development, QA, and DevOps teams.
