La AGE, dezvoltarea serviciilor digitale guvernamentale se bazează pe un ecosistem tehnologic modern, securizat și scalabil. Această pagină oferă o prezentare generală a tehnologiilor, infrastructurii și instrumentelor utilizate pentru construirea unor soluții interoperabile, conforme și orientate către cetățean.

* * *

## Sistemul de design

**MUD (Modelul Unitar de Design al Moldovei)** – sistemul unitar de design pentru serviciile digitale guvernamentale
  - Oferă componente de interfață reutilizabile, tipare (patterns) și ghiduri
  - Asigură coerența în toate aplicațiile guvernamentale
  - Se concentrează pe accesibilitate, claritate și design centrat pe utilizator
  - Documentația este disponibilă [aici](https://egov-moldova.github.io/egov4dev/mud/)
  - Include design tokens, biblioteca de componente și exemple de implementare

* * *

## Stiva de dezvoltare

Serviciile AGE sunt dezvoltate folosind tehnologii robuste, alese pentru compatibilitatea cu infrastructura guvernamentală și pentru susținerea unui ciclu de viață eficient al aplicațiilor.

### Frontend

Aplicațiile web sunt construite cu **Blazor**. Standardul componentelor de interfață este în tranziție de la **MudBlazor** la **Fod.UIComponents**, biblioteca proprie de componente a Agenției:

*   **Fod.UIComponents** – biblioteca reutilizabilă de componente Blazor a Agenției, utilizată pentru interfețele noi și aliniată la sistemul unitar de design
*   **MudBlazor** – NuGet: `MudBlazor` – biblioteca de componente utilizată de aplicațiile existente în perioada de tranziție
*   **Blazor Server / WebAssembly** – pentru aplicații interactive în .NET
*   Respectarea standardelor din **Government Design System** (în curând), cu accent pe claritate, simplitate și accesibilitate

### Backend

Logica de business este implementată în cadrul ecosistemului .NET:

*   **ASP.NET Core** – NuGet: `Microsoft.AspNetCore.*` – pentru servicii REST și aplicații web scalabile
*   **Entity Framework Core** – NuGet: `Microsoft.EntityFrameworkCore` – pentru accesul la baze de date relaționale
*   **FluentValidation** – NuGet: `FluentValidation` – pentru validări declarative
*   **Swashbuckle.AspNetCore** – NuGet: `Swashbuckle.AspNetCore` – pentru generarea documentației Swagger

### Baze de date

*   **SQL Server**, **PostgreSQL** – pentru stocarea datelor relaționale
*   **Redis** – NuGet: `StackExchange.Redis` – pentru caching și optimizarea performanței
*   **Structuri JSON** – utilizate pentru configurarea dinamică a regulilor și categoriilor

* * *

## Infrastructură și DevOps

AGE utilizează infrastructura guvernamentală pentru găzduirea și orchestrarea serviciilor:

### Găzduire

*   **MCloud** – platforma cloud guvernamentală utilizată pentru găzduirea aplicațiilor AGE
*   Configurații pentru **scalabilitate**, **securitate** și **recuperare în caz de dezastru** (disaster recovery), adaptate cerințelor instituționale

### Orchestrare și containere

*   **Kubernetes** – pentru orchestrarea serviciilor containerizate
*   **Docker** – pentru împachetarea aplicațiilor în containere portabile
*   **Helm** – pentru gestionarea implementărilor (deployments) în Kubernetes, oferind versiuni controlate, rollback rapid și configurare declarativă prin charts

### CI/CD și DevOps

*   **Azure DevOps** – pentru gestionarea livrărilor, sarcinilor și defectelor
*   Pipeline-uri automatizate pentru build, testare și deploy
*   **GitLab** – pentru controlul versiunilor și integrare continuă

### Monitorizare și SRE

*   Centralizare prin **Azure DevOps**
*   Sisteme pentru **alertare**, **jurnalizare (logging)**, **auditare** și **trasare (tracing)**
*   **Elasticsearch** – pentru indexarea și căutarea rapidă a jurnalelor și a datelor operaționale
*   **Kibana** – pentru vizualizarea datelor din Elasticsearch
*   **Prometheus + Grafana** – pentru monitorizarea și vizualizarea metricilor

* * *

## Bune practici și convenții

Pentru a asigura coerența și calitatea codului:

*   Convenții pentru **denumire**, **structurarea codului** și **organizarea proiectelor**
*   Validări configurabile în **JSON**
*   Testare automatizată și manuală
*   UI/UX standardizat pentru toate aplicațiile AGE
*   Utilizarea de **feed-uri NuGet private** pentru distribuirea componentelor interne reutilizabile
