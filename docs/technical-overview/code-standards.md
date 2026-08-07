These standards apply to teams developing solutions for the eGov Moldova ecosystem — the eGovernance Agency's own teams and external supplier teams alike. They exist so that code written by one team can be maintained, audited, and evolved by another, which is the normal life of a government system.

The standards are enforced where possible by automation — analyzers, pipeline quality gates, and code review — rather than by memory. See [Code reviews](code-reviews.md) for the process side.

* * *

## Languages and frameworks

Projects use the approved government technology stack described in [Tools and technologies](../tools/technologies.md): C# on supported (LTS) .NET versions, ASP.NET Core for services, Blazor for web interfaces with **Fod.UIComponents** — the Agency's own UI component library, which is replacing MudBlazor as the component standard — and Entity Framework Core for data access.

- Do not introduce new frameworks, languages, or significant dependencies without an explicit architectural justification — record the decision as an [architecture decision record](adr.md) and obtain approval at the technical architecture level.
- Pin dependency versions in project manifests; floating version ranges are not allowed in production builds.
- Prefer reusing the shared **Egov NuGet packages** (for MPass, MSign, and configuration) over reimplementing platform integrations.

## Language

All code, comments, commit messages, identifiers, and API contracts are written in **English**. Romanian appears only in user-facing text (labels, messages, notifications), which must be kept in localizable resources — never hardcoded across the codebase.

When integrating with a system whose interface uses Romanian terms, translate endpoints and fields to English in the integration layer so the rest of the system works with English-language objects. Use the [glossary](../glossary/glossary.md) for established translations of government domain terms, and extend it when a term is missing.

**Bad**

```csharp
var cerere = new CerereEliberareCertificat();   // Romanian identifier
```

**Good**

```csharp
var request = new CertificateIssueRequest();
```

* * *

## Project structure

Backend services follow **Clean Architecture** — dependencies point inward, and business logic never depends on infrastructure:

| Layer | Contents | Dependency rule |
| --- | --- | --- |
| Domain | Entities, value objects, domain events, interfaces | Depends on nothing |
| Application | Use cases, command/query handlers, DTOs, validators | Depends on Domain only |
| Infrastructure | DbContexts, repositories, external service clients, messaging | Implements Domain interfaces |
| Presentation | Controllers, middleware, request/response models | Depends on Application; wires up Infrastructure |

Practical consequences:

- Never reference infrastructure concerns (a `DbContext`, an HTTP client, a message producer) from the Domain or Application layers.
- Never return database entities directly from API endpoints — map to DTOs at the Application boundary.
- Organize repositories with the conventional `src/` and `tests/` folders; one service per solution.

## C# conventions

- Follow the standard [Microsoft C# conventions](https://learn.microsoft.com/dotnet/csharp/fundamentals/coding-style/coding-conventions): `PascalCase` for types and public members, `camelCase` for locals and parameters, meaningful names over abbreviations.
- Formatting and style are enforced through `.editorconfig` committed to the repository, with Roslyn analyzers enabled; builds treat warnings as errors.
- Enable **nullable reference types** in new projects.
- Use `async`/`await` end-to-end for I/O; never block on async code (`.Result`, `.Wait()`).
- Use dependency injection for all collaborators; avoid static service access and service locators.
- Use structured logging via `ILogger<T>` — see [Log management](log-management.md); `Console.WriteLine` is not logging.

## Data access

- All schema changes go through **versioned migrations** (EF Core Migrations); manual DDL against any shared environment is prohibited.
- Only parameterized queries or ORM-generated queries — string concatenation into SQL is a critical security violation, not a style issue.
- New business logic lives in the Application layer, not in stored procedures.
- Cache entries in Redis always carry a TTL.

* * *

## Secure coding

Security requirements are part of the definition of working code, not a separate activity. The baseline for applications in the ecosystem is **[OWASP ASVS Level 2](https://owasp.org/www-project-application-security-verification-standard/)**; day-to-day, the [OWASP Top 10](https://owasp.org/www-project-top-ten/) failure modes must be actively prevented:

- **No secrets in code or configuration files in the repository** — no connection strings with credentials, API keys, tokens, or certificates. Secrets live in the platform's secure configuration/vault mechanisms. This rule has no exceptions and applies to every environment, including development.
- Validate input on the server for every entry point; encode output appropriately for its destination (HTML, SQL, logs).
- Authenticate users only through **MPass** — custom credential storage is prohibited.
- Apply authorization checks at the resource level on every request, not only in the UI.
- No real production data in development or staging environments — use synthetic or masked data.
- Static analysis (SAST) and dependency scanning (SCA) run in the pipeline and are **blocking**: a security scan failure is fixed, not bypassed. Unmitigated critical or high-severity findings stop the release.

* * *

## Testing

Tests are part of the Definition of Done — a feature without tests is not done:

- **Unit tests** for business logic (Domain and Application layers).
- **Integration tests** for services and APIs, covering the main scenarios and error paths.
- **End-to-end tests** for critical user flows, run against staging before release.

Coverage of new code must be at least **70%**, with business logic held to a higher bar (target 80%). Coverage is measured in the pipeline and enforced as a quality gate together with static analysis — a release with failing gates does not proceed. See the [code review](code-reviews.md) page for how this fits the delivery flow.

* * *

## User interface standards

Web interfaces follow the [Unified design system (MUD)](../mud/index.md) and are built with **Fod.UIComponents**, the Agency's Blazor UI component library. New interfaces use Fod.UIComponents; existing MudBlazor applications migrate progressively as they evolve. Beyond the design system, these implementation rules apply to all AGE applications — they are the difference between an interface that looks finished and one that leaks its database schema:

**Text and labels**

- Labels are grammatically correct Romanian in sentence case: *„Cod personal"*, not *„Cod Personal"* — camelCase and Title Case are not Romanian typographic practice.
- Never show raw technical names in the UI: `UserType` becomes *Tipul utilizatorului*, `CreatedAt` becomes *Data creării*. This applies to labels, dropdown options, grid columns, and filters alike.
- Error messages are in Romanian, user-oriented, and actionable: *„Introduceți un IDNP valid (13 cifre)"* — never framework defaults like *"Length cannot be longer than…"* and never technical jargon.

**Formats**

- Dates: *12 septembrie 2024* (or *12 sep 2024* where space is constrained); numeric form is `12.09.2024` — dot separator only, day without leading zero, month with it.
- Time: 24-hour format — `14:30`, never `2:30 PM`.

**Form behavior**

- A form has exactly one visually primary button (submit/save); secondary actions (*Anulează*) are visually neutral; technical actions are minimal.
- Labels are always present — placeholders show example content, they do not replace labels.
- Validation feedback appears when a field loses focus (blur), not on every keystroke; invalid fields get a clear visual state plus a message.
- Related fields are grouped on the same row with consistent grid spacing; forms are fully keyboard-navigable (Tab/Shift+Tab, Enter submits).

Form structure and content for real screens come from the product/design specification, not developer improvisation — the rules above are the floor, not a substitute for design deliverables.
